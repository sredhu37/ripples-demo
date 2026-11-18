import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  EndowmentTreeDiagram,
  GermanFoundationsDiagram,
  PerpetualCommunityDiagram,
  SavingsChestDiagram,
  SpendingVsPreservingDiagram,
} from "./philanthropy.diagrams";
import { PhilanthropyToy } from "./philanthropy.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <PhilanthropyToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <PhilanthropyToy lang={lang} mode="quiz" onDone={() => onAnswer(true)} />;
}

export const lesson: Lesson = {
  id: "philanthropy",
  story: [
    animatedBeat(
      [
        T(
          "Old Captain Coral has saved one thousand coins over a long career of sea trading.",
          "Der alte Kapitän Coral hat über eine lange Laufbahn im Seehandel eintausend Münzen gespart.",
          "Stary kapitan Coral zaoszczędził tysiąc monet podczas swojej wieloletniej służby na morzu.",
        ),
        T(
          "Coral wants to help Ripple Town children learn to read books and swim safely for centuries.",
          "Coral möchte den Kindern von Ripple Town helfen, über Jahrhunderte sicher lesen und schwimmen zu lernen.",
          "Coral pragnie pomóc dzieciom z Ripple Town uczyć się czytać książki i bezpiecznie pływać przez całe stulecia.",
        ),
        T(
          "Coral wonders how best to use this treasure to create lasting good.",
          "Coral überlegt, wie dieser Schatz am besten dauerhaft Gutes bewirken kann.",
          "Coral zastanawia się, jak najlepiej wykorzystać ten skarb, by czynić trwałe dobro.",
        ),
        T(
          "A lifetime of wealth can either be spent quickly or preserved forever.",
          "Ein Lebenswerk an Wohlstand kann entweder rasch ausgegeben oder für immer bewahrt werden.",
          "Dorobek całego życia można albo szybko roztrwonić, albo zachować na zawsze.",
        ),
      ],
      SavingsChestDiagram,
    ),
    animatedBeat(
      [
        T(
          "If Coral hands out the one thousand coins as cash gifts today, the coins vanish in two years.",
          "Verteilt Coral die eintausend Münzen heute als Bargeldgeschenke, sind sie in zwei Jahren weg.",
          "Gdyby Coral rozdał tysiąc monet jako prezenty gotówkowe dzisiaj, monety zniknęłyby w dwa lata.",
        ),
        T(
          "People would buy extra sweets, and then the money would be gone forever.",
          "Die Menschen würden Süßigkeiten kaufen, und danach wäre das Geld für immer verloren.",
          "Mieszkańcy kupiliby słodycze i drobiazgi, a potem po skarbie nie zostałby nawet ślad.",
        ),
        T(
          "Instead, Coral establishes a charitable institution called a *foundation*.",
          "Stattdessen gründet Coral eine gemeinnützige Institution: eine *Stiftung*.",
          "Zamiast tego Coral powołuje instytucję dobroczynną: *fundację*.",
        ),
        T(
          "The one thousand coins become the protected *endowment*, never to be touched or spent.",
          "Die eintausend Münzen werden zum geschützten *Stiftungsvermögen*, das niemals angetastet wird.",
          "Tysiąc monet staje się chronionym *kapitałem żelaznym*, którego nikomu nie wolno naruszyć ani wydać.",
        ),
      ],
      SpendingVsPreservingDiagram,
    ),
    animatedBeat(
      [
        T(
          "The foundation acts like an apple tree with deep, protected roots.",
          "Die Stiftung funktioniert wie ein Apfelbaum mit tiefen, geschützten Wurzeln.",
          "Fundacja działa jak jabłoń o mocnych, bezpiecznych korzeniach.",
        ),
        T(
          "The one thousand coins are invested safely in town harbor bonds.",
          "Die eintausend Münzen werden sicher in den Hafenanleihen der Stadt angelegt.",
          "Tysiąc monet zostaje bezpiecznie ulokowane w obligacjach portowych miasteczka.",
        ),
        T(
          "Every year, the bonds yield forty coins of fresh interest.",
          "Jedes Jahr werfen die Anleihen vierzig Münzen frische Zinsen ab.",
          "Każdego roku obligacje przynoszą czterdzieści monet świeżych odsetek.",
        ),
        T(
          "Only the annual harvest of forty coins is spent, leaving the living tree completely intact.",
          "Nur die jährliche Ernte von vierzig Münzen wird ausgegeben, der Baum bleibt unversehrt.",
          "Wydawany jest wyłącznie coroczny plon czterdziestu monet, a żywe drzewo kapitału pozostaje nienaruszone.",
        ),
      ],
      EndowmentTreeDiagram,
    ),
    animatedBeat(
      [
        T(
          "With forty coins every year, the foundation buys new books for the town library.",
          "Mit vierzig Münzen jedes Jahr kauft die Stiftung neue Bücher für die Dorfbücherei.",
          "Za czterdzieści monet każdego roku fundacja kupuje nowe książki do biblioteki.",
        ),
        T(
          "It pays a swimming instructor so every girl and boy learns water safety.",
          "Sie bezahlt einen Schwimmlehrer, damit jedes Kind sicher im Meer schwimmen lernt.",
          "Opłaca ratownika i instruktora, by każde dziecko nauczyło się bezpiecznie pływać w morzu.",
        ),
        T(
          "Decades from now, when Otto has grandchildren, the foundation will still be funding swimming lessons.",
          "In Jahrzehnten, wenn Otto Enkel hat, wird die Stiftung noch immer Schwimmunterricht bezahlen.",
          "Za wiele dziesięcioleci, gdy Otto doczeka się wnuków, fundacja wciąż będzie opłacać lekcje pływania.",
        ),
        T(
          "This is how private wealth transforms into an eternal *public good*.",
          "So verwandelt sich privater Wohlstand in ein ewiges *Gemeinwohl*.",
          "W ten sposób prywatne oszczędności stają się wiecznym *dobrem wspólnym*.",
        ),
      ],
      PerpetualCommunityDiagram,
    ),
    animatedBeat(
      [
        T(
          "In Germany, more than twenty-five thousand foundations fund research, culture, and nature.",
          "In Deutschland fördern über fünfundzwanzigtausend Stiftungen Forschung, Kultur und Natur.",
          "W Polsce i na świecie tysiące fundacji wspiera edukację, leczenie dzieci, kulturę i przyrodę.",
        ),
        T(
          "Pioneers like Robert Bosch and Carl Zeiss dedicated their companies to foundations.",
          "Pioniere wie Robert Bosch und Carl Zeiss übertrugen ihre Unternehmen an Stiftungen.",
          "Wielcy twórcy i darczyńcy przekazywali majątki fundacjom, by służyły całemu społeczeństwu.",
        ),
        T(
          "By law, their endowment capital must be preserved for eternity.",
          "Per Gesetz muss ihr Stiftungsvermögen auf ewig erhalten bleiben.",
          "Zgodnie z prawem ich kapitał żelazny musi być chroniony i zachowany na wieczność.",
        ),
        T(
          "Philanthropy shows that the greatest reward of creating wealth is giving it back.",
          "Philanthropie zeigt: Der schönste Lohn für Wohlstand ist es, der Welt etwas zurückzugeben.",
          "Filantropia uczy nas, że największą radością z budowania majątku jest dzielenie się nim z innymi.",
        ),
      ],
      GermanFoundationsDiagram,
    ),
  ],
  toyIntro: T(
    "Allocate the 40-coin annual endowment harvest to community projects while keeping capital intact.",
    "Verteile die 40 Münzen Jahresertrag auf Dorfprojekte und schütze das Stiftungsvermögen.",
    "Rozdziel 40 monet rocznego plonu zysków na projekty społeczności, chroniąc nienaruszalny kapitał żelazny.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "How does a philanthropic foundation fund community projects indefinitely?",
        "Wie finanziert eine gemeinnützige Stiftung Projekte auf unbegrenzte Zeit?",
        "W jaki sposób fundacja dobroczynna finansuje projekty społeczne przez nieskończenie wiele lat?",
      ),
      options: [
        {
          text: T(
            "It preserves its endowment capital permanently and only spends the annual earnings",
            "Sie bewahrt ihr Stiftungsvermögen dauerhaft und gibt nur die jährlichen Erträge aus",
            "Trwale chroni kapitał żelazny i wydaje wyłącznie corocznie wypracowane zyski",
          ),
          correct: true,
        },
        {
          text: T(
            "It spends all its money on fireworks on the very first day",
            "Sie gibt ihr gesamtes Geld am ersten Tag für ein Feuerwerk aus",
            "Wydaje wszystkie pieniądze na fajerwerki już pierwszego dnia",
          ),
        },
        {
          text: T(
            "It forces citizens to pay a daily coin tax to the tree",
            "Sie zwingt die Bürger, dem Baum täglich eine Münzsteuer zu zahlen",
            "Zmusza mieszkańców do płacenia codziennego podatku na rzecz drzewa",
          ),
        },
      ],
      hint: T(
        "Think of the apple tree: harvest the apples, but never cut down the trunk.",
        "Denke an den Apfelbaum: Ernte die Äpfel, aber fälle niemals den Stamm.",
        "Pomyśl o jabłoni: zbieraj dojrzałe jabłka, lecz nigdy nie ścinaj pnia.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is an endowment (Stiftungsvermögen)?",
        "Was ist das Stiftungsvermögen?",
        "Czym jest kapitał żelazny fundacji (endowment / fundusz założycielski)?",
      ),
      options: [
        {
          text: T(
            "The protected capital of a foundation that generates annual income for charitable causes",
            "Das geschützte Grundkapital einer Stiftung, das jährliche Erträge für gute Zwecke abwirft",
            "Nienaruszalny kapitał fundacji, który stale wypracowuje roczne zyski na cele społeczne",
          ),
          correct: true,
        },
        {
          text: T(
            "A pile of pirate treasure buried under a beach palm tree",
            "Ein Piratenschatz, der unter einer Strandpalme vergraben liegt",
            "Stos pirackich skarbów zakopany na plaży pod palmą",
          ),
        },
        {
          text: T(
            "A type of warm woolly hat worn in winter",
            "Eine warme Wollmütze, die man im Winter trägt",
            "Ciepła wełniana czapka noszona w mroźne dni",
          ),
        },
      ],
      hint: T(
        "Under foundation law, the endowment capital must be preserved forever.",
        "Nach deutschem Recht muss das Stiftungsvermögen für immer erhalten bleiben.",
        "W prawie fundacyjnym kapitał założycielski i żelazny musi być chroniony i nienaruszalny.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "The foundation earned 40 coins in annual bond interest. Allocate 20 coins to the Library and 20 to the Swim Dock.",
        "Die Stiftung erwirtschaftete 40 Münzen Zinsen. Teile 20 Münzen der Bücherei und 20 dem Schwimmsteg zu.",
        "Fundacja zarobiła 40 monet z rocznych odsetek. Przydziel 20 monet Bibliotece i 20 monet Przystani Pływackiej.",
      ),
      Widget,
      hint: T(
        "Click +10 twice on Library, and +10 twice on Swimming Dock, then tap check.",
        "Klicke je zweimal auf +10 bei Bücherei und Schwimmsteg, dann auf prüfen.",
        "Kliknij dwukrotnie +10 przy Bibliotece i dwukrotnie +10 przy Przystani, a potem naciśnij Sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, what kind of foundation would you like to start to help people long after we are gone?",
    "Papa, was für eine Stiftung würdest du gerne gründen, um Menschen noch lange nach unserer Zeit zu helfen?",
    "Tato, jaką fundację chciałbyś założyć, aby pomagać ludziom jeszcze długo po nas?",
  ),
  realLife: {
    title: {
      en: "Charitable Trusts and Endowments in India",
      de: "Stiftungen in Deutschland",
      pl: "Fundacje i pożytek publiczny w Polsce",
    },
    body: {
      en: "In India, pioneering endowments like the Tata Trusts and the Azim Premji Foundation invest substantial capital endowments permanently, using their annual returns to build world-class hospitals, universities, and rural development programs. Regulated under the Indian Trusts Act and public trust registries, these endowments serve society across generations.",
      de: "In Deutschland gibt es über 25.000 Stiftungen, etwa die Robert Bosch Stiftung, die Bertelsmann Stiftung oder die VolkswagenStiftung. Nach deutschem Zivilrecht (BGB §§ 80 ff.) muss das Stiftungsvermögen auf ewig erhalten bleiben; jährliche Erträge finanzieren Forschung, Bildung und Soziales.",
      pl: "W Polsce działa ponad 28 000 fundacji, takich jak Fundacja WOŚP, Fundacja TVN czy Polska Akcja Humanitarna. Zgodnie z Ustawą o fundacjach majątek fundacji przeznaczony jest na realizację celów społecznie użytecznych. Obywatele wspierają te cele również bezpośrednio, przekazując 1,5% swojego podatku dochodowego (PIT) na organizacje pożytku publicznego (OPP).",
    },
  },
};
