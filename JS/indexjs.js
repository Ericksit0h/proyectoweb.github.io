document.addEventListener('DOMContentLoaded', () => {

    // --- 1. EFECTO DEL ENCABEZADO AL HACER SCROLL ---
    const header = document.querySelector('.encabezado');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. RESALTAR EL ENLACE DEL MENÚ AUTOMÁTICAMENTE (SCROLL SPY) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.menu a[href^="#"]');

    const sectionObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px', // Ajusta cuándo se activa la sección
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Quitar la clase 'activo' de todos los enlaces
                navLinks.forEach(link => link.classList.remove('activo'));
                
                // Añadir la clase 'activo' al enlace correspondiente
                const activeLink = document.querySelector(`.menu a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('activo');
                }
            }
        });
    }, sectionObserverOptions);

    sections.forEach(sec => sectionObserver.observe(sec));

    // --- 3. ANIMACIONES DE APARICIÓN (SCROLL REVEAL) ---
    // Seleccionamos todas las tarjetas y contenedores de texto principales
    const revealElements = document.querySelectorAll('.tarjeta, .quienes-tarjeta, .servicio-card, .tarjeta-proyecto, .quienes-intro, .servicios-intro');
    
    // Le añadimos la clase base de animación por JS para no tocar tu HTML
    revealElements.forEach(el => el.classList.add('reveal-item'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target); // Hace que la animación solo ocurra la primera vez
            }
        });
    }, {
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
});