import { Card, Flex, Stack, Text } from '@sanity/ui'
import { MdCheckCircle, MdInfo } from 'react-icons/md'
import { useSeoDefaults } from '../../context/SeoDefaultsContext'
import { getAutoMappedFields } from '../../utils/getAutoMappedFields'
import type { ObjectInputProps } from 'sanity'

export default function SchemaMarkupAutoMappedFields(
	props: ObjectInputProps,
) {
	const { schemaDefaults } = useSeoDefaults()
	const schemaType = props.value?.lockedEntityType
	const autoMap = schemaDefaults?.autoMap || {}

	const autoMappedFields = getAutoMappedFields(schemaType, autoMap)

	if (!schemaType || autoMappedFields.length === 0) {
		return null
	}

	return (
		<Card tone="positive" padding={3} marginBottom={3}>
			<Stack space={3}>
				<Flex gap={2} align="center">
					<MdInfo size={18} />
					<Text weight="semibold" size={1}>
						Automatically Filled Fields
					</Text>
				</Flex>
				<Stack space={2}>
					{autoMappedFields.map((field) => (
						<Flex key={field.field} gap={2} align="center">
							<MdCheckCircle size={16} />
							<Text size={1}>
								<strong>{field.field}</strong> - {field.description}
								{!field.enabled && ' (disabled in defaults)'}
							</Text>
						</Flex>
					))}
				</Stack>
			</Stack>
		</Card>
	)
}
