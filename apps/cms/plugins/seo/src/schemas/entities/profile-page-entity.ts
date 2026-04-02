import { defineType, defineField } from "sanity";

export const schemaMarkupProfilePageFields = defineType({
	name: "schemaMarkupProfilePageFields",
	title: "Profile Page Fields",
	type: "object",
	fields: [
		defineField({
			name: "name",
			type: "string",
			description: "Name of the profile page (defaults to page title)",
		}),
		defineField({
			name: "description",
			type: "text",
			description:
				"Description of the profile page (defaults to meta description)",
		}),
		defineField({
			name: "about",
			title: "About (Entities)",
			type: "array",
			description: "People or organizations this profile page is about",
			of: [
				{ type: "schemaMarkupPerson" },
				{ type: "schemaMarkupOrganization" },
			],
		}),
		defineField({
			name: "sameAs",
			title: "Profiles (sameAs)",
			type: "array",
			of: [{ type: "url" }],
			options: { layout: "tags" },
			description: "Social or professional profiles associated with this page",
		}),
	],
	preview: {
		select: { title: "name" },
		prepare: ({ title }) => ({ title: title || "Profile Page" }),
	},
});
