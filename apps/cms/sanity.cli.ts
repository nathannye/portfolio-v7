import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
	api: {
		projectId: 'b53ej91c',
		dataset: 'production',
	},
	studioHost: 'nye-dot-dev',
	/**
	 * Enable auto-updates for studios.
	 * Learn more at https://www.sanity.io/docs/cli#auto-updates
	 */
	deployment: {
		autoUpdates: false,
	},
})
