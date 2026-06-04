// 1. Grab the loading container element from our HTML screen
const loadingSpinner = document.querySelector('.loading-spinner-container');

// 2. Set up a simulated timer (2500 milliseconds = 2.5 seconds)
setTimeout(() => {

    // 3. If the spinner exists, smoothly lower its opacity to 0
    if (loadingSpinner) {
        loadingSpinner.style.transition = "opacity 0.5s ease";
        loadingSpinner.style.opacity = "0";

        // 4. Wait for the fade animation to finish, then remove it from layout completely
        setTimeout(() => {
            loadingSpinner.style.display = "none";
        }, 500);
    }

}, 2500);
// 1. Target all our navigation links and our section views
const navLinks = document.querySelectorAll('.nav-link');
const views = document.querySelectorAll('.app-view');

// 2. Setup an event loop to watch every single navigation link
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        // Prevent the link from jumping the page around
        event.preventDefault();

        // Remove the active purple color highlight from all links
        navLinks.forEach(item => item.classList.remove('active'));

        // Add the purple highlight to the link we just clicked!
        link.classList.add('active');

        // Get the target route attribute name (e.g., 'home' or 'blog')
        const targetRoute = link.getAttribute('data-route');

        // Loop through our page views and switch them dynamically
        views.forEach(view => {
            if (view.id === `${targetRoute}-view`) {
                view.style.display = 'block'; // Show the matching page view
            } else {
                view.style.display = 'none';  // Hide all other views
            }
        });
    });
});
// ==========================================================================
// LOCALSTORAGE LIVE VIEW COUNTER
// ==========================================================================

// 1. Check if our memory vault already has a count saved. If not, start at 0.
let savedViews = localStorage.getItem('profileViews');

if (savedViews === null) {
    savedViews = 0;
} else {
    // Convert the saved text string back into an actual number
    savedViews = parseInt(savedViews);
}

// 2. Increment the value by 1 because a fresh page visit just happened!
savedViews = savedViews + 1;

// 3. Save the new updated number back into the browser's permanent vault
localStorage.setItem('profileViews', savedViews);

// 4. Wait for the page DOM to finish loading, then inject the number into the table
window.addEventListener('DOMContentLoaded', () => {
    const viewsDisplay = document.getElementById('live-views');
    if (viewsDisplay) {
        viewsDisplay.textContent = savedViews.toLocaleString(); // Formats numbers with commas!
    }
});
// ==========================================================================
// DATA MUTATION: RESET ANALYTICS ENGINE
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById('reset-analytics-btn');
    const viewsDisplay = document.getElementById('live-views');

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            // 1. Ask the user for confirmation before wiping data
            const confirmReset = confirm("Are you sure you want to clear all storage metrics?");

            if (confirmReset) {
                // 2. Clear the specific profileViews cell out of local storage memory
                localStorage.removeItem('profileViews');

                // 3. Instantly snap the live UI interface display back to 0
                if (viewsDisplay) {
                    viewsDisplay.textContent = "0";
                }

                alert("Analytics reset successfully!");
            }
        });
    }
});
// ==========================================================================
// DYNAMIC ARTICLE DISPATCHER ENGINE
// ==========================================================================

// Fake database object holding our full text articles
const articleDatabase = {
    'flexbox-mastery': {
        title: "How I Mastered CSS Flexbox and Grid Layouts",
        meta: "June 2026 • Web Dev",
        content: "<p>When I first started styling web layouts, elements were flying all over the screen. Boxes overlapped, floats broke, and centering a simple button felt like sorting a puzzle in the dark.</p><p>Everything changed when I unlocked Flexbox invisible axes. By learning to orchestrate layout distributions along a Main Axis and Cross Axis using flex direction parameters, positioning objects snapped into a highly predictable workflow state.</p><p>Combining Flexbox formatting rules for single columns alongside CSS multi-column matrix frameworks gives you full visual layout control on any screen resolution imaginable!</p>"
    },
    'spa-routing': {
        title: "Understanding Single Page App Routing Engines",
        meta: "May 2026 • JavaScript",
        content: "<p>Traditional standard websites force web browsers to drop their current environment state and completely re-download a brand new html text layout document file from scratch every time you click a hyperlink node.</p><p>Single Page Applications discard that legacy approach. By intercepting link click events, we can block default page jumping and use Javascript variables to instantly flip visibility attributes across view modules on the fly.</p><p>This creates immediate, zero-latency rendering cycles that make your custom portfolio feel fluid, lightning-fast, and premium to use.</p>"
    }
};

window.addEventListener('DOMContentLoaded', () => {
    // We target our elements carefully using IDs and classes
    const blogGrid = document.querySelector('.blog-grid');
    const articleReader = document.getElementById('article-reader-view');
    const backButton = document.getElementById('back-to-blog-btn');

    const readerTitle = document.getElementById('article-read-title');
    const readerMeta = document.getElementById('article-read-meta');
    const readerContent = document.getElementById('article-read-content');

    // 1. Target all Read More link elements safely
    const readMoreLinks = document.querySelectorAll('.read-more-link');

    readMoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const href = link.getAttribute('href');
            if (!href) return; // Safety exit if href is missing

            const articleSlug = href.split('/').pop();
            const articleData = articleDatabase[articleSlug];

            // 🚨 FORTIFIED SAFETY CHECK: Ensure ALL targets exist before modifying them
            if (articleData && articleReader && readerTitle && readerMeta && readerContent) {

                // Inject the text content data
                readerTitle.textContent = articleData.title;
                readerMeta.innerHTML = articleData.meta;
                readerContent.innerHTML = articleData.content;

                // If the grid feed exists, hide it cleanly
                if (blogGrid) {
                    blogGrid.style.display = 'none';
                }

                // Reveal the full reader document view panel
                articleReader.style.display = 'block';
            } else {
                console.warn("Routing elements are missing from the DOM tree configuration.");
            }
        });
    });

    // 2. Handle the Back button return cycle safely
    if (backButton) {
        backButton.addEventListener('click', () => {
            if (articleReader) {
                articleReader.style.display = 'none';
            }
            if (blogGrid) {
                blogGrid.style.display = 'grid'; // Restore the 2-column card layout grid
            }
        });
    }
});