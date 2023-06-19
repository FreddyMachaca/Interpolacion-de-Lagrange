function addInputRow() {
    let row = document.createElement("div");
    row.classList.add("input-row");
    row.innerHTML = `
        <input class="form-control" placeholder="x">
        <input class="form-control" placeholder="y">
    `;
    document.getElementById("inputPoints").appendChild(row);
}

function lagrange(points, x) {
    let sum = 0;
    let n = points.length;

    for (let i = 0; i < n; i++) {
        let xi = points[i][0], yi = points[i][1];
        let product = yi;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                let xj = points[j][0];
                product *= (x - xj) / (xi - xj);
            }
        }

        sum += product;
    }

    return sum;
}

function calculate() {
    let points = [];
    let inputRows = document.getElementById("inputPoints").getElementsByClassName("input-row");

    for (let row of inputRows) {
        let inputs = row.getElementsByTagName("input");
        let x = parseFloat(inputs[0].value);
        let y = parseFloat(inputs[1].value);
        points.push([x, y]);
    }

    let x = parseFloat(prompt("Ingrese el valor de x para el que desea interpolar:"));
    let result = lagrange(points, x);

    document.getElementById("result").textContent = "El resultado aproxiamado es: " + result;
}
