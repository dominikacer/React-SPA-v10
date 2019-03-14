## Rozwijanie aplikacji mobilnych

autor: Dominik Michalik <br/>
mail: dominikxmichalik@gmail.com <br />
build: https://react-v2-cd7a2.firebaseapp.com/ 


## Specyfikacja techniczna

Dokumentacja Techniczna
Aplikacja do katalogowania ulubionej muzyki z różnych portali muzycznych.

1. Cel projektu.
2. Jak używać ? 
3. Użyta technologia
4. Składowe aplikacji
5. Wymagania techniczne







##1. Cel projektu
Celem projektu jest utworzenie aplikacji mobilnej, działającej jako SPA (Single Page App), za pomocą której, użytkownik może katalogować ulubionych artystów oraz ich utwory z różnych stron serwujących muzykę.
Z perspektywy tego, że aktualnie niektórzy artyści są dostępni tylko na określonych portalach (m.in. Youtube, Spotify, Soundcloud), aplikacja ułatwia katalogowanie z różnych serwisów.



##2. Jak używać?
Aby rozpocząć korzystanie z aplikacji należy założyć konto użytkownika.
Następnie zalogowany już użytkownik przekierowany jest na stronę, na której może dodać swojego ulubionego artystę.
Po dodaniu kolejnych artystów, użytkownikowi tworzy się ich lista poniżej.
Obok artysty użytkownik ma trzy opcje:
a) usunąć artystę
b) dodać ulubioną piosenkę
c) podejrzeć dodane piosenki
Po wybraniu opcji „dodaj piosenkę” użytkownik zostaje przekierowany na podstronę, gdzie znajduje się prosty formularz.
Do formularza należy wpisać tytuł piosenki oraz link.
Po uzupełnieniu formularza użytkownik zostaje przekierowany na podstronę ze zbiorem dodanych piosenek (miejsce z powyższej opcji c)). 
Obok ulubionej piosenki użytkownik ma trzy kolejne trzy opcje :
a) usunąć piosenkę
b) przejść do strony z piosenką
c) oznaczyć jako ulubioną.
W zależności od dodanego linku, podczas dodawania piosenek, użytkownikowi pokazuje się od razu ikonka portalu z którego zapisał piosenkę tj. jeśli piosenka jest linkowana z youtube – ikonka youtube, jeśli spotify – spotify, jeśli soundcloud – soundcloud, cała reszta portali pod ikonką „głośnika”.
Oznaczenie dodania do ulubionych dodaje parametr do bazy danych.
Na stronie z ulubionymi piosenkami mamy również wyszukiwarkę zapisanych piosenek na stronie artysty.
Obok wyszukiwarki znajdują się dwa przyciski:
a) cofnięcie wyszukanej frazy
b) losowanie utworu.


##3. Użyta technologia
Do stworzenia aplikacji została użyta biblioteka JavaScript-owa – React.
Dane użytkownika przechowywane są w nierelacyjnej bazie danych Firebase.
Do nadania prostego przystępniejszego layoutu został użyty Bootstrap 4, oraz najnowsza technika stylowania komponentów - „styled components”.


##4. Składowe aplikacji
Aplikacja składa się z powiązanych ze sobą komponentów – mniejszych części, pozwalających na łatwiejsze zarządzanie aplikacją oraz potencjalnym rozwojem aplikacji.

a) po otworzeniu aplikacji zostaje załadowany komponent,  odpowiada za routing nawigacji.
W nawigacji znajdują się linki do kolejnych komponentów.
Użyty jest routing, dlatego strona nie powinna się odświeżać.

b) Po kliknięciu przycisk „log in” użytkownik zostaje przekierowany do komponentu odpowiadającego za zalogowanie się użytkownika, jeśli taki istnieje.
Akcja wysłania formularza (zalogowania się) wysyła zapytanie do bazy danych (firebase) sprawdzając podane przez użytkownika dane, z danymi przechowywanymi w bazie danych.
Po wysłaniu zapytania aplikacja aktualizuje stan aplikacji (update state) porównując dane. Jeśli użytkownik istnieje i podał prawidłowe dane, zostaje przekierowany na stronę umożliwiającą dodanie artysty, jeśli nie 
wyświetlany jest błąd uwierzytelniania.
Sam błąd jest osobnym komponentem, który wyświetla odpowiedni komunikat na podstawie stanu aplikacji (state).

c) Po kliknięciu w przycisk „register” użytkownik zostaje przekierowany do komponentu odpowiadającego za rejestracje użytkowników.
Mechanizm działania jest taki sam jak w komponencie „zaloguj”, jedyna różnica jest w funkcji wysyłającej zapytania do bazy.
Tutaj funkcja zapisuje do bazy, a nie odczytuje dane z niej.
Sama obsługa – aktualizacja stanu, wyświetlania errorów jest dokładnie taka sama.
Pola zostały wstępnie zwalidowane, email wymaga określonego wzoru, hasła muszą być identyczne.
Po pomyślnym zarejestrowaniu się, użytkownik zostaje przekierowany na stronę umożliwiającą dodanie artysty.

d) Komponent dodania artysty.
Po pomyślnym zalogowaniu się / zarejestrowaniu zmieniamy stan aplikacji i warunkowe wyświetlanie w nawigacji. 
Użytkownik ma możliwość wylogowania się.
Na stronie dodawania artysty, użytkownikowi wyświetla się formularz do którego powinien wpisywać nazwę swojego ulubionego artysty.
Po wysłaniu formularza zostaje wysłany request, który zapisuje artystów do tablicy przechowywanej w bazie danych.
Po dodaniu artysty zostaje on zapisany w bazie danych i zostaje wyrenderowany.
Obsługą każdego artysty zajmuje się osobny kontroller.

e) Komponent obsługujący artystów
Jest on używany do dwóch rzeczy: 
- renderowania pojedynczego artysty, jako osobna sekcja HTML
- dodania funkcji usunięcia artysty z bazy danych.
Renderowanie odbywa się po przekazaniu z Parent Componentu props-ów.
Do wyrenderowanych przycisków zostały przypisane funkcje wywołujące zdarzenia, odpowiednio – usunięcie z bazy oraz przejście do kolejnych komponentów.

f) Komponent dodania utworu.
Znajduje się w nim prosty formularz, który ma za zadanie zapisanie ulubionej piosenki użytkownika po wpisaniu tytułu oraz dodaniu linka.
Linki nie są zwalidowane.
Tytuł oraz link zapisywane są w bazie danych.
Mechanizm użyty do zapisu jest dokładnie taki sam jak do rejestracji użytkownika. Dane przechowywane są w tablicy na podstawie stanu aplikacji.

h) Komponent wyświetlający ulubione piosenki danego artysty
Znajdują się w nim pasek wyszukiwania, oraz wyrenderowana lista komponentów z pojedynczymi utworami.
Po wpisaniu każdej litery w pasku wyszukiwania zostaje zaktualizowany stan aplikacji przeszukujący poniżej wyrenderowane komponenty po nazwie. 
Obok niego pierwszy przycisk zmienia stan aplikacji na pusty string, oraz wracając do początkowego stanu.
Drugi przycisk wybiera losowo wygenerowany komponent z przedziału 0-ilość piosenek.
Poniżej paska wyszukiwania znajdują się wyrenderowane odpowiednio utwory jako osobny komponent.

i) Pojedynczy komponent utworu
Działa na takiej samej zasadzie jak komponent wyświetlający artystów, z dwiema różnicami.
- ikona wyświetlenia listy piosenek, została zastąpiona możliwością dodania do ulubionych, po dodaniu do ulubionych użytkownik aktualizuje stan aplikacji, który jest zapisywany w bazie danych jako flaga prawda/fałsz
-ikona dodania piosenki, została zastąpiona możliwością przejściu do linka podanego podczas dodawania piosenki. Ikona wyświetla się warunkowo, w zależności od tego skąd pochodzi (youtube/spotify/soundcloud/inne).


##5. Wymagania techniczne

a) Aplikacja powinna działać we wszystkich współczesnych przeglądarkach internetowych, 
b) Aplikacja nie powinna posiadać żadnych ograniczeń na ilość składników czy złożonych zamówień 
c) Aplikacja musi zapewniać wydajną pracę przy wielu zamówieniach
d) Aplikacja powinna działać na użądzeniach mobilnych obsługujących standard HTML5
e) Wyświetlane w podsumowaniu powinny być tylko ilości składników większe od zera, powinna zostać zastosowana walidacja 
f) Całość aplikacji musi zostać wykonana o technologie nie wymagające do uruchomienia platformy zakupu jakiegokolwiek oprogramowania 
g) Aplikacja powinna działać tylko i wyłącznie po podłączeniu do sieci 
h) Aplikacja powinna mieć odpowiednio odseparowaną strukturę danych, pozwalającą na potencjalny rozwój aplikacji