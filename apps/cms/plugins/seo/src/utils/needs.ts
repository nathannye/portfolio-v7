import type { SchemaMarkupType } from "../types";

/**
 * Common keys you might conditionally show at the top-level of your `jsonld` field.
 * (These are the generic, cross-entity fields you added like name, description, inLanguage, image, etc.)
 */
type CommonKey = "name" | "description" | "inLanguage" | "image";

/**
 * Map: for each JSON-LD type, which common keys make sense to show.
 * Tweak freely for your project.
 */
const COMMON_BY_TYPE: Record<SchemaMarkupType, ReadonlySet<CommonKey>> = {
	WebSite: new Set<CommonKey>(["name", "inLanguage", "image"]),
	WebPage: new Set<CommonKey>(["name", "description", "inLanguage", "image"]),
	Article: new Set<CommonKey>(["name", "inLanguage", "image"]),
	Product: new Set<CommonKey>(["name", "description", "image"]),
	Event: new Set<CommonKey>(["name", "description", "image"]),
	FAQPage: new Set<CommonKey>(["name", "description"]), // often driven by mainEntity; keep minimal here
	Organization: new Set<CommonKey>(["name", "image"]), // url lives in the entity group
	Person: new Set<CommonKey>(["name", "image"]),
	AboutPage: new Set<CommonKey>(["name", "description", "image"]),
	ContactPage: new Set<CommonKey>(["name", "description", "image"]),
	ProfilePage: new Set<CommonKey>(["name", "description", "image"]),
};

/**
 * Returns true if a common field should be visible for the selected JSON-LD type.
 * Use it in Sanity field `hidden` callbacks: hidden: ({parent}) => !needs(parent, 'image')
 * Checks `lockedEntityType` field (dev-only locked type).
 */
export function needs(
	parent: { lockedEntityType?: SchemaMarkupType } | undefined,
	key: CommonKey,
): boolean {
	// Check lockedEntityType (dev-only locked type)
	const t = parent?.lockedEntityType;
	if (!t) return false;
	const set = COMMON_BY_TYPE[t];
	return set ? set.has(key) : false;
}

/* -------- Optional: “required” helper (if you want stricter UX) -------- */

// Keys that you consider required by type (for inline validation hints, badges, etc.)
const REQUIRED_BY_TYPE: Partial<
	Record<SchemaMarkupType, ReadonlySet<CommonKey>>
> = {
	WebSite: new Set<CommonKey>(["name"]),
	WebPage: new Set<CommonKey>(["name"]),
	Article: new Set<CommonKey>(["name"]),
	Product: new Set<CommonKey>(["name"]),
	Event: new Set<CommonKey>(["name"]),
	// others optional by default
};

export function isRequired(
	parent: { lockedEntityType?: SchemaMarkupType } | undefined,
	key: CommonKey,
): boolean {
	// Check lockedEntityType (dev-only locked type)
	const t = parent?.lockedEntityType;
	if (!t) return false;
	const set = REQUIRED_BY_TYPE[t];
	return set ? set.has(key) : false;
}

/* -------- Usage in your schema --------
defineField({
  name: 'name',
  type: 'string',
  hidden: ({parent}) => !needs(parent, 'name'),
  validation: Rule => Rule.custom((_val, ctx) => {
    return isRequired(ctx.parent as any, 'name') ? !!_val || 'Required' : true;
  })
});
*/
