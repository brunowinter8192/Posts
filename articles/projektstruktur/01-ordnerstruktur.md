# Wie eine Projektstruktur in der Praxis aussieht

[Wie strukturiere ich ein Projekt in der Praxis, wie sieht eine Ordnerstruktur tatsächlich aus?](https://brunowinter8192.github.io/Posts/projektstruktur/00-arten-von-projekten/)

Grundlegend teile ich jedes Projekt in drei Bereiche, die jedem Repo innewohnen. Der source Bereich enthält den Code und die Docs, die den Code beschreiben. Der dev Bereich ist für Experimente und Proben reserviert. Der process-docs Bereich trägt die Prozessdokumentation ab.

```
projekt/
├── src/            Code und Code-Docs
├── dev/            Experimente, Proben, Messungen
└── process-docs/   Prozessdokumentation
```

## process-docs

Mit dem Aufbau der Dokumentation beginnt bei mir jedes Projekt, deshalb fange ich hier an. Die komplette Doku in einen einzigen Ordner zu werfen erachte ich als keine gute Idee, mit der Zeit verliert man schlicht den Überblick. Es braucht also eine Konvention, nach der die Prozessdoku in Abschnitte geteilt wird. Naheliegend wäre eine Teilung nach Zeit, also etwa die Arbeit von zwei Wochen in einen Ordner und dann beginnt der nächste. Besonders tragfähig ist das aber nicht, vor allem weil Themen aufeinander aufbauen. Brauche ich nach einer Weile die History zu einer Aufgabe, weiß aber nicht mehr, in welchem Zeitraum ich den Grundstein gelegt habe, stehe ich im Grunde vor der gleichen Situation, als hätte ich alles in einen Topf geworfen. Also thematisch teilen. Nur wie findet man eine allgemeingültige Regel dafür, wann die aktuelle Arbeit einen neuen Themenordner bekommt und wann sie in einen bestehenden gehört. Die Schwierigkeit liegt für mich vor allem darin, dass die Regel über alle Projekte hinweg gleich funktionieren soll, die Doku-Struktur soll überall dieselbe sein.

Diese Themenordner nenne ich Areas. Eine Area ist ein Arbeitsstrang, der über Sessions hinweg läuft und Einträge ansammelt. Wie bestimme ich aber jetzt, was eine Area ist, wie grenze ich Arbeitsstränge voneinander ab. Man könnte eine Area über ein festes Kriterium zuschneiden, etwa ein Feature, ein Produkt oder eine Untersuchung. Damit lässt man aber außer Acht, wie komplex so ein Kriterium werden kann. Wenn ich vorher nicht weiß, wie weit die Arbeit an einem Feature oder einer Untersuchung reicht, kann ich auch keine Teilungsregeln festlegen, die immer gelten. Meine Antwort darauf ist, die Teilung in jeder Session aufs Neue zu entscheiden, am konkreten Arbeitsbestand, statt sie einmal für alle Projekte festzuschreiben. Fest sind nur die Fragen, die der Agent dafür beantwortet.

Ein Ja auf eine dieser drei genügt für eine neue Area, die Bezugs-Area meint dabei die bestehende Area, auf deren Einträgen die aktuelle Arbeit aufbaut.

- Ist die Bezugs-Area auch Fundament für andere Arbeit, also eine geteilte Grundlage statt der private Vorgänger dieser einen Folgetask?
- Stützt sich die Arbeit neben der Bezugs-Area auch auf andere Areas?
- Hängt die Arbeit von gar keiner bestehenden Area ab?

Für das Weiterführen einer bestehenden Area gilt das Gegenstück, hier brauchen alle drei Fragen ein Ja.

- Besteht eine Abhängigkeit zu den Einträgen einer bestehenden Area?
- Ist das Fundament dieser Area im Wesentlichen das Fundament genau dieser Erweiterung und keiner anderen?
- Stützt sich die Arbeit allein auf diese eine Area?

Die Hürde für eine neue Area liegt damit niedriger als für das Weiterführen einer bestehenden. Das ist gewollt. Man neigt generell dazu, alles zusammenzuwerfen, und genau diesen Fall will ich verhindern.

## dev

Edits am Source Code selbst brauchen keinen eigenen Raum, mit git kann ich testen, reverten, committen, klare Sache. Für Untersuchungen, bei denen nicht klar ist, ob sie je in den Source kommen, für Exploration, für Messungen, für Code, der Bestandteil von Diskussionen ist, dafür ist dev da. Man widmet sich einer Aufgabe isoliert, ohne Dependencies aus dem Source. dev spiegelt damit die Prozessdoku, es ist das, was an persistentem Code und Ergebnissen neben ihr anfällt. Ob etwas in dev landet, entscheidet bei mir, ob die Probe oder ihr Ergebnis für einen Agent mit null Context in einer Folgesession potenziell hilfreich zu lesen wäre. Falls ja, gehört es in dev. Falls nein, bleibt es ein Wegwerf-Skript und verschwindet nach der Session.

Geteilt wird dev wieder in Areas, und die richten sich nach der Prozessdoku. Wo eine Untersuchung in process-docs eine Area hat, trägt der zugehörige dev Ordner denselben Namen. Ein Agent, der über die Doku in ein Thema einsteigt, findet damit direkt die Skripte und Messergebnisse, auf denen die Einträge beruhen.

## src

Bleibt der source Bereich, und der ist ehrlicherweise kaum meine Domäne, den Code liest und schreibt bei mir die KI. Die Trennung in Ordner überlasse ich dem Agent, sie folgt aber Regeln. Der Code gruppiert sich in Themenordner. Direkt im Source-Root darf eine Datei nur liegen, wenn mindestens zwei Themenordner sie brauchen oder ein externer Einstiegspunkt sie direkt lädt, alles andere wandert in seinen Themenordner. In jedem Themenordner liegt eine DOCS.md, die die Module genau dieses Ordners beschreibt, also Zweck, was ein Modul liest und schreibt, wer es aufruft, wovon es abhängt. Anders als die Prozessdoku wird diese Datei laufend aktualisiert, sie beschreibt immer den aktuellen Code. So sieht das in meinem Monitoring-Projekt aus.

```
monitor-cc/
├── src/
│   ├── constants.py
│   ├── utils.py
│   ├── core/
│   │   ├── DOCS.md
│   │   ├── monitor.py
│   │   └── ...
│   ├── proxy/
│   │   ├── DOCS.md
│   │   └── ...
│   └── ...
├── dev/
│   ├── rag_helpfulness/
│   └── ...
└── process-docs/
    ├── rag_helpfulness/
    └── ...
```

## Maintenance

Rules zur Struktur sind gut, sie zu maintainen ist der Schlüssel. Das war für mich das wichtigste Learning an der ganzen Sache. Rules, die etwas Permanentes auf der Platte hinterlassen und nicht in harte Hooks gebunden sind, werden nicht immer ad hoc befolgt, irgendwas rutscht immer durch. Es ist deshalb schlicht notwendig, die Struktur von Zeit zu Zeit zu prüfen. Bei mir läuft das über wiederverwendbare Skills, die ich in periodischen Abständen ausführe. Ein Skill scannt dann etwa die Platzierung und Größe der Module gegen die festen Regeln und was abweicht, wird nachgezogen.

Die Frage, die sich ergibt, ist:

- Wenn dieses System über Sessions gewachsen ist, wie finde ich dann in jeder neuen Session schnell einen Einstieg?
