// Function to detect mobile device
function isMobileDevice() {
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileRegex.test(navigator.userAgent) || window.innerWidth <= 768;
}

// Function to apply mobile-specific changes
function applyMobileChanges() {
    const body = document.body;
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');

    if (isMobileDevice()) {
        body.classList.add('mobile-device');
        
        // Add mobile menu toggle button
        if (!document.querySelector('.mobile-menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            
            // Insert before the nav element
            nav.parentNode.insertBefore(menuToggle, nav);
            
            // Toggle menu on click
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('show');
                menuToggle.innerHTML = nav.classList.contains('show') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !e.target.classList.contains('mobile-menu-toggle')) {
                nav.classList.remove('show');
                const menuToggle = document.querySelector('.mobile-menu-toggle');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });

        // Add touch event handling for better mobile interaction
        document.querySelectorAll('.robotics-item, .music-item').forEach(item => {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            item.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    } else {
        body.classList.remove('mobile-device');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (menuToggle) {
            menuToggle.remove();
        }
        nav.classList.remove('show');
    }
}

// Apply changes on load and resize
window.addEventListener('load', applyMobileChanges);
window.addEventListener('resize', applyMobileChanges);

// Add orientation change handling
window.addEventListener('orientationchange', () => {
    setTimeout(applyMobileChanges, 100); // Small delay to ensure proper rendering
});
