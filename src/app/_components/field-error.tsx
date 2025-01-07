import type { DeepKeys, FieldApi } from "@tanstack/react-form";

export const FieldError = <T, N extends DeepKeys<T>>({
  field,
}: {
  field: FieldApi<T, N>;
}) => (
  <div className="text-xs text-red-500">
    {field.state.meta.isTouched && field.state.meta.errors.length ? (
      <em>{field.state.meta.errors[0]}</em>
    ) : null}
    {field.state.meta.isValidating ? "Validating..." : null}
  </div>
);
