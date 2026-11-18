import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text } from "../lesson/types";
import {
  BankLoanDiagram,
  CompoundDiagram,
  InterestDiagram,
  LoanCostDiagram,
  PercentDiagram,
  SaverDiagram,
  SplitDiagram,
} from "./interest.diagrams";
import { Garden, GardenWidget } from "./interest.toy";

export { grow, reachesTarget, TARGET_HIGH, TARGET_LOW } from "./interest.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

export const lesson: Lesson = {
  id: "interest",
  story: [
    animatedBeat(
      [
        T(
          "Remember Bea the baker? She keeps 100 coins safe in the town bank.",
          "Weißt du noch, Bea die Bäckerin? Sie bewahrt 100 Münzen sicher in der Stadtbank auf.",
          "Pamiętasz piekarza Beę? Trzyma bezpiecznie 100 monet w miejskim banku.",
        ),
        T(
          "Finn the fisherman wants a new boat, but he does not have enough coins.",
          "Fischer Finn möchte ein neues Boot, aber er hat nicht genug Münzen.",
          "Rybak Finn chce nową łódź, ale nie ma wystarczająco dużo monet.",
        ),
        T(
          "So the bank lends Bea's coins to Finn, and he can buy his boat. Finn borrows the money.",
          "Also leiht die Bank Beas Münzen an Finn, und er kann sein Boot kaufen. Finn leiht sich das Geld.",
          "Bank pożycza więc monety Bei Finnowi i ten może kupić łódź. Finn pożycza pieniądze.",
        ),
      ],
      BankLoanDiagram,
    ),
    animatedBeat(
      [
        T(
          "One year later, Finn pays the coins back. But he does not pay back only 100 coins. He pays back 105!",
          "Ein Jahr später gibt Finn die Münzen zurück. Aber er zahlt nicht nur 100 Münzen zurück. Er zahlt 105!",
          "Rok później Finn oddaje monety. Lecz nie oddaje samych 100 monet. Zwraca aż 105!",
        ),
        T(
          "The 5 extra coins are the price of the loan. Finn pays them to the bank, because he borrowed money.",
          "Die 5 Extra-Münzen sind der Preis fürs Leihen. Finn zahlt sie der Bank, weil er sich Geld geliehen hat.",
          "Te 5 dodatkowych monet to koszt pożyczki. Finn płaci je bankowi, ponieważ pożyczył pieniądze.",
        ),
        T(
          "This extra money has a name. It is called *interest*.",
          "Dieses Extra-Geld hat einen Namen. Es heißt *Zinsen*.",
          "Te dodatkowe pieniądze mają swoją nazwę. Nazywają się *odsetki*.",
        ),
      ],
      InterestDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Banks count interest in a special way. Finn pays 5 extra coins for every 100 coins he borrows, each year.",
          "Banken zählen Zinsen auf eine besondere Art. Finn zahlt jedes Jahr 5 Extra-Münzen für je 100 Münzen, die er sich leiht.",
          "Banki liczą odsetki w specjalny sposób. Finn płaci 5 dodatkowych monet za każde pożyczone 100 monet rocznie.",
        ),
        T(
          "That is 5 out of every hundred. Out of a hundred has its own name. It is called *percent*.",
          "Das sind 5 von hundert. Von hundert hat einen eigenen Namen. Es heißt *Prozent*.",
          "To oznacza 5 na każde sto. „Na sto” ma swoją własną nazwę. Nazywa się to *procent*.",
        ),
        T(
          "We write percent with a special sign: 5%. So Finn pays 5 percent interest a year.",
          "Prozent schreibt man mit einem besonderen Zeichen: 5 %. Finn zahlt also 5 Prozent Zinsen im Jahr.",
          "Procent zapisujemy specjalnym znakiem: 5%. Finn płaci więc 5 procent odsetek rocznie.",
        ),
      ],
      PercentDiagram,
    ),
    animatedBeat(
      [
        T(
          "The bank pays interest to Bea too, because her coins were lent out.",
          "Die Bank zahlt auch Bea Zinsen, weil ihre Münzen verliehen wurden.",
          "Bank płaci odsetki również Bei, ponieważ jej monety zostały pożyczone.",
        ),
        T(
          "Bea gets 3 extra coins each year for her 100 coins. That is 3 percent.",
          "Bea bekommt jedes Jahr 3 Extra-Münzen für ihre 100 Münzen. Das sind 3 Prozent.",
          "Bea otrzymuje co roku 3 dodatkowe monety za swoje 100 monet. To jest 3 procent.",
        ),
        T(
          "Finn pays 5 percent, but Bea gets 3 percent. The bank pays savers a bit less than borrowers pay.",
          "Finn zahlt 5 Prozent, aber Bea bekommt 3 Prozent. Die Bank gibt Sparern etwas weniger, als die zahlen, die sich Geld leihen.",
          "Finn płaci 5 procent, ale Bea dostaje 3 procent. Bank płaci oszczędzającym trochę mniej, niż pobiera od pożyczających.",
        ),
      ],
      SaverDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T(
          "Let's follow the extra coins. Finn pays the bank 5 coins of interest.",
          "Schauen wir uns die Extra-Münzen an. Finn zahlt der Bank 5 Münzen Zinsen.",
          "Prześledźmy dodatkowe monety. Finn płaci bankowi 5 monet odsetek.",
        ),
        T(
          "The bank gives 3 of them to Bea.",
          "Die Bank gibt 3 davon an Bea weiter.",
          "Bank przekazuje 3 z nich Bei.",
        ),
        T(
          "The bank keeps the other 2 coins.",
          "Die anderen 2 Münzen behält die Bank.",
          "Pozostałe 2 monety bank zatrzymuje dla siebie.",
        ),
        T(
          "Those 2 coins pay for the bank's work, and for loans that are never paid back.",
          "Mit diesen 2 Münzen bezahlt die Bank ihre Arbeit und auch Geld, das nie zurückkommt.",
          "Te 2 monety pokrywają koszty pracy banku oraz straty z pożyczek, które nigdy nie zostaną spłacone.",
        ),
      ],
      SplitDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Bea leaves all her coins in the bank. Let's pretend the interest is 10 percent, so the numbers are easy to see.",
          "Bea lässt alle ihre Münzen in der Bank. Tun wir so, als gäbe es 10 Prozent Zinsen, dann sind die Zahlen leicht.",
          "Bea zostawia wszystkie monety w banku. Wyobraźmy sobie, że oprocentowanie wynosi 10 procent, aby liczby były proste.",
        ),
        T(
          "After one year Bea has 110 coins: her 100, plus 10 extra.",
          "Nach einem Jahr hat Bea 110 Münzen: ihre 100 und 10 extra.",
          "Po roku Bea ma 110 monet: swoje 100 oraz 10 dodatkowych.",
        ),
        T(
          "In year two the bank pays interest on all 110 coins. That is 11 extra coins, not only 10!",
          "Im zweiten Jahr zahlt die Bank Zinsen auf alle 110 Münzen. Das sind 11 Extra-Münzen, nicht nur 10!",
          "W drugim roku bank nalicza odsetki od całych 110 monet. To aż 11 dodatkowych monet, a nie tylko 10!",
        ),
        T(
          "Interest that earns interest has a name. It is called *compound interest*.",
          "Zinsen, die selbst Zinsen bringen, haben einen Namen. Es heißt *Zinseszins*.",
          "Odsetki, które same zarabiają kolejne odsetki, nazywają się *procentem składanym*.",
        ),
      ],
      CompoundDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T(
          "Interest works for loans too. The higher the interest, the more Finn must pay back.",
          "Zinsen gibt es auch beim Leihen. Je höher die Zinsen, desto mehr muss Finn zurückzahlen.",
          "Odsetki działają także przy pożyczkach. Im wyższe odsetki, tym więcej Finn musi oddać.",
        ),
        T(
          "For 100 coins, Finn pays back 105 coins at 5 percent, but 110 coins at 10 percent.",
          "Für 100 Münzen zahlt Finn bei 5 Prozent 105 Münzen zurück, bei 10 Prozent aber 110 Münzen.",
          "Za 100 monet Finn oddaje 105 monet przy 5 procentach, ale 110 monet przy 10 procentach.",
        ),
        T(
          "If Finn pays back nothing for 10 years, the interest grows too. At 10 percent he would owe 259 coins!",
          "Wenn Finn 10 Jahre lang nichts zurückzahlt, wachsen auch die Zinsen. Bei 10 Prozent schuldet er dann 259 Münzen!",
          "Gdyby Finn nie spłacał niczego przez 10 lat, odsetki również by rosły. Przy 10 procentach byłby winien 259 monet!",
        ),
      ],
      LoanCostDiagram,
      "think",
    ),
  ],
  toyIntro: T(
    "Welcome to the money garden! Pick the coins, the interest and the years. Then switch to a loan and see what the same numbers cost.",
    "Willkommen im Geldgarten! Wähle die Münzen, die Zinsen und die Jahre. Schalte dann auf Geld leihen und sieh, was dieselben Zahlen kosten.",
    "Witaj w ogrodzie pieniędzy! Wybierz kwotę monet, odsetki i liczbę lat. Następnie przełącz na pożyczkę i zobacz, ile kosztują te same wartości.",
  ),
  Toy: Garden,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Interest is the price of a loan. Finn borrows 100 coins. Which loan costs Finn the most?",
        "Zinsen sind der Preis fürs Leihen. Finn leiht sich 100 Münzen. Welches Leihen kostet Finn am meisten?",
        "Odsetki to koszt pożyczki. Finn pożycza 100 monet. Która pożyczka kosztuje Finna najwięcej?",
      ),
      options: [
        {
          text: T("5 extra coins a year", "5 Extra-Münzen im Jahr", "5 dodatkowych monet rocznie"),
        },
        {
          text: T(
            "10 extra coins a year",
            "10 Extra-Münzen im Jahr",
            "10 dodatkowych monet rocznie",
          ),
          correct: true,
        },
        { text: T("2 extra coins a year", "2 Extra-Münzen im Jahr", "2 dodatkowe monety rocznie") },
      ],
      hint: T(
        "Interest is the price of the loan, so higher interest means Finn pays back more. With 10 extra coins he pays back 110.",
        "Zinsen sind der Preis fürs Leihen. Je höher die Zinsen, desto mehr zahlt Finn zurück. Mit 10 Extra-Münzen zahlt er 110 zurück.",
        "Odsetki to cena pożyczki, więc wyższe oprocentowanie oznacza większy zwrot. Przy 10 dodatkowych monetach oddaje 110.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Bea plants 100 coins in the money garden. Set the interest and the years so she ends with 150 to 170 coins. Then press Check.",
        "Bea pflanzt 100 Münzen in den Geldgarten. Stelle Zinsen und Jahre so ein, dass sie am Ende 150 bis 170 Münzen hat. Drücke dann Prüfen.",
        "Bea sadzi 100 monet w ogrodzie pieniędzy. Ustaw odsetki i lata tak, aby zakończyła z kwotą od 150 do 170 monet. Następnie naciśnij Sprawdź.",
      ),
      Widget: GardenWidget,
      hint: T(
        "Not in the green stripe yet. More interest or more years makes the pile bigger, less makes it smaller. Try again until the number is 150 to 170.",
        "Noch nicht im grünen Streifen. Mehr Zinsen oder mehr Jahre machen den Haufen größer, weniger machen ihn kleiner. Probiere, bis die Zahl 150 bis 170 ist.",
        "Jeszcze nie na zielonym pasku. Większe odsetki lub więcej lat powiększają stos, mniejsze go zmniejszają. Próbuj, aż liczba wyniesie 150 do 170.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Bea adds no new coins. Why does her pile still grow faster and faster over the years?",
        "Bea legt keine neuen Münzen dazu. Warum wächst ihr Haufen trotzdem mit den Jahren immer schneller?",
        "Bea nie dokłada nowych monet. Dlaczego jej oszczędności rosną z biegiem lat coraz szybciej?",
      ),
      options: [
        {
          text: T(
            "The bank raises the interest every year",
            "Die Bank erhöht jedes Jahr die Zinsen",
            "Bank co roku podnosi odsetki",
          ),
        },
        {
          text: T(
            "Bea saves a few more coins each year",
            "Bea spart jedes Jahr ein paar Münzen mehr",
            "Bea co roku odkłada kilka dodatkowych monet",
          ),
        },
        {
          text: T(
            "The extra coins start to earn extra too",
            "Die Extra-Münzen bringen selbst auch Extra",
            "Dodatkowe monety same zaczynają zarabiać kolejne monety",
          ),
          correct: true,
        },
      ],
      hint: T(
        "Bea leaves the extra coins in the bank. Next year they earn interest too. That is compound interest, and it makes the pile grow faster and faster.",
        "Bea lässt die Extra-Münzen in der Bank. Im nächsten Jahr bringen sie auch Zinsen. Das ist der Zinseszins, und er lässt den Haufen immer schneller wachsen.",
        "Bea zostawia dodatkowe monety w banku. W kolejnym roku one również przynoszą odsetki. To jest procent składany, dzięki któremu suma rośnie coraz szybciej.",
      ),
    },
  ],
  askDad: T(
    "Do we earn interest on any of our money, or pay interest on anything? Why do you think the bank pays savers less than borrowers pay?",
    "Bekommen wir Zinsen für unser Geld, oder zahlen wir irgendwo Zinsen? Warum zahlt die Bank Sparern wohl weniger, als Leute fürs Leihen zahlen?",
    "Czy dostajemy odsetki od naszych pieniędzy lub czy płacimy odsetki od czegokolwiek? Jak myślisz, dlaczego bank płaci oszczędzającym mniej, niż pobiera od pożyczających?",
  ),
  realLife: {
    title: {
      en: "Interest in India",
      de: "Zinsen in Deutschland",
      pl: "Odsetki w Polsce",
    },
    body: {
      en: "In India, interest is earned on savings accounts and fixed deposits (FD). Under Section 80TTA/80TTB of the Income Tax Act, individuals can earn interest up to ₹10,000 (or ₹50,000 for senior citizens) tax-free. For loans, RBI mandates disclosing the APR (Annual Percentage Rate) so borrowers know the full yearly cost.",
      de: "In Deutschland heißt das Extra Zinsen. Bei einem Tagesgeldkonto kannst du dein Geld jeden Tag abheben, und die Bank darf ihre Zinsen jederzeit ändern. Jeder Erwachsene darf bis zu 1.000 Euro Sparzinsen im Jahr ohne Steuern verdienen, wenn er es seiner Bank sagt (über Steuern lernst du später). Für Kredite müssen Banken und Läden den effektiven Jahreszins zeigen, eine Jahreszahl mit allen Kosten, damit man vergleichen kann.",
      pl: "W Polsce dodatkowe pieniądze z oszczędności lub koszt pożyczki to odsetki. Banki oferują konta oszczędnościowe oraz lokaty terminowe. Od zysków z odsetek pobierany jest 19% podatek od zysków kapitałowych (tzw. podatek Belki). Przy kredytach banki muszą podawać RRSO (Rzeczywistą Roczną Stopę Oprocentowania), która uwzględnia wszystkie koszty pożyczki.",
    },
  },
};
