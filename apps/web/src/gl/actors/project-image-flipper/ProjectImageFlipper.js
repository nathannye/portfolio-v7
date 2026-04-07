import gsap from 'gsap'
import {
	Group,
	Mesh,
	PlaneGeometry,
	ShaderMaterial,
	SRGBColorSpace,
	Texture,
} from 'three'
import { subscribeProjectImageIndex } from '~/stores/projectCursorStore'
import screen from '../../utils/screen'
import fragmentShader from './fragment.frag'
import vertexShader from './vertex.vert'

let activeFlipper = null
let switchTimeline = null
let leaveTimer = null

const flipperInstances = new Set()
/** index → flipper (from `data-index` on the link) */
const flippersByIndex = new Map()

/** Who should animate out: active selection, or any plane still visible if leave-timer cleared `activeFlipper`. */
function resolveOutgoingFlipper(next) {
	if (activeFlipper && activeFlipper !== next) return activeFlipper
	let best = null
	let bestP = -1
	for (const f of flipperInstances) {
		if (f === next || !f.plane.visible) continue
		const p = f.plane.material.uniforms.uProgress.value
		if (p > bestP) {
			bestP = p
			best = f
		}
	}
	return bestP > 0.02 ? best : null
}

/** Kill + hide everyone except the two participating in this handoff. */
function killForeignFlippers(prev, next) {
	for (const f of flipperInstances) {
		if (f === prev || f === next) continue
		gsap.killTweensOf(f.plane.material.uniforms.uProgress)
		f.plane.material.uniforms.uProgress.value = 0
		f.plane.visible = false
	}
}

function killAllProgressTweens() {
	for (const f of flipperInstances) {
		gsap.killTweensOf(f.plane.material.uniforms.uProgress)
	}
}

subscribeProjectImageIndex((index) => {
	const next = flippersByIndex.get(index)
	if (next) transitionTo(next)
})

function killSwitchTimeline() {
	if (switchTimeline) {
		switchTimeline.kill()
		switchTimeline = null
	}
}

function clearLeaveTimer() {
	if (leaveTimer != null) {
		clearTimeout(leaveTimer)
		leaveTimer = null
	}
}

function transitionTo(next) {
	if (activeFlipper === next) return

	clearLeaveTimer()
	killSwitchTimeline()

	const prev = resolveOutgoingFlipper(next)
	killForeignFlippers(prev, next)

	if (prev) gsap.killTweensOf(prev.plane.material.uniforms.uProgress)
	gsap.killTweensOf(next.plane.material.uniforms.uProgress)

	activeFlipper = next

	next.plane.visible = true
	next.plane.material.uniforms.uProgress.value = 0
	next.plane.renderOrder = 1
	if (prev) prev.plane.renderOrder = 0

	const uNext = next.plane.material.uniforms.uProgress

	if (prev && prev !== next) {
		const uPrev = prev.plane.material.uniforms.uProgress
		prev.plane.visible = true
		const fromPrev = uPrev.value
		switchTimeline = gsap.timeline({ defaults: { overwrite: 'auto' } })
		// Overlap: outgoing eases from its current progress; incoming from hidden.
		switchTimeline.fromTo(
			uPrev,
			{ value: fromPrev },
			{
				value: 0,
				duration: 0.48,
				ease: 'power2.in',
				onComplete: () => {
					prev.plane.visible = false
				},
			},
			0,
		)
		switchTimeline.fromTo(
			uNext,
			{ value: 0 },
			{
				value: 1,
				duration: 0.58,
				ease: 'power3.out',
			},
			0,
		)
	} else {
		switchTimeline = gsap.timeline({ defaults: { overwrite: 'auto' } })
		switchTimeline.fromTo(
			uNext,
			{ value: uNext.value },
			{ value: 1, duration: 0.68, ease: 'power3.out' },
		)
	}
}

export default class ProjectImageFlipper extends Group {
	constructor(element) {
		super()
		this.element = element
		this.itemIndex = Number(this.element.dataset.index)
		this.trackerEl = document.querySelector('[data-gl="project-image-tracker"]')

		this._onLeave = () => this._handleLeave()

		flipperInstances.add(this)
		if (!Number.isNaN(this.itemIndex)) {
			flippersByIndex.set(this.itemIndex, this)
		}
		this.init()
	}

	init() {
		this.element.addEventListener('mouseleave', this._onLeave)

		this.plane = new Mesh(
			new PlaneGeometry(1, 1, 64, 40),
			new ShaderMaterial({
				uniforms: {
					uTexture: { value: null },
					uProgress: { value: 0 },
				},
				vertexShader,
				fragmentShader,

				transparent: true,
				depthWrite: false,
			}),
		)
		this.plane.visible = false
		this.add(this.plane)

		const imageUrl = this.element.dataset.glImage
		if (!imageUrl) return

		const imgEl = new Image()
		imgEl.crossOrigin = 'anonymous'
		imgEl.src = imageUrl

		const load = (el) => {
			const texture = new Texture(el)
			texture.needsUpdate = true
			texture.colorSpace = SRGBColorSpace
			this.plane.material.uniforms.uTexture.value = texture
		}

		if (imgEl.complete && imgEl.naturalWidth > 0) {
			load(imgEl)
		} else {
			imgEl.onload = () => load(imgEl)
		}
	}

	_handleLeave() {
		clearLeaveTimer()

		leaveTimer = setTimeout(() => {
			leaveTimer = null
			if (activeFlipper !== this) return

			activeFlipper = null
			killSwitchTimeline()
			killAllProgressTweens()

			gsap.to(this.plane.material.uniforms.uProgress, {
				value: 0,
				duration: 0.52,
				ease: 'power2.in',
				overwrite: 'auto',
				onComplete: () => {
					this.plane.visible = false
				},
			})
		}, 100)
	}

	dispose() {
		flipperInstances.delete(this)
		if (flippersByIndex.get(this.itemIndex) === this) {
			flippersByIndex.delete(this.itemIndex)
		}
		this.element.removeEventListener('mouseleave', this._onLeave)
		clearLeaveTimer()
		if (activeFlipper === this) activeFlipper = null
		killSwitchTimeline()
		gsap.killTweensOf(this.plane.material.uniforms.uProgress)
		this.plane?.material?.dispose()
		this.plane?.geometry?.dispose()
		this.parent?.remove(this)
	}

	render() {
		if (!this.trackerEl) {
			this.trackerEl = document.querySelector('[data-gl="project-image-tracker"]')
		}
		if (!this.trackerEl) return

		const rect = this.trackerEl.getBoundingClientRect()
		const px = screen.glViewSize.pixels

		const glX = (rect.left + rect.width / 2 - screen.x / 2) * px
		const glY = -(rect.top + rect.height / 2 - screen.y / 2) * px
		this.plane.scale.set(rect.width * px, rect.height * px, 1)
		this.plane.position.set(glX, glY, 0)
	}
}
