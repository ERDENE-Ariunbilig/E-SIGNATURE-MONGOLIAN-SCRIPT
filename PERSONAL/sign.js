// sign.js for Sign maker page
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('signCanvas');
    const ctx = canvas.getContext('2d');
    const textInput = document.getElementById('signInput');

    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;

    textInput.addEventListener('input', () => {
        drawSignature(textInput.value);
    });

    function drawSignature(text) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = '48px cursive';
        ctx.fillStyle = document.body.getAttribute('data-theme') === 'dark' ? '#fff' : '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    }
}); 