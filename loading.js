// Loading animation functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading script started');

    // Show loading overlay immediately
    document.documentElement.classList.add('js');
    document.body.style.overflow = 'hidden';

    // Function to handle page loaded state
    function handlePageLoaded() {
        console.log('Page loaded, adding loaded class');
        document.body.classList.add('loaded');
        
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            console.log('Hiding loading overlay');
            loadingOverlay.classList.add('hidden');
            
            loadingOverlay.addEventListener('transitionend', function() {
                if (loadingOverlay && loadingOverlay.parentNode) {
                    console.log('Removing loading overlay from DOM');
                    loadingOverlay.remove();
                    document.body.style.overflow = '';
                }
            }, { once: true });
        } else {
            console.log('Loading overlay not found');
            document.body.style.overflow = '';
        }
    }

    // Check if page is already loaded
    if (document.readyState === 'complete') {
        console.log('Document already loaded, running handler immediately');
        setTimeout(handlePageLoaded, 300);
    } else {
        console.log('Adding load event listener');
        window.addEventListener('load', function() {
            console.log('Window load event fired');
            setTimeout(handlePageLoaded, 300);
        });
    }

    // Fallback in case load event never fires
    setTimeout(function() {
        if (!document.body.classList.contains('loaded')) {
            console.log('Fallback: Forcing page to loaded state');
            handlePageLoaded();
        }
    }, 3000);
});
