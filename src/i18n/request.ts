import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { getLocale } from ".";

export type LocaleTypes = "en" | "ar" | "pt" | "de" | "fr";
export const availableLocales: LocaleTypes[] = ["en", "ar", "pt", "de", "fr"];
export const COOKIE_NAME = "NEXT_LOCALE";
export const DEFAULT_LOCALE: LocaleTypes = "en";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getLocale()
  type Messages = Record<string, string>;
  try {
    const messages: Messages = (await import(`../../messages/${locale}.json`))
      .default;

    return {
      locale,
      messages,
    };
  } catch (error) {
    // Se houver erro ao carregar as mensagens do locale, usa o locale padrão
    const defaultMessages: Messages = (
      await import(`../../messages/${DEFAULT_LOCALE}.json`)
    ).default;

    return {
      locale: DEFAULT_LOCALE,
      messages: defaultMessages,
    };
  }
});
