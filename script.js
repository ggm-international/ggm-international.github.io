/* ==========================================================================
   GRACE OF GOD MISSION INTERNATIONAL - MAIN JAVASCRIPT
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. Tailwind Configuration
   Must run right after the Tailwind CDN script tag in <head>
   -------------------------------------------------------------------------- */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                // Extracted directly from the GGM logo
                brandBlue: {
                    DEFAULT: '#000033', // Deep navy blue
                    light: '#1a1a4d',
                    dark: '#000022'
                },
                brandRed: {
                    DEFAULT: '#e60000', // Crimson red
                    hover: '#cc0000',
                    light: '#ff3333'
                },
                brandGold: {
                    DEFAULT: '#ffcc00', // Bright gold / yellow
                    light: '#ffe680',
                    dark: '#e6b800'
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            }
        }
    }
};

/* --------------------------------------------------------------------------
   2. Accordion Function (Used on About Page for "What We Believe")
   Can be called inline via onclick="toggleAccordion(id)" or automatically
   -------------------------------------------------------------------------- */
function toggleAccordion(id) {
    const content = document.getElementById(`content-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    
    if (!content) return;

    const isHidden = content.classList.contains('hidden') || content.style.display === 'none' || getComputedStyle(content).display === 'none';

    // Close all other accordion items (optional accordion behavior)
    document.querySelectorAll('.accordion-content').forEach(item => {
        item.style.display = 'none';
    });
    document.querySelectorAll('.accordion-icon').forEach(ic => {
        ic.classList.remove('fa-chevron-up');
        ic.classList.add('fa-chevron-down');
    });

    // Toggle current item
    if (isHidden) {
        content.style.display = 'block';
        if (icon) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    } else {
        content.style.display = 'none';
        if (icon) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    }
}

/* --------------------------------------------------------------------------
   3. Main Interactivity Scripts
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {

    /* --- Mobile Navigation Menu Toggle --- */
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('mobile-menu-icon');

    function closeMobileMenu() {
        if (!menu || !btn) return;
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open main menu');
        if (menuIcon) {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    }

    function openMobileMenu() {
        if (!menu || !btn) return;
        menu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        btn.setAttribute('aria-label', 'Close main menu');
        if (menuIcon) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        }
    }

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.contains('hidden') ? openMobileMenu() : closeMobileMenu();
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) closeMobileMenu();
        });
    }

    /* --- Navbar Scroll Effect --- */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-lg');
                navbar.classList.remove('shadow-md');
            } else {
                navbar.classList.add('shadow-md');
                navbar.classList.remove('shadow-lg');
            }
        });
        window.dispatchEvent(new Event('scroll'));
    }

    /* --- Accordion Initialization (Hide content by default except first item) --- */
    const accordionContents = document.querySelectorAll('.accordion-content');
    accordionContents.forEach((content, index) => {
        if (index === 0) {
            content.style.display = 'block';
            const firstIcon = document.getElementById('icon-1');
            if (firstIcon) {
                firstIcon.classList.remove('fa-chevron-down');
                firstIcon.classList.add('fa-chevron-up');
            }
        } else {
            content.style.display = 'none';
        }
    });

    /* --- Sermons Category Filter (On Sermons Page) --- */
    const sermonFilterButtons = document.querySelectorAll('.sermon-filter-btn');
    const sermonCards = document.querySelectorAll('.sermon-card');

    if (sermonFilterButtons.length > 0 && sermonCards.length > 0) {
        sermonFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');

                // Update active button state
                sermonFilterButtons.forEach(btn => {
                    btn.classList.remove('bg-brandBlue', 'text-white');
                    btn.classList.add('bg-white', 'text-brandBlue', 'border', 'border-gray-200');
                });
                button.classList.remove('bg-white', 'text-brandBlue', 'border', 'border-gray-200');
                button.classList.add('bg-brandBlue', 'text-white');

                // Filter cards
                sermonCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    /* --- Visitor & Prayer Request Form Handling Placeholder --- */
    const attendForm = document.getElementById('attend-form');
    if (attendForm) {
        attendForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formFeedback = document.getElementById('form-feedback');
            if (formFeedback) {
                formFeedback.innerHTML = `
                    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow mt-4 flex items-center gap-2">
                        <i class="fa-solid fa-circle-check text-xl"></i>
                        <span>Thank you! Your message has been received. Our team will get back to you shortly.</span>
                    </div>
                `;
                attendForm.reset();
            }
        });
    }
});
