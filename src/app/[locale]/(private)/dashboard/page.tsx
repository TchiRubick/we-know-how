import { getScopedI18n } from "@/packages/locales/server";

const DashboardPage = async () => {
  const t = await getScopedI18n("dashboard");

  return <h1 className="text-4xl font-bold">{t("title")}</h1>;
};

export default DashboardPage;
