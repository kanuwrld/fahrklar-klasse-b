export type ScenarioChoice = "safe" | "unsafe";

export type Scenario = {
  id: string;
  category: string;
  titleDe: string;
  titleRu: string;
  questionDe: string;
  questionRu: string;
  safeImage: string;
  unsafeImage: string;
  order: ScenarioChoice[];
  focus: string;
  answerDe: string;
  answerRu: string;
  rule: string;
  severity: "kritisch" | "wichtig";
};

export type TechQuestion = {
  id: string;
  group: TechGroup;
  label: string;
  questionDe: string;
  questionRu: string;
  answerDe: string;
  answerRu: string;
  tip?: string;
};

export type TechGroup =
  | "Reifen"
  | "Flüssigkeiten"
  | "Beleuchtung"
  | "Bremsen"
  | "Cockpit"
  | "Sicherheit";

export type ExamTextQuestion = {
  id: string;
  type: "text";
  questionDe: string;
  questionRu: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type ExamSceneQuestion = {
  id: string;
  type: "scene";
  scenarioId: string;
};

export type ExamQuestion = ExamTextQuestion | ExamSceneQuestion;

export const scenarios: Scenario[] = [
  {
    id: "right-before-left",
    category: "Kreuzung",
    titleDe: "Rechts vor links",
    titleRu: "Помеха справа",
    questionDe: "Welches Fahrzeugverhalten ist richtig?",
    questionRu: "Какой вариант показывает правильное действие?",
    safeImage: "/scenarios/right-before-left-safe.webp",
    unsafeImage: "/scenarios/right-before-left-unsafe.webp",
    order: ["safe", "unsafe"],
    focus: "Verkehrsbeobachtung · Geschwindigkeit",
    answerDe:
      "Ohne vorfahrtregelnde Zeichen gilt rechts vor links. Langsam und bremsbereit heranfahren, Sicht herstellen, Fahrzeug von rechts durchlassen.",
    answerRu:
      "Если знаков приоритета нет, действует «помеха справа». Подъезжай медленно, будь готов остановиться, сначала пропусти жёлтую машину.",
    rule: "§ 8 StVO · Vorfahrt",
    severity: "kritisch",
  },
  {
    id: "cyclist-right-turn",
    category: "Abbiegen",
    titleDe: "Radweg beim Abbiegen",
    titleRu: "Велосипедист справа",
    questionDe: "Welche Position schützt den Radfahrer?",
    questionRu: "В каком варианте велосипедист в безопасности?",
    safeImage: "/scenarios/cyclist-right-turn-safe.webp",
    unsafeImage: "/scenarios/cyclist-right-turn-unsafe.webp",
    order: ["unsafe", "safe"],
    focus: "Spiegel · Blinker · Schulterblick",
    answerDe:
      "Vor dem Abbiegen Innenspiegel, Außenspiegel, Blinker und Schulterblick. Geradeaus fahrenden Radverkehr durchlassen. Erst abbiegen, wenn der Radweg frei ist.",
    answerRu:
      "Перед поворотом: внутреннее зеркало, наружное зеркало, поворотник, Schulterblick. Велосипедист едет прямо — его нужно пропустить.",
    rule: "§ 9 StVO · Abbiegen",
    severity: "kritisch",
  },
  {
    id: "bus-stop",
    category: "Haltestelle",
    titleDe: "Bus mit Warnblinklicht",
    titleRu: "Автобус с аварийкой",
    questionDe: "Wie passierst du diese Gefahrenstelle?",
    questionRu: "Как правильно проехать эту опасную зону?",
    safeImage: "/scenarios/bus-stop-safe.webp",
    unsafeImage: "/scenarios/bus-stop-unsafe.webp",
    order: ["safe", "unsafe"],
    focus: "Gefahrenwahrnehmung · Abstand",
    answerDe:
      "Am haltenden Bus mit Warnblinklicht nur mit Schrittgeschwindigkeit und ausreichendem Abstand vorbeifahren. Fahrgäste nicht gefährden; wenn nötig warten.",
    answerRu:
      "Мимо стоящего автобуса с аварийкой — только Schrittgeschwindigkeit, большой боковой интервал. Пассажиров нельзя подвергать риску; при сомнении стой.",
    rule: "§ 20 StVO · Öffentliche Verkehrsmittel",
    severity: "kritisch",
  },
  {
    id: "autobahn-merge",
    category: "Autobahn",
    titleDe: "Einfädeln",
    titleRu: "Въезд на автобан",
    questionDe: "Welche Strategie ist beim Einfädeln richtig?",
    questionRu: "Какая стратегия въезда правильная?",
    safeImage: "/scenarios/autobahn-merge-safe.webp",
    unsafeImage: "/scenarios/autobahn-merge-unsafe.webp",
    order: ["unsafe", "safe"],
    focus: "Beschleunigung · Lücke · Kommunikation",
    answerDe:
      "Beschleunigungsstreifen ausnutzen, Geschwindigkeit anpassen, früh beobachten, blinken und in eine ausreichende Lücke einfädeln. Verkehr auf der durchgehenden Fahrbahn hat Vorrang.",
    answerRu:
      "Используй полосу разгона полностью, сравняй скорость, заранее найди окно, включи поворотник и плавно перестройся. Основной поток имеет преимущество.",
    rule: "§ 18 StVO · Autobahnen",
    severity: "wichtig",
  },
  {
    id: "roundabout-cyclist",
    category: "Kreisverkehr",
    titleDe: "Radverkehr am Kreisverkehr",
    titleRu: "Велодорожка у кольца",
    questionDe: "Welche Position ist vor der Querung richtig?",
    questionRu: "Какая позиция перед пересечением правильная?",
    safeImage: "/scenarios/roundabout-cyclist-safe.webp",
    unsafeImage: "/scenarios/roundabout-cyclist-unsafe.webp",
    order: ["safe", "unsafe"],
    focus: "Vorfahrt · Radverkehr · Blickführung",
    answerDe:
      "Vor der markierten Radverkehrsführung warten und den Radfahrer passieren lassen. Beim Verlassen des Kreisverkehrs rechts blinken und erneut Schulterblick.",
    answerRu:
      "Остановись до велопереезда и пропусти велосипедиста. При выезде с кольца включи правый поворотник и снова сделай Schulterblick.",
    rule: "§§ 8, 9a StVO · Kreisverkehr",
    severity: "kritisch",
  },
  {
    id: "narrow-street",
    category: "Vorbeifahren",
    titleDe: "Hindernis auf deiner Seite",
    titleRu: "Препятствие на твоей стороне",
    questionDe: "Wer muss hier warten?",
    questionRu: "Кто должен подождать?",
    safeImage: "/scenarios/narrow-street-safe.webp",
    unsafeImage: "/scenarios/narrow-street-unsafe.webp",
    order: ["unsafe", "safe"],
    focus: "Abstand · Fahrzeugpositionierung",
    answerDe:
      "Das Hindernis liegt auf deiner Seite. Hinter dem letzten parkenden Fahrzeug warten, Gegenverkehr durchlassen, erst dann mit ausreichendem Seitenabstand vorbeifahren.",
    answerRu:
      "Препятствие находится на твоей стороне. Жди за последней припаркованной машиной, пропусти встречный фургон, затем объезжай с интервалом.",
    rule: "§ 6 StVO · Vorbeifahren",
    severity: "wichtig",
  },
  {
    id: "zebra-crossing",
    category: "Fußgänger",
    titleDe: "Fußgängerüberweg",
    titleRu: "Пешеходный переход",
    questionDe: "Welches Verhalten ist prüfungsreif?",
    questionRu: "Какой вариант соответствует экзамену?",
    safeImage: "/scenarios/zebra-crossing-safe.webp",
    unsafeImage: "/scenarios/zebra-crossing-unsafe.webp",
    order: ["safe", "unsafe"],
    focus: "Bremsbereitschaft · Vorrang",
    answerDe:
      "Mit mäßiger Geschwindigkeit heranfahren und warten, sobald jemand erkennbar queren will. Nicht am Fußgängerüberweg überholen.",
    answerRu:
      "Снизь скорость заранее и остановись, если человек явно хочет перейти. На Fußgängerüberweg обгон запрещён.",
    rule: "§ 26 StVO · Fußgängerüberwege",
    severity: "kritisch",
  },
  {
    id: "railway-crossing",
    category: "Schienenverkehr",
    titleDe: "Bahnübergang freihalten",
    titleRu: "Не занимай переезд",
    questionDe: "Wo muss das Fahrzeug warten?",
    questionRu: "Где машина должна ждать?",
    safeImage: "/scenarios/railway-crossing-safe.webp",
    unsafeImage: "/scenarios/railway-crossing-unsafe.webp",
    order: ["unsafe", "safe"],
    focus: "Vorausschau · Freiraum",
    answerDe:
      "Nur auf den Bahnübergang fahren, wenn du ihn vollständig und ohne Halt räumen kannst. Bei Rückstau vor den Gleisen warten — auch bei offenen Schranken.",
    answerRu:
      "Въезжай только если можешь полностью освободить пути без остановки. При пробке жди до рельсов, даже если шлагбаум открыт.",
    rule: "§ 19 StVO · Bahnübergänge",
    severity: "kritisch",
  },
];

export const techGroups: TechGroup[] = [
  "Reifen",
  "Flüssigkeiten",
  "Beleuchtung",
  "Bremsen",
  "Cockpit",
  "Sicherheit",
];

export const techQuestions: TechQuestion[] = [
  {
    id: "reifen-profil",
    group: "Reifen",
    label: "1,6 mm",
    questionDe: "Wie prüfen Sie die Profiltiefe der Reifen?",
    questionRu: "Как проверить глубину протектора?",
    answerDe:
      "Im Hauptprofil über die gesamte Lauffläche prüfen. Gesetzliches Minimum: 1,6 mm. Messlehre oder Verschleißanzeiger verwenden.",
    answerRu:
      "Проверить основную часть протектора по всей окружности. Законный минимум — 1,6 мм. Использовать измеритель или индикатор TWI.",
    tip: "Рекомендация ADAC выше закона: лето 3 мм, зима 4 мм.",
  },
  {
    id: "reifen-druck",
    group: "Reifen",
    label: "Luftdruck",
    questionDe: "Wo finden Sie den richtigen Reifendruck?",
    questionRu: "Где найти правильное давление в шинах?",
    answerDe:
      "Herstellerangabe: Tankklappe, Türrahmen/B-Säule oder Betriebsanleitung. Kalt messen und an Beladung anpassen.",
    answerRu:
      "В лючке бака, на стойке двери или в инструкции. Проверять на холодных шинах, учитывать загрузку.",
  },
  {
    id: "reifen-schaden",
    group: "Reifen",
    label: "Schäden",
    questionDe: "Welche Reifenschäden kontrollieren Sie?",
    questionRu: "Какие повреждения шин нужно искать?",
    answerDe:
      "Risse, Beulen, Schnitte, Fremdkörper, einseitigen Abrieb und sichtbare Gewebeschäden. Auch Ventile und Felgen ansehen.",
    answerRu:
      "Трещины, грыжи, порезы, посторонние предметы, неравномерный износ, повреждение корда. Проверить вентили и диски.",
  },
  {
    id: "reifen-dot",
    group: "Reifen",
    label: "DOT",
    questionDe: "Was bedeutet die DOT-Nummer?",
    questionRu: "Что означает номер DOT?",
    answerDe:
      "Die letzten vier Ziffern zeigen Produktionswoche und -jahr, zum Beispiel 2325 = Kalenderwoche 23 im Jahr 2025.",
    answerRu:
      "Последние четыре цифры — неделя и год выпуска. Например, 2325: 23-я неделя 2025 года.",
    tip: "Общего законного максимального возраста нет; состояние важнее.",
  },
  {
    id: "reifen-winter",
    group: "Reifen",
    label: "Alpine",
    questionDe: "Woran erkennen Sie zulässige Winterreifen?",
    questionRu: "Как узнать разрешённые зимние шины?",
    answerDe:
      "Am Alpine-Symbol: Berg mit Schneeflocke. In Deutschland gilt eine situative Winterreifenpflicht bei Glätte, Schnee, Schneematsch, Eis oder Reifglätte.",
    answerRu:
      "По Alpine-Symbol: гора со снежинкой. Обязанность ситуативная — при гололёде, снеге, снежной каше и изморози.",
    tip: "Одной маркировки M+S с октября 2024 недостаточно.",
  },
  {
    id: "reifen-laufrichtung",
    group: "Reifen",
    label: "Montage",
    questionDe: "Was prüfen Sie bei laufrichtungsgebundenen Reifen?",
    questionRu: "Что проверить у направленных шин?",
    answerDe:
      "Der Pfeil „Rotation“ auf der Reifenflanke muss in Fahrtrichtung zeigen. Reifengröße und Geschwindigkeitsindex müssen passen.",
    answerRu:
      "Стрелка Rotation на боковине должна смотреть по направлению движения. Размер и индекс скорости должны подходить автомобилю.",
  },
  {
    id: "oelstand",
    group: "Flüssigkeiten",
    label: "Motoröl",
    questionDe: "Wie kontrollieren Sie den Motorölstand?",
    questionRu: "Как проверить уровень моторного масла?",
    answerDe:
      "Fahrzeug waagerecht, Motor aus, kurz warten. Messstab ziehen, reinigen, einstecken, erneut ziehen: Stand zwischen Min und Max. Bei elektronischer Messung Bordmenü nutzen.",
    answerRu:
      "Машина стоит ровно, двигатель выключен, немного подождать. Щуп вынуть, вытереть, вставить, снова вынуть: уровень между Min и Max. Электронный уровень — через меню.",
  },
  {
    id: "kuehlmittel",
    group: "Flüssigkeiten",
    label: "Kühlmittel",
    questionDe: "Wie kontrollieren Sie das Kühlmittel?",
    questionRu: "Как проверить охлаждающую жидкость?",
    answerDe:
      "Nur bei kaltem Motor am Ausgleichsbehälter: Stand zwischen Min und Max. Heißen Behälter niemals öffnen — Verbrühungsgefahr.",
    answerRu:
      "Только на холодном двигателе: уровень в расширительном бачке между Min и Max. Горячую крышку не открывать — риск ожога.",
  },
  {
    id: "bremsfluessigkeit",
    group: "Flüssigkeiten",
    label: "Bremsflüssigkeit",
    questionDe: "Wie kontrollieren Sie die Bremsflüssigkeit?",
    questionRu: "Как проверить тормозную жидкость?",
    answerDe:
      "Am transparenten Vorratsbehälter zwischen Min und Max. Bei zu niedrigem Stand nicht einfach weiterfahren oder nur nachfüllen: Ursache in einer Werkstatt prüfen lassen.",
    answerRu:
      "В прозрачном бачке уровень должен быть между Min и Max. При низком уровне не доливать вслепую: проверить причину в сервисе.",
  },
  {
    id: "waschwasser",
    group: "Flüssigkeiten",
    label: "Waschwasser",
    questionDe: "Was gehört in die Scheibenwaschanlage?",
    questionRu: "Что заливать в омыватель?",
    answerDe:
      "Geeignetes Scheibenreinigungsmittel mit Wasser, im Winter ausreichender Frostschutz. Füllstand am Behälter oder über Warnanzeige prüfen.",
    answerRu:
      "Подходящую жидкость для стекла; зимой — с достаточной защитой от замерзания. Проверить бачок или предупреждение панели.",
  },
  {
    id: "adblue",
    group: "Flüssigkeiten",
    label: "AdBlue",
    questionDe: "Was beachten Sie bei AdBlue?",
    questionRu: "Что важно знать про AdBlue?",
    answerDe:
      "Nur bei Dieselfahrzeugen mit SCR-System. Restreichweite im Bordcomputer beachten und ausschließlich in den gekennzeichneten AdBlue-Tank füllen.",
    answerRu:
      "Только для дизелей с SCR. Следить за запасом в бортовом компьютере и заливать строго в отдельную горловину AdBlue.",
  },
  {
    id: "leckage",
    group: "Flüssigkeiten",
    label: "Leck",
    questionDe: "Was tun Sie bei einer Flüssigkeitspfütze unter dem Fahrzeug?",
    questionRu: "Что делать при луже под машиной?",
    answerDe:
      "Ursache prüfen. Bei Öl, Kraftstoff, Kühl- oder Bremsflüssigkeit nicht weiterfahren, wenn Betriebssicherheit unklar ist. Werkstatt oder Pannendienst.",
    answerRu:
      "Определить жидкость. При масле, топливе, антифризе или тормозной жидкости не ехать, если безопасность неясна. Сервис или помощь.",
  },
  {
    id: "abblendlicht",
    group: "Beleuchtung",
    label: "Abblendlicht",
    questionDe: "Wie prüfen Sie das Abblendlicht?",
    questionRu: "Как проверить ближний свет?",
    answerDe:
      "Zündung/Licht einschalten, Kontrollsymbol prüfen, Rundgang machen: beide Scheinwerfer müssen funktionieren. Einstellung nicht blenden lassen.",
    answerRu:
      "Включить зажигание и свет, проверить индикатор, обойти машину: обе фары должны работать и не слепить.",
  },
  {
    id: "fernlicht",
    group: "Beleuchtung",
    label: "Fernlicht",
    questionDe: "Wann dürfen Sie Fernlicht benutzen?",
    questionRu: "Когда можно использовать дальний свет?",
    answerDe:
      "Auf unbeleuchteten Straßen, wenn niemand geblendet wird. Bei Gegenverkehr, vorausfahrenden Fahrzeugen oder ausreichender Beleuchtung rechtzeitig abblenden.",
    answerRu:
      "На неосвещённой дороге, если никого не ослепляешь. При встречных, впереди идущих машинах или хорошем освещении переключить на ближний.",
  },
  {
    id: "standlicht",
    group: "Beleuchtung",
    label: "Standlicht",
    questionDe: "Darf man nur mit Standlicht fahren?",
    questionRu: "Можно ли ехать только с габаритами?",
    answerDe:
      "Nein. Standlicht dient dem Kenntlichmachen eines stehenden Fahrzeugs. Bei Fahrt und erforderlicher Beleuchtung Abblendlicht verwenden.",
    answerRu:
      "Нет. Standlicht обозначает стоящий автомобиль. В движении при необходимости света используй ближний.",
  },
  {
    id: "nebelschluss",
    group: "Beleuchtung",
    label: "Nebelschlussleuchte",
    questionDe: "Wann darf die Nebelschlussleuchte eingeschaltet werden?",
    questionRu: "Когда можно включить заднюю противотуманную фару?",
    answerDe:
      "Nur bei Nebel und Sichtweite unter 50 m. Dann höchstens 50 km/h fahren. Ausschalten, sobald die Voraussetzung entfällt.",
    answerRu:
      "Только при тумане и видимости менее 50 м. Тогда скорость максимум 50 км/ч. После улучшения видимости выключить.",
  },
  {
    id: "warnblinker",
    group: "Beleuchtung",
    label: "Warnblinker",
    questionDe: "Wann benutzen Sie die Warnblinkanlage?",
    questionRu: "Когда включать аварийку?",
    answerDe:
      "Zum Warnen vor einer Gefahr, bei Panne/Abschleppen und am Stauende. Sie gibt kein Recht, falsch zu halten oder Vorfahrt zu beanspruchen.",
    answerRu:
      "Для предупреждения об опасности, при поломке/буксировке и в конце пробки. Аварийка не разрешает неправильную остановку и не даёт приоритет.",
  },
  {
    id: "bremslicht",
    group: "Beleuchtung",
    label: "Bremslicht",
    questionDe: "Wie prüfen Sie die Bremsleuchten allein?",
    questionRu: "Как одному проверить стоп-сигналы?",
    answerDe:
      "Rückwärts vor eine helle Wand oder Schaufenster fahren und Bremse betätigen; Spiegelung beobachten. Alternativ zweite Person bitten.",
    answerRu:
      "Встать задом перед светлой стеной или витриной, нажать тормоз и увидеть отражение. Либо попросить помощника.",
  },
  {
    id: "blinker",
    group: "Beleuchtung",
    label: "Blinker",
    questionDe: "Wie erkennen Sie einen defekten Blinker?",
    questionRu: "Как заметить неисправный поворотник?",
    answerDe:
      "Häufig durch deutlich schnellere Blinkfrequenz und Kontrollanzeige. Funktion außen per Rundgang kontrollieren.",
    answerRu:
      "Часто по заметно ускоренному миганию индикатора. Затем проверить лампы снаружи обходом машины.",
  },
  {
    id: "licht-rundgang",
    group: "Beleuchtung",
    label: "Rundgang",
    questionDe: "Welche Leuchten prüfen Sie beim Rundgang?",
    questionRu: "Какие фонари проверить обходом?",
    answerDe:
      "Stand-, Abblend- und Fernlicht, Blinker, Warnblinker, Schluss-, Brems- und Rückfahrlicht, Nebelschluss- und Kennzeichenleuchte.",
    answerRu:
      "Габариты, ближний, дальний, поворотники, аварийку, задние фонари, стопы, задний ход, противотуманную и подсветку номера.",
  },
  {
    id: "betriebsbremse",
    group: "Bremsen",
    label: "Fußbremse",
    questionDe: "Wie prüfen Sie die Betriebsbremse?",
    questionRu: "Как проверить рабочий тормоз?",
    answerDe:
      "Pedal darf nicht bis zum Boden sinken und muss festen Widerstand haben. Bei langsamer Probefahrt muss das Fahrzeug gleichmäßig, spurstabil und ohne Geräusche bremsen.",
    answerRu:
      "Педаль не должна проваливаться и должна иметь упругое сопротивление. На малой скорости машина тормозит ровно, без увода и посторонних звуков.",
  },
  {
    id: "feststellbremse",
    group: "Bremsen",
    label: "Parkbremse",
    questionDe: "Wie prüfen Sie die Feststellbremse?",
    questionRu: "Как проверить стояночный тормоз?",
    answerDe:
      "Anziehen bzw. aktivieren, Kontrollleuchte prüfen. Das Fahrzeug muss im Stand sicher gehalten werden; vorsichtige Anfahrprobe nur nach Fahrzeuganleitung.",
    answerRu:
      "Включить, проверить индикатор. Машина должна надёжно удерживаться; пробу на трогание делать осторожно и по инструкции автомобиля.",
  },
  {
    id: "bremskraftverstaerker",
    group: "Bremsen",
    label: "Verstärker",
    questionDe: "Wie prüfen Sie den Bremskraftverstärker?",
    questionRu: "Как проверить усилитель тормозов?",
    answerDe:
      "Motor aus, Bremspedal mehrmals drücken, bis es hart wird. Pedal gedrückt halten und Motor starten: Pedal muss leicht nachgeben.",
    answerRu:
      "На заглушённом двигателе несколько раз нажать педаль до твёрдости. Удерживать и запустить двигатель: педаль должна немного уйти вниз.",
  },
  {
    id: "abs",
    group: "Bremsen",
    label: "ABS",
    questionDe: "Was bedeutet eine dauerhaft leuchtende ABS-Kontrollleuchte?",
    questionRu: "Что значит постоянно горящий ABS?",
    answerDe:
      "Störung im Antiblockiersystem. Normale Bremswirkung kann vorhanden sein, ABS-Regelung aber nicht. Fehler unverzüglich prüfen lassen.",
    answerRu:
      "Неисправность антиблокировочной системы. Обычные тормоза могут работать, но ABS — нет. Ошибку нужно проверить.",
  },
  {
    id: "gefahrenbremsung",
    group: "Bremsen",
    label: "Gefahrbremsung",
    questionDe: "Wie führen Sie eine Gefahrbremsung durch?",
    questionRu: "Как выполнить экстренное торможение?",
    answerDe:
      "Auf Kommando sofort maximal bremsen; beim Schaltwagen gleichzeitig Kupplung treten. Lenkrad festhalten, Blick nach vorn, bis zum Stillstand bremsen.",
    answerRu:
      "По команде сразу максимально нажать тормоз; на механике одновременно сцепление. Руль держать, смотреть вперёд, тормозить до полной остановки.",
  },
  {
    id: "lenkung",
    group: "Bremsen",
    label: "Lenkung",
    questionDe: "Wie prüfen Sie die Lenkung?",
    questionRu: "Как проверить рулевое управление?",
    answerDe:
      "Lenkrad darf kein ungewöhnliches Spiel haben. Bei langsamer Fahrt muss das Fahrzeug präzise reagieren, ohne Geräusche oder einseitiges Ziehen.",
    answerRu:
      "Не должно быть необычного люфта. На малой скорости автомобиль реагирует точно, без стуков и увода.",
  },
  {
    id: "servolenkung",
    group: "Bremsen",
    label: "Servolenkung",
    questionDe: "Wie bemerken Sie einen Ausfall der Servolenkung?",
    questionRu: "Как понять, что усилитель руля отказал?",
    answerDe:
      "Warnleuchte und deutlich höhere Lenkkraft. Sicher anhalten, Betriebsanleitung beachten und Störung prüfen lassen.",
    answerRu:
      "Загорится индикатор, руль станет заметно тяжелее. Безопасно остановиться, посмотреть инструкцию, проверить неисправность.",
  },
  {
    id: "sitz",
    group: "Cockpit",
    label: "Sitz",
    questionDe: "Wie stellen Sie den Fahrersitz richtig ein?",
    questionRu: "Как правильно настроить сиденье?",
    answerDe:
      "Pedale vollständig erreichbar, Knie leicht gebeugt. Rücken an Lehne, Arme am Lenkrad leicht gebeugt, Schultern bleiben beim Lenken an der Lehne.",
    answerRu:
      "Педали нажимаются полностью, колени слегка согнуты. Спина у спинки, руки на руле слегка согнуты, плечи не отрываются.",
  },
  {
    id: "kopfstuetze",
    group: "Cockpit",
    label: "Kopfstütze",
    questionDe: "Wie stellen Sie die Kopfstütze ein?",
    questionRu: "Как настроить подголовник?",
    answerDe:
      "Oberkante möglichst auf Höhe des Kopfes, mindestens über Augenhöhe. Abstand zum Hinterkopf so klein wie möglich.",
    answerRu:
      "Верхний край примерно на уровне макушки, минимум выше глаз. Расстояние до затылка — как можно меньше.",
  },
  {
    id: "spiegel",
    group: "Cockpit",
    label: "Spiegel",
    questionDe: "Wie stellen Sie die Spiegel ein?",
    questionRu: "Как настроить зеркала?",
    answerDe:
      "Innenspiegel zeigt die gesamte Heckscheibe. Außenspiegel zeigen möglichst viel Verkehr und nur einen kleinen Teil des eigenen Fahrzeugs.",
    answerRu:
      "Внутреннее зеркало показывает всё заднее стекло. В наружных видно максимум дороги и только маленькую часть своей машины.",
  },
  {
    id: "gurt",
    group: "Cockpit",
    label: "Gurt",
    questionDe: "Was beachten Sie beim Sicherheitsgurt?",
    questionRu: "Что проверить у ремня?",
    answerDe:
      "Gurt nicht verdreht, eng am Körper, Beckenteil tief über dem Becken, Schultergurt mittig über Schulter. Schloss muss sicher einrasten.",
    answerRu:
      "Не перекручен, плотно прилегает; нижняя часть низко на тазу, диагональ через середину плеча. Замок защёлкнут.",
  },
  {
    id: "scheibenwischer",
    group: "Cockpit",
    label: "Sicht",
    questionDe: "Was prüfen Sie an Scheibenwischern und Sicht?",
    questionRu: "Что проверить у дворников и обзора?",
    answerDe:
      "Wischerblätter unbeschädigt, wischen ohne Schlieren; Waschanlage funktioniert. Scheiben, Spiegel und Leuchten sauber, Sichtfeld frei.",
    answerRu:
      "Щётки целые, не оставляют полос; омыватель работает. Стёкла, зеркала и фары чистые, обзор не закрыт.",
  },
  {
    id: "kontrollleuchten",
    group: "Cockpit",
    label: "Farben",
    questionDe: "Was bedeuten rote und gelbe Kontrollleuchten?",
    questionRu: "Что означают красные и жёлтые индикаторы?",
    answerDe:
      "Rot: ernste Gefahr oder sofortiger Handlungsbedarf — sicher anhalten. Gelb: Störung oder Hinweis — zeitnah prüfen. Bedeutung ist fahrzeugspezifisch.",
    answerRu:
      "Красный: серьёзная опасность — безопасно остановиться. Жёлтый: неисправность/предупреждение — проверить. Точное значение зависит от машины.",
  },
  {
    id: "oeldruck-lampe",
    group: "Cockpit",
    label: "Öldruck",
    questionDe: "Was tun Sie bei roter Öldruckleuchte während der Fahrt?",
    questionRu: "Что делать при красной лампе давления масла?",
    answerDe:
      "Sofort sicher anhalten, Motor ausschalten, Ölstand prüfen. Nicht weiterfahren, wenn Ursache unklar ist — Motorschadengefahr.",
    answerRu:
      "Сразу безопасно остановиться, заглушить двигатель, проверить уровень. Не ехать дальше, если причина неясна — риск поломки двигателя.",
  },
  {
    id: "temperatur-lampe",
    group: "Cockpit",
    label: "Temperatur",
    questionDe: "Was tun Sie bei zu hoher Kühlmitteltemperatur?",
    questionRu: "Что делать при перегреве?",
    answerDe:
      "Sicher anhalten, Motor abstellen, abkühlen lassen. Heißen Kühlmittelbehälter nicht öffnen. Pannendienst rufen, wenn Ursache unklar.",
    answerRu:
      "Безопасно остановиться, заглушить, дать остыть. Не открывать горячий бачок. При неясной причине вызвать помощь.",
  },
  {
    id: "hupe",
    group: "Cockpit",
    label: "Hupe",
    questionDe: "Wann dürfen Sie die Hupe benutzen?",
    questionRu: "Когда можно использовать сигнал?",
    answerDe:
      "Innerorts nur als Warnzeichen bei Gefahr. Außerorts zusätzlich als Ankündigung eines Überholvorgangs. Nicht aus Ärger.",
    answerRu:
      "В городе — только для предупреждения опасности. За городом также перед обгоном. Не для выражения раздражения.",
  },
  {
    id: "warndreieck",
    group: "Sicherheit",
    label: "Warndreieck",
    questionDe: "Wo ist das Warndreieck und wie sichern Sie eine Panne?",
    questionRu: "Где треугольник и как обозначить поломку?",
    answerDe:
      "Einbauort am Prüfungsfahrzeug zeigen. Warnblinker, Warnweste vor dem Aussteigen, sichere Seite verlassen, Warndreieck mit ausreichendem Abstand aufstellen.",
    answerRu:
      "Показать место в учебной машине. Аварийка, жилет до выхода, выйти с безопасной стороны, поставить треугольник на достаточном расстоянии.",
  },
  {
    id: "warnweste",
    group: "Sicherheit",
    label: "Warnweste",
    questionDe: "Wie viele Warnwesten sind in einem Pkw vorgeschrieben?",
    questionRu: "Сколько жилетов обязательно в легковой машине?",
    answerDe:
      "Mindestens eine normgerechte Warnweste muss mitgeführt werden. Für die Praxis ist eine Weste pro Person sinnvoll und griffbereit aufzubewahren.",
    answerRu:
      "По закону минимум один сертифицированный жилет. Практически лучше по одному на человека и хранить в салоне, а не под багажом.",
  },
  {
    id: "verbandkasten",
    group: "Sicherheit",
    label: "Verbandkasten",
    questionDe: "Was kontrollieren Sie am Verbandkasten?",
    questionRu: "Что проверить в аптечке?",
    answerDe:
      "Vorhandensein, Zugänglichkeit, Vollständigkeit nach zulässiger DIN und Haltbarkeit steriler Teile. Aktuelle Ausführung enthält zwei Gesichtsmasken.",
    answerRu:
      "Наличие, доступность, комплектность по допустимому DIN и срок стерильных материалов. В актуальной версии есть две маски.",
  },
  {
    id: "kindersicherung",
    group: "Sicherheit",
    label: "Kinder",
    questionDe: "Wie sichern Sie Kinder im Fahrzeug?",
    questionRu: "Как перевозить детей?",
    answerDe:
      "Geeignetes, zugelassenes Rückhaltesystem nach Größe/Gewicht verwenden, korrekt befestigen. Bei rückwärts gerichtetem Sitz vorn Beifahrerairbag deaktivieren.",
    answerRu:
      "Использовать подходящее одобренное кресло по росту/весу и правильно закрепить. При кресле против хода спереди отключить пассажирскую подушку.",
  },
  {
    id: "ladung",
    group: "Sicherheit",
    label: "Ladung",
    questionDe: "Wie sichern Sie Gepäck und Ladung?",
    questionRu: "Как закрепить багаж?",
    answerDe:
      "Schwere Gegenstände tief und formschlüssig verstauen, mit Gurten/Netz sichern. Nichts lose auf Ablage oder Sitzen; Sicht und Bedienung frei halten.",
    answerRu:
      "Тяжёлое вниз и вплотную, закрепить ремнями/сеткой. Ничего свободного на полке и сиденьях; обзор и органы управления свободны.",
  },
];

export const examinerCommands = [
  {
    de: "Bitte fahren Sie rechts ran.",
    ru: "Безопасно остановитесь справа.",
    action: "Spiegel → Blinker → Schulterblick → geeignete Stelle → sichern.",
  },
  {
    de: "An der nächsten Möglichkeit rechts.",
    ru: "На следующей разрешённой возможности направо.",
    action: "Не обязательно немедленно. Запрет/опасность — едешь дальше.",
  },
  {
    de: "Bitte folgen Sie der Beschilderung Richtung …",
    ru: "Следуйте по указателям в направлении …",
    action: "Рано читать знаки, планировать полосу, не делать резких манёвров.",
  },
  {
    de: "Bitte wenden Sie.",
    ru: "Развернитесь в подходящем месте.",
    action: "Сам выбрать безопасный способ; можно использовать боковую улицу.",
  },
  {
    de: "Bitte parken Sie rückwärts ein.",
    ru: "Припаркуйтесь задним ходом.",
    action: "Медленно, круговой обзор, Schulterblick, при сомнении остановка.",
  },
  {
    de: "Führen Sie eine Gefahrbremsung durch.",
    ru: "Выполните экстренное торможение.",
    action: "После подтверждения: максимальный тормоз, на механике сцепление.",
  },
  {
    de: "Wenn nichts gesagt wird, fahren Sie geradeaus.",
    ru: "Если команды нет — продолжайте прямо.",
    action: "Но только если движение прямо разрешено.",
  },
  {
    de: "Haben Sie die Aufgabe verstanden?",
    ru: "Вы поняли задание?",
    action: "Если нет: „Könnten Sie das bitte wiederholen?“",
  },
];

export const manoeuvres = [
  {
    title: "Rechts rückwärts",
    subtitle: "In Einmündung / Einfahrt",
    steps: [
      "Spiegel, Blinker rechts, Schulterblick.",
      "Langsam rückwärts; rundum beobachten.",
      "Enger Bogen, Rechtsfahrgebot beachten.",
      "Parallel zum Bordstein anhalten.",
    ],
  },
  {
    title: "Längs einparken",
    subtitle: "Rückwärts in Parklücke",
    steps: [
      "Lücke prüfen, ankündigen, neben Vorderfahrzeug positionieren.",
      "Rückwärts nur Schrittgeschwindigkeit; rundum beobachten.",
      "Korrigieren ist erlaubt und besser als Bordsteinkontakt.",
      "Fahrzeug sichern, Räder passend stellen.",
    ],
  },
  {
    title: "Umkehren",
    subtitle: "Sicher selbst auswählen",
    steps: [
      "Geeignete Stelle ohne Verbot und schlechte Sicht wählen.",
      "Verkehr vollständig beobachten und klar kommunizieren.",
      "Vorwärts/rückwärts langsam; Schulterblick bei jeder Rückwärtsfahrt.",
      "Andere nicht gefährden oder unnötig behindern.",
    ],
  },
  {
    title: "Quer / schräg parken",
    subtitle: "Vorwärts oder rückwärts",
    steps: [
      "Abstand und Einlenkpunkt vorbereiten.",
      "Fußgänger, Radfahrer und beide Fahrzeugseiten beobachten.",
      "Mittig und innerhalb Markierung stehen.",
      "Vor dem Aussteigen sichern und Umfeld prüfen.",
    ],
  },
  {
    title: "Gefahrbremsung",
    subtitle: "Maximale Verzögerung",
    steps: [
      "Erst nach eindeutiger Anweisung und Freigabe.",
      "Bremse sofort maximal; Schaltwagen: Kupplung gleichzeitig.",
      "Lenkrad fest, Blick nach vorn, bis Stillstand.",
      "Danach Umfeld prüfen und erst auf Anweisung weiterfahren.",
    ],
  },
];

export const examQuestions: ExamQuestion[] = [
  { id: "exam-scene-rbl", type: "scene", scenarioId: "right-before-left" },
  {
    id: "exam-profile",
    type: "text",
    questionDe: "Wie groß ist die gesetzliche Mindestprofiltiefe beim Pkw?",
    questionRu: "Минимальная законная глубина протектора?",
    options: ["1,0 mm", "1,6 mm", "3,0 mm"],
    correct: 1,
    explanation: "Gesetzlich 1,6 mm im Hauptprofil. Sicherheitsreserve: mehr.",
  },
  {
    id: "exam-command",
    type: "text",
    questionDe: "„An der nächsten Möglichkeit rechts“ — was bedeutet das?",
    questionRu: "Что означает команда «на следующей возможности направо»?",
    options: [
      "Sofort rechts, auch wenn verboten",
      "Nächste erlaubte und sichere Möglichkeit",
      "Erst nach der nächsten Ampel",
    ],
    correct: 1,
    explanation:
      "Prüferanweisung hebt keine Verkehrsregel auf. Nur erlaubt und sicher abbiegen.",
  },
  { id: "exam-scene-cycle", type: "scene", scenarioId: "cyclist-right-turn" },
  {
    id: "exam-oil",
    type: "text",
    questionDe: "Während der Fahrt leuchtet die rote Öldruckleuchte. Was tun?",
    questionRu: "В движении загорелось красное давление масла. Что делать?",
    options: [
      "Bis zur Fahrschule weiterfahren",
      "Sicher anhalten und Motor ausschalten",
      "Nur langsamer fahren",
    ],
    correct: 1,
    explanation:
      "Sofort sicher anhalten. Weiterfahrt kann schweren Motorschaden verursachen.",
  },
  {
    id: "exam-shoulder",
    type: "text",
    questionDe: "Welche Reihenfolge passt vor dem Rechtsabbiegen?",
    questionRu: "Правильная последовательность перед правым поворотом?",
    options: [
      "Blinker → sofort abbiegen",
      "Spiegel → Blinker → Schulterblick → abbiegen",
      "Schulterblick erst nach dem Abbiegen",
    ],
    correct: 1,
    explanation:
      "Spiegel, Kommunikation, Schulterblick. Radfahrer und Fußgänger durchlassen.",
  },
  { id: "exam-scene-bus", type: "scene", scenarioId: "bus-stop" },
  {
    id: "exam-fog",
    type: "text",
    questionDe: "Wann darf die Nebelschlussleuchte an?",
    questionRu: "Когда разрешена задняя противотуманная фара?",
    options: [
      "Bei jedem Regen",
      "Bei Nebel unter 50 m Sicht",
      "Immer nachts außerorts",
    ],
    correct: 1,
    explanation:
      "Nur bei Nebel unter 50 m Sicht. Dann gilt höchstens 50 km/h.",
  },
  {
    id: "exam-stop",
    type: "text",
    questionDe: "Was verlangt das STOP-Schild?",
    questionRu: "Что требует знак STOP?",
    options: [
      "Nur deutlich langsamer werden",
      "Vollständiger Stillstand an Haltlinie/Sichtlinie",
      "Nur bei sichtbarem Querverkehr halten",
    ],
    correct: 1,
    explanation:
      "Vollständig anhalten. Falls Sicht fehlt, anschließend vorsichtig vortasten.",
  },
  { id: "exam-scene-rail", type: "scene", scenarioId: "railway-crossing" },
  {
    id: "exam-brake-booster",
    type: "text",
    questionDe: "Wie prüfen Sie den Bremskraftverstärker?",
    questionRu: "Как проверить усилитель тормозов?",
    options: [
      "Motor aus: pumpen, Pedal halten, Motor starten",
      "Nur Handbremse anziehen",
      "Bei 50 km/h stark lenken",
    ],
    correct: 0,
    explanation:
      "Nach dem Motorstart muss das gehaltene Bremspedal leicht nachgeben.",
  },
  {
    id: "exam-park",
    type: "text",
    questionDe: "Sie stehen beim Einparken schief. Was ist richtig?",
    questionRu: "При парковке машина стоит криво. Что делать?",
    options: [
      "So stehen lassen, Korrektur ist Fehler",
      "Langsam korrigieren und weiter beobachten",
      "Schnell vorfahren, damit niemand wartet",
    ],
    correct: 1,
    explanation:
      "Kontrolliertes Korrigieren ist erlaubt. Sicherheit und Beobachtung zählen.",
  },
];

export const officialFacts = [
  {
    value: "55 min",
    label: "Prüfungsdauer Klasse B",
  },
  {
    value: "≥ 30 min",
    label: "reine Fahrzeit",
  },
  {
    value: "3",
    label: "Grundfahraufgaben",
  },
  {
    value: "8",
    label: "Fahraufgaben-Typen",
  },
];
