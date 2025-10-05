// Website Data
const websiteData = {
    portfolio: [
        // {
        //     id: 1,
        //     title: "Latest Release - 'Midnight Dreams'",
        //     spotifyUrl: "https://open.spotify.com/track/3sZFCIIqhFmbBxMZmeb5CQ",
        //     embedUrl: "https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT?utm_source=generator&theme=1",
        //     description: "My newest track showcasing modern production techniques with melodic elements",
        //     type: "spotify"
        // },
        // {
        //     id: 2,
        //     title: "Popular Album - 'Urban Echoes'",
        //     spotifyUrl: "https://open.spotify.com/album/4aawyAB9vmqN3uQ7FjRGTy",
        //     embedUrl: "https://open.spotify.com/embed/album/4aawyAB9vmqN3uQ7FjRGTy?utm_source=generator&theme=1",
        //     description: "Full album production work featuring various artists",
        //     type: "spotify"
        // },
        // {
        //     id: 3,
        //     title: "YouTube - 'Summer Vibes' Music Video",
        //     youtubeUrl: "https://www.youtube.com/watch?v=IkdUxukRsX8&list=RDIkdUxukRsX8&start_radio=1",
        //     description: "Official music video with cinematic visuals and professional audio mixing",
        //     type: "youtube"
        // },
        {
            id: 4,
            title: " Whispers of Dawn (Prod. by Dhanuraj Singh)",
            youtubeUrl: "https://www.youtube.com/watch?v=kvi4zeQG854",
            // description: "High-energy EDM production with complex layering and mastering",
            description: "a calm, soulful instrumental produced by Dhanuraj Singh. Perfect for peaceful mornings and creative moments",
            type: "youtube"
        }
    ],
    services: [
        {
            id: 1,
            name: "Complete Track Production",
            icon: "fas fa-music",
            description: "From your idea to a fully produced, radio-ready track. I handle everything from beat creation to final mastering."
        },
        {
            id: 2,
            name: "Mixing & Mastering",
            icon: "fas fa-sliders-h",
            description: "Professional mixing and mastering services to make your tracks sound polished and commercial-ready."
        },
        {
            id: 3,
            name: "Full Cover Song Production",
            icon: "fas fa-guitar",
            description: "Professional cover song production with unique arrangements tailored to your style."
        },
        {
            id: 4,
            name: "Reel Cover Songs",
            icon: "fas fa-mobile-alt",
            description: "60-second professionally produced covers optimized for Instagram, TikTok, and social media."
        },
        {
            id: 5,
            name: "Background Score Composition",
            icon: "fa-desktop",
            description: "Custom background scores for films, ads, and YouTube videos to enhance your visual storytelling."
        },
        // {
        //     id: 5,
        //     name: "Beat Licensing",
        //     icon: "fas fa-compact-disc",
        //     description: "High-quality, exclusive beats available for licensing. Perfect for your next project."
        // }
    ],
    offer: {
        active: true,
        title: "LIMITED TIME OFFER!",
        description: "Get any cover song professionally produced for just ₹5,000 (Regularly ₹10,000+)",
        endDate: "2025-10-15",
        maxProjects: 15,
        bookedProjects: 1
    }
};

// Check if user has already claimed the offer
function checkOfferClaimed() {
    return localStorage.getItem('offerClaimed') === 'true';
}

// Generate a unique offer code
function generateOfferCode() {
    const prefix = "COVER";
    const timestamp = Date.now().toString().slice(-4);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return prefix + timestamp + randomNum;
}

// Claim offer function
function claimOffer() {
    // Check if offer has already been claimed
    if (checkOfferClaimed()) {
        alert("You have already claimed this offer! Your discount code is: " + localStorage.getItem('offerCode'));
        return;
    }

    // Generate a unique code
    const offerCode = generateOfferCode();
    
    // Store in localStorage that the offer has been claimed
    localStorage.setItem('offerClaimed', 'true');
    localStorage.setItem('offerCode', offerCode);
    localStorage.setItem('offerClaimedDate', new Date().toISOString());
    
    // Update the global booked projects count
    websiteData.offer.bookedProjects++;
    updateAnnouncementBar();
    
    // Show the offer code modal
    document.getElementById('offerCode').textContent = offerCode;
    document.getElementById('offerModal').style.display = 'flex';
    
    // Update eligibility badge and promo code field
    updateEligibilityBadge();
    
    // Start modal countdown (7 days from now)
    startModalCountdown();
}

// Copy offer code to clipboard
function copyOfferCode() {
    const offerCode = document.getElementById('offerCode').textContent;
    navigator.clipboard.writeText(offerCode).then(() => {
        const codeElement = document.getElementById('offerCode');
        codeElement.classList.add('copied');
        setTimeout(() => {
            codeElement.classList.remove('copied');
        }, 2000);
    });
}

// Close modal function
function closeModal() {
    document.getElementById('offerModal').style.display = 'none';
}

// Update eligibility badge
function updateEligibilityBadge() {
    const eligibilityBadge = document.getElementById('eligibilityBadge');
    const promoCodeInput = document.getElementById('promoCode');
    
    if (checkOfferClaimed()) {
        const offerCode = localStorage.getItem('offerCode');
        eligibilityBadge.style.display = 'block';
        if (promoCodeInput) {
            promoCodeInput.value = offerCode;
        }
    } else {
        eligibilityBadge.style.display = 'none';
    }
}

// Modal countdown timer (7 days from claim)
function startModalCountdown() {
    const modalCountdownElement = document.getElementById('modalCountdown');
    const claimDate = new Date(localStorage.getItem('offerClaimedDate'));
    const expiryDate = new Date(claimDate.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days
    
    function updateModalCountdown() {
        const now = new Date();
        const timeLeft = expiryDate - now;
        
        if (timeLeft <= 0) {
            modalCountdownElement.textContent = "EXPIRED!";
            return;
        }
        
        // Calculate days, hours, minutes
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        // Format the countdown
        if (days > 0) {
            modalCountdownElement.textContent = `${days} days, ${hours} hours`;
        } else if (hours > 0) {
            modalCountdownElement.textContent = `${hours} hours, ${minutes} minutes`;
        } else {
            modalCountdownElement.textContent = `${minutes} minutes`;
        }
    }
    
    // Update immediately and then every minute
    updateModalCountdown();
    setInterval(updateModalCountdown, 60000);
}

// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-bars');
    this.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        document.querySelector('.mobile-menu-btn i').classList.add('fa-bars');
        document.querySelector('.mobile-menu-btn i').classList.remove('fa-times');
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling
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

// Creative Background Elements
function createCreativeElements() {
    const creativeBg = document.getElementById('creativeBg');
    
    // Add floating elements
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // Random size and position
        const size = Math.random() * 100 + 50;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        
        creativeBg.appendChild(element);
    }
    
    // Add music notes
    for (let i = 0; i < 8; i++) {
        const note = document.createElement('div');
        note.className = 'music-note';
        note.innerHTML = '<i class="fas fa-music"></i>';
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        note.style.left = `${left}%`;
        note.style.top = `${top}%`;
        
        creativeBg.appendChild(note);
    }
}

// Real Countdown Timer for Announcement Bar
function startAnnouncementCountdown() {
    const countdownElement1 = document.getElementById('announcementCountdown');
    const countdownElement2 = document.getElementById('announcementCountdown2');
    const endDate = new Date(websiteData.offer.endDate);
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = endDate - now;
        
        if (timeLeft <= 0) {
            countdownElement1.textContent = "Offer Expired!";
            countdownElement2.textContent = "Offer Expired!";
            return;
        }
        
        // Calculate days, hours, minutes
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        // Format the countdown
        const countdownText = `${days}d ${hours}h ${minutes}m`;
        countdownElement1.textContent = countdownText;
        countdownElement2.textContent = countdownText;
    }
    
    // Update immediately and then every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

// Update the announcement bar based on current data
function updateAnnouncementBar() {
    const announcementBar = document.getElementById('announcementBar');
    const projectsCounter = document.getElementById('projectsCounter');
    
    // Check if offer should be displayed
    const today = new Date();
    const endDate = new Date(websiteData.offer.endDate);
    const isActive = websiteData.offer.active && 
                    today <= endDate && 
                    websiteData.offer.bookedProjects < websiteData.offer.maxProjects;
    
    if (isActive) {
        // Show announcement bar
        announcementBar.style.display = 'block';
    } else {
        // Hide announcement bar
        announcementBar.style.display = 'none';
    }
}

// Fade in animation on scroll
function setupFadeInObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    renderPortfolio();
    renderServices();
    updateAnnouncementBar();
    createCreativeElements();
    setupFadeInObserver();
    startAnnouncementCountdown();
    
    // Check if user has already claimed the offer
    updateEligibilityBadge();
    
    // Add phone number formatting
    document.getElementById('phone').addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');
    });

    document.getElementById('whatsapp').addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');
    });
});

console.log('🎵 Personal Music Producer website loaded successfully!');