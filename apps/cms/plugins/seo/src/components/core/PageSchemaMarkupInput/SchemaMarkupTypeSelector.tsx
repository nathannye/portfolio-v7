import { Box, Grid } from "@sanity/ui";
import { set } from "sanity";
import type { StringInputProps } from "sanity";
import ButtonWithIcon from "../../partials/ButtonWithIcon";

export default function SchemaMarkupTypeSelector(props: StringInputProps) {
	const { onChange, schemaType, value } = props;

	// Get parent to check for lockedEntityType
	const parent = (props as any).parent as { lockedEntityType?: string } | undefined;
	const hasLockedEntityType = !!parent?.lockedEntityType;

	// If entity type is locked, hide the selector
	if (hasLockedEntityType) {
		return null;
	}

	// Filter out LocalBusiness and CreativeWork from options
	const options = ((schemaType.options?.list as any[]) || []).filter(
		(option: any) => option.value !== "LocalBusiness" && option.value !== "CreativeWork",
	);

	const handleChange = (optionValue: string) => {
		onChange(set(optionValue));
	};

	const normalizeString = (str: string | undefined): string => {
		if (!str) return "";
		return str.replace(/#/g, "").toLowerCase().trim();
	};

	const currentValue = normalizeString(value as string | undefined);

	return (
		<Box>
			<Grid columns={3} gap={3}>
				{options.map((option: any) => {
					const { title, value: optionValue, icon } = option;
					const isSelected = currentValue === normalizeString(optionValue);

					return (
						<ButtonWithIcon
							key={optionValue}
							buttonProps={{
								paddingY: 4,
								mode: isSelected ? "default" : "ghost",
								onClick: () => handleChange(optionValue),
							} as any}
							label={title}
							icon={icon}
						/>
					);
				})}
			</Grid>
		</Box>
	);
}
