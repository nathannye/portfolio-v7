import {
	MdArticle,
	MdBusiness,
	MdEmail,
	MdEvent,
	MdPageview,
	MdPeople,
	MdPerson,
	MdQuestionAnswer,
	MdShoppingBag,
	MdWeb,
} from 'react-icons/md'

export const SCHEMA_MARKUP_TYPES = {
	AboutPage: { title: 'AboutPage', value: 'AboutPage', icon: MdPeople },
	ContactPage: { title: 'ContactPage', value: 'ContactPage', icon: MdEmail },
	Article: { title: 'Article', value: 'Article', icon: MdArticle },
	Event: { title: 'Event', value: 'Event', icon: MdEvent },
	FAQPage: { title: 'FAQPage', value: 'FAQPage', icon: MdQuestionAnswer },
	// BreadcrumbList: { title: "BreadcrumbList", value: "BreadcrumbList" },
	Organization: {
		title: 'Organization',
		value: 'Organization',
		icon: MdBusiness,
	},
	Person: { title: 'Person', value: 'Person', icon: MdPerson },
	Product: { title: 'Product', value: 'Product', icon: MdShoppingBag },
	ProfilePage: { title: 'ProfilePage', value: 'ProfilePage', icon: MdPerson },
	WebPage: { title: 'WebPage', value: 'WebPage', icon: MdPageview },
	WebSite: { title: 'WebSite', value: 'WebSite', icon: MdWeb },
}
