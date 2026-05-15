export {}

declare global {
	interface ImportMetaEnv {
		readonly SANITY_TOKEN?: string
	}

	interface ImportMeta {
		readonly env: ImportMetaEnv
	}
}
