import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
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
                <span className="text-xl font-semibold">ZanaRoot</span>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Features
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Contact
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
                © {new Date().getFullYear()} Your Company Name. All rights
                reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
