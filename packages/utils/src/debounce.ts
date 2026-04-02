/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last invocation.
 *
 * @param fn - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: any[]) => any>(
	fn: T,
	wait: number,
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null = null

	return function debounced(...args: Parameters<T>) {
		// Clear existing timeout
		if (timeout) {
			clearTimeout(timeout)
		}

		// Set new timeout
		timeout = setTimeout(() => {
			fn(...args)
			timeout = null
		}, wait)
	}
}
