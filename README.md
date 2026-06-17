# RecAI Landing Page

Dedykowana, lekka i w pełni responsywna strona lądowania promująca aplikację **RecAI** (Prywatny dyktafon AI na Androida). 

Projekt ma na celu zaprezentowanie unikalnych cech aplikacji (offline-first, 100% prywatności, brak serwerów pośredniczących) oraz zachęcenie do pobrania pliku APK bezpośrednio z repozytorium.

---

## 🎨 Cechy Wizualne i UI/UX
- **Cyberpunk / Premium Dark Theme**: Kolorystyka i stylistyka bezpośrednio spójne z aplikacją mobilną (ciemne tła `#0B0C10` z intensywnymi neonowymi akcentami `#66FCF1` oraz dynamicznymi gradientami fioletu i różu).
- **Glassmorphism**: Karty i sekcja FAQ wykorzystują półprzezroczystość oraz rozmycie tła (`backdrop-filter`) dla uzyskania nowoczesnego wyglądu.
- **Interaktywny Symulator**: Widget w JS pozwalający przetestować działanie aplikacji bezpośrednio w przeglądarce. Symuluje nagrywanie mowy, animuje falę dźwiękową, podświetla wymawiane słowa w czasie rzeczywistym i generuje podsumowanie AI.
- **Efekty Hover & Mouse Glow**: Karty reagują na ruch myszy, wyświetlając delikatne podświetlenie (spotlight glow effect) podążające za kursorem.
- **Responsywność (RWD)**: Strona optymalnie dostosowuje się do smartfonów (nawet na bardzo wąskich ekranach 320px, dzięki automatycznemu zawijaniu tagów i responsywnej optymalizacji pionowej kart informacyjnych), tabletów oraz szerokich ekranów desktopowych, wykorzystując elastyczną strukturę Flexbox / Grid.

---

## ⚡ SEO & Wydajność
- **Czyste Technologie**: Brak zależności od zewnętrznych, ciężkich bibliotek JS czy frameworków CSS (brak Tailwind, React itp.). Całość napisana w czystym, semantycznym HTML5, Vanilla CSS i Vanilla JS.
- **Wektorowe Grafiki**: Logo oraz inne elementy graficzne zaimplementowane w formacie SVG (w tym wektorowy odpowiednik ikony z Androida), co gwarantuje natychmiastowe ładowanie i pełną ostrość na ekranach Retina/High-DPI.
- **Meta Tagi**: Pełna konfiguracja SEO: meta opisy, tytuły, słowa kluczowe oraz protokół OpenGraph dla mediów społecznościowych.

---

## 📂 Struktura Katalogu
```
landing-page/
 ├── assets/
 │    └── logo.svg       # Wektorowe logo oparte na ikonie Androida z neonowym stylem
 ├── css/
 │    └── style.css      # Czysty CSS (zmienne, motyw, animacje, RWD)
 ├── js/
 │    └── app.js         # Obsługa symulatora transkrypcji, FAQ i animacji scrolla
 ├── index.html          # Główny dokument HTML strony lądowania
 ├── CHANGELOG.md        # Rejestr zmian dla strony lądowania
 └── README.md           # Niniejszy dokument
```

---

## 🚀 Jak uruchomić lokalnie

Możesz otworzyć plik `index.html` bezpośrednio w dowolnej przeglądarce. Aby jednak w pełni przetestować stronę lub uruchomić ją dewelopersko, zalecamy postawienie prostego serwera HTTP w tym folderze:

**Za pomocą Node.js / npx:**
```bash
npx serve .
```

**Za pomocą Pythona:**
```bash
python -m http.server 8000
```
Strona będzie dostępna w przeglądarce pod adresem: `http://localhost:8000` (lub innym wygenerowanym portem).
