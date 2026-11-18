import { t } from "../i18n";
import type { Lang } from "../progress";
import { Otto } from "./Otto";
import { SpeechBubble } from "./SpeechBubble";

/** Shown while a screen waits for the API. */
export function Loading({ lang }: { lang: Lang }) {
  return (
    <div className="api-status" role="status" aria-live="polite">
      <Otto size={110} mood="think" />
      <p>{t(lang, "loading")}</p>
    </div>
  );
}

/** Shown when the API cannot be reached. Progress is in browser storage, so nothing is lost. */
export function LoadError({ lang, onRetry }: { lang: Lang; onRetry: () => void }) {
  return (
    <div className="api-status" role="alert">
      <Otto size={110} mood="think" />
      <SpeechBubble text={t(lang, "loadError")} lang={lang} />
      <button type="button" className="btn" onClick={onRetry}>
        {t(lang, "loadRetry")}
      </button>
    </div>
  );
}
