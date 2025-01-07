import { useScopedI18n } from "@/packages/locales/client";
import { signupAction } from "@/services/user/user.action";
import type { RegisterInput } from "@/services/user/user.model";
import { zRegister } from "@/services/user/user.model";

import { formOptions, useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRegisterForm = () => {
  const router = useRouter();

  const t = useScopedI18n("signup");

  const formOpts = formOptions<RegisterInput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      birthYear: new Date().getFullYear(),
    },
    validators: {
      onChange: zRegister,
      onSubmit: zRegister,
    },
  });

  const signupMutation = useMutation({
    mutationFn: async ({ value }: { value: RegisterInput }) => {
      return signupAction(value);
    },
    onSuccess: () => {
      toast(t("success"));
      router.push("/dashboard");
    },
    onError: (error) => {
      toast(error.message);
    },
  });

  const form = useForm<RegisterInput>({
    ...formOpts,
    onSubmit: signupMutation.mutateAsync,
  });

  return {
    registerForm: form,
    signupMutation,
  };
};
