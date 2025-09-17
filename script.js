// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.navigation a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Account for sticky navigation
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active navigation item based on scroll position
    function highlightActiveNav() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.navigation a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Add scroll event listener for active navigation highlighting
    window.addEventListener('scroll', highlightActiveNav);
    
    // Initial call to set active nav on page load
    highlightActiveNav();
    
    // Add fade-in animation for sections on scroll
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -10px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for fade-in animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Email copy functionality (optional enhancement)
    const emailLink = document.querySelector('.email');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            // Allow normal email link behavior, but also copy to clipboard
            const email = this.textContent;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(function() {
                    // Show a brief notification (you could enhance this with a toast)
                    console.log('Email copied to clipboard: ' + email);
                }).catch(function(err) {
                    console.log('Could not copy email: ', err);
                });
            }
        });
    }
});

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .navigation a.active {
        background-color: #2563eb;
        color: white;
    }
    
    .navigation a.active:hover {
        background-color: #1d4ed8;
        color: white;
    }
`;
document.head.appendChild(style);
