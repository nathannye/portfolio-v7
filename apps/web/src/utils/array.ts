export const wrapArray = (array: any[], index: number) => {
	return array[index % array.length]
}
