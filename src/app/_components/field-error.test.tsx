import { I18nProviderClient } from "@/packages/locales/client";
import type { SigninInput } from "@/services/user/user.model";
import type { FieldApi } from "@tanstack/react-form";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { FieldError } from "./field-error";

vi.mock("@/packages/locales/client", async () => {
  const actual = await vi.importActual("@/packages/locales/client");
  return {
    ...actual,
    useScopedI18n: () => (key: string) => key,
  };
});

const createMockField = (
  isTouched: boolean = false,
  errors: string[] = [],
  isValidating: boolean = false,
): FieldApi<SigninInput, "identifier"> =>
  ({
    state: {
      meta: {
        isTouched,
        errors,
        isValidating,
      },
    },
  }) as FieldApi<SigninInput, "identifier">;

describe("FieldError", () => {
  test("renders empty when field is untouched and has no errors", () => {
    const field = createMockField();

    render(
      <I18nProviderClient locale="en">
        <FieldError field={field} />
      </I18nProviderClient>,
    );

    const errorElement = screen.findAllByTestId("field-error");
    expect(errorElement).exist;
    expect(errorElement).empty;
  });

  test("displays error message when field is touched and has errors", () => {
    const errorMessage = "This field is required";
    const field = createMockField(true, [errorMessage]);

    render(
      <I18nProviderClient locale="en">
        <FieldError field={field} />
      </I18nProviderClient>,
    );

    const errorElement = screen.findByTestId("field-error");
    expect(errorElement).exist;
    expect(screen.findByText(errorMessage)).exist;
  });

  test("shows validating message when field is validating", async () => {
    const field = createMockField(false, [], true);

    render(
      <I18nProviderClient locale="en">
        <FieldError field={field} />
      </I18nProviderClient>,
    );

    const errorElement = screen.findByTestId("field-error");
    expect(errorElement).exist;
    expect(screen.findByText("validating")).exist;
  });

  test("prioritizes both when both are present", async () => {
    const errorMessage = "This field is required";
    const field = createMockField(true, [errorMessage], true);

    render(
      <I18nProviderClient locale="en">
        <FieldError field={field} />
      </I18nProviderClient>,
    );

    const errorElement = screen.findByTestId("field-error");
    expect(errorElement).exist;
    expect(await screen.findByText(errorMessage)).exist;
    expect(await screen.findAllByText("validating")).exist;
  });
});
