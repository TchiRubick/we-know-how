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
import Link from "next/link";
import { useRegisterForm } from "../_hooks/use-register-form";

export const SignupForm = () => {
  const { registerForm, signupMutation } = useRegisterForm();

  return (
    <Card className="w-full sm:w-1/4">
      <CardHeader>
        <CardTitle>Signup</CardTitle>
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
                  <Label>Username</Label>
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
                  <Label>Email</Label>
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
                  <Label>Password</Label>
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
                  <Label>Phone</Label>
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
                  <Label>Address</Label>
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
                  <Label>City</Label>
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
                  <Label>Country</Label>
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
                  <Label>Birth Year</Label>
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
            Already have an account ?{" "}
            <Link
              href="/signin"
              className="text-sm text-muted-foreground underline"
            >
              Sign in
            </Link>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};
