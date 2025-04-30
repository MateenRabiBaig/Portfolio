const typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    typeSpeed: 80,
    backSpeed: 40,
    startDelay: 500,
    backDelay: 2000,
    loop: true,
    loopCount: Infinity,
    showCursor: true,
    cursorChar: '_',
    smartBackspace: true
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 600) {
        header.style.backgroundImage = 'none';
        header.style.backgroundColor = '#0f0f1b';
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
    } else {
        header.style.backgroundImage = "url('assets/images/nav.webp')";
        header.style.backgroundColor = 'transparent';
        header.style.boxShadow = 'none';
    }
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    
    let current = "";
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
    
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
  
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(() => {
      showPopup("✅ Message sent successfully!");
      form.reset();
    })
    .catch(() => {
      showPopup("✅ Message sent successfully!");
      form.reset();
    });
  });
  
  function showPopup(message) {
    const popup = document.createElement('div');
    popup.innerText = message;
    popup.style = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #8f00ff;
      color: white;
      padding: 12px 18px;
      border-radius: 6px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      z-index: 9999;
      font-weight: bold;
      transition: opacity 0.3s;
    `;
    document.body.appendChild(popup);
    setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => popup.remove(), 300);
    }, 3000);
  }


  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
  });  