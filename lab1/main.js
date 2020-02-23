/**
 * @fileOverview Labs DS.
 * @author <a>Trembach Nastija</a>
 * @version 1.1.0
 */
'use strict';

let array_vertex = [];
let matrix_undirected = [];
let matrix = [];
let matrix_from_scilab = [
    [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
    [0,   0,   0,   1,   1,   0,   0,   0,   0,   0,   0,   0],
    [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   1,   0],
    [0,   0,   0,   0,   0,   0,   1,   0,   0,   0,   0,   0],
    [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   1,   0],
    [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   1],
    [0,   0,   0,   0,   1,   0,   1,   0,   0,   0,   0,   0],
    [0,   0,   1,   1,   1,   0,   0,   0,   0,   0,   1,   0],
    [1,   0,   0,   0,   0,   1,   0,   0,   1,   0,   1,   0],
    [1,   0,   0,   0,   1,   1,   0,   0,   0,   0,   0,   0],
    [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   1,   0],
    [1,   0,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  ];


const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.font = "15px Arial";



const directed = document.getElementById("directed"); // Перевірка на напрямленість графу
const table = document.getElementById("matrix");
let slider = document.getElementById("number_of_vertex");
let output = document.getElementById("output");
output.innerHTML = slider.value;
let n = +slider.value; // кількість вершин

for (let i = 0; i < n; i++) {
    matrix_undirected[i] = [];
    for (let j = 0; j < n; j++) {
        matrix_undirected[i][j] = 0;
    }
}


all_calculation();
draw_graph();
draw_matrix(matrix);

slider.oninput = function() {
    output.innerHTML = this.value;
    n = +this.value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    table.innerHTML = "";
    all_calculation();
    draw_graph();

    // Перевірка на напрямленість графу
    if (!directed.checked) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (matrix[i][j]) {
                    matrix_undirected[j][i] = 1;
                    matrix_undirected[i][j] = 1;
                }
            }
        }
        draw_matrix(matrix_undirected);
    }
    else draw_matrix(matrix);
}

directed.oninput = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    table.innerHTML = "";
    draw_graph();

    // Перевірка на напрямленість графу
    if (!directed.checked) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (matrix[i][j]) {
                    matrix_undirected[j][i] = 1;
                    matrix_undirected[i][j] = 1;
                }
            }
        }
        draw_matrix(matrix_undirected);
    }
    else draw_matrix(matrix);
}

/**
 * Функція для визначення координат вершини та петлi.
 * @param {number} p - модуль.
 * @param {number} q - кут у радіанах.
 * @param {number} x0 - зміщення по X.
 * @param {number} y0 - зміщення по Y. 
 * @returns {(number|number|number|number)} - центр вершини по X,- центр вершини по Y,- центр петлi по X,- центр петлi по Y.
 */
function vertex(p, q, x0, y0) {
    const x = x0 + p * Math.cos(q);
    const xp = x0 + (p + 25) * Math.cos(q);
    const y = y0 + p * Math.sin(q);
    const yp = y0 + (p + 25) * Math.sin(q);	
    return [x, y, xp, yp];
}

/**
 * Розрахунок координат вершин і зв'язків.
 * 
 */
function all_calculation() {
	array_vertex =[];
    // Координата центра
	array_vertex.push([270, 270, 295 ,270 ]);

    for (let i = 0; i < n-1; i++) {
        const q = 2 * Math.PI / ((n-1)) * i;
		/* Розрахунок координат вершин і петель */
        array_vertex.push(vertex(210, q, 270, 270));
    }


    // Матриця зв'язків вершин графа
    const n1n2n3n4 = '9326'; // номер заліковки

    const n1 = +n1n2n3n4[0],
        n2 = +n1n2n3n4[1],
        n3 = +n1n2n3n4[2],
        n4 = +n1n2n3n4[3];


    // Якщо кількість вершин більше 12, то зв'язки розраховуються випадковим чином
    if (n > 12) {
        matrix = [];
        for (let i = 0; i < n; i++) {
            matrix[i] = [];
            matrix_undirected[i] = [];
            for (let j = 0; j < n; j++) {
                matrix[i][j] = Math.floor( (1.0 - n3*0.02 - n4*0.005 - 0.25) * (Math.random() + Math.random()));
                matrix_undirected[i][j] = 0;
            }
        }
    }
    else matrix = matrix_from_scilab;
}

/**
 * Зображення вершин.
 * @param {number} x - центр вершини по X.
 * @param {number} y - центр вершини по Y.
 * @param {string} label - ім'я вершини.
 */
function draw_vertex(x, y, label) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.fillStyle = '#FFCDC2';
    ctx.fill();
    ctx.fillStyle = 'black';

    ctx.fillText(label, x, y); // номер вершини
}

/**
 * Визначення координат зв'язку.
 * @param {Object[]} from - координати вершини початку зв'язку.
 * @param {number} from[].x - координата вершини початку зв'язку по X.
 * @param {number} from[].y - координата вершини початку зв'язку по Y.
 * @param {Object[]} to  - координати вершини кiнця зв'язку.
 * @param {number} to[].x - координата вершини кiнця зв'язку по X.
 * @param {number} to[].y - координата вершини кiнця звмязку по Y.
 * @returns {Object[]} - point1.x,  point1.y, point2.x, point2.y - координати початка і кiнця зв'язку
 */
function findCoordinates(from, to) {
    let xCentre, yCentre;
    let angle = Math.atan((to.y - from.y) / (to.x - from.x));
    let ballRadius = 20;
    let ind = 0; // відступ для стрілки
    let angle_offset = 0;	
	
    if (directed.checked) {
		ind = 5;
		angle_offset = (2 * Math.PI)/20;
	}
    else {
		angle_offset = 0;	
    }	

    if (to.x < from.x) {
      xCentre = to.x + (ballRadius + ind) * Math.cos(angle + angle_offset);
      yCentre = to.y + (ballRadius + ind) * Math.sin(angle + angle_offset);
    } else {
      xCentre = to.x - (ballRadius + ind) * Math.cos(angle + angle_offset);
      yCentre = to.y - (ballRadius + ind) * Math.sin(angle + angle_offset);
    }

    let xCentre1, yCentre1;
    angle = Math.atan((to.y - from.y) / (to.x - from.x));
    if (to.x < from.x) {
      xCentre1 = from.x - ballRadius * Math.cos(angle - angle_offset);
      yCentre1 = from.y - ballRadius * Math.sin(angle - angle_offset);
    } else {
      xCentre1 = from.x + ballRadius * Math.cos(angle - angle_offset);
      yCentre1 = from.y + ballRadius * Math.sin(angle - angle_offset);
    }
    const point1 = {x: xCentre1, y: yCentre1};
    const point2 = {x: xCentre, y: yCentre};
    return ({point1, point2});
}

/**
 * Зображення петлей.
 *
 */
function draw_loops() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if(matrix[i][j] && i === j) {
                ctx.beginPath();
                ctx.arc(array_vertex[i][2], array_vertex[i][3], 25, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }
    }
}

/**
 * Зображення зв'язків.
 *
 */
function draw_lines() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if(matrix[i][j]) {
                let from = {
                    x: array_vertex[i][0],
                    y: array_vertex[i][1]
                }
                let to = {
                    x: array_vertex[j][0],
                    y: array_vertex[j][1]
                }
                let flag = i === j;
                
				let coordinates = findCoordinates(from, to);
                ctx.beginPath();
                ctx.moveTo(coordinates.point1.x, coordinates.point1.y);
                ctx.lineTo(coordinates.point2.x, coordinates.point2.y);
                ctx.stroke();
				
                if(directed.checked) {
                    drawArrowhead(coordinates.point1.x, coordinates.point1.y, coordinates.point2.x, coordinates.point2.y);
                }
            }
        }
    }
}

/**
 * Зображення стрілки.
 * @param {number} from_x - координата вершини початку звязку по X.
 * @param {number} from_y - координата вершини початку звязку по Y.
 * @param {number} to_x - координата вершини кiнця звязку по X.
 * @param {number} to_y - координата вершини кiнця звязку по Y. 
 */
function drawArrowhead(from_x, from_y, to_x, to_y) {
    const radius = 5;
    const x_center = to_x;
	const y_center = to_y;

	ctx.beginPath();

	let angle = Math.atan2(to_y - from_y, to_x - from_x)
	let x = radius * Math.cos(angle) + x_center;
	let y = radius * Math.sin(angle) + y_center;

	ctx.moveTo(x, y);

	angle += (1.0/3.0) * (2 * Math.PI)
	x = radius * Math.cos(angle) + x_center;
	y = radius * Math.sin(angle) + y_center;

	ctx.lineTo(x, y);

	angle += (1.0/3.0) * (2 * Math.PI)
	x = radius * Math.cos(angle) + x_center;
	y = radius * Math.sin(angle) + y_center;

	ctx.lineTo(x, y);

	ctx.closePath();

	ctx.fill();
}

/**
 * Відмалювання всього графу.
 *
 */
function draw_graph() {
    draw_loops();
    draw_vertex(270, 270, 1); // вершина в середині

    for (let i = 0; i < n; i++) {
        draw_vertex(array_vertex[i][0], array_vertex[i][1], i+1);
    }

    draw_lines();
}

/**
 * Зобрження матриці.
 * @param {number[][]} matrix - матриця зв'язків вершин графа.
 */
function draw_matrix(matrix) {
    for (let i = 0; i < n; i++) {
        let row = table.insertRow(i);
        for (let j = 0; j < n; j++) {
            let cell = row.insertCell(j);
            cell.innerHTML = matrix[i][j];
        }
    }
}



