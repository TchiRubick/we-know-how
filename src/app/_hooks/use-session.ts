import getQueryClient from "@/packages/react-query";
import { getSession } from "@/services/session/session.action";
import { signoutAction } from "@/services/user/user.action";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSession = () => {
  const router = useRouter();
  const client = getQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  const signoutMutation = useMutation({
    mutationFn: async () => {
      return signoutAction();
    },
    onSuccess: () => {
      toast("Signed out successfully !");

      client.invalidateQueries({ queryKey: ["session"] });

      router.push("/");
    },
    onError: (error) => {
      toast(error.message);
    },
  });

  return {
    data,
    isLoading: isFetching || signoutMutation.isPending,
    logout: signoutMutation.mutateAsync,
  };
};
