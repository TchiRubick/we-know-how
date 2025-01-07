import { getScopedI18n } from "@/packages/locales/server";

const FeaturesPage = async () => {
  const t = await getScopedI18n("features");

  return <h1 className="text-4xl font-bold">{t("title")}</h1>;
};

export default FeaturesPage;
