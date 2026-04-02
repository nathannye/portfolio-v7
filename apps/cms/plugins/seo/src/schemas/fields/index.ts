import favicon from './metadata/favicon'
import indexing from './metadata/indexing'
import metaDescription from './metadata/meta-description'
import metadata from './metadata/page-metadata'
import { schemaMarkupAddress } from './schema-markup/address'
import { schemaMarkupAggregateRating } from './schema-markup/aggregate-rating'
import { schemaMarkupGeo } from './schema-markup/geo'
import { schemaMarkup } from './schema-markup/schemaMarkup'

export default [
	indexing,
	favicon,
	schemaMarkupAddress,
	schemaMarkupGeo,
	schemaMarkupAggregateRating,
	schemaMarkup,
	metadata,
	metaDescription,
]
