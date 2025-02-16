"use client";

import { useEffect, useState } from "react";

import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setLocale } from "@/i18n";
import {
  availableLocales,
  COOKIE_NAME,
  DEFAULT_LOCALE,
  LocaleTypes,
} from "@/i18n/request";

export function LanguageSwitcher() {
  const languageCookie: LocaleTypes = Cookies.get(COOKIE_NAME) as LocaleTypes;
  const [selectedLanguage, setSelectedLanguage] =
    useState<LocaleTypes>(DEFAULT_LOCALE);
  const allLanguages = [
    { code: "pt", name: "Português", flag: "🇧🇷" },
    { code: "pt-BR", name: "Português", flag: "🇧🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "en-US", name: "English", flag: "🇺🇸" },
    { code: "es-ES", name: "Español", flag: "🇪🇸" },
    { code: "fr-FR", name: "Français", flag: "🇫🇷" },
    { code: "de-DE", name: "Deutsch", flag: "🇩🇪" },
  ];

  const languages = allLanguages.filter((lang) =>
    availableLocales.includes(lang.code as LocaleTypes)
  );
  const currentLanguage = languages.find(
    (lang) => lang.code === selectedLanguage
  );

  async function handleLanguageChange(language: string) {
    setSelectedLanguage(language as LocaleTypes);
    await setLocale(language as LocaleTypes);
  }

  useEffect(() => {
    if (languageCookie) {
      setSelectedLanguage(languageCookie);
    }
  }, [languageCookie]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-accent hover:text-accent-foreground relative"
        >
          <Languages />
          <span className="absolute -top-1 -right-1 text-xs" style={{ top: "-.25rem", right: "-.25rem" }}>
            {currentLanguage?.flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={selectedLanguage}
          onValueChange={handleLanguageChange}
        >
          {languages.map((lang) => (
            <DropdownMenuRadioItem
              className="flex items-center justify-between cursor-pointer py-2"
              key={lang.code}
              value={lang.code}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
