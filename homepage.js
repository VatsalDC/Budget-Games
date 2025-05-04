// Theme switcher
const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeSwitch.checked = true;
    }
}

// Handle theme switch
themeSwitch.addEventListener('change', function() {
    if (this.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Loading screen handler
window.addEventListener('load', () => {
    // Hide loading screen after page is fully loaded
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500); // Wait for fade out animation
    }
});

// Show loading screen when navigating away
function showLoadingOnNavigation() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
    }
}

// Mobile Sidebar Handlers
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('mobileSidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    
    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
    }
    
    function closeSidebarFunc() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    sidebarToggle.addEventListener('click', openSidebar);
    closeSidebar.addEventListener('click', closeSidebarFunc);
    overlay.addEventListener('click', closeSidebarFunc);
    
    // Close sidebar on navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-item');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            showLoadingOnNavigation();
            closeSidebarFunc();
        });
    });
});

// Navigation highlight effect
document.addEventListener('DOMContentLoaded', function() {
    // Sliding text effect
    const slidingText = document.querySelector('.sliding-text');
    if (slidingText) {
        const textSpan = slidingText.querySelector('span');
        
        slidingText.addEventListener('mousemove', (e) => {
            const rect = textSpan.getBoundingClientRect();
            // Only process if cursor is within the text bounds
            if (e.clientX >= rect.left && e.clientX <= rect.right) {
                const x = e.clientX - rect.left; // Get cursor position relative to span
                const percent = (x / rect.width) * 100;
                textSpan.style.setProperty('--x', `${percent}%`);
            }
        });

        slidingText.addEventListener('mouseleave', () => {
            textSpan.style.setProperty('--x', '0%');
        });

        // Reset when cursor enters from outside
        slidingText.addEventListener('mouseenter', (e) => {
            const rect = textSpan.getBoundingClientRect();
            if (e.clientX < rect.left) {
                textSpan.style.setProperty('--x', '0%');
            } else if (e.clientX > rect.right) {
                textSpan.style.setProperty('--x', '100%');
            }
        });
    }

    const navContainer = document.querySelector('.d-lg-flex');
    if (!navContainer) return;

    // Create highlight element
    const highlight = document.createElement('div');
    highlight.className = 'nav-highlight';
    navContainer.appendChild(highlight);

    const navItems = navContainer.querySelectorAll('.tttgs, .ponggs');
    let currentItem = null;

    function updateHighlight(item) {
        if (!item) {
            highlight.style.opacity = '0';
            return;
        }
        const rect = item.getBoundingClientRect();
        const containerRect = navContainer.getBoundingClientRect();
        
        highlight.style.width = `${rect.width}px`;
        highlight.style.left = `${rect.left - containerRect.left}px`;
        highlight.style.opacity = '1';
    }

    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            currentItem = item;
            updateHighlight(item);
        });
    });

    navContainer.addEventListener('mouseleave', () => {
        currentItem = null;
        updateHighlight(null);
    });
});

// Game in development message
document.querySelectorAll('.pongbtn, .ponggs, #notavailablemsg').forEach(el => {
    el.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'unavailable.html';
    });
});

// Game navigation handlers
document.getElementById('tttgs')?.addEventListener('click', () => {
    showLoadingOnNavigation();
    window.location.href = "tictactoe/tictactoe.html";
});

// Add loading indicator for images
document.addEventListener('DOMContentLoaded', () => {
    // Check if all images are loaded
    const images = document.querySelectorAll('img');
    let loadedImages = 0;

    function imageLoaded() {
        loadedImages++;
        if (loadedImages === images.length) {
            // All images are loaded
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }
    }

    images.forEach(img => {
        if (img.complete) {
            imageLoaded();
        } else {
            img.addEventListener('load', imageLoaded);
            img.addEventListener('error', imageLoaded); // Handle error cases too
        }
    });
});

// Create custom cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

// Move cursor with mouse
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Hide cursor when mouse leaves window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Show cursor when mouse enters window
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});
