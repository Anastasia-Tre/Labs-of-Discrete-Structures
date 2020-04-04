
function calculation(matrix, n) {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elem_table.innerHTML = "";

    elem_vertex_degree = document.getElementById("vertex_degree");
    elem_vertex_degree.innerHTML = "";
    elem_vertex_degree = document.getElementById("in_degree");
    elem_vertex_degree.innerHTML = "";
    elem_vertex_degree = document.getElementById("out_degree");
    elem_vertex_degree.innerHTML = "";

    draw_graph(n);

    draw_matrix(matrix, elem_table,n);
    reachability(matrix);
    draw_matrix_reachability(array_reachability);
    

    matrix_in_2 = multiplication_matrix(matrix, matrix);
    matrix_in_3 = multiplication_matrix(matrix_in_2, matrix);
    draw_matrix(matrix_in_2, elem_table_in_2,n);
    draw_matrix(matrix_in_3, elem_table_in_3,n);    

    connectivity_matrix = connectivity(array_reachability);
    draw_matrix(connectivity_matrix, elem_connectivity_matrix,n);
    
    komponenta(connectivity_matrix);
    draw_matrix(connectivity_matrix, elem_connectivity_matrix_komponenta,n);
    //vec(vector_index);
    search_komponenta(connectivity_matrix, vector_index);
    draw_komponents(komponents);

    
    search_walk_2(matrix);
    search_walk_3(matrix);
    draw_walks();


    connect_vertex_komponenta();
    search_edges(matrix);
    create_matrix_condition();
    
    draw_matrix(matrix_condition, elem_matrix_condition, komponents.length);
    draw_graph_condition();
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
function calculate_vertex_matrix(n, cond) {
	array_vertex = [];
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

    if (cond) {
        matrix = matrix_condition;
    }
    
    // Якщо кількість вершин більше 12, то зв'язки розраховуються випадковим чином
    else if (n > 12) {
        matrix = [];
        for (let i = 0; i < n; i++) {
            matrix[i] = [];
            for (let j = 0; j < n; j++) {
                matrix[i][j] = Math.floor( (1.0 - n3*0.02 - n4*0.005 - 0.25) * (Math.random() + Math.random()));
            }
        }
        undirect(matrix);
    }
    else {
        matrix = matrix_from_scilab;
        undirect(matrix);
        
    }
}

/**
 * Побудова неорітованого графа.
 * 
 */
function undirect(matrix) {
    matrix_undirected = [];
    for (let i = 0; i < n; i++) {
        matrix_undirected[i] = [];
        for (let j = 0; j < n; j++) {
            matrix_undirected[i][j] = 0;
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j]) {
                matrix_undirected[j][i] = 1;
                matrix_undirected[i][j] = 1;
            }
        }
    }
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
 * Розрахунок степенів вершин для ненапрямленого графа
 * 
 */
function degree_undirect(matrix) {
    for (let i = 0; i < n; i++) {
        vertexs_degrees[i] = 0;
        for (let j = 0; j < n; j++) {
            if (matrix[i][j]) {
                if (i === j) vertexs_degrees[i] += 2;
                else vertexs_degrees[i]++;
            }
        }
    }
}


/**
 * Розрахунок напівстепенів заходу для напрямленого графа
 * 
 */
function in_degree(matrix) {
    for (let j = 0; j < n; j++) {
        vertexs_degrees[j] = 0;
        vertexs_degrees_in_out[j] = 0;
        for (let i = 0; i < n; i++) {
            if(matrix[i][j]) {
                vertexs_degrees[j]++;
                vertexs_degrees_in_out[j]++;
            }
        }
    }
}


/**
 * Розрахунок напівстепенів виходу для напрямленого графа
 * 
 */
function out_degree(matrix) {
    for (let i = 0; i < n; i++) {
        vertexs_degrees[i] = 0;
        for (let j = 0; j < n; j++) {
            if(matrix[i][j]) {
                vertexs_degrees[i]++;
                vertexs_degrees_in_out[i]++;
            }
        }
    }
}

/**
 * Знаходження ізольованих вершин
 * 
 */
function isolated(mas) {

    // let mas = [];
    // for (let i = 0; i < n; i++) {
    //     mas[i] = 0;
    //     for (let j = 0; j < n; j++) {
    //         if(matrix[i][j]) {
    //             mas[i]++;
    //         } 
    //     }
    // }
    
    isolated_vertex = [];

    for (let i = 0; i < n; i++) {
        if(!mas[i]) isolated_vertex.push(i);
    }

}


/**
 * Знаходження висячих вершин
 * 
 */
function pendant(mas) {
    // let mas = [];
    // for (let i = 0; i < n; i++) {
    //     mas[i] = 0;
    //     for (let j = 0; j < n; j++) {
    //         if(i !== j && matrix[i][j]) {
    //             mas[i]++;
    //         } 
    //     }
    // }

    pendant_vertex = [];
    for (let i = 0; i < n; i++) {
        if(mas[i] === 1) pendant_vertex.push(i);
    }
}



/**
 * Функція для визначення регулярності графа
 * 
 */
function regular_graph() {
    let flag = true;
    for (let i = 0; i < n; i++) {
        if (vertexs_degrees[i] === vertexs_degrees[0]) {
            continue;
        }
        else {
            flag = false;
            break;
        }
    }
    
    elem_regulara_graph.innerHTML = '';
    if (flag) {
        elem_regulara_graph.innerHTML = 'Регулярнiсть графу = ' + vertexs_degrees[0];
    }
    else elem_regulara_graph.innerHTML = 'Граф нерегулярний';
}

// Алгоритм Флойда — Уоршелла
function reachability2(matrix) {
    array_reachability = [];

    for (let i = 0; i < n; i++) {
        array_reachability[i] = [];
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                array_reachability[i][j] = 10000;
            }
            else array_reachability[i][j] = matrix[i][j]
        }
    }

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                array_reachability[i][j] = Math.min(array_reachability[i][j],
                    array_reachability[i][k] + array_reachability[k][j]);
            }
        }
    }

    // Булеве перетворення
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (array_reachability[i][j] !== 0) {
                array_reachability[i][j] = 1;
            }
        }
    }
}