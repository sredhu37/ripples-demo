import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  CentralExchangeDiagram,
  GrainSiloDiagram,
  IdenticalWheatDiagram,
  SuperHarvestDiagram,
  WeatherDroughtDiagram,
} from "./commodities.diagrams";
import { CommoditiesToy } from "./commodities.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <CommoditiesToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <CommoditiesToy lang={lang} mode="quiz" onDone={() => onAnswer(true)} />;
}

export const lesson: Lesson = {
  id: "commodities",
  story: [
    animatedBeat(
      [
        T(
          "Farmer Maya and Farmer Tom harvest wheat from their valley fields.",
          "Bäuerin Maya und Bauer Tom ernten Weizen auf ihren Feldern im Tal.",
          "Rolniczka Maya i rolnik Tom zbierają pszenicę ze swoich pól w dolinie.",
        ),
        T(
          "They carry heavy sacks to Ripple Town's central grain silo.",
          "Sie tragen schwere Säcke zum zentralen Getreidesilo von Ripple Town.",
          "Zawożą ciężkie worki do głównego silosu zbożowego w Ripple Town.",
        ),
        T(
          "Maya's golden wheat is the same quality as Tom's golden wheat.",
          "Mayas goldener Weizen hat die gleiche Qualität wie Toms Weizen.",
          "Złota pszenica Mayi ma dokładnie taką samą jakość jak pszenica Toma.",
        ),
        T(
          "Because raw materials are interchangeable, they are called *commodities*.",
          "Weil diese Grundstoffe austauschbar sind, nennt man sie *Rohstoffe*.",
          "Ponieważ takie surowce są całkowicie wymienne, nazywamy je *towarami masowymi* lub *surowcami*.",
        ),
      ],
      GrainSiloDiagram,
    ),
    animatedBeat(
      [
        T(
          "A bakery does not care whether the wheat grew in Maya's field or Tom's field.",
          "Einer Bäckerei ist es egal, ob der Weizen auf Mayas oder Toms Feld wuchs.",
          "Piekarni jest obojętne, czy ziarno urosło na polu Mayi, czy na polu Toma.",
        ),
        T(
          "Flour mills grind it all together into pure white baking flour.",
          "Getreidemühlen mahlen alles zusammen zu reinem weißem Backmehl.",
          "Młyny mielą całe ziarno razem na czystą, białą mąkę do wypieków.",
        ),
        T(
          "Raw goods are traded in bulk on a central *exchange*.",
          "Grundgüter werden in großen Mengen an einer zentralen *Warenbörse* gehandelt.",
          "Surowce są sprzedawane hurtowo na centralnej *giełdzie towarowej*.",
        ),
        T(
          "All sellers accept the same single market price for their standard goods.",
          "Alle Verkäufer akzeptieren denselben einheitlichen Marktpreis für ihre Standardware.",
          "Wszyscy sprzedawcy akceptują tę samą, jednolitą cenę rynkową za standardowy towar.",
        ),
      ],
      IdenticalWheatDiagram,
    ),
    animatedBeat(
      [
        T(
          "Unlike factory toys, farm crops depend entirely on nature.",
          "Anders als Spielzeug aus Fabriken hängen Feldfrüchte ganz von der Natur ab.",
          "W przeciwieństwie do zabawek z fabryki, plony z pól zależą całkowicie od natury.",
        ),
        T(
          "When a harsh summer drought dries up the soil, harvest shrinks to twenty sacks.",
          "Wenn eine harte Sommerdürre den Boden austrocknet, schrumpft die Ernte auf zwanzig Säcke.",
          "Gdy letnia susza wysusza glebę, zbiory kurczą się do zaledwie dwudziestu worków.",
        ),
        T(
          "Bakers compete urgently for the scarce flour, driving the price to eight coins.",
          "Bäcker wetteifern dringend um das knappe Mehl, was den Preis auf acht Münzen treibt.",
          "Piekarnie zaciekle konkurują o deficytową mąkę, windując cenę do ośmiu monet.",
        ),
        T(
          "Scarcity of essential raw materials pushes prices skyward.",
          "Knappheit bei lebenswichtigen Rohstoffen treibt die Preise in den Himmel.",
          "Niedobór podstawowych surowców gwałtownie podnosi ich ceny.",
        ),
      ],
      WeatherDroughtDiagram,
    ),
    animatedBeat(
      [
        T(
          "The following year brings gentle rain and warm sunny days.",
          "Das folgende Jahr bringt sanften Regen und warme sonnige Tage.",
          "Kolejny rok przynosi łagodne deszcze i ciepłe, słoneczne dni.",
        ),
        T(
          "The valley fields produce a bumper harvest of ninety sacks of wheat.",
          "Die Felder im Tal bringen eine Rekordernte von neunzig Säcken Weizen hervor.",
          "Pola w dolinie dają rekordowe zbiory: aż dziewięćdziesiąt worków pszenicy.",
        ),
        T(
          "The central silo overflows, and the price drops to only two coins per sack.",
          "Das Silo läuft über und der Preis sinkt auf nur zwei Münzen pro Sack.",
          "Główny silos pęka w szwach, a cena spada do zaledwie dwóch monet za worek.",
        ),
        T(
          "Abundant supply makes flour cheap, so every family enjoys fresh bread.",
          "Reichliches Angebot macht Mehl günstig, sodass jede Familie frisches Brot genießt.",
          "Obfita podaż sprawia, że mąka jest tania, a każda rodzina może cieszyć się świeżym chlebem.",
        ),
      ],
      SuperHarvestDiagram,
    ),
    animatedBeat(
      [
        T(
          "Around the world, people trade grains, metals, and oil on commodity exchanges.",
          "Auf der ganzen Welt handeln Menschen Getreide, Metalle und Öl an Warenbörsen.",
          "Na całym świecie ludzie handlują zbożem, metalami i ropą na giełdach towarowych.",
        ),
        T(
          "These exchanges help producers sell big harvests and keep factories running.",
          "Diese Börsen helfen Erzeugern, große Ernten zu verkaufen und Fabriken am Laufen zu halten.",
          "Giełdy te pomagają rolnikom sprzedawać duże zbiory, a fabrykom gwarantują ciągłość pracy.",
        ),
        T(
          "Clear market prices tell farmers what to plant and warn factories of shortages.",
          "Klare Marktpreise zeigen Bauern, was sie anbauen sollen, und warnen Fabriken vor Mängeln.",
          "Przejrzyste ceny podpowiadają rolnikom, co siać, i ostrzegają przemysł przed brakami.",
        ),
        T(
          "Standard commodities form the foundation of everything our society builds.",
          "Standard-Rohstoffe bilden das Fundament von allem, was unsere Gesellschaft baut.",
          "Ustandaryzowane surowce stanowią fundament wszystkiego, co wytwarza społeczeństwo.",
        ),
      ],
      CentralExchangeDiagram,
    ),
  ],
  toyIntro: T(
    "Change the valley weather to see how drought and bumper crops change the silo price.",
    "Ändere das Talwetter, um zu sehen, wie Dürre und Rekordernten den Silopreis verändern.",
    "Zmień pogodę w dolinie, aby sprawdzić, jak susza i rekordowe zbiory wpływają na cenę zboża w silosie.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why is raw wheat from different farmers considered a commodity?",
        "Warum gilt Rohweizen von verschiedenen Bauern als Standard-Rohstoff?",
        "Dlaczego surowa pszenica od różnych rolników jest uznawana za surowiec masowy (commodity)?",
      ),
      options: [
        {
          text: T(
            "Because standard sacks of wheat are uniform and interchangeable",
            "Weil Standardsäcke Weizen einheitlich und austauschbar sind",
            "Ponieważ standardowe worki pszenicy są jednolitej jakości i całkowicie wymienne",
          ),
          correct: true,
        },
        {
          text: T(
            "Because each grain of wheat has a tiny artist signature painted on it",
            "Weil auf jedem Weizenkorn eine winzige Künstlersignatur gemalt ist",
            "Ponieważ na każdym ziarnie namalowano malutki podpis artysty",
          ),
        },
        {
          text: T(
            "Because wheat can only be eaten on Sundays",
            "Weil Weizen nur sonntags gegessen werden darf",
            "Ponieważ pszenicę wolno jeść wyłącznie w niedziele",
          ),
        },
      ],
      hint: T(
        "Think about why a bakery can mix Maya's wheat with Tom's wheat.",
        "Überlege, warum eine Bäckerei Mayas Weizen mit Toms Weizen mischen kann.",
        "Zastanów się, dlaczego piekarnia może bez problemu wymieszać pszenicę Mayi z pszenicą Toma.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What happens to the price of wheat when a drought cuts the harvest in half?",
        "Was passiert mit dem Weizenpreis, wenn eine Dürre die Ernte halbiert?",
        "Co dzieje się z ceną pszenicy, gdy susza zmniejszy zbiory o połowę?",
      ),
      options: [
        {
          text: T(
            "The price rises because wheat becomes scarce while bakers still need flour",
            "Der Preis steigt, weil Weizen knapp wird, Bäcker aber weiterhin Mehl brauchen",
            "Cena rośnie, ponieważ pszenica staje się towarem deficytowym, a piekarze wciąż potrzebują mąki",
          ),
          correct: true,
        },
        {
          text: T(
            "The price immediately drops to zero coins",
            "Der Preis sinkt sofort auf null Münzen",
            "Cena natychmiast spada do zera monet",
          ),
        },
        {
          text: T(
            "The price never changes because weather has no effect on farms",
            "Der Preis ändert sich nie, da Wetter keinen Einfluss auf Bauernhöfe hat",
            "Cena nigdy się nie zmienia, bo pogoda nie ma wpływu na rolnictwo",
          ),
        },
      ],
      hint: T(
        "When raw goods are hard to find, buyers offer more coins to secure them.",
        "Wenn Rohstoffe schwer zu finden sind, bieten Käufer mehr Münzen, um sie zu bekommen.",
        "Gdy surowce stają się trudniej dostępne, kupujący oferują więcej monet, aby je zdobyć.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "A summer drought made wheat scarce. Set the weather to Normal Rain so the silo fills to 50 sacks at 4 coins.",
        "Eine Sommerdürre hat Weizen knapp gemacht. Schalte auf normalen Regen um, damit das Silo 50 Säcke zu 4 Münzen füllt.",
        "Letnia susza spowodowała brak pszenicy. Ustaw pogodę na normalny deszcz, aby silos napełnił się do 50 worków przy cenie 4 monet.",
      ),
      Widget,
      hint: T(
        "Tap the Normal Rain button and then check.",
        "Tippe auf den Knopf Normaler Regen und dann auf prüfen.",
        "Naciśnij przycisk Normalny deszcz, a następnie kliknij Sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, where does our country get raw materials like copper, oil, and timber to build houses and factories?",
    "Papa, woher bekommt Deutschland Rohstoffe wie Metalle, Öl und Holz, um Autos und Häuser zu bauen?",
    "Tato, skąd nasz kraj bierze surowce, takie jak miedź, ropa naftowa czy drewno, aby budować domy i fabryki?",
  ),
  realLife: {
    title: {
      en: "Commodity exchanges and mandis in India",
      de: "Rohstoffhandel und Energiebörsen in Deutschland",
      pl: "Giełdy towarowe i handel surowcami w Polsce",
    },
    body: {
      en: "In India, agricultural commodities like wheat, pulses, and spices are traded on dedicated commodity exchanges such as the National Commodity and Derivatives Exchange (NCDEX), while industrial metals and crude oil trade on the Multi Commodity Exchange (MCX). These platforms are regulated by the Securities and Exchange Board of India (SEBI) to provide transparent standardized prices for farmers and industries.",
      de: "Deutsche Industrien sind stark auf importierte und heimische Rohstoffe wie Kupfer, Getreide und Gas angewiesen. Energie und Rohstoffe werden an spezialisierten Börsen wie der European Energy Exchange (EEX) in Leipzig gehandelt, wo sich Preise täglich transparent nach Angebot und Nachfrage bilden.",
      pl: "W Polsce kluczowym rynkiem obrotu surowcami jest Towarowa Giełda Energii (TGE) w Warszawie, na której handluje się energią elektryczną i gazem. Z kolei Polska jest jednym z największych na świecie producentów miedzi i srebra dzięki koncernowi KGHM Polska Miedź, którego produkty spełniają rygorystyczne normy giełdowe i są sprzedawane na giełdach w Londynie i Nowym Jorku.",
    },
  },
};
