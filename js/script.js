// Theme toggling functionality with smooth transitions
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const darkModeEnabled = localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Apply theme immediately to prevent flash
    if (darkModeEnabled) {
        html.classList.add('dark');
    }

    // Toggle theme with smooth transition
    themeToggle.addEventListener('click', () => {
        // Add transition to all elements
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            element.style.transition = 'background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease';
        });

        // Toggle dark mode
        html.classList.toggle('dark');
        
        // Save preference
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
        
        // Remove transitions after animation completes
        setTimeout(() => {
            document.body.style.transition = '';
            allElements.forEach(element => {
                element.style.transition = '';
            });
        }, 500);
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };

    // Initial check and scroll listener
    animateOnScroll();
    window.addEventListener('scroll', () => {
        requestAnimationFrame(animateOnScroll);
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });

    // Add hover effects to nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });

    // Add hover effect to profile image
    const profileImg = document.querySelector('.profile-container img');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', () => {
            profileImg.style.transform = 'scale(1.1) rotate(5deg)';
        });
        profileImg.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'scale(1) rotate(0)';
        });
    }

    // Add smooth scroll behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize animations for elements with animate-on-scroll class
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Add emoji hover effects
    const emojis = document.querySelectorAll('.text-4xl');
    emojis.forEach(emoji => {
        emoji.addEventListener('mouseenter', () => {
            emoji.style.transform = 'scale(1.2) rotate(10deg)';
            emoji.style.transition = 'transform 0.3s ease';
        });
        emoji.addEventListener('mouseleave', () => {
            emoji.style.transform = 'scale(1) rotate(0)';
        });
    });
});
