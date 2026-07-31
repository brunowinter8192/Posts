# Mechanik der Orchestrierung

Betrachte ich Orchestrierung in der Praxis, dann gehe ich von 3 Parteien aus. User, Main Agent, Worker. Als Worker bezeichne ich die vom Main Agent gespawnten Agents. Ich als User kommuniziere direkt nur mit dem Main Agent. Die Orchestrierung als Vorgang ist ein loop, der aus den folgenden Schritten besteht.

1. User und Main handeln eine Aufgabe aus.
2. Main delegiert Implementierungsaufgaben an den Worker.
3. Worker arbeitet.
4. Worker geht idle, Main wacht auf.
5. Zurück zu 2 oder zu 1.

## User und Main handeln eine Aufgabe aus

Ausgangspunkt kann eine issue sein oder eine Diskussion mit open end, aus der sich mit der Zeit eine konkrete Implementierungsaufgabe kristallisiert. Am Ende dieser Phase muss der Main Agent in der Lage sein, die Aufgabe selber durchzuführen.

Der Grund für den vollen Informationsbedarf des Main Agents liegt darin, dass es seine Aufgabe ist die Arbeit der Worker zu kontrollieren. Als Beispiel, es soll ein feature implementiert werden und dazu gibt es schon eine Vorgeschichte in der Prozessdoku. Der Main Agent handelt mit mir auf Prozessebene aus was zu tun ist und wie das Endergebnis aussehen soll.

Würde er dann einen Worker für die code investigation spawnen, so wäre der Main Agent vom Informationsstand gleich mit mir als User. Er könnte auf Codeebene nicht mit dem Worker kommunizieren und müsste sich auf dessen output verlassen.

Wer welche Domain steuert ist also aufgeteilt. Ich als User steuere den Prozess, kann live Ergebnisse validieren und mit dem Main Agent basierend auf den Ergebnissen auf Prozessebene kommunizieren. Der Main Agent kennt sowohl den Prozess als auch den Code und vermittelt zwischen beiden Ebenen. Der Worker steuert nichts, er kennt nur den Code und kommuniziert ausschließlich mit dem Main Agent auf Codeebene.

## Main delegiert Implementierungsaufgaben an den Worker

Ein Worker ist bei mir identisch zu einer normalen Claude Code Session. Das eingebaute CC native subagent feature nutze ich nicht. Ein Worker wird gespawnt indem eine neue tmux Session geöffnet wird, der genaue Mechanismus ist unter https://github.com/brunowinter8192/iterative-dev nachlesbar.

Worker spawnen immer in worktrees. So lassen sich die gates leichter enforcen, an denen der Main Agent die Arbeit abnimmt.

## Worker arbeitet

Während der Worker arbeitet, soll der Main Agent grundsätzlich idle sein. Er muss aber wieder aufwachen können, sobald der Worker seinerseits idle geht. Gelöst habe ich das über background calls. Aus den vorherigen Artikeln ist bekannt, dass ein terminierender background call einen idle Agent aufweckt.

Der background call meiner Wahl ist ein 55 min sleep command. Der TTL des prompt cache liegt bei einer Stunde. Ist ein Agent bei CC länger als eine Stunde inaktiv, wird der cache geleert und man zahlt einen vollen cache create. 55 Minuten bleiben darunter und decken in der Regel alles ab, meistens sind die Worker deutlich früher fertig.

## Worker geht idle, Main wacht auf

Geht der Worker früher als 55 min idle, so wird der Timer abgebrochen, vorausgesetzt in der Worker Session laufen keine backgroundeten tool calls. Der command failed also. Hier greift das Ergebnis aus [Artikel 01](https://brunowinter8192.github.io/Posts/orchestrierung/01-commands-im-background/). Durch die standardisierte injection ohne completed oder failed ist es unerheblich, wie der command endet. Das einzige was passiert ist, dass der Main geweckt wird und den Worker kontrollieren kann.

Der Abbruch ist bei mir im Repo https://github.com/brunowinter8192/monitor-cc implementiert.

### Fehler-Pattern, verschachteltes Backgrounding

Der Grund dafür, dass der Timer nicht abbrechen darf sofern der Worker idle ist aber einen background call laufen hat, ergibt sich aus folgendem beobachteten Fehlerpattern.

1. Worker startet einen command, der auto backgrounded wird.
2. Worker geht korrekt idle.
3. Timer des Main bricht ab, Main wacht auf.
4. Main sieht nicht, dass der Worker noch einen Prozess laufen hat.
5. Main stößt den Worker an. Der pollt jetzt entweder, oder geht korrekt wieder idle.
6. Main stellt wieder einen Timer, der wieder abgebrochen wird, sofern der Worker korrekt idle geht.

Am Ende verfällt entweder der Worker in einen polling loop oder der Main.

## Zurück zu 2 oder zu 1

Zurück zu 2 ist in den meisten Fällen kein Problem, der Main delegiert einfach eine Folgeaufgabe. Interessant wird zurück zu 1, also der Moment in dem der Main Agent von sich aus stoppen und den User wieder mit ins Boot holen soll. Das ist die kritischste Stelle am ganzen orchestration loop, weil man sie nicht an einer harten Regel festmachen kann.

Anstatt einer harten Regel hat es sich bei mir bewährt einen Bias zu setzen, der ergänzt wird um situationsspezifische harte rules. So einen Bias für das gewünschte Verhalten zu kalibrieren ist bei mir viel trial and error und hängt auch davon ab wie man gerne arbeitet. Man muss herausfinden was für die eigene Arbeitsweise funktioniert.

Legt man den Bias zu sehr in Richtung ins Boot holen, ist autonomes Arbeiten kaum möglich. Der Main Agent stoppt bei jeder Kleinigkeit die nicht exakt mit dem User abgesprochen ist und interpretiert Dinge als entscheidungsbedürftig, die eigentlich nur Beobachtungen sind ohne Entscheidungsnotwendigkeit. Legt man ihn zu sehr in Richtung autonomes Arbeiten, kommt es schnell zu einem drift und der Main Agent implementiert Dinge, die nicht gefordert sind oder in eine andere Richtung gehen als abgesprochen. Legt man gar keinen Bias, muss man sich auf das Modell und dessen Eigenheiten verlassen.

Es stellt sich nun die Frage wie man also den Handover zwischen Main Agent und User, aber auch zwischen Worker und Main Agent beeinflussen kann. Welche rules kann man setzen und wie kann man einen Bias in eine bestimmte Richtung erzeugen?
