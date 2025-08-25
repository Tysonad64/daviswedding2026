// Shrinking Header Effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const scrollThreshold = 50; // Start shrinking after 50px of scrolling
    
    function updateHeader() {
        // Only apply shrink effect on mobile devices (screen width <= 768px)
        if (window.innerWidth <= 768) {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('shrink');
            } else {
                header.classList.remove('shrink');
            }
        } else {
            // Ensure header is not shrunk on desktop
            header.classList.remove('shrink');
        }
    }
    
    // Initial check
    updateHeader();
    
    // Listen for scroll events with debounce for better performance
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.cancelAnimationFrame(isScrolling);
        isScrolling = window.requestAnimationFrame(updateHeader);
    }, false);
    
    // Also update on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateHeader, 100);
    });
    
    // Handle anchor links with smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.startsWith('http')) return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});