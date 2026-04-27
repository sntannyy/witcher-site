var audio = document.getElementById('bgMusic');
var toggleBtn = document.getElementById('musicToggleBtn');
var isMusicPlaying = false;

function toggleMusic() {
  if (isMusicPlaying) {
    audio.pause();
    toggleBtn.innerHTML = 'MUSIC (ВКЛ)';
    isMusicPlaying = false;
  } else {
    var playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(function() {
        toggleBtn.innerHTML = 'MUSIC (ВЫКЛ)';
        isMusicPlaying = true;
      }).catch(function(error) {
        console.warn("Автовоспроизведение заблокировано:", error);
        toggleBtn.innerHTML = 'MUSIC (нужен клик)';
        setTimeout(function() {
          if(!isMusicPlaying) toggleBtn.innerHTML = 'MUSIC (ВКЛ)';
        }, 1500);
      });
    }
  }
}

if (audio && toggleBtn) {
  audio.addEventListener('play', function() {
    if(audio.currentTime > 0 || !audio.paused) {
      toggleBtn.innerHTML = 'MUSIC (ВЫКЛ)';
      isMusicPlaying = true;
    }
  });
  audio.addEventListener('pause', function() {
    toggleBtn.innerHTML = 'MUSIC (ВКЛ)';
    isMusicPlaying = false;
  });
  toggleBtn.addEventListener('click', toggleMusic);
}

// Автоматический запуск музыки при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  var playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(function() {
      toggleBtn.innerHTML = 'MUSIC (ВЫКЛ)';
      isMusicPlaying = true;
    }).catch(function(error) {
      console.warn("Автовоспроизведение заблокировано браузером:", error);
      toggleBtn.innerHTML = 'MUSIC (ВКЛ)';
      isMusicPlaying = false;
    });
  }
});

var scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function createEmbers() {
  var container = document.getElementById('embers-container');
  if(!container) return;
  var emberCount = 25;
  for(var i = 0; i < emberCount; i++) {
    var ember = document.createElement('div');
    ember.classList.add('ember');
    var size = Math.random() * 10 + 3;
    ember.style.width = size + 'px';
    ember.style.height = size + 'px';
    ember.style.left = Math.random() * 100 + '%';
    ember.style.animationDelay = Math.random() * 12 + 's';
    ember.style.animationDuration = (Math.random() * 5 + 4) + 's';
    ember.style.opacity = Math.random() * 0.6 + 0.2;
    container.appendChild(ember);
  }
}
createEmbers();

function initAccordion() {
  var accordionItems = document.querySelectorAll('.accordion-item');
  for (var i = 0; i < accordionItems.length; i++) {
    var item = accordionItems[i];
    var header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', function() {
        this.parentElement.classList.toggle('open');
      });
    }
  }
}

var quotes = [
  { text: "Зло есть зло... Меньшее, большее, среднее — все едино...", author: "Геральт из Ривии" },
  { text: "Люди любят придумывать чудовищ и чудовищности. Им кажется, что так им легче бороться со злом.", author: "Геральт" },
  { text: "Выбора нет. Есть только решения, последствия которых мы не в силах предвидеть.", author: "Сапковский" },
  { text: "Быть ведьмаком — значит жить в тени, всегда готовым к удару.", author: "Весемир" },
  { text: "Судьба — это не то, что с тобой случается, а то, что ты выбираешь.", author: "Цири" }
];

function updateRandomQuote() {
  var quoteElement = document.getElementById('random-quote');
  if (quoteElement) {
    var randomIndex = Math.floor(Math.random() * quotes.length);
    var quote = quotes[randomIndex];
    quoteElement.innerHTML = '<div class="quote-text">' + quote.text + '</div><div class="quote-author">' + quote.author + '</div>';
  }
}

window.addEventListener('scroll', function() {
  var scrollY = window.scrollY;
  var embers = document.querySelectorAll('.ember');
  for(var i = 0; i < embers.length; i += 3) {
    if(embers[i]) embers[i].style.transform = 'translateY(' + (scrollY * 0.02) + 'px)';
  }
});

function setActiveNav() {
  var currentPage = window.location.pathname.split('/').pop();
  var navLinks = document.querySelectorAll('.nav-btn');
  for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];
    var href = link.getAttribute('href');
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html') || 
        (currentPage === '/' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setActiveNav();
  initAccordion();
  updateRandomQuote();
});