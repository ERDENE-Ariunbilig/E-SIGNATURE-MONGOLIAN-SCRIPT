// script.js for Script maker page
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('scriptCanvas');
    const ctx = canvas.getContext('2d');
    const textInput = document.getElementById('scriptInput');
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
        drawMongolianScript(textInput.value);
    });

    function drawMongolianScript(text) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        ctx.translate(canvas.width / 2, 50);
        ctx.rotate(Math.PI / 2);
        
        ctx.font = '40px "Microsoft Yi Baiti"';
        ctx.fillStyle = isDarkMode ? '#fff' : '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.fillText(text, 0, 0);
        ctx.restore();
    }
}); 