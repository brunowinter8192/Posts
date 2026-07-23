wie evaluiert man ein rag system. 
wir nehmen den korpus an daten den man hat, synthetische daten sind eine option, ich wollte aber direkt darauf fahren auf den daten die ich auch jeden tag querie. das ist ein korpus aus etwa 80 papers und büchern in einem repo. größtenteil statistik, trading als hintergrund. latex konvertierung mit mineru bildet den echten use case ab. also konvertierungsartefakte aller art, englische sprache only. 

evaluiert weden soll auch an einer realen situation. in der realen arbeit mit einem agent betrachte ich 3 ebenen. die kommunikation zwischen mir und dem agent ist die meta ebene des topics. in einer diskussion oder basierend auf arbeitsergebnissen kommen fragne auf diese sollen an literatur geklärt werden. diese ebene ist die erzeugte notwendigkeit für eine query. eine query ist eben 2, das ist letztendlcih das was der agent in das rag system tippt. woran die vektorbase durchsucht wird. in der praxis, sofern keine guardrails gesetzt neigt opus 4.8 dazu eine query zu stellen mit 3 kleinen teilqueries. ein beispiel ist. 

Beispiel:

Ein arbeitsschritt war es teile von files zu lesen und das in bestimmten abschnitten behandelte thema zusammenzufassen. Meine frage an den agent war ob wir mit literatur grounden können wie lang eine solche zusammenfassung sein sollte und wie viele zeilen, ob es da eine range gibt die zusammengefasst werden könnte. 

die daraus resultierende query:
relevance judgment granularity passage sentence document level qrels annotation unit graded

hier zeigt sich klar das die query verscheiene keywords aneinaderreiht ohne native frageform oder natrülcihe aussprache. es geht viel mehr um eine art bm25 fitting womit der agent sich erhofft treffer zu hitten welche eben das thema rahemn. ob das der richtige weg ist bleibt auch zu testen. es kann gut sein das es durchaus mehr sinn macht von ebene 3 nach ebene 2 zu wecheln indem man aus dem meta context eine einfache frage in natrülicher aussprache formuliert anstatt keywords aneinenderzuketten. vorerst wir aber bei dem prinzip geblieben, es ist die nativ von opus verwenete art queries zu formulieren und alternativen sind bis dato nicht evaluiert. 












#
Wir haben jetzt das problem das wir erst einmal nur eine md haben und diese in thmeenbereiche teilen müssen. Das heißt das thema muss inhaltlich zusammenhängend sein nicht nur semantisch. 

#
Wenn wir jetzt sagen das wir ein thema definieren weil es semantisch zusammen hängt das ist das die erste sache aber man sollte die roadmap im kopf behalten.

#
Mds in themes teilen. diese themen zusammenfassen. basierend auf der zusammenfassung eine query formulieren, unter der prämisse das die zusammenfassung die themen aus der query aufgreift

#
mein problem ist das du ja im grunde keine sematischen zusammenhänge wilst sondern in der echten welt willst du eben thematische zusammenhänge. die semantik spielt weniger eine rolle. 

#
vorteil bei raptor ist das wir in der lage sind wirklich jede md schnell ohne großen einsatz von workern zu trennen. aber ob die themen inhaltlich zusammenhängen das ist eben fraglich


# 
wir drehen uns wieder im kreis. wenn man themen auf inhaltlichem zusammenhang erstellen will, dann macht man das am besten mit einem llm. das llm bruahct aber eben irgendwelche regeln. also wie definieren wir ein in sich egschlossenes them, sagen wir das thema muss in einem zusammenhängenden zeilen korpus leben oder sind verstreute themen auch zulässig. das ist ja genau die frage die wir eigentlcih mit den papers beantworten wollen. gibt es möglichkeiten zu deifniieren was in inhaltlicher zusammenhang ist. damit das llm irgendwelceh rules hat, weil sonst, wie llm eben sind, halluziniert es regeln und dann gibt es nur chaos. keiner kann dann sagen, wir haben die thmeen genau deswegen so geteilt, und das bricht das genick.










