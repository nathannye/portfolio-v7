// Client
export { default as sanityClient } from './client'

// Components (Solid.js only - do NOT import in React/Sanity Studio)
export { default as PortableText } from './components/PortableText'
export { default as SanityComponents } from './components/SanityComponents'
export { default as SanityLink } from './components/SanityLink'
export { default as SanityPage } from './components/SanityPage'
export { default as SanityPageSlices } from './components/SanityPageSlices'
// Re-export utilities for convenience (also available via ./utils.ts)
export * from './config'
export * from './types'
export * from './utils/assets'
export * from './utils/link'
// Query utilities (Solid.js only - uses @solidjs/router)
export * from './utils/query'
export * from './utils/resolver'
export * from './utils/seo-queries'
