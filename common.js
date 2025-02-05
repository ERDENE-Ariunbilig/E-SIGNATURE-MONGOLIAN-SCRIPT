// language switching
let currentLanguage = 'MN'; // Default language

function toggleLanguage() {
    currentLanguage = currentLanguage === 'MN' ? 'EN' : 'MN';
    document.querySelectorAll('.lang-toggle').forEach(button => {
        button.textContent = currentLanguage;
    });
    updatePlaceholders();
}

function updatePlaceholders() {
    const scriptInput = document.getElementById('scriptInput');
    const signInput = document.getElementById('signInput');

    if (currentLanguage === 'MN') {
        if (scriptInput) scriptInput.placeholder = 'Текст оруулна уу...';
        if (signInput) signInput.placeholder = 'Текст оруулна уу...';
    } else {
        if (scriptInput) scriptInput.placeholder = 'Enter text...';
        if (signInput) signInput.placeholder = 'Enter text...';
    }
} 