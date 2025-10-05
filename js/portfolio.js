// Render portfolio on main site with Spotify and YouTube embeds
function renderPortfolio() {
    const portfolioContainer = document.getElementById('portfolio-container');
    portfolioContainer.innerHTML = '';
    
    if (websiteData.portfolio.length === 0) {
        portfolioContainer.innerHTML = `
            <div class="no-tracks-message" style="text-align: center; padding: 3rem;">
                <i class="fas fa-music" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                <h3>No tracks available yet</h3>
                <p>Add your tracks to display them here.</p>
            </div>
        `;
        return;
    }
    
    websiteData.portfolio.forEach(item => {
        let portfolioItem;
        
        if (item.type === "spotify") {
            const height = item.type === 'album' ? '380' : '352';
            portfolioItem = document.createElement('div');
            portfolioItem.className = 'spotify-player fade-in';
            portfolioItem.innerHTML = `
                <div class="track-header">
                    <h3>${item.title}</h3>
                    <a href="${item.spotifyUrl}" target="_blank" class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                        <i class="fab fa-spotify"></i> Open in Spotify
                    </a>
                </div>
                <div class="spotify-embed">
                    <iframe style="border-radius:12px" src="${item.embedUrl}" 
                            width="100%" height="${height}" frameBorder="0" 
                            allowfullscreen="" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                            loading="lazy">
                    </iframe>
                </div>
                ${item.description ? `<p style="margin-top: 1rem;">${item.description}</p>` : ''}
            `;
        } else if (item.type === "youtube") {
            portfolioItem = document.createElement('div');
            portfolioItem.className = 'youtube-player fade-in';
            portfolioItem.innerHTML = `
                <div class="track-header">
                    <h3>${item.title}</h3>
                    <a href="${item.youtubeUrl}" target="_blank" class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                        <i class="fab fa-youtube"></i> Watch on YouTube
                    </a>
                </div>
                <div class="youtube-embed">
                    <iframe width="100%" height="315" src="${item.youtubeUrl}" 
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                </div>
                ${item.description ? `<p style="margin-top: 1rem;">${item.description}</p>` : ''}
            `;
        }
        
        portfolioContainer.appendChild(portfolioItem);
    });
}

// Render services on main site
function renderServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    servicesGrid.innerHTML = '';
    
    websiteData.services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card fade-in';
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <a href="#contact" class="btn">Get Quote</a>
        `;
        servicesGrid.appendChild(serviceCard);
    });
}