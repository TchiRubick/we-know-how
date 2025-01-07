import { LoaderCircle } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoaderCircle className="animate-spin-slow h-12 w-12 text-white" />
    </div>
  );
};
