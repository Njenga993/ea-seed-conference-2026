import { useState, useEffect, useRef } from "react";
import "../styles/LanguageTranslator.css";
import type { JSX } from "react";

interface Language {
  code: string;
  label: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "zh-CN", label: "中文", flag: "🇨🇳" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "sw", label: "Kiswahili", flag: "🇰🇪" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
];

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay: boolean },
          containerId: string,
        ) => void;
      };
    };
  }
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function getActiveLanguage(): Language {
  const cookie = getCookie("googtrans");
  if (cookie) {
    const parts = cookie.split("/");
    const code = parts[parts.length - 1];
    return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
  }
  return LANGUAGES[0];
}

export default function LanguageTranslator(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Language>(getActiveLanguage);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Inject Google Translate script + aggressively hide its banner
  useEffect(() => {
    const fixBodyTop = () => {
      document.body.style.top = "0px";
      document.body.style.position = "static";
    };

    if (!document.getElementById("gt-script")) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "gt-hidden-widget",
        );
        setTimeout(fixBodyTop, 100);
      };

      const script = document.createElement("script");
      script.id = "gt-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Watch DOM for the Google banner iframe and remove it on appearance
    const observer = new MutationObserver(() => {
      const banner = document.querySelector<HTMLElement>(
        ".goog-te-banner-frame",
      );
      if (banner) {
        banner.style.display = "none";
        fixBodyTop();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (lang: Language): void => {
    setSelected(lang);
    setOpen(false);

    if (lang.code === "en") {
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
      window.location.reload();
      return;
    }

    const gtSelect =
      document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (gtSelect) {
      gtSelect.value = lang.code;
      gtSelect.dispatchEvent(new Event("change"));
      return;
    }

    document.cookie = `googtrans=/en/${lang.code}; path=/`;
    document.cookie = `googtrans=/en/${lang.code}; path=/; domain=.${window.location.hostname}`;
    window.location.reload();
  };

  return (
    <>
      {/* Hidden Google Translate mount point */}
      <div id="gt-hidden-widget" style={{ display: "none" }} />

      {/* Floating pill button */}
      <div className="lang-floating" ref={dropdownRef}>
        <button
          className="lang-trigger"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Select language"
          title={`Language: ${selected.label}`}
        >
          <span className="lang-flag">{selected.flag}</span>
          <span className="lang-selected-label">{selected.label}</span>
          <svg
            className={`lang-chevron ${open ? "open" : ""}`}
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2 4L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open && (
          <ul className="lang-dropdown" role="listbox">
            {LANGUAGES.map((lang) => (
              <li
                key={lang.code}
                role="option"
                aria-selected={lang.code === selected.code}
                className={`lang-option ${
                  lang.code === selected.code ? "active" : ""
                }`}
                onClick={() => handleSelect(lang)}
              >
                <span className="lang-flag">{lang.flag}</span>
                <span className="lang-option-label">{lang.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
