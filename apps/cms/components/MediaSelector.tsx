import { Stack, Tab, TabList } from '@sanity/ui'
import { useCallback } from 'react'
import { MdImage, MdPlayCircle } from 'react-icons/md'
import { MemberField, set } from 'sanity'

type MediaType = 'image' | 'video'

const options = [
	{ name: 'Image', icon: MdImage },
	{ name: 'Video', icon: MdPlayCircle },
]

export default function MediaSelector(props) {
	const { onChange, renderField, renderInput, members, renderItem, renderPreview, value } = props

	const val = (value?.mediaType?.toLowerCase?.() || 'image') as MediaType

	const handleTypeSelect = useCallback(
		(mediaType: MediaType) => {
			onChange(set({ ...props.value, mediaType }))
		},
		[onChange, props.value],
	)

	const imageMember = members.find((member: any) => member.name === 'image')
	const videoMember = members.find((member: any) => member.name === 'video')

	return (
		<Stack space={3}>
			<TabList space={2}>
				{options.map((option) => (
					<Tab
						id={`${option.name.toLowerCase()}-tab`}
						aria-controls={`${option.name.toLowerCase()}-panel`}
						key={option.name}
						onClick={() => handleTypeSelect(option.name.toLowerCase() as MediaType)}
						icon={option.icon}
						label={option.name}
						selected={val === option.name.toLowerCase()}
					/>
				))}
			</TabList>
			<div>
				{val === 'image' && imageMember && (
					<MemberField
						renderInput={renderInput}
						renderField={renderField}
						renderItem={renderItem}
						renderPreview={renderPreview}
						member={imageMember}
					/>
				)}
				{val === 'video' && videoMember && (
					<MemberField
						renderInput={renderInput}
						renderField={renderField}
						renderItem={renderItem}
						renderPreview={renderPreview}
						member={videoMember}
					/>
				)}
			</div>
		</Stack>
	)
}
