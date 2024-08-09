document.addEventListener('DOMContentLoaded', (event) => {
    const themeToggle = document.getElementById('themeToggle');
    const languageToggle = document.querySelector('.btn-group[aria-label="Language toggle"]');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link');

    // Theme toggle functionality
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.setAttribute('data-bs-theme', 'dark');
            document.querySelector('.navbar').classList.remove('navbar-light');
            document.querySelector('.navbar').classList.add('navbar-dark');
        } else {
            body.setAttribute('data-bs-theme', 'light');
            document.querySelector('.navbar').classList.remove('navbar-dark');
            document.querySelector('.navbar').classList.add('navbar-light');
        }
    });

    // Language toggle functionality
    const translations = {
        en: {
            summary: 'Professional Summary',
            experience: 'Work Experience',
            education: 'Education',
            skills: 'Skills'
        },
        de: {
            summary: 'Professionelle Zusammenfassung',
            experience: 'Berufserfahrung',
            education: 'Ausbildung',
            skills: 'Fähigkeiten'
        }
    };

    let currentLang = 'en';

    function updateLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = translations[lang][key];
        });
        
        // Update active state of language buttons
        languageToggle.querySelectorAll('button').forEach(button => {
            if (button.getAttribute('data-lang') === lang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    languageToggle.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            currentLang = e.target.getAttribute('data-lang');
            updateLanguage(currentLang);
        }
    });

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 10; // 10px offset for better UX
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Initialize translations and active language
    updateLanguage(currentLang);
});