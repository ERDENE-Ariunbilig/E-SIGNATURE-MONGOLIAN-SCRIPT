// sign.js for Sign maker page
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('signCanvas');
    const ctx = canvas.getContext('2d');
    const textInput = document.getElementById('signInput');
    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');
    let isDarkMode = false;
    let currentLanguage = 'MN'; // Default language

    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;

    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        themeToggle.querySelector('.material-icons').textContent = isDarkMode ? 'dark_mode' : 'light_mode';
    });

    langToggle.addEventListener('click', () => {
        toggleLanguage(); // Call the common function
    });

    function updatePlaceholders() {
        if (currentLanguage === 'MN') {
            textInput.placeholder = 'Текст оруулна уу...';
        } else {
            textInput.placeholder = 'Enter text...';
        }
    }

    textInput.addEventListener('input', () => {
        drawSignature(textInput.value);
    });

    function drawSignature(text) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = '48px cursive';
        ctx.fillStyle = isDarkMode ? '#fff' : '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    }
}); 