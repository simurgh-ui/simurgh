// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import {
  forwardRef,
  type FieldsetHTMLAttributes,
  type HTMLAttributes,
} from 'preact/compat';

export const Field = /* @__PURE__ */ forwardRef<
  HTMLFieldSetElement,
  FieldsetHTMLAttributes<HTMLFieldSetElement>
>(function Field(props, ref) {
  return <fieldset ref={ref} data-slot="field" {...props} />;
});
export const FieldLegend = /* @__PURE__ */ forwardRef<
  HTMLLegendElement,
  HTMLAttributes<HTMLLegendElement>
>(function FieldLegend(props, ref) {
  return <legend ref={ref} data-slot="field-legend" {...props} />;
});
export const FieldDescription = /* @__PURE__ */ forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function FieldDescription(props, ref) {
  return <p ref={ref} data-slot="field-description" {...props} />;
});
export const FieldError = /* @__PURE__ */ forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function FieldError(props, ref) {
  return <p ref={ref} data-slot="field-error" role="alert" {...props} />;
});
