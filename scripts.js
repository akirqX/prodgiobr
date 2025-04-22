// Menu responsivo
document.addEventListener("DOMContentLoaded", function() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");
  const sections = document.querySelectorAll(".section");
  
  // Toggle menu
  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !isExpanded);
    menu.classList.toggle("active");
  });
  
  // Fechar menu ao clicar em um link
  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
  
  // Animação de scroll
  const revealOnScroll = () => {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 100) {
        section.classList.add("visible");
      }
    });
  };
  
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Executa no carregamento

  // Abas de Serviços
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
      });
      button.classList.add('active');
      
      document.querySelectorAll('.services-container').forEach(container => {
        container.classList.remove('active');
      });
      
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });

  // Animação de palavras no hero
  const words = ["sob medida", "que vendem", "eficientes", "que encantam"];
  let current = 0;
  const el = document.querySelector(".highlight");

  if (el) {
    function rotateWords() {
      current = (current + 1) % words.length;
      el.style.opacity = 0;
      
      setTimeout(() => {
        el.textContent = words[current];
        el.style.opacity = 1;
      }, 300);
    }
    setInterval(rotateWords, 2500);
  }

  // Inicializações
  initDepoimentosCarrossel();
  initRatings();
  createParticles();
});

/* Depoimentos */
function initRatings() {
  document.querySelectorAll('.rating').forEach(rating => {
    const score = parseInt(rating.dataset.rating);
    let starsHtml = '';
    
    for (let i = 1; i <= 5; i++) {
      starsHtml += i <= score 
        ? '<i class="bi bi-star-fill" style="color: var(--primaria-clara)"></i>'
        : '<i class="bi bi-star" style="color: var(--texto-fraco)"></i>';
    }
    rating.innerHTML = starsHtml;
  });
}

function initDepoimentosCarrossel() {
  const slides = document.querySelectorAll('.depoimento-slide');
  const prevBtn = document.querySelector('.carrossel-controle.prev');
  const nextBtn = document.querySelector('.carrossel-controle.next');
  let currentSlide = 0;
  let rotateInterval;

  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  function startAutoRotate() {
    rotateInterval = setInterval(() => showSlide(currentSlide + 1), 8000);
  }

  function resetAutoRotate() {
    clearInterval(rotateInterval);
    startAutoRotate();
  }

  nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    resetAutoRotate();
  });

  prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    resetAutoRotate();
  });

  showSlide(0);
  startAutoRotate();
}

function createParticles() {
  const container = document.getElementById('contactParticles');
  if (!container) return;
  
  // Limpa partículas existentes
  container.innerHTML = '';
  
  // Calcula quantidade baseada no tamanho da tela
  const particleCount = Math.min(Math.floor(window.innerWidth / 25), 40);
  
  // Cores alternativas para variação
  const colors = [
    'rgba(30, 115, 218, 0.2)',
    'rgba(78, 205, 196, 0.2)',
    'rgba(255, 255, 255, 0.15)'
  ];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Tamanho aleatório entre 2px e 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Posição inicial aleatória
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `-${size}px`;
    
    // Ajustes de animação - cada partícula tem timing único
    const delay = Math.random() * 8;
    const duration = 12 + Math.random() * 18;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    // Opacidade aleatória
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    // Cor aleatória
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(particle);
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const feedback = document.createElement('div');
    feedback.textContent = '✅ Email copiado!';
    feedback.style.position = 'fixed';
    feedback.style.bottom = '20px';
    feedback.style.left = '50%';
    feedback.style.transform = 'translateX(-50%)';
    feedback.style.backgroundColor = 'var(--primaria-clara)';
    feedback.style.color = 'white';
    feedback.style.padding = '10px 20px';
    feedback.style.borderRadius = '5px';
    feedback.style.zIndex = '1000';
    feedback.style.fontWeight = '600';
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      feedback.remove();
    }, 2000);
  }).catch(err => {
    console.error('Falha ao copiar texto: ', err);
  });
}

// Event listeners
window.addEventListener('resize', createParticles);

/* Nova função para partículas do hero */
function createHeroParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  
  container.innerHTML = '';
  
  const particleCount = Math.min(Math.floor(window.innerWidth / 35), 30);
  
  const colors = [
    'rgba(255, 255, 255, 0.2)',
    'rgba(173, 216, 230, 0.25)',
    'rgba(30, 115, 218, 0.18)'
  ];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    
    const size = Math.random() * 6 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `-${size}px`;
    
    const delay = Math.random() * 15;
    const duration = 18 + Math.random() * 25;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(particle);
  }
}

// Função de partículas do contato (atualizada para evitar conflito)
function createParticles() {
  const container = document.getElementById('contactParticles');
  if (!container) return;
  
  container.innerHTML = '';
  
  const particleCount = Math.min(Math.floor(window.innerWidth / 25), 40);
  
  const colors = [
    'rgba(30, 115, 218, 0.15)',
    'rgba(78, 205, 196, 0.15)',
    'rgba(255, 255, 255, 0.1)'
  ];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `-${size}px`;
    
    const delay = Math.random() * 8;
    const duration = 12 + Math.random() * 18;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(particle);
  }
}

// Atualize o listener de redimensionamento
window.addEventListener('resize', function() {
  createParticles();
  createHeroParticles();
});

// Novo Carrossel de Depoimentos
function initModernDepoimentos() {
  const slider = document.querySelector('.depoimentos-slider');
  const dots = document.querySelectorAll('.slider-dot');
  const cards = document.querySelectorAll('.depoimento-card');
  let currentIndex = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;
  
  // Inicializa os dots
  function updateDots(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  // Atualiza a posição do slider
  function setSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  
  // Vai para um slide específico
  function goToSlide(index) {
    currentIndex = index;
    setSliderPosition();
    updateDots(currentIndex);
  }
  
  // Event listeners para os dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // Touch events para mobile
  slider.addEventListener('touchstart', touchStart);
  slider.addEventListener('touchmove', touchMove);
  slider.addEventListener('touchend', touchEnd);
  
  // Mouse events para desktop
  slider.addEventListener('mousedown', touchStart);
  slider.addEventListener('mousemove', touchMove);
  slider.addEventListener('mouseup', touchEnd);
  slider.addEventListener('mouseleave', touchEnd);
  
  function touchStart(e) {
    if (e.type === 'mousedown') {
      isDragging = true;
      startPos = e.clientX;
    } else {
      isDragging = true;
      startPos = e.touches[0].clientX;
    }
    animationID = requestAnimationFrame(animation);
    slider.style.cursor = 'grabbing';
    slider.style.transition = 'none';
  }
  
  function touchMove(e) {
    if (!isDragging) return;
    const currentPosition = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const diff = currentPosition - startPos;
    
    // Limita o movimento para não passar dos limites
    if (currentIndex === 0 && diff > 0) return;
    if (currentIndex === cards.length - 1 && diff < 0) return;
    
    currentTranslate = prevTranslate + diff;
    slider.style.transform = `translateX(calc(-${currentIndex * 100}% + ${currentTranslate}px))`;
  }
  
  function touchEnd() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);
    slider.style.cursor = 'grab';
    
    const movedBy = currentTranslate - prevTranslate;
    
    // Decide se vai mudar de slide ou voltar
    if (movedBy < -100 && currentIndex < cards.length - 1) {
      currentIndex++;
    } else if (movedBy > 100 && currentIndex > 0) {
      currentIndex--;
    }
    
    goToSlide(currentIndex);
    prevTranslate = currentIndex * -slider.offsetWidth;
  }
  
  function animation() {
    slider.style.transform = `translateX(calc(-${currentIndex * 100}% + ${currentTranslate}px))`;
    animationID = requestAnimationFrame(animation);
  }
  
  // Inicializa os ratings
  initRatings();
  
  // Cria partículas
  createDepoimentoParticles();
  
  // Atualiza ao redimensionar
  window.addEventListener('resize', () => {
    setSliderPosition();
    createDepoimentoParticles();
  });
}

function createDepoimentoParticles() {
  const container = document.getElementById('depoimentoParticles');
  if (!container) return;
  
  container.innerHTML = '';
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 30);
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('depoimento-particle');
    
    // Tamanho aleatório
    const size = Math.random() * 8 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Posição inicial
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `-${size}px`;
    
    // Animação
    const delay = Math.random() * 15;
    const duration = 15 + Math.random() * 20;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    
    container.appendChild(particle);
  }
}

function initModernDepoimentos() {
  const slider = document.querySelector('.depoimentos-slider');
  const dots = document.querySelectorAll('.slider-dot');
  const cards = document.querySelectorAll('.depoimento-card');
  let currentIndex = 0;
  
  // Inicializa os dots
  function updateDots(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  // Vai para um slide específico
  function goToSlide(index) {
    currentIndex = index;
    slider.scrollTo({
      left: cards[index].offsetLeft - slider.offsetLeft,
      behavior: 'smooth'
    });
    updateDots(currentIndex);
  }
  
  // Event listeners para os dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // Atualiza os dots quando o usuário scrollar
  slider.addEventListener('scroll', () => {
    const cardWidth = cards[0].offsetWidth + 32; // 32px é o gap
    const newIndex = Math.round(slider.scrollLeft / cardWidth);
    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      updateDots(currentIndex);
    }
  });
  
  // Inicializa os ratings
  initRatings();
  
  // Mostra o primeiro dot como ativo
  updateDots(0);
}

function initDepoimentosCarrossel() {
  const slides = document.querySelectorAll('.depoimento-slide');
  const prevBtn = document.querySelector('.carrossel-controle.prev');
  const nextBtn = document.querySelector('.carrossel-controle.next');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let rotateInterval;

  // Mostrar slide atual
  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  // Navegação automática
  function startAutoRotate() {
    rotateInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  function resetAutoRotate() {
    clearInterval(rotateInterval);
    startAutoRotate();
  }

  // Event listeners
  nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    resetAutoRotate();
  });

  prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    resetAutoRotate();
  });

  // Dots navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetAutoRotate();
    });
  });

  // Iniciar
  showSlide(0);
  startAutoRotate();
  
  // Inicializar ratings
  initRatings();
}