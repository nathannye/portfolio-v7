export const formatPartner = (partner: { name: string; country: string }) => {
	if (partner?.country) {
		return `${partner.name} [ ${partner.country} ]`
	}
	return partner.name
}
