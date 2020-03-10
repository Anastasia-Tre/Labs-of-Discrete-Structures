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
	draw_lines();
    draw_vertex(270, 270, 1); // вершина в середині

    for (let i = 0; i < n; i++) {
        draw_vertex(array_vertex[i][0], array_vertex[i][1], i+1);
    }

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