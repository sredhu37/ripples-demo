import { LessonIcon } from "./appIcons";
import { fetchFacts, useApi, type LessonFacts } from "../api";
import { hasLesson } from "../content";
import { t } from "../i18n";
import { getLessonTitle, type LessonMeta } from "../lessons";
import { resolveFactText } from "../lesson/types";
import type { Lang } from "../progress";
import { LoadError, Loading } from "./ApiStatus";
import { LangSwitch } from "./LangSwitch";

interface Props {
  lang: Lang;
  /** Every lesson in order, from the curriculum. */
  lessons: LessonMeta[];
  onLang?: (l: Lang) => void;
  onClose: () => void;
  /** Where the fact cards come from. Tests pass a stub. */
  load?: () => Promise<LessonFacts[]>;
}

/** Parent view: what each lesson claims, with sources in EN, DE, and PL. */
export function FactCards({ lang, lessons, onLang, onClose, load = fetchFacts }: Props) {
  const { result, retry } = useApi(load);
  return (
    <main className="screen">
      <header className="topbar">
        <h1 className="logo">{t(lang, "factCards")}</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {onLang && <LangSwitch lang={lang} onLang={onLang} />}
          <button type="button" className="btn btn-quiet btn-small" onClick={onClose}>
            {t(lang, "back")}
          </button>
        </div>
      </header>
      {result.state === "loading" && <Loading lang={lang} />}
      {result.state === "error" && <LoadError lang={lang} onRetry={retry} />}
      {result.state === "ok" && <Cards lang={lang} lessons={lessons} facts={result.data} />}
    </main>
  );
}

function Cards({
  lang,
  lessons,
  facts,
}: {
  lang: Lang;
  lessons: LessonMeta[];
  facts: LessonFacts[];
}) {
  const byId = new Map(facts.map((f) => [f.lessonId, f]));
  const built = lessons.filter((l) => hasLesson(l.id) && byId.has(l.id));
  if (built.length === 0) return <p>{t(lang, "noLessons")}</p>;
  return (
    <>
      {built.map((meta) => {
        const card = byId.get(meta.id)!;
        return (
          <article key={meta.id} className="panel fact-card">
            <h2>
              <LessonIcon id={meta.id} size={32} /> {getLessonTitle(meta, lang)}
            </h2>
            <h3>{t(lang, "claims")}</h3>
            <ol>
              {card.claims.map((c, i) => (
                <li key={i}>
                  {resolveFactText(c.text, lang)}{" "}
                  <a href={c.source} target="_blank" rel="noreferrer">
                    source
                  </a>
                </li>
              ))}
            </ol>
            <h3>{t(lang, "simplified")}</h3>
            <ul>
              {card.simplified.map((s, i) => (
                <li key={i}>{resolveFactText(s, lang)}</li>
              ))}
            </ul>
          </article>
        );
      })}
    </>
  );
}
