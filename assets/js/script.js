document.addEventListener('DOMContentLoaded', () => {
    const redSlider = document.getElementById('red');
    const greenSlider = document.getElementById('green');
    const blueSlider = document.getElementById('blue');

    const redInput = document.getElementById('red-input');
    const greenInput = document.getElementById('green-input');
    const blueInput = document.getElementById('blue-input');

    const redValue = document.getElementById('red-value');
    const greenValue = document.getElementById('green-value');
    const blueValue = document.getElementById('blue-value');

    const colorDisplay = document.getElementById('color-display');
    const rgbValue = document.getElementById('rgb-value');
    const hexValue = document.getElementById('hex-value');
    const colorPicker = document.getElementById('color-picker');

    function updateColor() {
        const r = Number(redSlider.value);
        const g = Number(greenSlider.value);
        const b = Number(blueSlider.value);

        redValue.textContent = r;
        greenValue.textContent = g;
        blueValue.textContent = b;

        redInput.value = r;
        greenInput.value = g;
        blueInput.value = b;

        const rgb = `rgb(${r}, ${g}, ${b})`;
        const hex = rgbToHex(r, g, b);

        colorDisplay.style.backgroundColor = rgb;
        rgbValue.textContent = rgb;
        hexValue.textContent = hex;
        colorPicker.value = hex;
    }

    function updateFromInput() {
        let r = clamp(redInput.value);
        let g = clamp(greenInput.value);
        let b = clamp(blueInput.value);

        redSlider.value = r;
        greenSlider.value = g;
        blueSlider.value = b;

        updateColor();
    }

    function updateFromPicker() {
        const { r, g, b } = hexToRgb(colorPicker.value);

        redSlider.value = r;
        greenSlider.value = g;
        blueSlider.value = b;

        updateColor();
    }

    function clamp(value) {
        return Math.max(0, Math.min(255, parseInt(value) || 0));
    }

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b)
            .toString(16)
            .slice(1)
            .toUpperCase();
    }

    function hexToRgb(hex) {
        const num = parseInt(hex.slice(1), 16);
        return {
            r: (num >> 16) & 255,
            g: (num >> 8) & 255,
            b: num & 255
        };
    }

    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);

    redInput.addEventListener('input', updateFromInput);
    greenInput.addEventListener('input', updateFromInput);
    blueInput.addEventListener('input', updateFromInput);

    colorPicker.addEventListener('input', updateFromPicker);

    updateColor();
});
