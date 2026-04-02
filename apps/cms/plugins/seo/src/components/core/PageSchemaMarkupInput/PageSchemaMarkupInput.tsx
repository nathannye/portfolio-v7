import { useEffect } from "react";
import { set } from "sanity";
import type { ObjectInputProps } from "sanity";
import SchemaMarkupAutoMappedFields from "../SchemaMarkupAutoMappedFields";

export default function PageSchemaMarkupInput(props: ObjectInputProps) {
	const { value, onChange, schemaType } = props;
	
	// Get defaultSchemaType from field options
	const defaultSchemaType = (schemaType.options as any)?.defaultSchemaType;
	
	// Set initial value if defaultSchemaType is provided and lockedEntityType is not set
	useEffect(() => {
		if (defaultSchemaType && !value?.lockedEntityType) {
			onChange(set({ ...value, lockedEntityType: defaultSchemaType }));
		}
	}, [defaultSchemaType, value?.lockedEntityType, onChange, value]);

	return (
		<div>
			<SchemaMarkupAutoMappedFields {...props} />
			{props.renderDefault(props)}
		</div>
	);
}
