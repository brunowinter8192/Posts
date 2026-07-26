# Wie der Einstieg in eine Session läuft

[Die Ordnerstruktur ist klar, aber wie finde ich jetzt zu Beginn jeder Session den Einstieg?](https://brunowinter8192.github.io/Posts/projektstruktur/01-ordnerstruktur/)

## Rahmen für den Einstieg

Generell lautet mein Ziel jeder Session Konsistenz. Bei LLMs kann ich nur den Rahmen stecken, und da spielen vor allem die Rules, die man als System Prompt einpflegt, die größte Rolle. Mir geht es darum, dass mir der Anfang einer Session bekannt vorkommt, der Ablauf, egal welches Modell ich nutze.

Als Zweites geht es bei mir zu Beginn einer Session vor allem immer um schnelle Informationsbeschaffung. Für bereits angefangene Arbeit fand ich Tracking mit GitHub Issues komplett ausreichend. Wobei die Issues bei mir nur einfache Pointer auf den Prozess sind, sie zeigen auf die Area der process-docs und beinhalten eine RAG query, mit der ich sofort die Arbeit aufnehmen kann. Werden sie geschlossen, bleibt die History bestehen.

## Einstieg Ablauf

Der eigentliche Einstieg ist dann zweigeteilt. Zuerst werden nur die process-docs konsultiert und sonst nichts. Das ist für mich als Nutzer der wichtigste Punkt. Habe ich nur den Agent als Kontaktfläche zum Projekt und keinen eigenen Bereich, bleibt mir nur die Erinnerung an die letzte Session. Auf reiner Prozessebene kann ich am besten mitreden, kann einschätzen, ob mir etwas noch präsent ist, kann Fragen stellen und Wege offenlegen, die beschritten und wieder verworfen wurden. Konkrete Implementierungen oder Messergebnisse in Zahlen kann ich ohne eigenen Bereich kaum recallen. Erst wenn auf purer Prozessebene klar ist, was bisher getan wurde und was diese Session passieren soll, gibt der Agent seine Einschätzung ab, ob für die Arbeit eine neue Area aufgemacht wird oder eine bestehende weiterläuft.

Danach kommt als zweiter Teil die Investigation des Codes inklusive Gap-Analyse, wieder über RAG auf die Code docs und anschließend das Lesen der relevanten files. Der Code ist an sich nicht meine Domäne. Meine Domäne als Nutzer ist die Sicht auf das Projekt auf Prozessebene, ich denke in Systemen, Abläufen und Worten, nicht in Code. Deswegen habe ich die Gates so gewählt, dass ich auf eben dieser Ebene in den Ablauf der Session eingreifen kann. Nach der Investigation des Codes identifiziert der Agent Gaps, und ein Gap ist im Grunde eine Unwägbarkeit, die eine straight forward Implementierung blockiert.

Gaps können durch Experimente in dev oder durch externe Ressourcen geschlossen werden, und vor allem die externen Ressourcen holen mich wieder rein. Eine externe Ressource wie ein Paper oder eine mögliche Diskussion der Community auf Reddit oder GitHub, aber auch ein Repo auf GitHub, hier kann ich wieder mitreden.

Die Schwierigkeit bei den externen Ressourcen ist es, den Agent dazu zu bringen, externen Bedarf überhaupt erstmal anzumelden. Ich habe die Erfahrung gemacht, dass das Modell eher dazu neigt zu sagen, dass alles da ist und man müsse nur eine Hypothese durch Experiment prüfen. Oft hängt man dann aber nach 2 Stunden an der dritten verworfenen Hypothese und ist keinen Schritt weiter, obwohl eine Konsultation externer Information den Gap innerhalb von kürzester Zeit geschlossen hätte. Deswegen habe ich das Gate für externe Informationen bewusst niedrig gehalten, ich gebe dem Agent nur vor, externen Bedarf anzumelden, mehr nicht. Das löst mehrere Probleme. Zum einen spart es Token. Recherchen laufen über Skills, die erst bei konkretem need invoked werden, und System Prompt wie Tools bleiben frei von Erklärungen, die nicht jede Session gebraucht werden. Des Weiteren hat der Agent mit Anmelden des Bedarfes sich schon auf eine Lane, zum Beispiel GitHub, committed, hat die Lane begründet und genau spezifiziert, welche Informationen er braucht, das heißt die folgende Recherche wird viel zielführender. Und der wichtigste Punkt ist, dass der Agent durch das Anmelden des Bedarfs, also eine potentiell schnelle Schließung des Gaps, überhaupt erstmal geneigt ist, die externen Ressourcen den Experimenten vorzuziehen. Die Rule ist bewusst so konzipiert, dass nur ein Bedarf angemeldet werden muss und nicht gesagt wird, dass eine Recherche folgen wird.

Den kompletten Session workflow, den ich täglich nutze, habe ich [hier](https://github.com/brunowinter8192/GlobalRules/blob/main/opus/workers.md) verlinkt.

Die Fragen, die sich ergeben, sind:

- Welche Möglichkeiten habe ich noch, Konsistenz zu schaffen?
- Wie sieht im Anschluss die Implementierung aus, wo habe ich als Nutzer hier meine Gates?
