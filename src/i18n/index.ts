
"use server"

import { cookies } from "next/headers";
import { availableLocales, COOKIE_NAME, DEFAULT_LOCALE, LocaleTypes } from "./request";


export async function getLocale() {
  const cookiesIni = await cookies();
  console.log('📢 [request.ts:11]', cookiesIni.get(COOKIE_NAME)?.value);
  return cookiesIni.get(COOKIE_NAME)?.value || DEFAULT_LOCALE;
}

export async function setLocale(locale: LocaleTypes) {
  const cookiesIni = await cookies();
  const finalLocale = availableLocales.includes(locale as LocaleTypes)
    ? locale
    : DEFAULT_LOCALE;
  cookiesIni.set(COOKIE_NAME, finalLocale);
}