document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header-premium');
    
    // Efecto de desvanecimiento del header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animación suave de revelado para elementos de la interfaz (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animación única
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
});