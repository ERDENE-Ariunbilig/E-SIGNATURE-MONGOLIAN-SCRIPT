// script.js for Script maker page
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('scriptCanvas');
    const ctx = canvas.getContext('2d');
    const textInput = document.getElementById('scriptInput');

    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;

    textInput.addEventListener('input', () => {
        drawMongolianScript(textInput.value);
    });

    function drawMongolianScript(text) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        ctx.translate(canvas.width / 2, 50);
        ctx.rotate(Math.PI / 2);
        
        ctx.font = '40px "Microsoft Yi Baiti"';
        ctx.fillStyle = document.body.getAttribute('data-theme') === 'dark' ? '#fff' : '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.fillText(text, 0, 0);
        ctx.restore();
    }
}); 