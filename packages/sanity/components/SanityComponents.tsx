import type { Component } from "solid-js";
import { Dynamic, For } from "solid-js/web";
import SanityErrorBoundary from "./SanityErrorBoundary";

type ComponentList = {
  [key: string]: Component<any>;
};

export default function SanityComponents({
  components,
  componentList,
}: {
  components: any[];
  componentList: ComponentList;
}) {
  return (
    <For each={components}>
      {(component, index) => {
        if (!componentList[component._type]) {
          console.warn(`Component of type ${component._type} not found`);
          return (
            <div class="my-12 rounded-md border border-red-300 bg-red-50 p-12 text-red-900">
              <p class="font-semibold">
                Slice render error: unknown component type "{component._type}"
              </p>
            </div>
          );
        }

        return (
          <SanityErrorBoundary {...component} cmsData={component}>
            <Dynamic
              component={componentList[component._type]}
              {...component}
            />
          </SanityErrorBoundary>
        );
      }}
    </For>
  );
}
