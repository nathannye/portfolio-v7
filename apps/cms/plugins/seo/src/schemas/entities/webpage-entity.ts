import { defineType, defineField } from "sanity";

export const schemaMarkupWebPageFields = defineType({
	name: "schemaMarkupWebPageFields",
	title: "WebPage Fields",
	type: "object",
	fields: [
		// name and description are handled by common fields at the top level
		// defineField({ name: "primaryImageOfPage", type: "jsonldImageObject" }),
		// defineField({
		// 	name: "breadcrumb",
		// 	title: "Breadcrumb (optional)",
		// 	type: "jsonldBreadcrumbListFields",
		// }),
		defineField({
			name: "about",
			title: "About (Entities)",
			type: "array",
			of: [
				{ type: "schemaMarkupPerson" },
				{ type: "schemaMarkupOrganization" },
			],
		}),
	],
	preview: {
		select: { title: "name" },
		prepare: ({ title }) => ({ title: title || "WebPage" }),
	},
});
