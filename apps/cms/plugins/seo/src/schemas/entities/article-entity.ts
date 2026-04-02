import { defineType, defineField } from "sanity";

export const schemaMarkupArticleFields = defineType({
	name: "schemaMarkupArticleFields",
	title: "Article Fields",
	type: "object",
	fields: [
		// defineField({ name: "articleSection", type: "string" }),
		// Author field hidden - authors should be passed manually via extra prop
		// defineField({
		// 	name: "author",
		// 	title: "Author(s)",
		// 	type: "array",
		// 	of: [
		// 		{ type: "schemaMarkupPerson" },
		// 		{ type: "schemaMarkupOrganization" },
		// 	],
		// }),
		defineField({
			name: "publisher",
			title: "Publisher",
			type: "schemaMarkupOrganization",
		}),
		// defineField({
		// 	name: "image",
		// 	title: "Article Image",
		// 	type: "jsonldImageObject",
		// }),
		// defineField({
		// 	name: "mainEntityOfPage",
		// 	type: "url",
		// 	description: "Canonical URL of the page hosting this article.",
		// }),
	],
	preview: {
		select: { subtitle: "articleSection" },
		prepare: ({ subtitle }) => ({ title: "Article", subtitle }),
	},
});
