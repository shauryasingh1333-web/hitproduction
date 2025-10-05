// Enhanced Link Management System
document.addEventListener('DOMContentLoaded', function() {
    const linksInputsContainer = document.getElementById('linksInputsContainer');
    const addLinkBtn = document.getElementById('addLinkBtn');
    const linksPreviewContent = document.getElementById('linksPreviewContent');
    const hiddenTextarea = document.getElementById('referenceLinks');
    
    // Initialize with one empty link input
    addLinkInput();
    
    // Add link input field
    addLinkBtn.addEventListener('click', function() {
        addLinkInput();
    });
    
    function addLinkInput(value = '') {
        const linkId = 'link_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        const linkInputGroup = document.createElement('div');
        linkInputGroup.className = 'link-input-group';
        linkInputGroup.innerHTML = `
            <input type="url" id="${linkId}" class="link-input" placeholder="https://example.com" value="${value}">
            <button type="button" class="remove-link-btn" ${linksInputsContainer.children.length === 0 ? 'style="display: none;"' : ''}>
                <i class="fas fa-times"></i>
            </button>
        `;
        
        linksInputsContainer.appendChild(linkInputGroup);
        
        // Add event listeners
        const input = linkInputGroup.querySelector('.link-input');
        const removeBtn = linkInputGroup.querySelector('.remove-link-btn');
        
        input.addEventListener('input', function() {
            validateLink(this);
            updateLinksPreview();
            updateHiddenTextarea();
        });
        
        removeBtn.addEventListener('click', function() {
            linkInputGroup.remove();
            updateLinksPreview();
            updateHiddenTextarea();
            
            // Show/hide remove buttons based on number of inputs
            const allRemoveBtns = document.querySelectorAll('.remove-link-btn');
            if (allRemoveBtns.length === 1) {
                allRemoveBtns[0].style.display = 'none';
            }
        });
        
        // Show remove button if this isn't the first input
        if (linksInputsContainer.children.length > 1) {
            const allRemoveBtns = document.querySelectorAll('.remove-link-btn');
            allRemoveBtns.forEach(btn => btn.style.display = 'flex');
        }
        
        // Focus the new input
        input.focus();
    }
    
    function validateLink(input) {
        const validationElement = input.parentNode.querySelector('.link-validation') || 
                                  document.createElement('div');
        validationElement.className = 'link-validation';
        
        if (!input.parentNode.contains(validationElement)) {
            input.parentNode.appendChild(validationElement);
        }
        
        if (input.value.trim() === '') {
            validationElement.innerHTML = '';
            input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            return false;
        }
        
        if (isValidURL(input.value)) {
            validationElement.innerHTML = '<i class="fas fa-check-circle"></i> Valid URL';
            validationElement.className = 'link-validation valid';
            input.style.borderColor = '#4CAF50';
            return true;
        } else {
            validationElement.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a valid URL';
            validationElement.className = 'link-validation invalid';
            input.style.borderColor = '#f44336';
            return false;
        }
    }
    
    function updateLinksPreview() {
        const linkInputs = document.querySelectorAll('.link-input');
        const validLinks = Array.from(linkInputs)
            .map(input => input.value.trim())
            .filter(url => url !== '' && isValidURL(url));
        
        linksPreviewContent.innerHTML = '';
        
        if (validLinks.length === 0) {
            linksPreviewContent.innerHTML = '<div class="no-links-message">No valid links added yet</div>';
            return;
        }
        
        validLinks.forEach(link => {
            const linkItem = document.createElement('div');
            linkItem.className = 'link-preview-item';
            
            // Determine icon based on domain
            let icon = 'fas fa-link';
            if (link.includes('youtube.com') || link.includes('youtu.be')) {
                icon = 'fab fa-youtube';
            } else if (link.includes('spotify.com')) {
                icon = 'fab fa-spotify';
            } else if (link.includes('soundcloud.com')) {
                icon = 'fab fa-soundcloud';
            } else if (link.includes('instagram.com')) {
                icon = 'fab fa-instagram';
            }
            
            linkItem.innerHTML = `
                <div class="link-icon">
                    <i class="${icon}"></i>
                </div>
                <div class="link-url">${link}</div>
            `;
            
            linksPreviewContent.appendChild(linkItem);
        });
    }
    
    function updateHiddenTextarea() {
        const linkInputs = document.querySelectorAll('.link-input');
        const allLinks = Array.from(linkInputs)
            .map(input => input.value.trim())
            .filter(url => url !== '');
        
        hiddenTextarea.value = allLinks.join('\n');
    }
    
    function isValidURL(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }
    
    // Add phone number formatting
    document.getElementById('phone').addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');
    });

    document.getElementById('whatsapp').addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');
    });

    // Form submission with AJAX to stay on page
    document.getElementById('quoteForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const formMessage = document.getElementById('formMessage');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Submitting...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(this);
        
        // Validate all links before submission
        const linkInputs = document.querySelectorAll('.link-input');
        let hasInvalidLinks = false;
        const invalidLinks = [];
        
        linkInputs.forEach((input, index) => {
            if (input.value.trim() && !isValidURL(input.value.trim())) {
                hasInvalidLinks = true;
                invalidLinks.push(`Link ${index + 1}: ${input.value.trim()}`);
            }
        });
        
        if (hasInvalidLinks) {
            formMessage.textContent = 'Please check your links. Some links appear to be invalid. Make sure they start with https:// or http://';
            formMessage.className = 'form-message error';
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }
        
        // Send to Formspree using fetch
        fetch('https://formspree.io/f/mkgqzjye', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success message
                formMessage.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
                formMessage.className = 'form-message success';
                
                // Reset form
                document.getElementById('quoteForm').reset();
                
                // Reset link inputs to just one empty field
                linksInputsContainer.innerHTML = '';
                addLinkInput();
                updateLinksPreview();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            // Error message
            formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact me directly.';
            formMessage.className = 'form-message error';
        })
        .finally(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });
});