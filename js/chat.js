// Floating Chat Box functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chatButton');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');
    
    chatButton.addEventListener('click', function() {
        chatBox.classList.toggle('active');
    });

    closeChat.addEventListener('click', function() {
        chatBox.classList.remove('active');
    });

    // Close chat box when clicking outside
    document.addEventListener('click', function(e) {
        if (!chatBox.contains(e.target) && !chatButton.contains(e.target)) {
            chatBox.classList.remove('active');
        }
    });
});