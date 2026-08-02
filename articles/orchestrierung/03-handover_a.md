# Handover A

[Wie kann man den Handover zwischen Main Agent und User, aber auch zwischen Worker und Main Agent beeinflussen? Welche rules kann man setzen und wie erzeugt man einen Bias in eine bestimmte Richtung?](https://brunowinter8192.github.io/Posts/orchestrierung/02-mechanik-der-orchestrierung/)

Zunächst einmal beschreibe ich einen Handover als einen Bottom up Vorgang bei dem Informationen weitergereicht werden. Betrachtet man die 3 Parteien User, Main Agent und Worker, so finden handovers statt vom Worker an den Main Agent und vom Main Agent an den User. Ein handover ist also immer die Übergabe von der ausführenden an die steuernde Partei. Er erfolgt immer am Ende eines turns.

## Was ein Turn ist

Anthropic definiert in ihrer Doku was ein turn ist wie folgt:

> **A tool-use loop is one assistant turn.** From the model's perspective, an assistant turn doesn't complete until Claude finishes its full response, which may include multiple tool calls and results. This whole sequence is a single assistant turn:
>
> ```
> User: "What's the weather in Paris?"
> Assistant: [thinking] + [tool_use: get_weather]
> User: [tool_result: "20°C, sunny"]
> Assistant: [text: "The weather in Paris is 20°C and sunny"]
> ```

https://platform.claude.com/docs/en/build-with-claude/thinking — Stand 02.08.2026

Anthropic definiert einen turn also als alles was an die API geht, beginnend beim user block und endend beim letzten block des Assistenten. Ich definiere in meinen rules für opus einen turn konzeptionell nur als das was der Assistant in Reaktion auf meine message tut.

```
Assistant: [thinking] + [tool_use: get_weather]
User: [tool_result: "20°C, sunny"]
Assistant: [text: "The weather in Paris is 20°C and sunny"]
```

Diese Definition ermöglicht Parteientrennung. Ein turn ist also strikt das was der Agent tut und hat erstmal nur mit meiner message zu tun in dem Sinne, als dass der turn eine Reaktion auf sie ist. Würde ich auch meine message mit in den turn fassen, dann wären meine rules nicht einzuhalten.

Unterteilt habe ich die Bestandteile eines turns nach dem was für mich direkt sichtbar ist. Tool uses, sprich bash read write usw zum einen und den chat output zum anderen. Den Chat output habe ich wiederum unterteilt in Action frames und Exchanges.

### Action frame

Ein action frame beschreibt n tool calls. In der Praxis ist der Agent in der Lage die als blockquote zu rendern, das sieht dann so aus.

> beschreibung tool use 1 2 3
> beschreibung tool use 4 5
> beschreibung tool use 6

Sein Wert liegt darin, dass er die Handlungsbeschreibung aus den exchanges raushält und diese damit nicht verwässert.

Da die Definition Action frame von mir stammt und der Agent sie ohne rules nicht kennt und nicht anzuwenden weiß, habe ich sie in meinen rules eingefügt, nachzulesen in [`opus/communication.md`](https://github.com/brunowinter8192/GlobalRules/blob/main/opus/communication.md).

### Exchange

Ein exchange ist das was der Main Agent auf Prozessebene als für den User relevant klassifiziert. Träger von Prozessinformationen zu sein ist die Bedingung dafür, dass ein chat output überhaupt ein exchange wird. Ein exchange gliedert sich immer in den point in bold und die explaination mit Zeilenumbruch darunter.

Nun ist aber die Klassifizierung danach ob etwas für den User auf Prozessebene relevant ist eine ziemlich dehnbare Formulierung. Der Agent und ich als User haben sehr verschiedene Vorstellungen davon was relevant ist und was nicht. Tendenziell klassifiziert der Agent eher zu viel als zu wenig als prozessrelevant.

Ich habe daher eine weitere Art exchange definiert, die sich dadurch vom "normalen" exchange abhebt dass sie eine Interaktion des Users fordert. Eine Interaktion ist hier primär eine Entscheidung. Ein decision-required exchange ist also die Aufforderung an den User eine Entscheidung zu treffen.

Dieser Typ wird auch anders gerendert. Kein point in bold mit explaination darunter, sondern eine Zeile mit einem roten Emote davor.

Ich habe solche decision-required exchanges in meinem session workflow auch als gates formuliert, nachzulesen in [`opus/workers.md`](https://github.com/brunowinter8192/GlobalRules/blob/main/opus/workers.md). Opus muss also nicht zwangsläufig die Entscheidung treffen an welcher Stelle ein decision-required exchange zu setzen ist, in der Planungsphase habe ich das bereits übernommen.

## Turn-Enden für den Main Agent

Generell kann ein turn erstmal unendlich lange laufen. Gut, im Abo Modell bei opus 5 bis 1M token, irgendwann terminiert ein turn also, aber theoretisch könnten die vollen 1M token in einem turn konsumiert werden. Nun hätte ich natürlich gerne, dass der Agent den turn aber zumindest vor der 1M token Schwelle beendet, bestenfalls an einer geeigneten Stelle inklusive handover, sodass die steuernde Partei reagieren kann.

Für den Main Agent habe ich zunächst 2 grundlegende Fälle definiert die seinen turn beenden. Entweder ein decision-required exchange oder ein Timer bei vorherigem dispatch an einen Worker.

Der Zweck den die exchanges also erfüllen ist zum einen den User zu informieren, zum anderen dem Agent eine Entscheidungsgrundlage zu geben auf deren Basis er einen turn beenden kann. Die Abgrenzung des decision-required exchange ist damit nicht primär ein Werkzeug für den User um schnell scannen zu können was der aktuelle Stand ist, sondern um für den Agent enger zu fassen wann er den turn beenden sollte.

Wie bereits oben gesagt ist ein Informationsbedarf ein dehnbarer Begriff. Würde man das Turn-Ende auf einen einfachen exchange legen, egal welcher Art, so würde der Agent praktisch dauernd stoppen. Erst diese Erfahrung in der Praxis hat mich dazu gebracht den exchange noch einmal aufzubrechen.

## Probleme und Lösungen für den decision-required exchange

Nun haben wir also schonmal eine Entscheidungshilfe. Informationsbedarf gegen Entscheidungsbedarf. Das ist schonmal eine Verschiebung von Einbeziehung des Users bei einer Prozessinformation hin zu Einbeziehung des Users bei einer Prozessentscheidung.

Jetzt habe ich das Problem der vorzeitigen Turn-Beendung aber nur verlagert. Entscheidungsbedarf ist ebenfalls ein dehnbarer Begriff. Ziehe ich hier keinen Bias ein, so wird der Agent, opus 5 in meinem Fall, zuverlässig Dinge als User-Entscheidung klassifizieren die mit dem Prozess wenig und mit der Implementierung viel zu tun haben.

Es soll also noch stärker in Richtung Autonomie des Agents gedrückt werden.

Der Bias besteht bei mir aus mehreren Teilen. Zunächst, wenn der Agent sich fragen muss ob eine Information für den User kritisch ist, dann ist sie es nicht. Bei wirklich kritischen Informationen kommt die Frage gar nicht erst auf. Das Abwägen selbst ist schon die Antwort.

Des weiteren die Frage ob der turn auch ohne den User weiterlaufen kann. Kann der turn auch ohne den User weiterlaufen oder sind alle offenen Aktionen durch die User-Entscheidung blockiert. Der Agent soll erst stoppen wenn wirklich alles an der User-Entscheidung hängt.

Eine Ergänzung zum ersten Teil ist die rule, dass der Agent im Zweifel selber entscheiden soll. Der erste Teil des Bias sagt also, wenn Zweifel bestehen ob es eine userkritische Entscheidung ist, dann ist es keine. Die rule ergänzt nun aber, wenn ein solcher Zweifel auftrat, dann soll er vor Ende des turns noch einmal im Chat als exchange genannt werden inklusive der Entscheidung. Das soll den Agent dazu anhalten selber zu entscheiden und ihm auch das Sicherheitsnetz mitgeben, dass der User es gegenprüfen wird.

## Alternativen einen Bias in Richtung autonomes Arbeiten zu legen

Anthropic beschreibt in ihrer Doku folgendes Muster inklusive Lösung in Bezug auf das Modell fable 5:

> Deep into a long session, Claude Fable 5 can occasionally end a turn with a text-only statement of intent ("I'll now run X") without issuing the corresponding tool call, or pause to ask permission when it already has enough to proceed.

Ihr Gegenmittel, ein System-Reminder für autonome Pipelines:

> You are operating autonomously. The user is not watching in real time and cannot answer questions mid-task, so asking "Want me to…?" or "Shall I…?" will block the work. For reversible actions that follow from the original request, proceed without asking. Offering follow-ups after the task is done is fine; asking permission after already discussing with the user before doing the work is not. Before ending your turn, check your last paragraph. If it is a plan, an analysis, a question, a list of next steps, or a promise about work you have not done ("I'll…", "let me know when…"), do that work now with tool calls. End your turn only when the task is complete or you are blocked on input only the user can provide.

https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5 — Stand 02.08.2026

Die Anthropic Empfehlung für fable 5 weist Parallelen zu meinem Konzept des decision-required exchanges auf.

> End your turn only when the task is complete or you are blocked on input only the user can provide.

Es wird hier nicht zwischen decision requiring und reiner Prozessinformation unterschieden, sondern die Entscheidung für den Agent deutlich vereinfacht. Ein turn endet wenn der Rest der Arbeit an einem user input hängt. Ob das in der Praxis besser funktioniert oder noch zu lasch ist und den Agent dazu bringt öfter user input anzufordern als notwendig, kann ich nicht beurteilen.

Dennoch war es ein interessanter Fund in der Dokumentation, der zeigt dass auch Anthropic das Legen eines Bias empfiehlt um autonomes Arbeiten zu begünstigen.

Fairerweise muss man feststellen, dass auch mit meinem aktuellen Regelwerk weiterhin genau das von Anthropic beschriebene Problem auftritt.

![Turn-Ende mit einer Ankündigung statt einer Handlung](/Posts/images/orchestrierung/doubts-terminal.png)

Der letzte Satz ist eine Ankündigung, "Ich gehe jetzt in die GitHub-Runde", und ausgeführt wurde sie erst nach meinem ok. Genau das "I'll…" aus dem Anthropic System-Reminder. Daher werde ich hier noch weiter tunen und falls sich substanziell etwas an den rules ändert dazu nochmal was schreiben.

