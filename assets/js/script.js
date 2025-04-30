// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
});

// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');
});

// Testimonial slider (index.html)
if (document.getElementById('testimonial-slider')) {
  const slider = document.getElementById('testimonial-slider');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentIndex = 0;

  function updateSlider() {
    const slideWidth = slider.querySelector('.testimonial-slide').offsetWidth;
    slider.scrollTo({ left: slideWidth * currentIndex, behavior: 'smooth' });

    // Update active dot
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  // Auto-slide every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slider.querySelectorAll('.testimonial-slide').length;
    updateSlider();
  }, 5000);

  // Dot click navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
    });
  });

  // Initialize slider
  updateSlider();
}

// Contact form handling (contact.html)
if (document.getElementById('contact-form')) {
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (name && email && message) {
      alert('Thank you for your message! We will get back to you soon.');
      e.target.reset();
    } else {
      alert('Please fill out all required fields.');
    }
  });
}

// Newsletter form handling (index.html)
if (document.getElementById('newsletter-form')) {
  document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value.trim();
    if (email) {
      alert('Thank you for subscribing!');
      e.target.reset();
    } else {
      alert('Please enter a valid email address.');
    }
  });
}

// Product search and filter (products.html)
if (document.getElementById('search') && document.getElementById('category-filter')) {
  const searchInput = document.getElementById('search');
  const categoryFilter = document.getElementById('category-filter');
  const products = document.querySelectorAll('.product');
  const productList = document.getElementById('product-list');
  const emptyState = document.getElementById('empty-state');

  function filterProducts() {
    const query = searchInput.value.toLowerCase();
    const category = categoryFilter.value.toLowerCase();
    let visibleCount = 0;

    products.forEach(product => {
      const name = product.querySelector('h3').textContent.toLowerCase();
      const productCategory = product.dataset.category.toLowerCase();
      const matchesSearch = name.includes(query);
      const matchesCategory = !category || productCategory === category;

      if (matchesSearch && matchesCategory) {
        product.style.display = 'block';
        visibleCount++;
      } else {
        product.style.display = 'none';
      }
    });

    // Toggle empty state
    if (visibleCount === 0) {
      emptyState.classList.remove('hidden');
      productList.classList.add('hidden');
    } else {
      emptyState.classList.add('hidden');
      productList.classList.remove('hidden');
    }
  }

  searchInput.addEventListener('input', filterProducts);
  categoryFilter.addEventListener('change', filterProducts);

  // Clear search button
  document.getElementById('clear-search').addEventListener('click', () => {
    searchInput.value = '';
    categoryFilter.value = '';
    filterProducts();
  });
}

// Accordion for FAQs (faq.html)
if (document.querySelector('.accordion')) {
  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(accordion => {
    const button = accordion.querySelector('button');
    const content = accordion.querySelector('.accordion-content');
    const icon = accordion.querySelector('.accordion-icon');

    if (!content || !button || !icon) {
      console.error('Accordion missing required elements:', { button, content, icon });
      return;
    }

    button.addEventListener('click', () => {
      const isActive = accordion.classList.contains('active');

      // Close all accordions
      accordions.forEach(acc => {
        acc.classList.remove('active');
        const accContent = acc.querySelector('.accordion-content');
        const accButton = acc.querySelector('button');
        const accIcon = acc.querySelector('.accordion-icon');
        accContent.classList.add('hidden');
        accContent.style.maxHeight = null;
        accContent.style.opacity = '0';
        accButton.setAttribute('aria-expanded', 'false');
        accIcon.classList.remove('rotate-180');
      });

      // Open clicked accordion
      if (!isActive) {
        accordion.classList.add('active');
        content.classList.remove('hidden');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
        button.setAttribute('aria-expanded', 'true');
        icon.classList.add('rotate-180');
      }
    });
  });
}