import { useScopedI18n } from "@/packages/locales/client";
import { signinAction } from "@/services/user/user.action";
import type { SigninInput } from "@/services/user/user.model";
import { formOptions, useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSigninForm = () => {
  const router = useRouter();

  const t = useScopedI18n("signin");

  const formOpts = formOptions<SigninInput>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const signinMutation = useMutation({
    mutationFn: async ({ value }: { value: SigninInput }) => {
      return signinAction(value);
    },
    onSuccess: () => {
      toast(t("success"));
      router.push("/dashboard");
    },
    onError: (error) => {
      toast(error.message);
    },
  });

  const form = useForm<SigninInput>({
    ...formOpts,
    onSubmit: signinMutation.mutateAsync,
  });

  return {
    signingForm: form,
    signinMutation,
  };
};
