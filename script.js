// Canvas setup
const canvas = document.getElementById('resultCanvas');
const ctx = canvas.getContext('2d');
const textInput = document.getElementById('textInput');
const optionsMenu = document.getElementById('optionsMenu');
const scriptBtn = document.getElementById('scriptBtn');
const signBtn = document.getElementById('signBtn');
const infoBox = document.getElementById('info');
const container = document.querySelector('.container');
const langToggle = document.getElementById('langToggle');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.material-icons');
let isDarkMode = false;

let currentLang = 'mn'; // Changed default to 'mn'

// Set canvas size
canvas.width = 400;
canvas.height = 300;

// Detect system theme preference
if (window.matchMedia) {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme based on system preference
    isDarkMode = systemTheme.matches;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeIcon.textContent = isDarkMode ? 'dark_mode' : 'light_mode';

    // Listen for system theme changes
    systemTheme.addEventListener('change', (e) => {
        isDarkMode = e.matches;
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        themeIcon.textContent = isDarkMode ? 'dark_mode' : 'light_mode';
        
        // Update canvas if it's visible
        if (canvas.classList.contains('visible') && textInput.value) {
            drawMongolianScript(textInput.value);
        }
    });
}

// Set initial UI language to Mongolian
window.onload = () => {
    langToggle.textContent = 'MN';
    langToggle.classList.add('mn');
    textInput.placeholder = 'Текст оруулна уу...';
    scriptBtn.textContent = 'МОНГОЛ БИЧИГ';
    signBtn.textContent = 'ГАРЫН ҮСЭГ';
};

// Function to detect if text is Mongolian Cyrillic
function isMongolianCyrillic(text) {
    // Mongolian Cyrillic Unicode ranges
    const mongolianCyrillicRegex = /[\u0400-\u04FF\u2000-\u206F\u0300-\u036F\u1800-\u18AF]/;
    return mongolianCyrillicRegex.test(text);
}

// Language switch handler
langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'mn' : 'en';
    langToggle.textContent = currentLang.toUpperCase();
    langToggle.classList.toggle('mn');
    
    // Update UI text based on language
    if (currentLang === 'mn') {
        textInput.placeholder = 'Текст оруулна уу...';
        scriptBtn.textContent = 'МОНГОЛ БИЧИГ';
        signBtn.textContent = 'ГАРЫН ҮСЭГ';
    } else {
        textInput.placeholder = 'Enter your text...';
        scriptBtn.textContent = 'SCRIPT';
        signBtn.textContent = 'SIGN';
    }
});

let optionSelected = false;
let currentOption = '';

// Function to draw default text
function drawDefaultText(text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '40px Arial';
    ctx.fillStyle = isDarkMode ? '#fff' : '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}

textInput.addEventListener('input', () => {
    if (textInput.value.trim() === '') {
        optionSelected = false;
        currentOption = '';
        container.classList.remove('expanded');
        optionsMenu.classList.remove('visible');
        canvas.classList.remove('visible');
        scriptBtn.classList.remove('selected');
        signBtn.classList.remove('selected');
    } else {
        container.classList.add('expanded');
        optionsMenu.classList.add('visible');
        canvas.classList.add('visible');
        
        if (currentOption) {
            if (currentOption === 'script') {
                drawMongolianScript(textInput.value);
            } else if (currentOption === 'sign') {
                drawSignature(textInput.value);
            }
        } else {
            // Show default text if no option selected
            drawDefaultText(textInput.value);
        }
    }
});

scriptBtn.addEventListener('click', () => {
    if (textInput.value.trim()) {
        optionSelected = true;
        currentOption = 'script';
        scriptBtn.classList.add('selected');
        signBtn.classList.remove('selected');
        canvas.classList.add('visible');
        drawMongolianScript(textInput.value);
    }
});

signBtn.addEventListener('click', () => {
    if (textInput.value.trim()) {
        optionSelected = true;
        currentOption = 'sign';
        signBtn.classList.add('selected');
        scriptBtn.classList.remove('selected');
        canvas.classList.add('visible');
        drawSignature(textInput.value);
    }
});

function resetAll() {
    optionSelected = false;
    currentOption = '';
    scriptBtn.classList.remove('selected');
    signBtn.classList.remove('selected');
    container.classList.remove('expanded');
    optionsMenu.classList.remove('visible');
    canvas.classList.remove('visible');
    textInput.value = '';
}

// Add theme toggle handler
themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeIcon.textContent = isDarkMode ? 'dark_mode' : 'light_mode';
    
    // Update canvas text color based on theme
    if (canvas.classList.contains('visible')) {
        const currentText = textInput.value;
        if (currentText) {
            drawMongolianScript(currentText);
        }
    }
});

function drawMongolianScript(text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(canvas.width / 2, 50);
    ctx.rotate(Math.PI / 2);
    
    if (currentLang === 'mn') {
        ctx.font = '40px "Microsoft Yi Baiti"';
    } else {
        ctx.font = '40px Arial';
    }
    
    ctx.fillStyle = isDarkMode ? '#fff' : '#000';  // Update text color based on theme
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.fillText(text, 0, 0);
    ctx.restore();
}

function drawSignature(text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (currentLang === 'mn') {
        ctx.font = '48px "Microsoft Yi Baiti"';
    } else {
        ctx.font = '48px cursive';
    }
    
    ctx.fillStyle = isDarkMode ? '#fff' : '#000';  // Update text color based on theme
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}

function showInfo(message) {
    infoBox.style.display = 'block';
    infoBox.textContent = message;
}

// Add this at the start of your existing JavaScript
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.main-nav a');

// Handle navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Update navigation
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Update pages
        pages.forEach(page => {
            if (page.id === targetId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
    });
});

// Add after your existing JavaScript
const agreementItems = document.querySelectorAll('.agreement-item');
const generateBtn = document.getElementById('generateBtn');
let activeAgreements = new Set();

// Handle agreement clicks
agreementItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
        
        const agreementId = item.dataset.agreement;
        if (item.classList.contains('active')) {
            activeAgreements.add(agreementId);
        } else {
            activeAgreements.delete(agreementId);
        }
        
        // Enable generate button if all agreements are active
        generateBtn.disabled = activeAgreements.size !== 3;
    });
});

// Create confirmation dialog HTML
const confirmDialog = document.createElement('div');
confirmDialog.className = 'confirm-dialog';
confirmDialog.innerHTML = `
    <div class="confirm-content">
        <h2>Та 100% итгэлтэй байна уу?</h2>
        <div class="confirm-buttons">
            <button id="confirmYes">Тийм</button>
            <button id="confirmNo">Үгүй</button>
        </div>
    </div>
`;
document.body.appendChild(confirmDialog);

// Generate button click handler
generateBtn.addEventListener('click', () => {
    if (activeAgreements.size === 3) {
        confirmDialog.classList.add('show');
    }
});

// Handle confirmation buttons
document.getElementById('confirmYes').addEventListener('click', () => {
    confirmDialog.classList.remove('show');
    // Show maker section
    document.querySelector('.maker-section').classList.add('show');
});

document.getElementById('confirmNo').addEventListener('click', () => {
    confirmDialog.classList.remove('show');
});

// Close dialog when clicking outside
confirmDialog.addEventListener('click', (e) => {
    if (e.target === confirmDialog) {
        confirmDialog.classList.remove('show');
    }
});

// Add maker option handlers
document.querySelectorAll('.maker-option').forEach(option => {
    option.addEventListener('click', () => {
        const type = option.dataset.type;
        if (type === 'script') {
            window.location.href = 'personal/script.html';
        } else if (type === 'sign') {
            window.location.href = 'personal/sign.html';
        }
    });
});

// Rest of your existing JavaScript 