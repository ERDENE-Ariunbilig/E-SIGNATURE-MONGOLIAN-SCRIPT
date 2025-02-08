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
let currentLang = 'mn'; 


canvas.width = 400;
canvas.height = 300;


if (window.matchMedia) {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    
    isDarkMode = systemTheme.matches;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeIcon.textContent = isDarkMode ? 'dark_mode' : 'light_mode';

    
    systemTheme.addEventListener('change', (e) => {
        isDarkMode = e.matches;
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        themeIcon.textContent = isDarkMode ? 'dark_mode' : 'light_mode';
        
        
        if (canvas.classList.contains('visible') && textInput.value) {
            drawMongolianScript(textInput.value);
        }
    });
}


window.onload = () => {
    langToggle.textContent = 'MN';
    langToggle.classList.add('mn');
    textInput.placeholder = 'Текст оруулна уу...';
    scriptBtn.textContent = 'МОНГОЛ БИЧИГ';
    signBtn.textContent = 'ГАРЫН ҮСЭГ';
};


function isMongolianCyrillic(text) {
    
    const mongolianCyrillicRegex = /[\u0400-\u04FF\u2000-\u206F\u0300-\u036F\u1800-\u18AF]/;
    return mongolianCyrillicRegex.test(text);
}


langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'mn' : 'en';
    langToggle.textContent = currentLang === 'en' ? 'MN' : 'EN';
    langToggle.classList.toggle('mn');
    updateUI();
});

function updateUI() {
    
    document.querySelector('.main-nav a[href="#home"]').textContent = translations[currentLang].header.home;
    document.querySelector('.main-nav a[href="#faq"]').textContent = translations[currentLang].header.faq;
    document.querySelector('.main-nav a[href="#personal"]').textContent = translations[currentLang].header.personal;

    
    scriptBtn.textContent = translations[currentLang].header.script;
    signBtn.textContent = translations[currentLang].header.sign;

    
    textInput.placeholder = translations[currentLang].header.placeholder;

    
    const faqContainer = document.querySelector('.faq-container');
    faqContainer.querySelector('h1').textContent = translations[currentLang].faq.title;
    const questions = translations[currentLang].faq.questions;
    faqContainer.innerHTML = `<h1>${translations[currentLang].faq.title}</h1>`;
    
    
    questions.forEach((q, index) => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faq-item');
        faqItem.innerHTML = `
            <h3>${q.question}</h3>
            <p>${q.answer}</p>
        `;
        faqContainer.appendChild(faqItem);
        
        
        setTimeout(() => {
            faqItem.classList.add('visible');
        }, index * 100); 
    });

    
    document.querySelector('.personal-container h1').textContent = translations[currentLang].personal.title;
    document.getElementById('generateBtn').textContent = translations[currentLang].personal.generate;
}

let optionSelected = false;
let currentOption = '';


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


themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeIcon.textContent = isDarkMode ? 'dark_mode' : 'light_mode';
    
    
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
    
    ctx.fillStyle = isDarkMode ? '#fff' : '#000';  
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
    
    ctx.fillStyle = isDarkMode ? '#fff' : '#000';  
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}

function showInfo(message) {
    infoBox.style.display = 'block';
    infoBox.textContent = message;
}


const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.main-nav a');


navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        
        pages.forEach(page => {
            if (page.id === targetId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
    });
});


const agreementItems = document.querySelectorAll('.agreement-item');
const generateBtn = document.getElementById('generateBtn');
let activeAgreements = new Set();


agreementItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
        
        const agreementId = item.dataset.agreement;
        if (item.classList.contains('active')) {
            activeAgreements.add(agreementId);
        } else {
            activeAgreements.delete(agreementId);
        }
        
        
        generateBtn.disabled = activeAgreements.size !== 3;
    });
});


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


generateBtn.addEventListener('click', () => {
    if (activeAgreements.size === 3) {
        confirmDialog.classList.add('show');
    }
});


document.getElementById('confirmYes').addEventListener('click', () => {
    confirmDialog.classList.remove('show');
    
    document.querySelector('.maker-section').classList.add('show');
});

document.getElementById('confirmNo').addEventListener('click', () => {
    confirmDialog.classList.remove('show');
});


confirmDialog.addEventListener('click', (e) => {
    if (e.target === confirmDialog) {
        confirmDialog.classList.remove('show');
    }
});


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



const translations = {
    mn: {
        header: {
            home: "Үндсэн",
            faq: "Асуулт",
            personal: "Хувийн",
            script: "МОНГОЛ БИЧИГ",
            sign: "ГАРЫН ҮСЭГ",
            placeholder: "Текст оруулна уу...",
        },
        faq: {
            title: "Асуулт",
            questions: [
                {
                    question: "Энэ үйлчилгээ юу вэ?",
                    answer: "Энэ нь Монгол бичиг болон гарын үсэг хөрвүүлэгч юм."
                },
                {
                    question: "Хэрхэн ашиглах вэ?",
                    answer: "Текстээ оруулаад, SCRIPT эсвэл SIGN сонголтыг хийнэ үү."
                }
            ]
        },
        personal: {
            title: "Хувийн",
            generate: "Үүсгэх"
        }
    },
    en: {
        header: {
            home: "Home",
            faq: "FAQ",
            personal: "Personal",
            script: "SCRIPT",
            sign: "SIGN",
            placeholder: "Enter your text...",
        },
        faq: {
            title: "FAQ",
            questions: [
                {
                    question: "What is this service?",
                    answer: "This is a converter for Mongolian script and signatures."
                },
                {
                    question: "How to use it?",
                    answer: "Enter your text and select either SCRIPT or SIGN."
                }
            ]
        },
        personal: {
            title: "Personal",
            generate: "Generate"
        }
    }
}; 

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('resultCanvas');
    const ctx = canvas.getContext('2d');
    const textInput = document.getElementById('textInput');
    const signBtn = document.getElementById('signBtn');
    const fontPopup = document.getElementById('fontPopup');
    const closeFont = document.getElementById('closeFont');
    let selectedFont = 'Great Vibes';
    let isDarkMode = false;
    let currentLanguage = 'MN';

    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;

    const translations = {
        MN: {
            inputPlaceholder: "Текст оруулна уу...",
            scriptBtn: "МОНГОЛ БИЧИГ",
            signBtn: "ГАРЫН ҮСЭГ",
            fontPopupTitle: "Загвар сонгох",
            defaultPreview: "Гарын үсэг"
        },
        EN: {
            inputPlaceholder: "Enter text...",
            scriptBtn: "MONGOLIAN SCRIPT",
            signBtn: "SIGNATURE",
            fontPopupTitle: "Choose Style",
            defaultPreview: "Signature"
        }
    };

    // Show font popup when clicking sign button
    signBtn.addEventListener('click', () => {
        fontPopup.style.display = 'block';
        // Update all previews with current input text
        updateFontPreviews(textInput.value);
    });

    // Close popup when clicking X button
    closeFont.addEventListener('click', () => {
        fontPopup.style.display = 'none';
    });

    // Close popup when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === fontPopup) {
            fontPopup.style.display = 'none';
        }
    });

    // Update previews whenever text input changes
    textInput.addEventListener('input', (e) => {
        const inputText = e.target.value;
        updateFontPreviews(inputText);
        drawSignature(inputText);
    });

    function updateFontPreviews(text) {
        const previewText = text || translations[currentLanguage].defaultPreview;
        document.querySelectorAll('.font-item span').forEach(span => {
            span.textContent = previewText;
        });
    }

    // Font selection
    document.querySelectorAll('.font-item').forEach(item => {
        item.addEventListener('click', () => {
            const font = item.dataset.font;
            selectedFont = font;
            
            // Remove previous selection
            document.querySelectorAll('.font-item').forEach(i => {
                i.classList.remove('selected');
            });
            
            // Add selection to clicked item
            item.classList.add('selected');
            
            // Update canvas with selected font
            drawSignature(textInput.value);
            
            // Close popup
            fontPopup.style.display = 'none';
        });
    });

    function drawSignature(text) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (text) {
            ctx.font = `48px "${selectedFont}"`;
            ctx.fillStyle = isDarkMode ? '#fff' : '#000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        }
    }

    // Language toggle
    const langToggle = document.getElementById('langToggle');
    langToggle.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'MN' ? 'EN' : 'MN';
        langToggle.textContent = currentLanguage;
        updateLanguage(currentLanguage);
    });

    function updateLanguage(lang) {
        document.getElementById('textInput').placeholder = translations[lang].inputPlaceholder;
        document.getElementById('scriptBtn').textContent = translations[lang].scriptBtn;
        document.getElementById('signBtn').textContent = translations[lang].signBtn;
        document.querySelector('.font-popup-content h2').textContent = translations[lang].fontPopupTitle;
        
        // Update previews with current input or default text
        updateFontPreviews(textInput.value);
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        themeToggle.querySelector('.material-icons').textContent = isDarkMode ? 'dark_mode' : 'light_mode';
        drawSignature(textInput.value);
    });

    // Initialize
    updateLanguage(currentLanguage);
});