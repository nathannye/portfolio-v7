import { defineType, defineField } from "sanity";

export const schemaMarkupContactPageFields = defineType({
	name: "schemaMarkupContactPageFields",
	title: "Contact Page Fields",
	type: "object",
	fields: [
		defineField({
			name: "name",
			type: "string",
			description: "Name of the contact page (defaults to page title)",
		}),
		defineField({
			name: "description",
			type: "text",
			description:
				"Description of the contact page (defaults to meta description)",
		}),
	],
	preview: {
		select: { title: "name" },
		prepare: ({ title }) => ({ title: title || "Contact Page" }),
	},
});
