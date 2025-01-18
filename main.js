document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS animation library
  AOS.init({
    duration: 1200,
    once: true,
    offset: 150
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('bx-x');
      }
    });
  }

  // Scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // Smooth scroll implementation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          const icon = mobileMenuBtn?.querySelector('i');
          if (icon) {
            icon.classList.remove('bx-x');
          }
        }
      }
    });
  });

  // Form submission handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }

  // Add scroll-based navbar styling
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else {
        nav.style.background = 'white';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
    });
  }

  // Interactive service cards with flip effect
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
    
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(10deg)';
      }
      card.style.transform = 'translateY(-15px)';
      card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0)';
      }
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
  });

  // Animated counter for stats
  const stats = document.querySelectorAll('.stat h3');
  if (stats.length) {
    const observerOptions = {
      threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.getAttribute('data-value') || '0');
          animateValue(target, 0, finalValue, 2000);
          statsObserver.unobserve(target);
        }
      });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));
  }

  function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const animate = () => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        element.textContent = end + (element.getAttribute('data-suffix') || '');
        return;
      }
      element.textContent = Math.round(current) + (element.getAttribute('data-suffix') || '');
      requestAnimationFrame(animate);
    };
    
    animate();
  }

  // Hero Slider functionality
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelector('.slide-dots');
  
  if (slides.length && dots) {
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
      });
      dots.appendChild(dot);
    });

    const nextSlideBtn = document.querySelector('.next-slide');
    const prevSlideBtn = document.querySelector('.prev-slide');

    if (nextSlideBtn) {
      nextSlideBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
      });
    }

    if (prevSlideBtn) {
      prevSlideBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
      });
    }

    function updateSlider() {
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
      });
      
      document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }

    // Auto-advance slides
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }, 5000);
  }

  // Testimonials carousel
  const testimonialsContainer = document.querySelector('.testimonials-container');
  if (testimonialsContainer) {
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentIndex = 0;
    
    if (testimonials.length && dotsContainer) {
      // Create dots
      testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          currentIndex = index;
          updateTestimonials();
        });
        dotsContainer.appendChild(dot);
      });

      const nextBtn = document.querySelector('.next-testimonial');
      const prevBtn = document.querySelector('.prev-testimonial');

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          currentIndex = (currentIndex + 1) % testimonials.length;
          updateTestimonials();
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
          updateTestimonials();
        });
      }

      function updateTestimonials() {
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        
        testimonials.forEach((testimonial, index) => {
          testimonial.style.transform = `translateX(${100 * (index - currentIndex)}%)`;
          testimonial.classList.toggle('active', index === currentIndex);
        });
        
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      }

      // Auto-advance testimonials
      let autoAdvance = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonials();
      }, 5000);

      // Pause auto-advance on hover
      testimonialsContainer.addEventListener('mouseenter', () => {
        clearInterval(autoAdvance);
      });

      testimonialsContainer.addEventListener('mouseleave', () => {
        autoAdvance = setInterval(() => {
          currentIndex = (currentIndex + 1) % testimonials.length;
          updateTestimonials();
        }, 5000);
      });

      // Initialize testimonials
      updateTestimonials();
    }
  }

  // Portfolio filter
  const portfolioFilters = document.querySelectorAll('.portfolio-filter button');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (portfolioFilters.length && portfolioItems.length) {
    portfolioFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        const category = filter.getAttribute('data-category');
        
        portfolioFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        portfolioItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    // Enhanced portfolio item interactions
    portfolioItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        if (overlay) {
          overlay.style.transform = 'translateY(0)';
        }
        item.style.transform = 'scale(1.05)';
      });
      
      item.addEventListener('mouseleave', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        if (overlay) {
          overlay.style.transform = 'translateY(100%)';
        }
        item.style.transform = 'scale(1)';
      });
    });
  }

  // Process steps interaction
  const processSteps = document.querySelectorAll('.process-step');
  processSteps.forEach(step => {
    step.addEventListener('mouseenter', () => {
      step.style.transform = 'scale(1.05) translateX(10px)';
      const number = step.querySelector('.step-number');
      if (number) {
        number.style.transform = 'scale(1.2)';
        number.style.color = 'var(--accent-color)';
      }
    });
    
    step.addEventListener('mouseleave', () => {
      step.style.transform = 'scale(1) translateX(0)';
      const number = step.querySelector('.step-number');
      if (number) {
        number.style.transform = 'scale(1)';
        number.style.color = 'inherit';
      }
    });
  });

  // Feature cards hover effect
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // Parallax scrolling effect for header
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      header.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
  }

  // Add parallax effect to hero section
  const hero = document.querySelector('.hero');
  const heroGraphic = document.querySelector('.hero-graphic');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero && heroGraphic) {
      hero.style.transform = `translateY(${scrolled * 0.4}px)`;
      heroGraphic.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
  });

  // Add mouse move parallax effect to hero section
  document.addEventListener('mousemove', (e) => {
    if (hero && heroGraphic) {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      hero.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
      heroGraphic.style.transform = `translate(${mouseX * -40}px, ${mouseY * -40}px)`;
    }
  });

  // Smooth scroll for the scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const nextSection = document.querySelector('#about');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Typing animation
  const texts = ['Innovative Design', 'Creative Solutions', 'Timeless Beauty'];
  let count = 0;
  let index = 0;
  let currentText = '';
  let letter = '';
  let isDeleting = false;
  
  function type() {
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    
    if (!typedTextSpan || !cursorSpan) return;

    currentText = texts[count];
    
    if (isDeleting) {
      letter = currentText.substring(0, index--);
    } else {
      letter = currentText.substring(0, ++index);
    }
    
    typedTextSpan.textContent = letter;
    
    if (!isDeleting && index === currentText.length) {
      cursorSpan.classList.remove("typing");
      setTimeout(() => {
        isDeleting = true;
      }, 2000);
    } else if (isDeleting && index === 0) {
      isDeleting = false;
      count = (count + 1) % texts.length;
      cursorSpan.classList.add("typing");
    }
    
    const typeSpeed = isDeleting ? 100 : 150;
    setTimeout(type, typeSpeed);
  }
  
  // Start typing animation
  type();
});