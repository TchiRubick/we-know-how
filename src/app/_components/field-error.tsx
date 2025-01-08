"use client";

import { useScopedI18n } from "@/packages/locales/client";
import type { DeepKeys, FieldApi } from "@tanstack/react-form";

export const FieldError = <T, N extends DeepKeys<T>>({
  field,
}: {
  field: FieldApi<T, N>;
}) => {
  const t = useScopedI18n("common");
  return (
    <div className="text-xs text-red-500" data-testid="field-error">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors[0]}</em>
      ) : null}
      {field.state.meta.isValidating ? t("validating") : null}
    </div>
  );
};
