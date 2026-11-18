import { LessonIcon } from "./appIcons";
import { getLessonTitle, type LessonMeta } from "../lessons";
import { t } from "../i18n";
import type { Lang, Progress } from "../progress";
import { LangSwitch } from "./LangSwitch";
import { Otto } from "./Otto";
import { SpeechBubble } from "./SpeechBubble";

interface Props {
  /** Undefined when the id is not in the curriculum. */
  lesson: LessonMeta | undefined;
  progress: Progress;
  onBack: () => void;
  onLang?: (l: Lang) => void;
}

/** Stand-in until a lesson's content exists. Real lessons replace this per id. */
export function LessonPlaceholder({ lesson, progress, onBack, onLang }: Props) {
  const lang = progress.lang;

  return (
    <main className="screen center">
      <div style={{ alignSelf: "flex-end", marginBottom: "12px" }}>
        {onLang && <LangSwitch lang={lang} onLang={onLang} />}
      </div>
      <h2 className="lesson-title">
        {lesson && <LessonIcon id={lesson.id} size={36} />}{" "}
        {lesson ? getLessonTitle(lesson, lang) : ""}
      </h2>
      <Otto size={170} mood="think" />
      <SpeechBubble text={t(lang, "lessonBuilding")} lang={lang} />
      <button className="btn" type="button" onClick={onBack}>
        {t(lang, "back")}
      </button>
    </main>
  );
}
