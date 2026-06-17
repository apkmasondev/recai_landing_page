# Changelog - RecAI Landing Page

Wszystkie znaczące zmiany w projekcie strony lądowania będą udokumentowane w tym pliku.

## [1.1.0] - 2026-06-17

### Added
- **Podpięcie pobierania APK (v1.3)**: Zaktualizowano wersję pobierania na landing page do najnowszej wersji `v1.3` oraz podpięto główny przycisk pobierania pod dedykowany URL wydań w nowym repozytorium aplikacji: `https://github.com/apkmasondev/recai_apk/tree/main/releases`.
- **Galeria Zrzutów Ekranu (Screenshots)**: Wdrożenie nowej sekcji "Galeria Aplikacji" z horyzontalną karuzelą prezentującą 8 autentycznych zrzutów ekranu z aplikacji Android.
- **Dedykowana sekcja bezpieczeństwa API**: Przeniesienie karty ostrzeżenia dotyczącej klucza API z nagłówka (sekcji Hero) do dedykowanej sekcji bezpieczeństwa ("Ważne ostrzeżenie") nad FAQ, co znacząco poprawiło estetykę pierwszego ekranu.
- **Prawdziwy zrzut ekranu w sekcji Hero**: Zastąpienie syntetycznego podglądu CSS telefonu prawdziwym zrzutem ekranu aplikacji RecAI, co urealniło odbiór witryny.
- **Likwidacja przewijania poziomego (RWD)**: Dodanie `overflow-x: hidden` do elementu `body` oraz zaawansowane reguły skalowania mockupu telefonu i wrapowania tagów. Całkowicie wyeliminowało to problem czarnej przestrzeni po prawej stronie na wąskich ekranach.
- **Uporządkowanie odtwarzacza w demo**: Zastosowanie maskowania `text-overflow: ellipsis` dla nazwy pliku audio w playerze oraz zmniejszenie paddingów zakładek, dzięki czemu interfejs demo idealnie dopasowuje się do wąskich ekranów (nawet 320px).
- **Dodanie ikonki Favicon (SEO)**: Zaimplementowanie wektorowej ikony na bazie logo w sekcji `head` strony, usuwając błędy w logach serwera i poprawiając indeksowanie SEO.
- **Poprawa nazewnictwa biometrii**: Usunięcie błędnych odniesień do FaceID na rzecz autoryzacji odciskiem palca (Android-only).

### Changed
- **Kierunek odnośnika kodu źródłowego**: Zmieniono cel przycisku "Zobacz kod na GitHubie" na główne repozytorium kodu źródłowego aplikacji Android: `https://github.com/apkmasondev/recai_apk/tree/main`.
- **Usunięcie odnośnika Polityki Prywatności**: Usunięto pusty link do Polityki Prywatności z kolumny "Prawne" w stopce strony.

### Fixed
- **Układ tagów w odtwarzaczu demo (RWD)**: Naprawiono błąd, w którym trzeci tag (`#Notatka`) wychodził poza krawędź karty odtwarzacza na wąskich ekranach. Dodano `min-width: 0` do karty oraz wdrożono pomniejszenie rozmiarów i paddingów tagów na ekranach poniżej 480px, gwarantując bezbłędne zawijanie.
- **Karta ostrzeżenia API na urządzeniach mobilnych**: Zmieniono układ karty na pionowy (ikona wyśrodkowana na górze, nagłówek wyśrodkowany, tekst z wyrównaniem do lewej) dla ekranów mobilnych i tabletów. Dzięki temu tekst zyskał 100% szerokości użytkowej, wysokość karty drastycznie się zmniejszyła, a potrzeba przewijania została zminimalizowana.
- **Etykieta podsumowania w demo (RWD)**: Skrócono etykietę zakładki z "Szybkie Podsumowanie (AI)" do "Podsumowanie AI" oraz wdrożono regułę `flex-wrap: wrap` dla kontenera zakładek na wąskich ekranach, zapobiegając wychodzeniu tekstu poza obszar karty.

## [1.0.0] - 2026-06-16

### Added
- **Struktura semantyczna HTML**: Stworzenie głównego pliku `index.html` z zachowaniem standardów SEO (meta tagi description, keywords, OpenGraph, hierarchia nagłówków).
- **Stylistyka Cyberpunk Neon**: Stworzenie dedykowanego pliku `css/style.css` z zmiennymi CSS, obsługą luksusowego trybu ciemnego, efektami *glassmorphism* oraz pełną responsywnością (RWD) dla desktopów i urządzeń mobilnych.
- **Interaktywny Symulator Transkrypcji**: Logika w `js/app.js` umożliwiająca użytkownikowi zasymulowanie na żywo nagrywania mowy, podświetlania tekstu słowo po słowie (Whisper ASR simulator) oraz generowania ustrukturyzowanego podsumowania (GPT simulator).
- **Efekt Mouse Glow**: Dodanie subtelnego podświetlenia kart podążającego za ruchem kursora na desktopie.
- **Wektorowe Logo**: Zaprojektowanie logo `logo.svg` w folderze `assets/` na bazie oryginalnej ikony mikrofonu z Androida z zachowaniem neonowej poświaty i kolorystyki.
- **Akordeon FAQ**: Płynnie zwijana i rozwijana sekcja najczęściej zadawanych pytań.
- **Scroll Reveal**: Płynne animacje wyłaniania się sekcji i elementów strony podczas przewijania (Intersection Observer).
- **Dedykowana Dokumentacja**: Stworzenie pliku `README.md` opisującego działanie i architekturę samej strony.
