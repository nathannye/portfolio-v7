import { Box, Button, Flex, Text, useToast } from '@sanity/ui'
import { useEffect } from 'react'
import { set } from 'sanity'

export default function ButtonSelector(props) {
	const toast = useToast()

	const {
		elementProps: { id, onBlur, onFocus, placeholder, readOnly, ref, value },
		onChange,
		schemaType,
		validation,
	} = props

	const options = schemaType.options.list
	const initialValue = schemaType.initialValue

	// Set initial value from schema if value is undefined
	useEffect(() => {
		if (value === undefined && initialValue !== undefined) {
			onChange(set(initialValue))
		}
	}, [value, initialValue, onChange])

	const handleChange = (option: string) => {
		onChange(set(option))
	}

	const c = (c: string) => {
		c = c?.replaceAll('#', '')?.toLowerCase().trim()
		return c
	}

	// Use initialValue for comparison if current value is undefined
	const currentValue = value ?? initialValue

	return (
		<Box>
			<Flex gap={3}>
				{options.map((option, index) => {
					const { title, value, icon, color } = option
					const isMulticolor = color && color.includes(',')

					const Icon = icon
					return (
						<Button
							paddingX={3}
							paddingY={2}
							mode={c(currentValue) === c(value) ? 'default' : 'ghost'}
							onClick={() => handleChange(value)}
							key={index}
						>
							<Flex gap={2} align="center">
								{icon && <Icon size={20} />}
								{color && !isMulticolor && (
									<div
										style={{
											background: color,
											width: '12px',
											height: '12px',
											border: '.2px solid var(--card-fg-color)',
											borderRadius: '100px',
										}}
									></div>
								)}
								<Text size={1} weight="semibold">
									{title}
								</Text>
							</Flex>
						</Button>
					)
				})}
			</Flex>
		</Box>
	)
}
