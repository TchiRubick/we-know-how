import { getScopedI18n } from "@/packages/locales/server";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const t = await getScopedI18n("common");

  const tTopbar = await getScopedI18n("topbar");

  const tFooter = await getScopedI18n("footer");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/zanaroot.webp"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-xl font-semibold">{t("title")}</span>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                {tTopbar("home")}
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                {tTopbar("contact")}
              </Link>
            </nav>
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>
      {children}
      <footer className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <p className="text-gray-600">
                {tFooter("copyright", { date: new Date().getFullYear() })}
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                {tFooter("privacy")}
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                {tFooter("terms")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
