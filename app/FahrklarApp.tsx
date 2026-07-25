"use client";

import { useEffect, useMemo, useState } from "react";
import {
  examQuestions,
  examinerCommands,
  manoeuvres,
  officialFacts,
  scenarios,
  techGroups,
  techQuestions,
  type ExamQuestion,
  type Scenario,
  type ScenarioChoice,
  type TechGroup,
} from "./data";

type View = "home" | "situations" | "technik" | "exam" | "errors";

type Progress = {
  scenarioAttempts: number;
  scenarioCorrect: number;
  completedScenarios: string[];
  wrongScenarios: string[];
  masteredTech: string[];
  dailyChecks: string[];
  examResults: number[];
};

const defaultProgress: Progress = {
  scenarioAttempts: 0,
  scenarioCorrect: 0,
  completedScenarios: [],
  wrongScenarios: [],
  masteredTech: [],
  dailyChecks: [],
  examResults: [],
};

const navItems: { id: View; index: string; label: string }[] = [
  { id: "home", index: "01", label: "Сегодня" },
  { id: "situations", index: "02", label: "Ситуации" },
  { id: "technik", index: "03", label: "Техника" },
  { id: "exam", index: "04", label: "Экзамен" },
  { id: "errors", index: "05", label: "Ошибки" },
];

const dailyTasks = [
  {
    id: "situations",
    time: "15 мин",
    title: "8 дорожных решений",
    text: "Выбери безопасный вариант. Ошибки попадут в повторение.",
  },
  {
    id: "technik",
    time: "10 мин",
    title: "6 карточек Technik",
    text: "Ответь сначала по-немецки, потом открой подсказку.",
  },
  {
    id: "commands",
    time: "5 мин",
    title: "Команды Prüfer",
    text: "Прослушай вслух и проговори действие.",
  },
];

function unique(items: string[]) {
  return Array.from(new Set(items));
}

function speakGerman(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.88;
  window.speechSynthesis.speak(utterance);
}

function SpeakerButton({
  text,
  compact = false,
}: {
  text: string;
  compact?: boolean;
}) {
  return (
    <button
      className={compact ? "speaker-button compact" : "speaker-button"}
      type="button"
      onClick={() => speakGerman(text)}
      aria-label={`Прослушать по-немецки: ${text}`}
    >
      <span aria-hidden="true">▶</span>
      {compact ? null : "слушать DE"}
    </button>
  );
}

function Brand() {
  return (
    <div className="brand" aria-label="Fahrklar">
      <span className="brand-mark">F</span>
      <span>
        <strong>FAHRKLAR</strong>
        <small>Klasse B · Deutschland</small>
      </span>
    </div>
  );
}

function ProgressRing({ value }: { value: number }) {
  const bounded = Math.max(0, Math.min(100, value));
  return (
    <div
      className="progress-ring"
      style={{ "--progress": `${bounded * 3.6}deg` } as React.CSSProperties}
      aria-label={`Общий прогресс ${bounded}%`}
    >
      <div>
        <strong>{bounded}%</strong>
        <span>готово</span>
      </div>
    </div>
  );
}

function HomeView({
  daysLeft,
  progress,
  progressPercent,
  onNavigate,
  onToggleTask,
}: {
  daysLeft: number;
  progress: Progress;
  progressPercent: number;
  onNavigate: (view: View) => void;
  onToggleTask: (id: string) => void;
}) {
  const todayDone = dailyTasks.filter((task) =>
    progress.dailyChecks.includes(task.id),
  ).length;

  return (
    <div className="view home-view">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">PRAKTISCHE FAHRPRÜFUNG · 07.08.2026</p>
          <h1>
            Не угадывай.
            <br />
            <span>Види риск раньше.</span>
          </h1>
          <p className="hero-lead">
            Тренажёр решений для Klasse B: немецкие команды, техническая
            подготовка, манёвры и ситуации, где один неверный взгляд решает
            экзамен.
          </p>
          <div className="hero-actions">
            <button
              className="primary-button"
              type="button"
              onClick={() => onNavigate("situations")}
            >
              Начать тренировку
              <span aria-hidden="true">→</span>
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={() => onNavigate("exam")}
            >
              Пробный экзамен
            </button>
          </div>
        </div>

        <div className="exam-date-card">
          <div className="date-topline">
            <span>DEIN TERMIN</span>
            <span>BERLIN TIME</span>
          </div>
          <div className="date-display">
            <strong>07</strong>
            <span>/</span>
            <strong>08</strong>
          </div>
          <div className="countdown-line">
            <span className="pulse-dot" />
            {daysLeft > 0
              ? `${daysLeft} дней до экзамена`
              : daysLeft === 0
                ? "Экзамен сегодня"
                : "Дата экзамена прошла"}
          </div>
          <div className="date-progress">
            <ProgressRing value={progressPercent} />
            <div>
              <strong>
                {progress.completedScenarios.length}/{scenarios.length}
              </strong>
              <span>ситуаций закрыто</span>
              <strong>
                {progress.masteredTech.length}/{techQuestions.length}
              </strong>
              <span>техвопросов выучено</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block daily-block">
        <div className="section-heading">
          <div>
            <p className="section-kicker">ПЛАН НА СЕГОДНЯ</p>
            <h2>30 минут без перегруза</h2>
          </div>
          <span className="completion-pill">
            {todayDone}/{dailyTasks.length} выполнено
          </span>
        </div>

        <div className="daily-grid">
          {dailyTasks.map((task, index) => {
            const checked = progress.dailyChecks.includes(task.id);
            return (
              <article
                className={`daily-card ${checked ? "done" : ""}`}
                key={task.id}
              >
                <button
                  className="task-check"
                  type="button"
                  aria-label={
                    checked
                      ? `Снять отметку: ${task.title}`
                      : `Отметить выполненным: ${task.title}`
                  }
                  onClick={() => onToggleTask(task.id)}
                >
                  {checked ? "✓" : String(index + 1).padStart(2, "0")}
                </button>
                <span className="task-time">{task.time}</span>
                <h3>{task.title}</h3>
                <p>{task.text}</p>
                <button
                  className="text-button"
                  type="button"
                  onClick={() =>
                    task.id === "situations"
                      ? onNavigate("situations")
                      : task.id === "technik"
                        ? onNavigate("technik")
                        : document
                            .getElementById("commands")
                            ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Открыть <span aria-hidden="true">↗</span>
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-block facts-block">
        <div className="section-heading">
          <div>
            <p className="section-kicker">ПОДТВЕРЖДЁННЫЙ ФОРМАТ</p>
            <h2>Что реально ждёт Klasse B</h2>
          </div>
          <p className="heading-note">
            По действующей FeV. Реформа заявлена на 2027 год — твой экзамен она
            не меняет.
          </p>
        </div>
        <div className="facts-grid">
          {officialFacts.map((fact) => (
            <article key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </article>
          ))}
        </div>
        <div className="exam-route">
          <div>
            <span>01</span>
            <strong>Vorbereitung</strong>
            <small>Сиденье, зеркала, ремень, техника</small>
          </div>
          <i aria-hidden="true" />
          <div>
            <span>02</span>
            <strong>Prüfungsfahrt</strong>
            <small>Город, вне города, по возможности Autobahn</small>
          </div>
          <i aria-hidden="true" />
          <div>
            <span>03</span>
            <strong>Grundfahraufgaben</strong>
            <small>Три манёвра из обязательных групп</small>
          </div>
          <i aria-hidden="true" />
          <div>
            <span>04</span>
            <strong>Protokoll</strong>
            <small>Результат, сильные стороны, ошибки</small>
          </div>
        </div>
      </section>

      <section className="section-block command-block" id="commands">
        <div className="section-heading">
          <div>
            <p className="section-kicker">DEUTSCH IM AUTO</p>
            <h2>Команды, которые нельзя переводить в голове</h2>
          </div>
          <p className="heading-note">
            Практический экзамен проходит на немецком. Нажми ▶, повтори вслух,
            назови цепочку действий.
          </p>
        </div>
        <div className="command-list">
          {examinerCommands.map((command, index) => (
            <article className="command-row" key={command.de}>
              <span className="command-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <strong>{command.de}</strong>
                <p>{command.ru}</p>
              </div>
              <small>{command.action}</small>
              <SpeakerButton text={command.de} compact />
            </article>
          ))}
        </div>
      </section>

      <section className="section-block manoeuvre-block">
        <div className="section-heading">
          <div>
            <p className="section-kicker">GRUNDFAHRAUFGABEN</p>
            <h2>Пять манёвров. Проверят три.</h2>
          </div>
          <p className="heading-note">
            Один: Rechts rückwärts или Längsparken. Ещё два: Umkehren,
            Quer/Schrägparken или Gefahrbremsung.
          </p>
        </div>
        <div className="manoeuvre-grid">
          {manoeuvres.map((manoeuvre, index) => (
            <details className="manoeuvre-card" key={manoeuvre.title}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{manoeuvre.title}</strong>
                  <small>{manoeuvre.subtitle}</small>
                </div>
                <b aria-hidden="true">+</b>
              </summary>
              <ol>
                {manoeuvre.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </details>
          ))}
        </div>
      </section>

      <section className="section-block rule-block">
        <p className="section-kicker">ОДНА РУТИНА НА ВЕСЬ ЭКЗАМЕН</p>
        <div className="rule-line">
          <span>Spiegel</span>
          <i>→</i>
          <span>Blinker</span>
          <i>→</i>
          <span>Schulterblick</span>
          <i>→</i>
          <span>Handlung</span>
        </div>
        <p>
          Зеркало → поворотник → слепая зона → действие. Не механический жест:
          Prüfer должен увидеть, что ты действительно собрал информацию.
        </p>
      </section>
    </div>
  );
}

function ScenarioPair({
  scenario,
  chosen,
  onChoose,
  disabled = false,
}: {
  scenario: Scenario;
  chosen: ScenarioChoice | null;
  onChoose: (choice: ScenarioChoice) => void;
  disabled?: boolean;
}) {
  return (
    <div className="scenario-pair">
      {scenario.order.map((choice, index) => {
        const isCorrect = chosen !== null && choice === "safe";
        const isWrong = chosen === choice && choice === "unsafe";
        const dimmed = chosen !== null && chosen !== choice && !isCorrect;
        const image =
          choice === "safe" ? scenario.safeImage : scenario.unsafeImage;

        return (
          <button
            className={[
              "scenario-choice",
              chosen === choice ? "selected" : "",
              isCorrect ? "correct" : "",
              isWrong ? "wrong" : "",
              dimmed ? "dimmed" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            type="button"
            key={choice}
            onClick={() => onChoose(choice)}
            disabled={disabled || chosen !== null}
            aria-label={`Вариант ${index === 0 ? "A" : "B"}`}
          >
            <img
              src={image}
              alt={`${scenario.titleRu}, вариант ${index === 0 ? "A" : "B"}`}
              width="680"
              height="766"
            />
            <span className="choice-label">{index === 0 ? "A" : "B"}</span>
            {chosen !== null && choice === "safe" ? (
              <span className="choice-result">правильно</span>
            ) : null}
            {isWrong ? (
              <span className="choice-result">опасная ошибка</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function ScenarioTrainer({
  onRecord,
  completed,
}: {
  onRecord: (id: string, correct: boolean) => void;
  completed: string[];
}) {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<ScenarioChoice | null>(null);
  const scenario = scenarios[index];

  const choose = (choice: ScenarioChoice) => {
    if (chosen !== null) return;
    setChosen(choice);
    onRecord(scenario.id, choice === "safe");
  };

  const next = () => {
    setIndex((current) => (current + 1) % scenarios.length);
    setChosen(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="view trainer-view">
      <header className="trainer-header">
        <div>
          <p className="eyebrow">SITUATIONSTRAINER · KLASSE B</p>
          <h1>Сначала увидь. Потом действуй.</h1>
          <p>
            Выбери безопасное решение. На реальном экзамене важен не ответ, а
            своевременное наблюдение и понятное действие.
          </p>
        </div>
        <div className="trainer-counter">
          <strong>{String(index + 1).padStart(2, "0")}</strong>
          <span>/ {String(scenarios.length).padStart(2, "0")}</span>
        </div>
      </header>

      <div className="scenario-progress" aria-hidden="true">
        {scenarios.map((item, itemIndex) => (
          <span
            key={item.id}
            className={[
              itemIndex === index ? "active" : "",
              completed.includes(item.id) ? "complete" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        ))}
      </div>

      <section className="scenario-stage">
        <div className="scenario-question">
          <div>
            <span className="category-chip">{scenario.category}</span>
            <span
              className={`severity-chip ${scenario.severity}`}
            >{`${scenario.severity === "kritisch" ? "критично" : "важно"}`}</span>
          </div>
          <h2>{scenario.questionDe}</h2>
          <p>{scenario.questionRu}</p>
          <SpeakerButton text={scenario.questionDe} />
        </div>

        <ScenarioPair
          scenario={scenario}
          chosen={chosen}
          onChoose={choose}
        />

        {chosen === null ? (
          <p className="choice-hint">
            Нажми на картинку. A/B на клавиатуре не нужны — тренируй взгляд.
          </p>
        ) : (
          <div
            className={`answer-panel ${chosen === "safe" ? "success" : "failure"}`}
            role="status"
          >
            <div className="answer-status">
              <span>{chosen === "safe" ? "✓" : "!"}</span>
              <div>
                <small>
                  {chosen === "safe"
                    ? "ПРАВИЛЬНОЕ РЕШЕНИЕ"
                    : "ЭКЗАМЕНАЦИОННЫЙ РИСК"}
                </small>
                <strong>{scenario.titleDe}</strong>
              </div>
            </div>
            <div className="answer-copy">
              <p>{scenario.answerDe}</p>
              <p>{scenario.answerRu}</p>
              <div>
                <span>{scenario.focus}</span>
                <span>{scenario.rule}</span>
              </div>
            </div>
            <button className="primary-button" type="button" onClick={next}>
              Следующая ситуация <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </section>

      <section className="trainer-principle">
        <span>MERKSATZ</span>
        <strong>
          Видимость плохая = скорость настолько малая, чтобы остановиться в
          видимой зоне.
        </strong>
        <p>
          Prüfer оценивает Verkehrsbeobachtung, Kommunikation, Abstand,
          Geschwindigkeit и Fahrzeugpositionierung.
        </p>
      </section>
    </div>
  );
}

function TechTrainer({
  mastered,
  onToggleMastered,
}: {
  mastered: string[];
  onToggleMastered: (id: string) => void;
}) {
  const [group, setGroup] = useState<TechGroup | "Alle">("Alle");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return techQuestions.filter((question) => {
      const inGroup = group === "Alle" || question.group === group;
      const haystack =
        `${question.questionDe} ${question.questionRu} ${question.label}`.toLowerCase();
      return inGroup && (!normalized || haystack.includes(normalized));
    });
  }, [group, query]);

  return (
    <div className="view tech-view">
      <header className="trainer-header tech-header">
        <div>
          <p className="eyebrow">FAHRZEUGTECHNIK · NICHT AMTLICHER LERNKATALOG</p>
          <h1>Покажи. Объясни. Не заучивай вслепую.</h1>
          <p>
            Prüfer может проверить технические знания и подготовку автомобиля.
            Точное управление зависит от учебной машины — повтори всё в ней с
            Fahrlehrer.
          </p>
        </div>
        <div className="tech-total">
          <strong>{mastered.length}</strong>
          <span>из {techQuestions.length} знаю</span>
        </div>
      </header>

      <section className="tech-toolbar">
        <div className="filter-row" aria-label="Фильтр категорий">
          {(["Alle", ...techGroups] as const).map((item) => (
            <button
              type="button"
              className={group === item ? "active" : ""}
              key={item}
              onClick={() => setGroup(item)}
            >
              {item === "Alle" ? "Все" : item}
            </button>
          ))}
        </div>
        <label className="search-field">
          <span aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Найти: масло, ABS, Licht…"
            type="search"
          />
        </label>
      </section>

      <div className="tech-summary">
        <span>Показано: {filtered.length}</span>
        <span>
          Ответ: сначала 1 фраза DE, потом показать действие на машине
        </span>
      </div>

      <section className="tech-grid">
        {filtered.map((question, index) => {
          const isOpen = openId === question.id;
          const isMastered = mastered.includes(question.id);
          return (
            <article
              className={`tech-card ${isOpen ? "open" : ""} ${isMastered ? "mastered" : ""}`}
              key={question.id}
            >
              <div className="tech-card-top">
                <span>{question.group}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="tech-label">{question.label}</div>
              <h2>{question.questionDe}</h2>
              <p className="tech-translation">{question.questionRu}</p>
              <div className="tech-card-actions">
                <SpeakerButton text={question.questionDe} compact />
                <button
                  className="reveal-button"
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : question.id)}
                  aria-expanded={isOpen}
                >
                  {isOpen ? "Скрыть" : "Показать ответ"}
                </button>
              </div>
              {isOpen ? (
                <div className="tech-answer">
                  <span>ANTWORT</span>
                  <p>{question.answerDe}</p>
                  <p>{question.answerRu}</p>
                  {question.tip ? <small>{question.tip}</small> : null}
                  <button
                    type="button"
                    className={isMastered ? "mastered-button active" : "mastered-button"}
                    onClick={() => onToggleMastered(question.id)}
                  >
                    {isMastered ? "✓ Знаю" : "Отметить: знаю"}
                  </button>
                </div>
              ) : null}
            </article>
          );
        })}
      </section>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <strong>Ничего не найдено</strong>
          <p>Измени запрос или выбери другую категорию.</p>
        </div>
      ) : null}
    </div>
  );
}

function ExamMode({ onComplete }: { onComplete: (score: number) => void }) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [remaining, setRemaining] = useState(12 * 60);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const question: ExamQuestion | undefined = examQuestions[index];

  const finish = (result: number) => {
    if (finalScore !== null) return;
    setFinalScore(result);
    onComplete(result);
  };

  useEffect(() => {
    if (!started || finalScore !== null) return;
    const timer = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          finish(score);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
    // score belongs here: timeout must save current result.
  }, [started, finalScore, score]);

  const start = () => {
    setStarted(true);
    setIndex(0);
    setScore(0);
    setRemaining(12 * 60);
    setFinalScore(null);
  };

  const submit = (correct: boolean) => {
    if (finalScore !== null) return;
    const nextScore = score + (correct ? 1 : 0);
    setScore(nextScore);
    if (index >= examQuestions.length - 1) {
      finish(nextScore);
    } else {
      setIndex((current) => current + 1);
    }
  };

  if (!started) {
    return (
      <div className="view exam-view">
        <section className="exam-intro">
          <p className="eyebrow">PRÜFUNGSMODUS · 12 AUFGABEN</p>
          <h1>12 минут. Без подсказок.</h1>
          <p>
            Четыре визуальные ситуации, техника, команды Prüfer и критические
            правила. Цель подготовки — минимум 10 из 12.
          </p>
          <div className="exam-intro-grid">
            <div>
              <strong>12:00</strong>
              <span>время</span>
            </div>
            <div>
              <strong>10/12</strong>
              <span>цель</span>
            </div>
            <div>
              <strong>1×</strong>
              <span>без возврата</span>
            </div>
          </div>
          <button className="primary-button large" type="button" onClick={start}>
            Начать пробный экзамен <span aria-hidden="true">→</span>
          </button>
          <small>
            Это учебный ориентир, не официальная система оценки практической
            Fahrprüfung.
          </small>
        </section>
      </div>
    );
  }

  if (finalScore !== null) {
    const strong = finalScore >= 10;
    return (
      <div className="view exam-view">
        <section className={`exam-result ${strong ? "strong" : ""}`}>
          <span className="result-mark">{strong ? "✓" : "↻"}</span>
          <p className="eyebrow">ERGEBNIS</p>
          <h1>
            {finalScore}
            <span>/{examQuestions.length}</span>
          </h1>
          <h2>
            {strong
              ? "Уровень хороший. Закрепи спокойствие."
              : "Пока рано расслабляться. Повтори слабые блоки."}
          </h2>
          <p>
            {strong
              ? "Дальше важнее перенос в реальную машину: Blickführung, скорость и самостоятельные решения."
              : "Пройди дорожные ситуации, выучи красные контрольные лампы и команды Prüfer. Затем повтори симуляцию."}
          </p>
          <button className="primary-button" type="button" onClick={start}>
            Пройти ещё раз <span aria-hidden="true">↻</span>
          </button>
        </section>
      </div>
    );
  }

  if (!question) return null;

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <div className="view exam-view">
      <header className="exam-live-header">
        <Brand />
        <div className="exam-live-progress">
          <span>
            Задание {index + 1}/{examQuestions.length}
          </span>
          <div>
            <i
              style={{
                width: `${((index + 1) / examQuestions.length) * 100}%`,
              }}
            />
          </div>
        </div>
        <time>
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </time>
      </header>

      {question.type === "text" ? (
        <section className="exam-question-card">
          <span className="question-type">WISSEN · ENTSCHEIDUNG</span>
          <h1>{question.questionDe}</h1>
          <p>{question.questionRu}</p>
          <SpeakerButton text={question.questionDe} />
          <div className="exam-options">
            {question.options.map((option, optionIndex) => (
              <button
                type="button"
                key={option}
                onClick={() => submit(optionIndex === question.correct)}
              >
                <span>{String.fromCharCode(65 + optionIndex)}</span>
                {option}
              </button>
            ))}
          </div>
        </section>
      ) : (
        (() => {
          const scenario = scenarios.find(
            (item) => item.id === question.scenarioId,
          );
          if (!scenario) return null;
          return (
            <section className="exam-scene-card">
              <span className="question-type">BILDENTSCHEIDUNG</span>
              <h1>{scenario.questionDe}</h1>
              <p>{scenario.questionRu}</p>
              <ScenarioPair
                scenario={scenario}
                chosen={null}
                onChoose={(choice) => submit(choice === "safe")}
              />
            </section>
          );
        })()
      )}
    </div>
  );
}

function ErrorsView({
  progress,
  onNavigate,
  onReset,
}: {
  progress: Progress;
  onNavigate: (view: View) => void;
  onReset: () => void;
}) {
  const [confirmReset, setConfirmReset] = useState(false);
  const wrong = scenarios.filter((scenario) =>
    progress.wrongScenarios.includes(scenario.id),
  );
  const best = progress.examResults.length
    ? Math.max(...progress.examResults)
    : null;
  const accuracy = progress.scenarioAttempts
    ? Math.round(
        (progress.scenarioCorrect / progress.scenarioAttempts) * 100,
      )
    : 0;

  return (
    <div className="view errors-view">
      <header className="trainer-header">
        <div>
          <p className="eyebrow">FEHLERTRAINING · LOKAL GESPEICHERT</p>
          <h1>Ошибка полезна, если вернуться к ней.</h1>
          <p>
            Здесь остаются ситуации, где был выбран опасный вариант. Прогресс
            хранится только на этом устройстве.
          </p>
        </div>
      </header>

      <section className="stats-strip">
        <article>
          <span>Точность ситуаций</span>
          <strong>{accuracy}%</strong>
        </article>
        <article>
          <span>Закрыто ситуаций</span>
          <strong>
            {progress.completedScenarios.length}/{scenarios.length}
          </strong>
        </article>
        <article>
          <span>Выучено Technik</span>
          <strong>
            {progress.masteredTech.length}/{techQuestions.length}
          </strong>
        </article>
        <article>
          <span>Лучший тест</span>
          <strong>{best === null ? "—" : `${best}/12`}</strong>
        </article>
      </section>

      <section className="mistake-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">НА ПОВТОРЕНИЕ</p>
            <h2>{wrong.length ? `${wrong.length} слабых ситуаций` : "Чисто"}</h2>
          </div>
          {wrong.length ? (
            <button
              className="secondary-button"
              type="button"
              onClick={() => onNavigate("situations")}
            >
              Повторить сейчас
            </button>
          ) : null}
        </div>

        {wrong.length ? (
          <div className="mistake-grid">
            {wrong.map((scenario) => (
              <article key={scenario.id}>
                <img
                  src={scenario.unsafeImage}
                  alt={`Ошибка: ${scenario.titleRu}`}
                  width="680"
                  height="766"
                />
                <div>
                  <span>{scenario.category}</span>
                  <strong>{scenario.titleDe}</strong>
                  <p>{scenario.answerRu}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state positive">
            <span>✓</span>
            <strong>Опасных ответов пока нет</strong>
            <p>Пройди полный блок ситуаций. Здесь появятся только ошибки.</p>
            <button
              className="primary-button"
              type="button"
              onClick={() => onNavigate("situations")}
            >
              Начать
            </button>
          </div>
        )}
      </section>

      <section className="source-section">
        <div>
          <p className="section-kicker">ИСТОЧНИКИ И ГРАНИЦЫ</p>
          <h2>Что подтверждено, что учебное</h2>
        </div>
        <div className="source-grid">
          <article>
            <span>ПОДТВЕРЖДЕНО</span>
            <p>
              Длительность, чистое время езды, группы Grundfahraufgaben и
              правовые правила основаны на действующих FeV, StVO и StVZO.
            </p>
          </article>
          <article>
            <span>УЧЕБНЫЙ МАТЕРИАЛ</span>
            <p>
              Картинки и формулировки созданы для тренировки. Это не официальный
              TÜV/DEKRA-Fragenkatalog и не замена Fahrstunden.
            </p>
          </article>
          <article>
            <span>ЗАВИСИТ ОТ МАШИНЫ</span>
            <p>
              Кнопки, меню, электронный Ölstand и Assistenzsysteme отличаются.
              Повтори всё в конкретном Prüfungsfahrzeug.
            </p>
          </article>
        </div>
        <div className="source-links">
          <a
            href="https://www.gesetze-im-internet.de/fev_2010/anlage_7.html"
            target="_blank"
            rel="noreferrer"
          >
            FeV Anlage 7 ↗
          </a>
          <a
            href="https://www.bmv.de/SharedDocs/DE/Artikel/StV/Strassenverkehr/fahrerlaubnispruefung.html"
            target="_blank"
            rel="noreferrer"
          >
            Bundesministerium für Verkehr ↗
          </a>
          <a
            href="https://www.adac.de/verkehr/rund-um-den-fuehrerschein/erwerb/fuehrerschein-pruefung/"
            target="_blank"
            rel="noreferrer"
          >
            ADAC Prüfungsablauf ↗
          </a>
        </div>
      </section>

      <section className="reset-section">
        <div>
          <strong>Прогресс хранится в браузере</strong>
          <p>
            На телефоне и компьютере будут отдельные результаты. Сам сайт
            работает на обоих устройствах.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (confirmReset) {
              onReset();
              setConfirmReset(false);
            } else {
              setConfirmReset(true);
            }
          }}
        >
          {confirmReset ? "Нажми ещё раз: удалить всё" : "Сбросить прогресс"}
        </button>
      </section>
    </div>
  );
}

export default function FahrklarApp() {
  const [view, setView] = useState<View>("home");
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [loaded, setLoaded] = useState(false);
  const [daysLeft, setDaysLeft] = useState(13);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("fahrklar-progress-v1");
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<Progress>;
        setProgress({ ...defaultProgress, ...parsed });
      }
    } catch {
      setProgress(defaultProgress);
    } finally {
      setLoaded(true);
    }

    const examDate = new Date("2026-08-07T00:00:00+02:00").getTime();
    const difference = examDate - Date.now();
    setDaysLeft(Math.ceil(difference / 86_400_000));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(
      "fahrklar-progress-v1",
      JSON.stringify(progress),
    );
  }, [loaded, progress]);

  const progressPercent = Math.round(
    ((progress.completedScenarios.length + progress.masteredTech.length) /
      (scenarios.length + techQuestions.length)) *
      100,
  );

  const navigate = (next: View) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const recordScenario = (id: string, correct: boolean) => {
    setProgress((current) => ({
      ...current,
      scenarioAttempts: current.scenarioAttempts + 1,
      scenarioCorrect: current.scenarioCorrect + (correct ? 1 : 0),
      completedScenarios: correct
        ? unique([...current.completedScenarios, id])
        : current.completedScenarios,
      wrongScenarios: correct
        ? current.wrongScenarios.filter((item) => item !== id)
        : unique([...current.wrongScenarios, id]),
    }));
  };

  const toggleMastered = (id: string) => {
    setProgress((current) => ({
      ...current,
      masteredTech: current.masteredTech.includes(id)
        ? current.masteredTech.filter((item) => item !== id)
        : unique([...current.masteredTech, id]),
    }));
  };

  const toggleDailyTask = (id: string) => {
    setProgress((current) => ({
      ...current,
      dailyChecks: current.dailyChecks.includes(id)
        ? current.dailyChecks.filter((item) => item !== id)
        : unique([...current.dailyChecks, id]),
    }));
  };

  const recordExam = (score: number) => {
    setProgress((current) => ({
      ...current,
      examResults: [...current.examResults, score].slice(-20),
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    window.localStorage.removeItem("fahrklar-progress-v1");
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <Brand />
        <nav aria-label="Основная навигация">
          {navItems.map((item) => (
            <button
              className={view === item.id ? "active" : ""}
              type="button"
              key={item.id}
              onClick={() => navigate(item.id)}
              data-testid={`nav-${item.id}`}
            >
              <span>{item.index}</span>
              {item.label}
              <i aria-hidden="true" />
            </button>
          ))}
        </nav>
        <div className="sidebar-status">
          <span className="pulse-dot" />
          <div>
            <strong>Экзамен</strong>
            <small>7 августа 2026</small>
          </div>
        </div>
      </aside>

      <div className="content-shell">
        <header className="mobile-header">
          <Brand />
          <button type="button" onClick={() => navigate("exam")}>
            Тест
          </button>
        </header>

        {view === "home" ? (
          <HomeView
            daysLeft={daysLeft}
            progress={progress}
            progressPercent={progressPercent}
            onNavigate={navigate}
            onToggleTask={toggleDailyTask}
          />
        ) : null}
        {view === "situations" ? (
          <ScenarioTrainer
            onRecord={recordScenario}
            completed={progress.completedScenarios}
          />
        ) : null}
        {view === "technik" ? (
          <TechTrainer
            mastered={progress.masteredTech}
            onToggleMastered={toggleMastered}
          />
        ) : null}
        {view === "exam" ? <ExamMode onComplete={recordExam} /> : null}
        {view === "errors" ? (
          <ErrorsView
            progress={progress}
            onNavigate={navigate}
            onReset={resetProgress}
          />
        ) : null}

        <footer className="site-footer">
          <Brand />
          <p>
            Учебный тренажёр Klasse B. Не официальный продукт TÜV, DEKRA или
            ADAC.
          </p>
          <span>Fahr sicher. Nicht nur für die Prüfung.</span>
        </footer>
      </div>

      <nav className="mobile-nav" aria-label="Мобильная навигация">
        {navItems.map((item) => (
          <button
            className={view === item.id ? "active" : ""}
            type="button"
            key={item.id}
            onClick={() => navigate(item.id)}
          >
            <span>{item.index}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </main>
  );
}
