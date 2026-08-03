# Handover B

[Wie kann man den Handover zwischen Main Agent und User, aber auch zwischen Worker und Main Agent beeinflussen? Welche rules kann man setzen und wie erzeugt man einen Bias in eine bestimmte Richtung?](https://brunowinter8192.github.io/Posts/orchestrierung/02-mechanik-der-orchestrierung/)

## Thema
Kurzer Recap zum Artikel handover A. Ein handover ist immer die Übergabe von der ausführenden an die steuernde Partei. Er erfolgt immer am Ende eines turns. Wie ich einen turn definiere habe ich geklärt.

Im Laufe des Artikels A wurde schnell klar, dass sich alles auf den Austausch zwischen Main Agent und User fokussiert:

Der trigger für den handover als decision-required exchange und die Form des handovers nur definiert durch das Emote, welches den decision-required exchange kennzeichnet. Die Abgrenzung, dass ein turn auch enden kann wenn ein timer für einen Worker gesetzt wird, ohne dass ein handover erfolgt.

Es wurde also der handover Worker zu Main Agent bisher noch gar nicht beleuchtet. Darum sollen sich die folgenden Abschnitte drehen.

## Trigger und Form für den Handover Worker zu Main

Der trigger für den handover Worker zu Main ist deutlich einfacher. Ein handover erfolgt, wenn die Aufgabe erledigt ist, die der Main erteilt hat. Es geht immer um eine konkrete, greifbare Aufgabe bestehend aus n items.

Hier ist es möglich die Form des handovers als template vorzugeben. Ich habe das in den rules, die ausschließlich der Worker injected bekommt, dargestellt als Completion Checklist:

```
COMPLETION CHECKLIST:
- [x] <item 1>: <concrete result>
- [x] <item 2>: <concrete result>
- [ ] <item 3>: FAILED — <reason>
```

Die items schreibt der Main Agent pro Aufgabe in den Worker-Prompt. Das template gibt den Rahmen vor und dazu die Anforderung, dass die Ergebnisse konkret sein müssen, also Dateipfade, Zahlen, konkrete Werte statt "done" oder "verified".

Die rules für den Main Agent, welche die Anforderung zur Completion Checklist im Worker-Prompt tragen: [`opus/workers.md`](https://github.com/brunowinter8192/GlobalRules/blob/main/opus/workers.md)
Die rules für den Worker, welche die Form der Completion Checklist tragen: [`worker/worker-rules.md`](https://github.com/brunowinter8192/GlobalRules/blob/main/worker/worker-rules.md)

## Ausnahmen des Handover Triggers bei Worker zu Main

Der trigger wurde eingeführt als Beendigung der Aufgabe. Nun kommt es aber häufig vor, dass eine Aufgabe vom Worker nicht beendet werden kann. In den rules habe ich Ausnahmetrigger für die drei von mir am häufigsten beobachteten Fälle abgetragen, in denen eine Aufgabe nicht abgeschlossen werden kann. Tritt einer dieser Fälle ein, triggert er einen handover des Workers zum Main.

Der erste Fall ist, dass die Aufgabe aufgrund Mangels externer Ressourcen nicht abgeschlossen werden kann. Der Worker beschafft grundsätzlich keine externen Ressourcen, sondern bekommt alles was er für die Aufgabe braucht vom Main Agent. Es kann also der Fall eintreten, dass der Worker feststellt, er braucht für die Beendigung der Aufgabe z.B. eine Formel, eine Dokumentation, ein paper, eben generell eine Information die außerhalb der codebase liegt.

Der zweite Fall besteht in einer widerlegten Hypothese. Das Ziel der Aufgabe ist klar, jedoch erweist sich der vom Main Agent vorgegebene Weg als grundlegend falsch. Eine neue investigation wäre notwendig, welche die Aufgabe neu auslegen würde.

Der dritte Fall äußert sich in Fehlern in den tool calls. Die Hypothese hält, die externen Ressourcen sind da, aber zum Beispiel das Bash tool funktioniert nicht wie erwartet und der Worker kann daher die Aufgabe nicht umsetzen.

Für alle drei Fälle gibt es ein zweites handover template:

```
STOP: <what blocked you>
Expected: <what should have happened>
Actual: <what happened, with concrete evidence — log lines, raw response, traceback, not a summary>
Hypothesis: <one hypothesis for the cause>
Suggested next step: <debug script / config change / upstream research / abort>
```

Die Ausnahmen sind in den folgenden Abschnitten der rules reflektiert

- [Code Investigation — Files Only, No External Access](https://github.com/brunowinter8192/GlobalRules/blob/main/worker/worker-rules.md)
- [Don't Debug-Loop — Stop at the Threshold, Report to Opus](https://github.com/brunowinter8192/GlobalRules/blob/main/worker/worker-rules.md)
- [Stop after 2 failed tool calls](https://github.com/brunowinter8192/GlobalRules/blob/main/global/tool-use.md)

## Zusammenfassung

Die handovers Main zu User und Worker zu Main lassen sich also über zwei Dinge abgrenzen, über ihren trigger und über ihre Form.

Der trigger beim handover Main zu User ist ein decision-required exchange. Der trigger beim handover Worker zu Main ist die Beendigung der Aufgabe oder eine der Ausnahmen. Bei beiden ist das Ende eines turns nicht automatisch ein handover. Der Main Agent wie auch der Worker können ans context limit geraten und den turn beenden, der Main kann zusätzlich einen timer für den Worker stellen und den turn damit ohne handover beenden.

Die Form des handovers Main zu User ist nur grob durch das Emote geregelt, hingegen ist die Form des handovers Worker zu Main durch templates beschrieben.
