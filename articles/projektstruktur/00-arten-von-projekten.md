# Arten von Projekten

Wenn ich privat mit KI arbeite, dann kenne ich zwei Arten von Projekten. Das eine sind Projekte, wo es mir nur auf die Ergebnisse ankommt, die ich sehen kann. Also ob das, was ich mir vorstelle, funktional passt, kann ich direkt visuell prüfen, oder indem ich die gewünschte Funktion probiere. Das sind eher einfache Projekte, da es auch in meinem Ermessensspielraum liegt, ob ich sage, das funktioniert so, wie ich es mir vorstelle, das ist oft eine gewisse Range. Bei der zweiten Art von Projekt gibt es keinen Ermessensspielraum, in dem ich sagen kann, diese Funktion passt mir so oder sie passt mir nicht, hier ist die Funktionalität entweder korrekt oder nicht korrekt.

Jedes Projekt will strukturiert sein, und es stellt sich die Frage, wie man ein Projekt strukturiert, in dem die KI der Haupttreiber der Content-Erstellung ist. Ich mache das abhängig von der Art des Projekts, die zwei oben genannten stehen im Raum.

In jedem Fall teile ich das Projekt in eine Prozessschicht und in eine Code-Schicht. Der Prozess läuft neben dem Code her, die Prozess-Docs werden einmal geschrieben und danach nicht mehr angefasst, sprich umgeschrieben. Die Code-Docs laufen neben dem Code her, werden laufend aktualisiert. Ziel der Prozess-Docs ist, abzutragen, wie der aktuelle Stand des Codes zusammenkommt. Es ist hier erwünscht, auch Dead Ends, Diskussionen ohne Ausgang, Stolpersteine und Pfade, die man verworfen hat, abzutragen. Also nicht einfach nur, wie der Code zustande kommt, sondern auch, was wurde alles diskutiert und probiert, bis der Code, wie er aktuell ist, zustande kam.

Die Code-Docs haben zum Ziel, einen schnellen Einstieg zu liefern. Funktionen von Modulen, Abhängigkeiten, Besonderheiten, Fallstricke. Alles, was direkt code-bezogen ist. Der Agent soll nicht zehn Module lesen müssen, sondern ein Doc und zwei oder drei Module.

Diese zwei Ebenen, Code und Prozess, spielen also zusammen. Nun stellt sich für mich als Nutzer die Frage, was ist denn meine Verbindung zum Projekt. Also wie greife ich auf das Projekt als Integrationsfläche zu. Hier kommen die zwei Arten von Projekten von oben zum Tragen. Bei Projekten, wo ich Ermessensspielraum habe, interagiere ich nur durch den Agent mit dem Projekt. Ich lese keine Datei direkt. Der Agent ist meine Verbindung zu den Inhalten, die bei mir auf der Maschine liegen, und zu den Ergebnissen. Bei der Art von Projekt ohne Ermessensspielraum habe ich als Nutzer einen Bereich neben dem Bereich der KI. Mein Bereich enthält Files, die ich wiederverwenden will. Alles, was in meinem Bereich liegt, habe ich gegengelesen und so gründlich verifiziert, dass ich es jederzeit wieder hervorholen und sofort verstehen kann. Es ist oft eine destillierte Version des KI-Bereichs, also der komplette Prozess, alle Experimente, alle Ergebnisse liegen im KI-Bereich, und eben nur der Weg, der zum finalen Ergebnis führt, und die finalen Ergebnisse liegen in meinem Bereich.

Meine Faustregel lautet also, habe ich keinen Ermessensspielraum, dann verifiziere ich, und wenn ich verifiziere, dann so, dass ich die Ergebnisse selber wiederverwenden kann.

Die Fragen, die sich ergeben, sind:

- Wie strukturiere ich dann ein Projekt in der Praxis, wie sieht eine Ordnerstruktur tatsächlich aus?
- Welche Regeln gibt es, damit die Bestandteile Code und Docs in einer einheitlichen Form geschrieben werden?
- Wie kann der Agent schnellstmöglich und tokensparendst den Stand eines spezifischen Arbeitsschritts innerhalb eines Projekts abrufen?
