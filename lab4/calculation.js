
function calculation(matrix, n) {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elem_table.innerHTML = "";

    

    draw_graph(n);

    draw_matrix(matrix, elem_table,n);

    // reachability(matrix);
    // draw_matrix_reachability(array_reachability);
    

    // matrix_in_2 = multiplication_matrix(matrix, matrix);
    // matrix_in_3 = multiplication_matrix(matrix_in_2, matrix);
    // draw_matrix(matrix_in_2, elem_table_in_2,n);
    // draw_matrix(matrix_in_3, elem_table_in_3,n);    

    // connectivity_matrix = connectivity(array_reachability);
    // draw_matrix(connectivity_matrix, elem_connectivity_matrix,n);
    
    // komponenta(connectivity_matrix);
    // draw_matrix(connectivity_matrix, elem_connectivity_matrix_komponenta,n);
    // //vec(vector_index);
    // search_komponenta(connectivity_matrix, vector_index);
    // draw_komponents(komponents);

    
    // search_walk_2(matrix);
    // search_walk_3(matrix);
    // draw_walks();


    // connect_vertex_komponenta();
    // search_edges(matrix);
    // create_matrix_condition();
    
    // draw_matrix(matrix_condition, elem_matrix_condition, komponents.length);
    // draw_graph_condition();
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
    vertexs_degrees = [];
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
    vertexs_degrees_in_out = [];
    vertexs_degrees = [];
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
    vertexs_degrees = [];
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


/**
 * Множення матриць.
 * 
 */
function multiplication_matrix(matrix1, matrix2) {
    let result = [];
    for (let i = 0; i < n; i++) {
        result[i] = [];
        for (let j = 0; j < n; j++) {
            result[i][j] = 0;
            for (let k = 0; k < n; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }
    return result;
}



/**
 * Знаходження матриці досяжності.
 * 
 */
function reachability(matrix) {
    array_reachability = [];
    let m1 = multiplication_matrix(matrix, matrix);

    let result = [];
    for (let i = 0; i < n; i++) {
        result[i] = [];
        for (let j = 0; j < n; j++) {
            result[i][j] = m1[i][j] + matrix[i][j];
        }
    }

    for (let k = 0; k < n - 2; k++) {
        let m2 = multiplication_matrix(m1, matrix);
        
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                result[i][j] += m2[i][j];
                m1[i][j] = m2[i][j];

                // plus I
                if (i === j) {
                    result[i][j]++;
                }
            }
        }
    }

    // Булеве перетворення
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (result[i][j] !== 0) {
                result[i][j] = 1;
            }
        }
    }

    array_reachability = result;
    return result;
}



/**
 * Знаходження матриці сильної зв'язності
 * 
 */
function connectivity(array_reachability) {
    let transport_matrix = transport(array_reachability);
    let result = [];
    
    for (let i = 0; i < n; i++) {
        result[i] = [];
        for (let j = 0; j < n; j++) {
            result[i][j] = array_reachability[i][j] * transport_matrix[i][j];
        }
    }


    return result;
}


/**
 * Знаходження транспонованої матриці
 * 
 */
function transport(matrix) {
    let result = [];

    for (let i = 0; i < n; i++) {
        result[i] = [];
        for (let j = 0; j < n; j++) {
            result[i][j] = matrix[j][i];
        }
    }
    
    return result;
}


/**
 * Знаходження компонент сильної зв'язності
 * 
 */
function komponenta(connectivity_matrix) {
    vector_index = [];
    let last1;

    for (let i = 0; i < n; i++) {
        vector_index[i] = i + 1;
    }


    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            if (connectivity_matrix[i][j] === 0) {
                //i = j;
                for (let k = n - 1; k > j; k--) {
                    if (connectivity_matrix[i][k] === 1 ) {
                        last1 = k;
                        swap_index(vector_index, j, last1);
                        swap_matrix(connectivity_matrix, j, last1);
                    }
                }
            }
        }

    }   
}



/**
 * Знаходження масиву компонент сильної зв'язності
 * 
 */
function search_komponenta(matrix, vector_index) {
    komponents = [];
    let temp = 0;
    for (let i = 0; i < n; i++) {
        if (matrix[temp][i] === 0) {
            komponents.push(vector_index.slice(temp, i));
            temp = i;
        }
    }
    komponents.push(vector_index.slice(temp, n));
}


/**
 * Функція для зміни місцями індексів
 * 
 */
function swap_index(vector_index, ind1, ind2) {
    let temp = vector_index[ind1];
    vector_index[ind1] = vector_index[ind2];
    vector_index[ind2] = temp;

}


/**
 * Функція для зміни місцями рядків і стовпців
 * 
 */
function swap_matrix(matrix, ind1, ind2) {
    let temp;
    temp = matrix[ind1];
    matrix[ind1] = matrix[ind2];
    matrix[ind2] = temp;
    for (let i = 0; i < n; i++) {
        temp = matrix[i][ind1];
        matrix[i][ind1] = matrix[i][ind2];
        matrix[i][ind2] = temp;
    }
}




/**
 * Створювання списку ребер матриці
 * 
 */
function search_edges(matrix) {
    array_edges = [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j]) {
                array_edges.push([i, j]);
            }
        }
    }
}



/**
 * Знаходження маршрутів довжиною 2
 * 
 */
function search_walk_2(matrix) {
    array_walk_2 = [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] && i !== j) {
                for ( let k = 0; k < n; k++) {
                    if (matrix[j][k] && j !== k) array_walk_2.push([i+1, j+1, k+1]);
                }
            }
        }
    }
}



/**
 * Знаходження маршрутів довжиною 3
 * 
 */
function search_walk_3(matrix) {
    array_walk_3 = [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] && i !== j) {
                for ( let k = 0; k < n; k++) {
                    if (matrix[j][k] && j !== k) {
                        for ( let l = 0; l < n; l++) {
                            if (matrix[k][l] && k !== l) 
                            array_walk_3.push([i+1, j+1, k+1, l+1]);
                        }
                    }
                }
            }
        }
    }
}




/**
 * Створювання масиву звязку між вершиною і компонентою
 * 
 */
function connect_vertex_komponenta() {
    vertex_komponent = [];
    for (let i = 0; i < komponents.length; i++) {
        for (let elem of komponents[i]) {
            vertex_komponent[elem - 1] = i;
        }
    }
}



/**
 * Створювання матриці суміжності для графа конденсації
 * 
 */
function create_matrix_condition() {
    matrix_condition = [];

    for (let i = 0; i < komponents.length; i++) {
        matrix_condition[i] = [];
        for (let j = 0; j < komponents.length; j++) {
            matrix_condition[i][j] = 0;
        }
    }

    for (let i = 0; i < array_edges.length; i++) {
        if (vertex_komponent[array_edges[i][0]] !== vertex_komponent[array_edges[i][1]]) {
            matrix_condition[vertex_komponent[array_edges[i][0]]][vertex_komponent[array_edges[i][1]]] = 1;
        }
    }    

}