// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { forwardRef, type HTMLAttributes } from 'preact/compat';

export const DescriptionList = /* @__PURE__ */ forwardRef<
  HTMLDListElement,
  HTMLAttributes<HTMLDListElement>
>(function DescriptionList(props, ref) {
  return <dl ref={ref} data-slot="description-list" {...props} />;
});
export const DescriptionListGroup = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function DescriptionListGroup(props, ref) {
  return <div ref={ref} data-slot="description-list-group" {...props} />;
});
export const DescriptionListTerm = /* @__PURE__ */ forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement>
>(function DescriptionListTerm(props, ref) {
  return <dt ref={ref} data-slot="description-list-term" {...props} />;
});
export const DescriptionListDetails = /* @__PURE__ */ forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement>
>(function DescriptionListDetails(props, ref) {
  return <dd ref={ref} data-slot="description-list-details" {...props} />;
});
