# Transcript Team Reise

- Intervjuer: Martin Lehmann
- Intervjuperson: Stig Kleppe-Jørgensen (Team Lead for Team Reise i FINN.no)
- Tid: 22. januar, 2016 10:00–11:00
- Sted: FINNs kontorer i Grensen 5–7

## Innhold

- I: Jeg håper du kan fortelle meg, begynne med å bare fortelle meg littegrann om hvordan dere har strukturert teamet deres og hva som er bakgrunnen for [automatisering]
- S: Ja, eehh, flesteparten av oss begynte i reise i 2013, eller 2012-2013. Reise hadde en plattform som, ja, ikke skalerte godt nok på alle måter, og hadde en tredjepart som vi snakket med for å hente ut reisemål, altså, for å legge ut på site-en, som ikke var helt optimal. Brukte lang tid på å legge til nye leverandører, ehh, og vi hadde liten oversikt over hvordan ting fungerte der. Og da ble det bestemt at vi  skulle lage en helt ny plattform og starte helt fra scratch. Så da kom vi i FINN, vi var vel sånn ca 16 utviklere som startet, som ble delt opp i fire team som alle skulle være mer eller mindre autonome.
- I: Hvorfor valgte dere det?
- S: Det var jo for å, altså, mindre overhead for administrasjon og sånt, og at da hvert team skulle være liksom, dem, teamet skulle på en måte være ansvarlig for oppgavene som dem tok, sånn at hvis én ble syk så kunne teamet fortsatt gjøre oppgaven selv om, ja.
- I: Så det var _teamet_ som plukka oppgavene, det var ikke enkeltpersoner, rett og slett?
- S: Ja, det, eller, enkeltpersoner plukket oppgaver for så vidt, men diskuterte innad i teamet hvordan dette skulle være, og så hadde de hele tida, og, prøvde å gjøre parprogrammering og slikt, selv om ikke alltid det var, det var, typisk det var mer initielle faser som kanskje diskusjon og hvordan du skal løse denne her, så var det forskjellig hvilke oppgaver som ble, det ble gjort parprogrammering på.
- I: Ja.
- S: Og så var det veldig fokus på testdrevet utvikling [TDD]. Så det starta jo egentlig, nå var ikke jeg inne helt fra begynnelsen av, sånn med oppsett av dette her.
- I: Ja, men…
- S: Så, men da var det, brukte en bok som heter _Growing Object Oriented Software på en testdrevet måte, holdt jeg på å si, som handler om hvordan du skal gjøre det her. Du skulle først lage en, hva var det du kalte det igjen da? Så enkelt som mulig, så du kan få det ut så fort som mulig.
- I: Rett og slett lag en, altså, tenker du på, er vi på å lage tester først nå, eller, hva…
- S: Ja, tester først, men også det du fikk, altså, siden vi, måten vi kjørte ved siden av __?__ så kunne vi bare legge ting ut i produksjon så fort som mulig.
- I: Ja.
- S: Og bare få/dytte __?__ rammeverkpå en måte. "Walking skeleton", kalles det.
- I: En walking skeleton. Ja, rett og slett en slags… ikke prototype, kanskje, men…
- S: Ja, nei, ikke en prototype på den måte at du skal hive det etterpå, men sånn at det er minst mulig for å bare få ting gjennom hele veien, da, for å da liksom til leverandør og få data tilbake. Og da testdrevet. så du satte opp testene først, og på da alle nivåer, og enhetstest, hadde modultester som  var på en måte én modul for eksempel API eller web eller backend, eller backend, bakdelen holdt jeg på å si. Og feature-tester, som på en måte var for eksempel å få, kjøre opp hele flyvertikalen, altså få, og alt var automatisert.
