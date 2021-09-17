# lev3_4_projekt_js-reactjs_contacts

_Source:_ https://github.com/Ninni-cfm/lev3_4_projekt_js-reactjs_contacts

_Demo:_ https://loving-lovelace-c78092.netlify.app/

## JS ReactJS - Projekt lev3_4: Contacts

Aufgabenstellung

Du hast Dich entschieden in der Filmindustrie zu arbeiten und hast einen Job gefunden, bei dem Du die Kontakte einer berühmten Produzentin verwalten sollst.

Wir werden eine Kontaktmanagement-App mit React für diese Produzentin erstellen.

---

**Aufgabe 1: 5 Kontakte anzeigen:**

Die JSON-Datei enthält die Herstellerkontakte. Importiere diese Datei und erstellen ein Array mit den ersten 5 Kontakten, die Du als Ausgang verwenden wirst.

Gib dieses Array (mit 5 Kontakten) aus und zeige das Bild, den Namen und die Popularität jedes Kontakts an.

Zum Importieren von contacts.json verwenden wir

    import contacts from './contacts.json'

---

**Aufgabe 2: Neue zufällige Kontakte hinzufügen**

Erstelle jetzt in Deiner App einen Button "Zufälligen Kontakt hinzufügen". Jedes Mal, wenn der Button geklickt wird, soll ein neuer zufälliger Kontakt hinzugefügt werden.

Wähle zunächst zufällig einen Kontakt aus dem ursprünglichen Kontakt-Array aus. Füge dann diesen Kontakt zu deinem Array hinzu, das in Deinem state vorhanden ist (das ist das zuvor erstellte Array mit 5 Kontakten). Vergiss nicht setState () zu verwenden, damit React die App erneut rendert.

---

**Aufgabe 3: Kontakte nach Name und Beliebtheit sortieren**

Die Produzentin hat Dich gebeten, zwei neue Schaltflächen hinzuzufügen, damit die Kontakte neu sortiert werden können. Wenn eine der Schaltflächen geklickt wird, sollte die Tabelle nach Namen sortiert sein (alphabetisch), und wenn auf die andere Schaltfläche geklickt wird, sollte sie nach Beliebtheit sortiert werden (höchste zuerst).

Vergiss nicht, setState () nach dem Sortieren zu setzen!

---

**Aufgabe 4: Kontakte entfernen**

Die Produzentin möchte manchmal auch Kontakte entfernen. Implementiere in jeder Zeile eine Schaltfläche zum Löschen, mit der sie den Kontakt entfernen kann, auf den sie geklickt hat.

Es muss der Index des Arrays dieses Schauspielers abgerufen und verwendet werden, um den Kontakt aus dem Array zu entfernen. Vergiss nicht, setState () zu setzen nachdem der Kontakt entfernt wurde!

---

**Bonus | Styling**

Leider kann diese Kontaktliste so noch nicht live gehen. Es muss funkeln!

<b>Füge mit CSS etwas “Magic” hinzu.</b>

Wenn die Sortier-Buttons mehrmals geklickt werden, wird die Liste immer umgekehrt sortiert<br>
(z.B. wird A-Z zu Z-A oder höchste-niedrigste zu niedrigste-höchste Beliebtheit).

Happy coding! ❤️
