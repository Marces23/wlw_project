# wlw_project: Home Wetterstation mit Homeassistent + ZigBee
Webserver zur Einbindung von ZigBee Elementen an homeassistant und Wetterdarstellung über lokal am Raspi gemessene Temperatur mit Einbindung Wetter API.

![Übersicht_wlwProjekt-wlw_Idee drawio](https://github.com/Marces23/wlw_project/assets/79634707/537c463d-673d-44d0-b8ab-724d7ab02dc8)


Diese Applikation hat den Zweck die auf dem Raspi verbundenen Elemente auf einem Webserver darzustellen und weiterführend zu Steuern.
Als Wetterstation misst das Raspi über den GPIO angeschlossenen Temperatursensor die Messtemperatur (!Eigenwärme Raspi) und zeigt diese in einem Chart dar. Diese werden laufend über das Websocket ergänzt. Desweiteren wurde das Wetter über die meteo.search API angebunden.

Zweitens wurde die Anbindung an den lokalen homeassistant Server durchgeführt. An diesem ist ein ZigBee-Cordinater (USB-Dongle) in Betrieb, welcher mit Taster, LED-Band und Bewegungsmelder kommuniziert. Diese States konnten an einem Beispiel abgeholt werden. Über die selbe Methode können weiterführend auch die Entities des Homeassistant angesteuert werden (Geplant Steuerung LED-Band).

![image](https://github.com/Marces23/wlw_project/assets/79634707/830130cf-1843-4499-bef0-b0e4d9650fde)
![image](https://github.com/Marces23/wlw_project/assets/79634707/63146652-8d22-4a14-8f27-bec59ece1a39)

Die Applikation ist noch nicht abgeschlossen. Das Vue-Framework wurde (noch) nicht verwendet. Das Projekt muss noch weitergeführt werden.
Die wichtigsten Funktionen konnten prinzipiell erarbeitet werden. Die Darstellung über den Client kann noch deutlich verbessert werden.

![Übersicht_wlwProjekt-wlw_result drawio](https://github.com/Marces23/wlw_project/assets/79634707/de0038e5-0217-451c-ae40-259762be56ca)


