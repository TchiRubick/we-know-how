"use client";

import { FieldError } from "@/app/_components/field-error";
import { Loader } from "@/app/_components/loader";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { useScopedI18n } from "@/packages/locales/client";
import Link from "next/link";
import { useRegisterForm } from "../_hooks/use-register-form";

export const SignupForm = () => {
  const t = useScopedI18n("signup");
  const { registerForm, signupMutation } = useRegisterForm();

  return (
    <Card className="w-full sm:w-1/4">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            registerForm.handleSubmit();
          }}
          className="flex flex-col gap-2"
        >
          <div>
            <registerForm.Field name="username">
              {(field) => (
                <>
                  <Label>{t("username")}</Label>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError field={field} />
                </>
              )}
            </registerForm.Field>
          </div>
          <div>
            <registerForm.Field name="email">
              {(field) => (
                <>
                  <Label>{t("email")}</Label>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError field={field} />
                </>
              )}
            </registerForm.Field>
          </div>
          <div>
            <registerForm.Field name="password">
              {(field) => (
                <>
                  <Label>{t("password")}</Label>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="password"
                  />
                  <FieldError field={field} />
                </>
              )}
            </registerForm.Field>
          </div>
          <div>
            <registerForm.Field name="phone">
              {(field) => (
                <>
                  <Label>{t("phone")}</Label>
                  <Input
                    name={field.name}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError field={field} />
                </>
              )}
            </registerForm.Field>
          </div>
          <div>
            <registerForm.Field name="address">
              {(field) => (
                <>
                  <Label>{t("address")}</Label>
                  <Input
                    name={field.name}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError field={field} />
                </>
              )}
            </registerForm.Field>
          </div>
          <div>
            <registerForm.Field name="city">
              {(field) => (
                <>
                  <Label>{t("city")}</Label>
                  <Input
                    name={field.name}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError field={field} />
                </>
              )}
            </registerForm.Field>
          </div>
          <div>
            <registerForm.Field name="country">
              {(field) => (
                <>
                  <Label>{t("country")}</Label>
                  <Input
                    name={field.name}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError field={field} />
                </>
              )}
            </registerForm.Field>
          </div>
          <div>
            <registerForm.Field name="birthYear">
              {(field) => (
                <>
                  <Label>{t("birthYear")}</Label>
                  <Input
                    name={field.name}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    maxLength={4}
                    minLength={4}
                    onChange={(e) => {
                      const value = Number(e.target.value);

                      if (isNaN(value)) {
                        return;
                      }

                      field.handleChange(value);
                    }}
                  />
                  <FieldError field={field} />
                </>
              )}
            </registerForm.Field>
          </div>
          <div className="mt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? <Loader /> : "Sign up"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm">
            {t("have-account")}{" "}
            <Link
              href="/signin"
              className="text-sm text-muted-foreground underline"
            >
              {t("signin")}
            </Link>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};
