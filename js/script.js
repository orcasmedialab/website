// Your JavaScript code can go here if needed

// Content loading functionality
const sections = ['about', 'products', 'media', 'projects'];

const createLoadingState = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loading">Loading...</div>';
    }
};

const loadContent = async () => {
    try {
        await Promise.all(sections.map(async (section) => {
            const elementId = `${section}-content`;
            createLoadingState(elementId);
            
            const response = await fetch(`sections/${section}.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                // Using DOMPurify to sanitize the HTML
                element.innerHTML = DOMPurify.sanitize(data);
            }
        }));
    } catch (error) {
        console.error('Error loading content:', error);
        sections.forEach(section => {
            const element = document.getElementById(`${section}-content`);
            if (element) {
                element.innerHTML = 
                    '<div class="error">Failed to load content. Please refresh the page.</div>';
            }
        });
    }
};

// Navigation functionality
const handleNavigation = () => {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Update aria-current
                navLinks.forEach(l => l.removeAttribute('aria-current'));
                link.setAttribute('aria-current', 'page');
            }
        });
    });
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Handle active navigation state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.setAttribute('aria-current', 'page');
            link.classList.add('active');
        }
    });

    // Page-specific initializations
    switch (currentPage) {
        case 'projects.html':
            initializeProjectsDemos();
            break;
        case 'media.html':
            initializeMediaGallery();
            break;
        // Add other page-specific initializations as needed
    }
});

// Page-specific functions
function initializeProjectsDemos() {
    // Initialize interactive demos for projects page
    // ... implementation ...
}

function initializeMediaGallery() {
    // Initialize media gallery functionality
    // ... implementation ...
}
