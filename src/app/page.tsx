import LoginPage from "@/app/login/page";
import { LanguageSwitcher } from "@/i18n/language-switcher";
import { Button } from "@/components/ui/button";
import { setLocale } from "@/i18n";

import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations("HomePage");
  async function handleServer() {
    'use server';
    await setLocale('pt');
  }

  async function handleServer2() {
    'use server';
    await setLocale('en');
  }
  return (
    <>
      {/* <h1>{t("title")}</h1> */}
      {/* <select onChange={(e) => setLocale2(e.target.value as LocaleTypes)}>
        <option value="en">en</option>
        <option value="pt">pt</option>
      </select> */}
      {/* <Button onClick={handleServer} type="button">
        Botão PT
      </Button>

      <Button onClick={handleServer2} type="button">
        Botão EN
      </Button> */}
      {/* <LanguageSwitcher /> */}
      <LoginPage />
      {/* <Button asChild>
        <Link href={'/dashboard'}>Vai Pro Dash</Link>
      </Button> */}
    </>
  );
}
