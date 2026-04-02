// src/schema/field.ts

import {defineField, defineType, type FieldDefinition} from 'sanity'
import PageSchemaMarkupInput from '../../../components/core/PageSchemaMarkupInput/PageSchemaMarkupInput'
import {SCHEMA_MARKUP_TYPES} from '../../../globals'
import {needs} from '../../../utils/needs'

// Helper function to get the effective type (lockedEntityType)
const getEffectiveType = (parent: any): string | undefined => {
  return parent?.lockedEntityType
}

// Helper function to check if a type matches
const isType = (parent: any, type: string): boolean => {
  const effectiveType = getEffectiveType(parent)
  return effectiveType === type
}

export const schemaMarkup = defineType({
  name: 'schemaMarkup',
  title: 'Schema Markup',
  // components: {
  // 	input: PageSchemaMarkupInput,
  // },
  type: 'object',
  fields: [
    // Dev-only field to lock entity type - this is the only way to select a type
    defineField({
      name: 'lockedEntityType',
      title: 'Entity Type',
      type: 'string',
      hidden: () => process.env.NODE_ENV !== 'development',
      readOnly: () => process.env.NODE_ENV !== 'development',
      description: 'Developer-only field to lock the entity type. Set via field options.',
      options: {
        list: Object.values(SCHEMA_MARKUP_TYPES)
          .filter((type) => type.value !== 'LocalBusiness' && type.value !== 'CreativeWork')
          .map((type) => ({title: type.title, value: type.value})),
      },
      validation: (Rule) => Rule.required().error('Entity type is required'),
    }),
    // Minimal common fields:
    defineField({
      name: 'name',
      type: 'string',
      hidden: true,
      // hidden: ({ parent }) => {
      // 	const effectiveType = getEffectiveType(parent)
      // 	return !needs({ lockedEntityType: effectiveType } as any, 'name')
      // },
    }),
    defineField({
      name: 'description',
      type: 'text',
      hidden: true,
      rows: 3,
      // hidden: ({ parent }) => {
      // 	const effectiveType = getEffectiveType(parent)
      // 	return !needs({ lockedEntityType: effectiveType } as any, 'description')
      // },
    }),
    // defineField({
    // 	name: "image",
    // 	type: "jsonldImageObject",
    // 	hidden: ({ parent }) => !needs(parent, "image"),
    // }),
    // Type-specific groups (conditionally shown)
    // Article
    defineField({
      name: 'article',
      type: 'schemaMarkupArticleFields',
      hidden: true,
      // hidden: ({ parent }) => !isType(parent, 'Article'),
    }),
    // Product
    defineField({
      name: 'product',
      type: 'schemaMarkupProductFields',
      hidden: true,
      // hidden: ({ parent }) => !isType(parent, 'Product'),
    }),
    // Event
    defineField({
      name: 'event',
      hidden: true,
      type: 'schemaMarkupEventFields',
      // hidden: ({ parent }) => !isType(parent, 'Event'),
    }),
    // FAQPage
    defineField({
      name: 'faqPage',
      hidden: true,
      type: 'schemaMarkupFAQPageFields',
      // hidden: ({ parent }) => !isType(parent, 'FAQPage'),
    }),
    // Person
    defineField({
      name: 'person',
      type: 'schemaMarkupPersonFields',
      hidden: true,
      // hidden: ({ parent }) => !isType(parent, 'Person'),
    }),
    // AboutPage
    defineField({
      name: 'aboutPage',
      type: 'schemaMarkupAboutPageFields',
      hidden: true,
      // hidden: ({ parent }) => !isType(parent, 'AboutPage'),
    }),
    // ContactPage
    defineField({
      name: 'contactPage',
      type: 'schemaMarkupContactPageFields',
      hidden: true,
      // hidden: ({ parent }) => !isType(parent, 'ContactPage'),
    }),
    // ProfilePage
    defineField({
      name: 'profilePage',
      type: 'schemaMarkupProfilePageFields',
      hidden: true,
      // hidden: ({ parent }) => !isType(parent, 'ProfilePage'),
    }),
    // WebPage
    defineField({
      name: 'webPage',
      type: 'schemaMarkupWebPageFields',
      hidden: true,
      // hidden: ({ parent }) => !isType(parent, 'WebPage'),
    }),
    // Organization and WebSite use common fields only (no dedicated entity fields)
  ],
  // components: { input: JsonLdInput }, // custom UI that merges defaults + shows preview
  preview: {select: {title: 'lockedEntityType', subtitle: 'name'}},
})

/**
 * Helper function to create a schemaMarkup field with a locked entity type.
 * This allows developers to restrict the field to a single entity type.
 *
 * @param entityType - The entity type to lock (e.g., 'Article', 'Product', 'Event')
 * @returns A field definition with the entity type locked
 *
 * @example
 * ```typescript
 * defineField(createSchemaMarkupField('Article'))
 * ```
 */
export function createSchemaMarkupField(entityType?: string): FieldDefinition {
  return {
    name: 'schemaMarkup',
    type: 'schemaMarkup',
    options: entityType ? {defaultSchemaType: entityType} : undefined,
    initialValue: entityType
      ? {
          lockedEntityType: entityType,
        }
      : undefined,
  }
}
