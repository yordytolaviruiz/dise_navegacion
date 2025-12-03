/* ===============================================
   MENÚ HAMBURGUESA INTERACTIVO
   =============================================== */

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle del menú hamburguesa
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// ===============================================
//   NAVEGACIÓN SUAVE (SMOOTH SCROLL)
// ===============================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Verificar si es un ancla interna
        if (href.startsWith('#')) {
            e.preventDefault();
            
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                // Actualizar el enlace activo
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Cerrar menú móvil
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Scroll suave hacia el contenido
                const navbarHeight = 70;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===============================================
//   CERRAR MENÚ AL HACER CLIC FUERA
// ===============================================

document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===============================================
//   SCROLLSPY: Marcar menú según sección visible
// ===============================================

const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollPos = window.scrollY || window.pageYOffset;
    const offset = 100; // Offset para activar antes de llegar a la sección
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - offset;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Actualizar clase active en los enlaces
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Eventos para ScrollSpy
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('resize', updateActiveLink);
document.addEventListener('DOMContentLoaded', updateActiveLink);

// ===============================================
//   LOGS DE CONFIRMACIÓN
// ===============================================

console.log('✅ Navegación cargada exitosamente');
console.log('📋 Características activas:');
console.log('  ✓ Menú fijo en la parte superior');
console.log('  ✓ Scroll suave entre secciones');
console.log('  ✓ Menú hamburguesa responsive');
console.log('  ✓ ScrollSpy (resalta sección actual)');
console.log('  ✓ Cerrar menú al hacer clic fuera');