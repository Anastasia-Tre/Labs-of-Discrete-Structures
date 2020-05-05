/**
 * Зображення вершин.
 * @param {number} x - центр вершини по X.
 * @param {number} y - центр вершини по Y.
 * @param {string} label - ім'я вершини.
 */
function draw_vertex(x, y, label, flag = 0) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.stroke();

    if (flag == 1) ctx.fillStyle = '#FF5733';
    else if (flag == 2) ctx.fillStyle = '#00A1FF';
    else ctx.fillStyle = '#FFCDC2';

    ctx.fill();
    ctx.fillStyle = 'black';

    ctx.fillText(label, x, y); // номер вершини
}



/**
 * Зображення петлей.
 *
 */
function draw_loops(n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if(matrix[i][j] && i === j) {
                ctx.strokeStyle = '#808080';
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
function draw_lines(n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if(matrix[i][j]) {
                line(i, j);
            }
        }
    }
}

function line(i, j, flag = 0) {
    let from = {
        x: array_vertex[i][0],
        y: array_vertex[i][1]
    }
    let to = {
        x: array_vertex[j][0],
        y: array_vertex[j][1]
    }
    
    let coordinates = findCoordinates(from, to);
    
    if (flag == 1) ctx.strokeStyle = '#FF0000';
    else if (flag == 2) ctx.strokeStyle = '#00A1FF'
    else ctx.strokeStyle = '#808080';

    ctx.beginPath();
    
    ctx.moveTo(coordinates.point1.x, coordinates.point1.y);
    ctx.lineTo(coordinates.point2.x, coordinates.point2.y);
    
    ctx.stroke();
    
    if(directed.checked) {
        drawArrowhead(coordinates.point1.x, coordinates.point1.y, coordinates.point2.x, coordinates.point2.y);
    }

    ctx.strokeStyle = '#000000';
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
function draw_graph(n) {
    draw_loops(n);
	draw_lines(n);
    draw_vertex(270, 270, 1); // вершина в середині

    for (let i = 0; i < n; i++) {
        draw_vertex(array_vertex[i][0], array_vertex[i][1], i+1);
    }

}

/**
 * Зобрження матриці.
 * 
 */
function draw_matrix(matrix, elem, n) {
    elem.innerHTML = "";
    for (let i = 0; i < n; i++) {
        let row = elem.insertRow(i);
        for (let j = 0; j < n; j++) {
            let cell = row.insertCell(j);
            cell.innerHTML = matrix[i][j];
        }
    }
}

/**
 * Зображення таблиць степенів і напівстепенів
 * 
 */
function draw_degree(vertexs_degrees) {
    elem_vertex_degree.innerHTML = "";
    let head = elem_vertex_degree.insertRow(0);
    let cell = head.insertCell(0);
    cell.innerHTML = 'Номер Вершини';
    for (let i = 1; i <= n; i++) {
        cell = head.insertCell(i);
        cell.innerHTML = i;
    }

    let row = elem_vertex_degree.insertRow(1);
    cell = row.insertCell(0);
    cell.innerHTML = 'Степiнь';
    for (let i = 1; i <= n; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = vertexs_degrees[i - 1];
    }
}


/**
 * Зображення ізольованих вершин
 * 
 */
function draw_isolated_vertexs() {
    elem_isolated_vertex.innerHTML = "";
    let row = elem_isolated_vertex.insertRow(0);
    for (let i = 0; i < isolated_vertex.length; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = isolated_vertex[i] + 1;
    }
}



/**
 * Зображення висячих вершин
 * 
 */
function draw_pendant_vertexs() {
    elem_pendant_vertex.innerHTML = "";
    let row = elem_pendant_vertex.insertRow(0);
    for (let i = 0; i < pendant_vertex.length; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = pendant_vertex[i] + 1;
    }
}



function vec(vector_index) {
    let row = elem_connectivity_matrix_komponenta.insertRow(n);
    for (let i = 0; i < n; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = vector_index[i];
    }

}


/**
 * Зобрження матриці досяжності.
 * 
 */
function draw_matrix_reachability(matrix) {
    elem_table_reachability.innerHTML = "";
    for (let i = 0; i < n; i++) {
        let row = elem_table_reachability.insertRow(i);
        for (let j = 0; j < n; j++) {
            let cell = row.insertCell(j);
            if (matrix[i][j] === 10000) cell.innerHTML = 0;
            else cell.innerHTML = matrix[i][j];
        }
    }
}



/**
 * Зображення компонент сильної зв'язності
 * 
 */
function draw_komponents(komponents) {
    elem_table_komponents.innerHTML = "";
    for (let i = 0; i < komponents.length; i++) {
        let row = elem_table_komponents.insertRow(i);
        let cell = row.insertCell(0);
        cell.innerHTML = "K" + (i+1) + " = " + komponents[i];
    }
}



/**
 * Зображення маршрутів
 * 
 */
function draw_walks() {
    elem_walk_2.innerHTML = "";
    elem_walk_3.innerHTML = "";

    for (let elem of array_walk_2) {
        let str = "[" + elem + "] ";
        elem_walk_2.innerHTML += str;
    }

    for (let elem of array_walk_3) {
        let str = "[" + elem + "] ";
        elem_walk_3.innerHTML += str;
    }

}



/**
 * Зображення графу конденсації
 * 
 */
function draw_graph_condition() {
    ctx = graph_cond;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    calculate_vertex_matrix(komponents.length, 1);
    draw_graph(komponents.length);
    calculate_vertex_matrix(n);
    ctx = canvas.getContext("2d");
}




/**
 * Зображення дерева обходу
 * 
 */
function draw_tree() {
    ctx = tree_canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    calculate_vertex_matrix(n, 2);
    draw_graph(n);

    for (let i = 0; i < n; i++) {
        draw_vertex(array_vertex[i][0], array_vertex[i][1], array_dfs[i]);
    }

    calculate_vertex_matrix(n);
    ctx = canvas.getContext("2d");
}