import { PrivateSidebar } from "./_components/private-sidebar";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen gap-2">
      <PrivateSidebar>{children}</PrivateSidebar>
    </div>
  );
};

export default PrivateLayout;
