import { getScopedI18n } from "@/packages/locales/server";
import Image from "next/image";
import Link from "next/link";

const HomePage = async () => {
  const t = await getScopedI18n("home");

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              {t("welcome")}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{t("description")}</p>
            <Link
              href="/signin"
              className="bg-primary text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-primary/80 transition-colors"
            >
              {t("start")}
            </Link>
          </div>
          <div className="mt-8 lg:mt-0">
            <Image
              src="/zanaroot.webp"
              alt={t("alt")}
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
