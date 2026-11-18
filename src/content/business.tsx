import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BuildCartDiagram,
  FinnSavingsDiagram,
  HireLeoDiagram,
  OwnerRiskSummaryDiagram,
  ProfitScaleDiagram,
  RainStormDiagram,
  RainyLossDiagram,
  SunnySalesDiagram,
} from "./business.diagrams";
import { BusinessCartToy } from "./business.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <BusinessCartToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <BusinessCartToy lang={lang} isWidget onWidgetAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "business",
  story: [
    animatedBeat(
      [
        T(
          "Finn had 10 shiny coins in his savings jar from doing odd jobs.",
          "Finn hatte 10 glänzende Münzen in seinem Sparschwein gesammelt.",
          "Finn miał 10 błyszczących monet w słoiku ze swoich drobnych prac.",
        ),
        T(
          "Instead of spending them on sweets, Finn wanted to build something of his own.",
          "Statt sie für Süßes auszugeben, wollte Finn etwas Eigenes aufbauen.",
          "Zamiast wydawać je na słodycze, Finn chciał stworzyć coś własnego.",
        ),
      ],
      FinnSavingsDiagram,
    ),
    animatedBeat(
      [
        T(
          "He bought wood, big wheels, ice, and sweet cream to build an ice cream cart!",
          "Er kaufte Holz, Räder, Eis und frische Sahne für einen Eiswagen!",
          "Kupił drewno, duże koła, lód i śmietankę, aby zbudować wózek z lodami!",
        ),
        T(
          "Finn is not just a worker anymore. Finn is now a business *owner*!",
          "Finn ist nicht mehr nur ein Arbeiter. Finn ist jetzt ein *Inhaber*!",
          "Finn nie jest już tylko pracownikiem. Finn jest teraz *właścicielem* firmy!",
        ),
      ],
      BuildCartDiagram,
    ),
    animatedBeat(
      [
        T(
          "On Saturday, the town park was full of sunshine and playing children.",
          "Am Samstag war der Stadtpark voller Sonnenschein und spielender Kinder.",
          "W sobotę park miejski był pełen słońca i bawiących się dzieci.",
        ),
        T(
          "To scoop quickly, Finn hired his friend Leo as an *employee* for 2 coins an hour.",
          "Damit es schnell geht, stellte Finn Leo als *Angestellten* für 2 Münzen pro Stunde ein.",
          "Aby szybko nakładać lody, Finn zatrudnił Leo jako *pracownika* za 2 monety na godzinę.",
        ),
      ],
      HireLeoDiagram,
    ),
    animatedBeat(
      [
        T(
          "They sold 30 scoops and collected 30 shiny coins!",
          "Sie verkauften 30 Kugeln und nahmen 30 glänzende Münzen ein!",
          "Sprzedali 30 gałek i zebrali 30 błyszczących monet!",
        ),
        T(
          "Finn paid 6 coins for cream and gave Leo his 4 coins of wages.",
          "Finn zahlte 6 Münzen für Sahne und gab Leo seine 4 Münzen Lohn.",
          "Finn zapłacił 6 monet za śmietankę i dał Leo 4 monety pensji.",
        ),
        T(
          "Finn had 20 coins left over. That extra reward is called *profit*!",
          "Finn blieben 20 Münzen übrig. Diese Belohnung nennt man *Gewinn*!",
          "Finnowi zostało 20 monet. Tę nadwyżkę nazywamy *zyskiem*!",
        ),
      ],
      SunnySalesDiagram,
    ),
    animatedBeat(
      [
        T(
          "As an employee, Leo received his fixed pay for the hours he worked.",
          "Als Angestellter bekam Leo seinen festen Lohn für seine Arbeitszeit.",
          "Jako pracownik Leo otrzymał stałą pensję za przepracowane godziny.",
        ),
        T(
          "As the owner, Finn earned much more because profits grow with every scoop sold!",
          "Als Inhaber verdiente Finn viel mehr, weil der Gewinn mit jeder Kugel wächst!",
          "Jako właściciel Finn zarobił znacznie więcej, bo zysk rośnie z każdą gałką!",
        ),
      ],
      ProfitScaleDiagram,
    ),
    animatedBeat(
      [
        T(
          "On Sunday, dark storm clouds rolled in and cold rain poured down.",
          "Am Sonntag zogen Gewitterwolken auf und kalter Regen strömte herab.",
          "W niedzielę nadeszły ciemne chmury i lunął zimny deszcz.",
        ),
        T(
          "Nobody came to the park. Not a single scoop was sold, and the cream spoiled.",
          "Niemand kam in den Park. Keine Kugel wurde verkauft, die Sahne verdarb.",
          "Nikt nie przyszedł do parku. Nie sprzedano ani jednej gałki, a śmietanka skwaśniała.",
        ),
      ],
      RainStormDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Even with zero sales, Finn still had to pay Leo his promised 4 coins of wages.",
          "Trotz null Verkäufen musste Finn Leo seinen versprochenen Lohn von 4 Münzen zahlen.",
          "Mimo braku sprzedaży Finn musiał wypłacić Leo obiecane 4 monety pensji.",
        ),
        T(
          "Finn lost 6 coins from his own pocket. That is called a *loss*.",
          "Finn verlor 6 Münzen aus eigener Tasche. Das nennt man einen *Verlust*.",
          "Finn stracił 6 monet z własnej kieszeni. To nazywa się *strata*.",
        ),
      ],
      RainyLossDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "An *employee* gets guaranteed pay rain or shine.",
          "Ein *Angestellter* bekommt seinen sicheren Lohn bei Regen und Sonne.",
          "Pewny *pracownik* otrzymuje stałą pensję w słońcu i deszczu.",
        ),
        T(
          "An *owner* carries the risk of a *loss*, but enjoys the *profit* when things go well!",
          "Ein *Inhaber* trägt das Risiko für einen *Verlust*, genießt aber den *Gewinn*!",
          "Śmiały *właściciel* ponosi ryzyko na wypadek *straty*, lecz zatrzymuje *zysk*, gdy świeci słońce!",
        ),
      ],
      OwnerRiskSummaryDiagram,
    ),
  ],
  toyIntro: T(
    "Test Finn's ice cream cart in sunshine and rain. Watch how profit and loss change!",
    "Teste Finns Eiswagen bei Sonne und Regen. Sieh, wie sich Gewinn und Verlust verändern!",
    "Wypróbuj wózek Finna w słońcu i deszczu. Zobacz, jak zmieniają się zysk i strata!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What do we call the money left over after paying all costs and helper wages?",
        "Wie nennt man das Geld, das nach Abzug aller Kosten und Löhne übrig bleibt?",
        "Jak nazywamy pieniądze, które zostają po opłaceniu wszystkich kosztów i pensji pomocnika?",
      ),
      options: [
        { text: T("Costs", "Kosten", "Koszty") },
        { text: T("Profit", "Gewinn", "Zysk"), correct: true },
        { text: T("Loan", "Schulden", "Pożyczka") },
      ],
      hint: T(
        "Costs are what you pay out. Profit is the reward an owner keeps when sales are higher than costs.",
        "Kosten sind Ausgaben. Gewinn ist die Belohnung für den Inhaber, wenn die Einnahmen höher sind.",
        "Koszty to wydatki. Zysk to nagroda dla właściciela, gdy przychód jest wyższy niż koszty.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why did Finn suffer a loss on the rainy day while Leo still received his pay?",
        "Warum machte Finn am Regentag Verlust, während Leo trotzdem seinen Lohn bekam?",
        "Dlaczego Finn poniósł stratę w deszczowy dzień, podczas gdy Leo i tak dostał pensję?",
      ),
      options: [
        {
          text: T(
            "Leo is an employee with guaranteed pay, while Finn is the owner who carries the risk of loss.",
            "Leo ist Angestellter mit festem Lohn, während Finn als Inhaber das Verlustrisiko trägt.",
            "Leo jest pracownikiem z pewną pensją, a Finn jako właściciel ponosi ryzyko straty.",
          ),
          correct: true,
        },
        {
          text: T(
            "Employees only get paid when the sun shines in Ripple Town.",
            "Angestellte bekommen nur dann Geld, wenn in Ripple Town die Sonne scheint.",
            "Pracownicy dostają wypłatę tylko wtedy, gdy świeci słońce.",
          ),
        },
      ],
      hint: T(
        "Employees trade their time for agreed wages. Owners take the entrepreneurial risk of profit or loss.",
        "Angestellte tauschen Zeit gegen festen Lohn. Unternehmer tragen das Risiko für Gewinn oder Verlust.",
        "Pracownicy wymieniają czas na stałą płacę. Przedsiębiorcy ponoszą ryzyko zysku lub straty.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Set the cart to a sunny day with helper Leo and sell enough scoops to make at least 10 coins of profit!",
        "Stelle den Wagen auf einen sonnigen Tag mit Helfer Leo und verkaufe genug Kugeln für mindestens 10 Münzen Gewinn!",
        "Ustaw wózek na słoneczny dzień z pomocnikiem Leo i sprzedaj dość gałek, by osiągnąć co najmniej 10 monet zysku!",
      ),
      Widget,
      hint: T(
        "Choose sunny weather, keep helper Leo, and move the scoop slider up until profit is 10 coins or more.",
        "Wähle Sonnenschein, behalte Helfer Leo und schiebe den Regler hoch, bis der Gewinn mindestens 10 Münzen beträgt.",
        "Wybierz słoneczną pogodę, zachowaj pomocnika Leo i przesuń suwak gałek tak, aby zysk wyniósł co najmniej 10 monet.",
      ),
    },
  ],
  askDad: T(
    "Papa, what is the difference between earning a steady salary as an employee and taking the risk of starting your own business?",
    "Papa, was ist der Unterschied zwischen einem festen Monatsgehalt als Angestellter und dem Risiko eines eigenen Geschäfts?",
    "Tato, czym różni się stała comiesięczna pensja na etacie od ryzyka i zysków z prowadzenia własnej firmy?",
  ),
  realLife: {
    title: {
      en: "Neighborhood shops and enterprise in India",
      de: "Selbstständige und Betriebe in Deutschland",
      pl: "Przedsiębiorcy i małe firmy w Polsce",
    },
    body: {
      en: "In India, local dukaandars, tea stall owners, and small vendors invest their own savings to start a business. When monsoon rains keep shoppers away, they still must pay stall rent and helper salaries out of pocket. But on sunny festival days when sales boom, the profit belongs to the owner.",
      de: "In Deutschland eröffnen Handwerker, Bäcker und Gastwirte ihr eigenes Gewerbe. Sie stellen Mitarbeiter ein, die auch bei Auftragsmangel ihren vertraglichen Lohn erhalten. Der Inhaber trägt das Unternehmerrisiko: Bei Verlust haftet er mit seinem Ersparten, bei Erfolg gehört ihm der Gewinn.",
      pl: "W Polsce ponad dwa miliony ludzi prowadzi własną działalność gospodarczą. Pracownicy otrzymują umówioną pensję na etacie bez względu na liczbę klientów. Przedsiębiorca ponosi pełne ryzyko gospodarcze: w trudnych miesiącach dopłaca z oszczędności, a przy dobrej sprzedaży osiąga zysk.",
    },
  },
};
