/**
 * RecAI Landing Page JavaScript
 * Obsługa interakcji, animacji i interaktywnego symulatora transkrypcji
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. MENU MOBILNE
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navbarContainer = document.querySelector('.navbar-container');
  const navLinks = document.querySelectorAll('.nav-item');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navbarContainer.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Zamknij menu po kliknięciu w link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarContainer.classList.contains('menu-open')) {
        navbarContainer.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ==========================================
  // 2. AKORDEON FAQ
  // ==========================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const answer = faqItem.querySelector('.faq-answer');
      const isExpanded = question.getAttribute('aria-expanded') === 'true';

      // Zamknij pozostałe pytania
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem && item.classList.contains('open')) {
          item.classList.remove('open');
          item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          item.querySelector('.faq-answer').setAttribute('hidden', '');
        }
      });

      // Togluj bieżące pytanie
      faqItem.classList.toggle('open', !isExpanded);
      question.setAttribute('aria-expanded', !isExpanded);
      
      if (!isExpanded) {
        answer.removeAttribute('hidden');
      } else {
        answer.setAttribute('hidden', '');
      }
    });
  });

  // ==========================================
  // 3. ANIMACJE PRZY PRZEWIJANIU (SCROLL REVEAL)
  // ==========================================
  // Dodanie klasy reveal do elementów, które mają się pojawiać
  const revealElements = [
    ...document.querySelectorAll('.uvp-card'),
    ...document.querySelectorAll('.step-card'),
    ...document.querySelectorAll('.simulator-container'),
    ...document.querySelectorAll('.faq-item'),
    document.querySelector('.download-card'),
    document.querySelector('.hero-content'),
    document.querySelector('#hero-mockup')
  ];

  revealElements.forEach(el => {
    if (el) el.classList.add('reveal');
  });

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Animacja odpala się tylko raz
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    if (el) revealObserver.observe(el);
  });

  // ==========================================
  // 4. INTERAKTYWNY SYMULATOR TRANSKRYPCJI
  // ==========================================
  const btnDemoPlay = document.getElementById('btn-demo-play');
  const waveformVisual = document.getElementById('waveform-visual');
  const playerCurrentTime = document.getElementById('player-current-time');
  const playerProgressFill = document.getElementById('player-progress-fill');
  
  const tabTranscriptBtn = document.getElementById('tab-transcript-btn');
  const tabSummaryBtn = document.getElementById('tab-summary-btn');
  
  const tabTranscript = document.getElementById('tab-transcript');
  const tabSummary = document.getElementById('tab-summary');
  
  const transcriptWaitingMsg = document.getElementById('transcript-waiting-msg');
  const transcriptTextFlow = document.getElementById('transcript-text-flow');
  const summaryAiOutput = document.getElementById('summary-ai-output');

  // Dane transkrypcji (słowo po słowie z przybliżonym czasem pojawienia się w milisekundach)
  const demoTranscriptWords = [
    { word: "Dzień", start: 0, end: 400 },
    { word: "dobry", start: 400, end: 800 },
    { word: "państwu.", start: 800, end: 1400 },
    { word: "Dzisiejszy", start: 1500, end: 2000 },
    { word: "wykład", start: 2000, end: 2400 },
    { word: "poświęcimy", start: 2400, end: 3000 },
    { word: "architekturze", start: 3000, end: 3800 },
    { word: "sieci", start: 3800, end: 4200 },
    { word: "neuronowych,", start: 4200, end: 5000 },
    { word: "a", start: 5100, end: 5300 },
    { word: "w", start: 5300, end: 5500 },
    { word: "szczególności", start: 5500, end: 6200 },
    { word: "mechanizmowi", start: 6200, end: 7000 },
    { word: "self-attention,", start: 7000, end: 8000 },
    { word: "który", start: 8100, end: 8400 },
    { word: "zrewolucjonizował", start: 8400, end: 9400 },
    { word: "przetwarzanie", start: 9400, end: 10100 },
    { word: "języka", start: 10100, end: 10500 },
    { word: "naturalnego.", start: 10500, end: 12000 }
  ];

  const demoSummaryHtml = `
    <h4 class="summary-title">RecAI - Podsumowanie Transkrypcji (Szybki Skrót)</h4>
    <ul class="summary-list">
      <li><strong>Główny temat:</strong> Architektura sieci neuronowych ze szczególnym uwzględnieniem mechanizmu <em>self-attention</em> (kluczowego dla modeli typu Transformer).</li>
      <li><strong>Kontekst:</strong> Wprowadzenie do przełomu w dziedzinie przetwarzania języka naturalnego (NLP).</li>
      <li><strong>Potencjał użytkowy:</strong> Wykład przydatny jako baza teoretyczna do omawiania optymalizacji i lokalnego uruchamiania modeli językowych na smartfonach.</li>
    </ul>
  `;

  let demoDuration = 12000; // 12 sekund w milisekundach
  let demoInterval = null;
  let demoStartTime = null;
  let demoElapsedTime = 0;
  let isDemoPlaying = false;

  // Przygotuj strukturę słów w kontenerze transkrypcji
  function prepareTranscriptContainer() {
    transcriptTextFlow.innerHTML = '';
    demoTranscriptWords.forEach((item, index) => {
      const span = document.createElement('span');
      span.textContent = item.word;
      span.className = 'word';
      span.id = `word-${index}`;
      transcriptTextFlow.appendChild(span);
    });
  }

  function formatTime(ms) {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function startDemo() {
    isDemoPlaying = true;
    btnDemoPlay.classList.add('playing');
    btnDemoPlay.innerHTML = `<span class="play-icon">⏸</span> <span class="play-text">Wstrzymaj symulację</span>`;
    waveformVisual.classList.add('active');
    
    // Zresetuj zakładki do stanu początkowego przy nowym starcie
    if (demoElapsedTime === 0) {
      if (transcriptWaitingMsg) transcriptWaitingMsg.style.display = 'none';
      prepareTranscriptContainer();
      summaryAiOutput.classList.remove('show');
      summaryAiOutput.innerHTML = '';
      tabSummaryBtn.disabled = true;
      switchTab('tab-transcript');
    }

    demoStartTime = Date.now() - demoElapsedTime;

    demoInterval = setInterval(() => {
      demoElapsedTime = Date.now() - demoStartTime;
      
      if (demoElapsedTime >= demoDuration) {
        demoElapsedTime = demoDuration;
        pauseDemo(true); // Zakończ symulację
      }

      // Aktualizacja czasu i paska postępu
      playerCurrentTime.textContent = formatTime(demoElapsedTime);
      const percentage = (demoElapsedTime / demoDuration) * 100;
      playerProgressFill.style.width = `${percentage}%`;

      // Aktualizacja słów transkrypcji
      demoTranscriptWords.forEach((item, index) => {
        const span = document.getElementById(`word-${index}`);
        if (span) {
          if (demoElapsedTime >= item.start && demoElapsedTime < item.end) {
            span.className = 'word highlight';
            // Scrolluj kontener transkrypcji do podświetlanego słowa
            span.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else if (demoElapsedTime >= item.end) {
            span.className = 'word spoken';
          } else {
            span.className = 'word';
          }
        }
      });
    }, 50);
  }

  function pauseDemo(isFinished = false) {
    isDemoPlaying = false;
    clearInterval(demoInterval);
    
    waveformVisual.classList.remove('active');
    btnDemoPlay.classList.remove('playing');
    
    if (isFinished) {
      btnDemoPlay.innerHTML = `<span class="play-icon">🔄</span> <span class="play-text">Uruchom ponownie</span>`;
      demoElapsedTime = 0;
      
      // Odblokuj zakładkę podsumowania i automatycznie ją pokaż
      tabSummaryBtn.disabled = false;
      summaryAiOutput.innerHTML = demoSummaryHtml;
      
      setTimeout(() => {
        switchTab('tab-summary');
        summaryAiOutput.classList.add('show');
      }, 500);
      
    } else {
      btnDemoPlay.innerHTML = `<span class="play-icon">▶</span> <span class="play-text">Wznów symulację</span>`;
    }
  }

  if (btnDemoPlay) {
    btnDemoPlay.addEventListener('click', () => {
      if (isDemoPlaying) {
        pauseDemo();
      } else {
        startDemo();
      }
    });
  }

  // Obsługa zakładek w symulatorze
  const tabButtons = [tabTranscriptBtn, tabSummaryBtn];
  
  function switchTab(targetTabId) {
    tabButtons.forEach(btn => {
      if (btn) {
        if (btn.dataset.target === targetTabId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      }
    });

    if (targetTabId === 'tab-transcript') {
      tabTranscript.classList.add('active');
      tabSummary.classList.remove('active');
    } else {
      tabTranscript.classList.remove('active');
      tabSummary.classList.add('active');
      summaryAiOutput.classList.add('show');
    }
  }

  tabButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        if (!btn.disabled) {
          switchTab(btn.dataset.target);
        }
      });
    }
  });

  // ==========================================
  // 5. EFEKT POŚWIATY MYSZY DLA KART (WOW FX)
  // ==========================================
  const glowCards = document.querySelectorAll('.uvp-card, .step-card, .simulator-container');
  
  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Dodajmy styl w locie do kart dla efektu poświaty
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .uvp-card, .step-card, .simulator-container {
      position: relative;
    }
    .uvp-card::after, .step-card::after, .simulator-container::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      background: radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(102, 252, 241, 0.06), transparent 80%);
      pointer-events: none;
      z-index: 2;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .uvp-card:hover::after, .step-card:hover::after, .simulator-container:hover::after {
      opacity: 1;
    }
  `;
  document.head.appendChild(styleElement);
});
