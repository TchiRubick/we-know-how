"use client";

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
import { useSigninForm } from "../_hooks/use-signin-form";

export const SigninForm = () => {
  const t = useScopedI18n("signin");
  const { signingForm, signinMutation } = useSigninForm();

  return (
    <Card title="Sign in" className="w-full sm:w-1/4">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signingForm.handleSubmit();
          }}
          className="flex flex-col gap-2"
        >
          <div>
            <signingForm.Field name="identifier">
              {(field) => (
                <>
                  <Label>{t("identifier")}</Label>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            </signingForm.Field>
          </div>
          <div>
            <signingForm.Field name="password">
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
                </>
              )}
            </signingForm.Field>
          </div>
          <div className="mt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={signinMutation.isPending}
            >
              {signinMutation.isPending ? <Loader /> : "Sign in"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <span className="text-sm">
          {t("no-account")}{" "}
          <Link
            href="/signup"
            className="text-sm text-muted-foreground underline"
          >
            {t("signup")}
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
};
