document.addEventListener('DOMContentLoaded', () => {
  const bmiForm = document.getElementById('bmiForm');
  const bmiResult = document.getElementById('bmiResult');

  // Calculate BMI and show a plain-language category.
  bmiForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const weight = Number(document.getElementById('weight').value);
    const heightCm = Number(document.getElementById('height').value);

    if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
      bmiForm.classList.add('was-validated');
      bmiResult.className = 'bmi-result';
      bmiResult.innerHTML = '<span>Please enter a valid weight and height.</span>';
      return;
    }

    const bmi = weight / ((heightCm / 100) ** 2);
    let category = 'Underweight';
    if (bmi >= 30) category = 'Obese';
    else if (bmi >= 25) category = 'Overweight';
    else if (bmi >= 18.5) category = 'Normal Weight';

    bmiResult.className = 'bmi-result';
    bmiResult.innerHTML = `<small>Your BMI result</small><strong>${bmi.toFixed(1)}</strong><span>${category}</span>`;
  });

  // Client-side contact validation; no data is sent anywhere.
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactForm.classList.add('was-validated');
    if (!contactForm.checkValidity()) return;
    formSuccess.classList.remove('d-none');
    contactForm.reset();
    contactForm.classList.remove('was-validated');
  });

  // Prefill the contact form when a membership plan is chosen.
  document.querySelectorAll('.plan-button').forEach((button) => {
    button.addEventListener('click', () => {
      const program = document.getElementById('program');
      program.value = 'Personal Training';
      document.getElementById('message').value = `I'm interested in the ${button.dataset.plan} membership plan. Please share the next steps.`;
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => document.getElementById('name').focus(), 550);
    });
  });

  // Gallery lightbox interaction.
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  };
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      lightboxImage.src = item.dataset.image;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });

  // Keep the active nav item aligned with the current section.
  const links = [...document.querySelectorAll('#mainNav .nav-link')];
  const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));

  // Close the collapsed Bootstrap menu after choosing a link.
  document.querySelectorAll('#navMenu .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navMenu');
      const collapse = bootstrap.Collapse.getInstance(menu);
      if (collapse) collapse.hide();
    });
  });

  // Scroll-to-top button.
  const scrollTop = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => scrollTop.classList.toggle('show', window.scrollY > 500), { passive: true });
  scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Persist the visual theme for the next visit.
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('fitzone-theme');
  if (storedTheme === 'light') document.body.classList.add('light-mode');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('fitzone-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  });
});
