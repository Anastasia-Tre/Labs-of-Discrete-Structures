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
    [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
   [0,   0,   0,   1,   1,   0,   0,   0,   0,   0,   0,   0,],
   [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   1,   0,],
   [0,   0,   0,   0,   0,   0,   1,   0,   0,   0,   0,   0,],
   [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   1,   0,],
   [0,   0,   0,   0,   0,   0,   0,   1,   0,   0,   0,   1,],
   [0,   0,   0,   0,   1,   0,   1,   0,   0,   0,   0,   0,],
   [0,   0,   1,   1,   1,   0,   0,   0,   0,   0,   1,   0,],
   [1,   0,   0,   0,   0,   1,   0,   0,   1,   0,   1,   0,],
   [1,   0,   0,   0,   1,   1,   0,   0,   0,   0,   0,   0,],
   [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   1,   0,],
   [1,   0,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
  ];

let vertexs_degrees = [];
let vertexs_degrees_in_out = [];
let isolated_vertex = [];
let pendant_vertex = [];
let array_reachability = [];
let matrix_in_2,  matrix_in_3, connectivity_matrix;

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.font = "15px Arial";


const directed = document.getElementById("directed"); // Перевірка на напрямленість графу
const elem_table = document.getElementById("matrix");
const elem_table_reachability = document.getElementById("matrix_reachability");
const elem_table_in_2 = document.getElementById("matrix^2");
const elem_table_in_3 = document.getElementById("matrix^3");
const elem_connectivity_matrix = document.getElementById("connectivity_matrix");
let elem_vertex_degree = document.getElementById("vertex_degree");
let elem_isolated_vertex = document.getElementById("isolated_vertex");
let elem_pendant_vertex = document.getElementById("pendant_vertex")
let elem_regulara_graph = document.getElementById("regular_graph");
let elem_slider = document.getElementById("number_of_vertex");
let elem_output = document.getElementById("output");
elem_output.innerHTML = elem_slider.value;
let n = +elem_slider.value; // кількість вершин

for (let i = 0; i < n; i++) {
    matrix_undirected[i] = [];
    for (let j = 0; j < n; j++) {
        matrix_undirected[i][j] = 0;
    }
}


checked();


// Перевірка на напрямленість графу
function checked() {

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j]) {
                matrix_undirected[j][i] = 1;
                matrix_undirected[i][j] = 1;
            }
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elem_table.innerHTML = "";

    elem_vertex_degree = document.getElementById("vertex_degree");
    elem_vertex_degree.innerHTML = "";
    elem_vertex_degree = document.getElementById("in_degree");
    elem_vertex_degree.innerHTML = "";
    elem_vertex_degree = document.getElementById("out_degree");
    elem_vertex_degree.innerHTML = "";

    elem_table_reachability.innerHTML = "";
    elem_connectivity_matrix.innerHTML = "";

    all_calculation();
    draw_graph();

    if (!directed.checked) {

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (matrix[i][j]) {
                    matrix_undirected[j][i] = 1;
                    matrix_undirected[i][j] = 1;
                }
            }
        }
        
        draw_matrix(matrix_undirected, elem_table);
        reachability2(matrix_undirected);
        draw_matrix_reachability(array_reachability);
        
        elem_vertex_degree = document.getElementById("vertex_degree");
        elem_vertex_degree.innerHTML = "";
        degree_undirect(matrix_undirected);
        draw_degree(vertexs_degrees);

        elem_isolated_vertex.innerHTML = "";
        isolated(vertexs_degrees);
        draw_isolated_vertexs();

        elem_pendant_vertex.innerHTML = "";
        pendant(vertexs_degrees);
        draw_pendant_vertexs();

        elem_table_in_2.innerHTML = "";
        elem_table_in_3.innerHTML = "";
        matrix_in_2 = multiplication_matrix(matrix_undirected, matrix_undirected);
        matrix_in_3 = multiplication_matrix(matrix_in_2, matrix_undirected);
        draw_matrix(matrix_in_2, elem_table_in_2);
        draw_matrix(matrix_in_3, elem_table_in_3);
    }

    else {
        draw_matrix(matrix, elem_table);
        reachability2(matrix);
        draw_matrix_reachability(array_reachability);
        
        in_degree(matrix);
        elem_vertex_degree = document.getElementById("in_degree");
        elem_vertex_degree.innerHTML = "";
        draw_degree(vertexs_degrees);

        out_degree(matrix);
        elem_vertex_degree = document.getElementById("out_degree");
        elem_vertex_degree.innerHTML = "";
        draw_degree(vertexs_degrees);

        elem_pendant_vertex.innerHTML = "";
        pendant(vertexs_degrees_in_out);
        draw_pendant_vertexs();

        elem_isolated_vertex.innerHTML = "";
        isolated(vertexs_degrees_in_out);
        draw_isolated_vertexs();

        elem_table_in_2.innerHTML = "";
        elem_table_in_3.innerHTML = "";
        matrix_in_2 = multiplication_matrix(matrix, matrix);
        matrix_in_3 = multiplication_matrix(matrix_in_2, matrix);
        draw_matrix(matrix_in_2, elem_table_in_2);
        draw_matrix(matrix_in_3, elem_table_in_3);
    }

    connectivity_matrix = connectivity(array_reachability);
    draw_matrix(connectivity_matrix, elem_connectivity_matrix);
    let flag = regular_graph();
    elem_regulara_graph.innerHTML = '';
    if (flag) {
        elem_regulara_graph.innerHTML = 'Регулярнiсть графу = ' + vertexs_degrees[0];
    }
    else elem_regulara_graph.innerHTML = 'Граф нерегулярний';
}

elem_slider.oninput = function() {
    elem_output.innerHTML = this.value;
    n = +this.value;
    
    checked();
    
}

directed.oninput = function() {
    
    checked();
    
}




// Алгоритм Флойда — Уоршелла
function reachability(matrix) {
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

function draw_matrix_reachability(matrix) {
    for (let i = 0; i < n; i++) {
        let row = elem_table_reachability.insertRow(i);
        for (let j = 0; j < n; j++) {
            let cell = row.insertCell(j);
            if (matrix[i][j] === 10000) cell.innerHTML = 0;
            else cell.innerHTML = matrix[i][j];
        }
    }
}



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


function reachability2(matrix) {
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
}


function connectivity(array_reachability) {
    let transport_matrix = transport(array_reachability);

    return multiplication_matrix(array_reachability, transport_matrix);
}

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
