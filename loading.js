// --- Dynamic Game Name Detection ---
const path = window.location.pathname.toLowerCase();
let gameName = "Budget Games";
if (path.includes("tictactoe")) gameName = "Tic Tac Toe";
else if (path.includes("pong")) gameName = "Pong";
else if (path.includes("multiplayer")) gameName = "Multiplayer";
else if (path.includes("sp")) gameName = "Single Player";
// Add more as needed

// --- Set Loading Text ---
const loadingText = document.getElementById('loading-text');
if (loadingText) loadingText.textContent = `Loading ${gameName}...`;

// --- Wait for Full Page and Images ---
window.addEventListener('load', () => {
    // Wait for all images to load
    const images = Array.from(document.images);
    let loaded = 0;
    if (images.length === 0) hideLoader();
    images.forEach(img => {
        if (img.complete) {
            loaded++;
            if (loaded === images.length) hideLoader();
        } else {
            img.addEventListener('load', () => {
                loaded++;
                if (loaded === images.length) hideLoader();
            });
            img.addEventListener('error', () => {
                loaded++;
                if (loaded === images.length) hideLoader();
            });
        }
    });
    function hideLoader() {
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }
});
