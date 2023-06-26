document.addEventListener("DOMContentLoaded", function() {
    const pointsContainer = document.getElementById("points-container");
    const addPointBtn = document.getElementById("add-point-btn");
    const removePointBtn = document.getElementById("remove-point-btn");
    const calculateBtn = document.getElementById("calculate-btn");
    let pointIndex = 1;

    addPointBtn.addEventListener("click", function() {
        const xInputContainer = document.createElement("div");
        xInputContainer.classList.add("input-container");
        xInputContainer.innerHTML = `
            <label for="x-values-${pointIndex}">Coordenadas x de los puntos conocidos:</label>
            <input type="text" id="x-values-${pointIndex}" placeholder="Ejemplo: 0, 1, 2, 3">
        `;
        pointsContainer.appendChild(xInputContainer);

        const yInputContainer = document.createElement("div");
        yInputContainer.classList.add("input-container");
        yInputContainer.innerHTML = `
            <label for="y-values-${pointIndex}">Coordenadas y de los puntos conocidos:</label>
            <input type="text" id="y-values-${pointIndex}" placeholder="Ejemplo: -6, 6, 24, 18">
        `;
        pointsContainer.appendChild(yInputContainer);

        pointIndex++;
    });

    removePointBtn.addEventListener("click", function() {
        if (pointIndex > 1) {
            pointIndex--;
            const xInputContainer = document.getElementById(`x-values-${pointIndex}`).parentNode;
            const yInputContainer = document.getElementById(`y-values-${pointIndex}`).parentNode;
            pointsContainer.removeChild(xInputContainer);
            pointsContainer.removeChild(yInputContainer);
        }
    });

    calculateBtn.addEventListener("click", calculateInterpolation);

    function calculateInterpolation() {
        const xiValueInput = document.getElementById("xi-value");
        const resultContainer = document.getElementById("result-container");

        let xValues = [];
        let yValues = [];

        for (let i = 0; i < pointIndex; i++) {
            const xValuesInput = document.getElementById(`x-values-${i}`);
            const yValuesInput = document.getElementById(`y-values-${i}`);
            xValues = xValues.concat(xValuesInput.value.split(",").map(parseFloat));
            yValues = yValues.concat(yValuesInput.value.split(",").map(parseFloat));
        }

        const xiValue = parseFloat(xiValueInput.value);

        if (xValues.length !== yValues.length) {
            resultContainer.innerText = "Error: El número de coordenadas x y y debe ser el mismo.";
            return;
        }

        const yiValue = lagrangeInterpolate(xValues, yValues, xiValue);
        resultContainer.innerText = `El valor interpolado de y en x = ${xiValue} es: ${yiValue}`;
    }

    function lagrangeInterpolate(x, y, xi) {
        const n = x.length;
        let yi = 0.0;

        for (let i = 0; i < n; i++) {
            let term = y[i];
            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    term *= (xi - x[j]) / (x[i] - x[j]);
                }
            }
            yi += term;
        }

        return yi;
    }

    // Preloading de imágenes
    const backgroundImages = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];
    const imagePromises = [];
    const body = document.querySelector('body');

    backgroundImages.forEach(image => {
        const imageUrl = `Img/${image}`;
        const imagePromise = new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = imageUrl;
        });
        imagePromises.push(imagePromise);
    });

    let currentImageIndex = 0;

    Promise.all(imagePromises)
        .then(() => {
            setInterval(() => {
                currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
                const imageUrl = `Img/${backgroundImages[currentImageIndex]}`;
                body.style.backgroundImage = `url('${imageUrl}')`;
            }, 2000);
        })
        .catch(error => {
            console.error('Error al cargar las imágenes:', error);
        });
});
