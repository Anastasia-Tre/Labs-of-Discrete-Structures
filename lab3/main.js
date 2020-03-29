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
let vector_index = [];
let komponents = [];
let sorted_matrix = [];

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.font = "15px Arial";


const directed = document.getElementById("directed"); // Перевірка на напрямленість графу
const elem_table = document.getElementById("matrix");
const elem_table_reachability = document.getElementById("matrix_reachability");
const elem_table_in_2 = document.getElementById("matrix^2");
const elem_table_in_3 = document.getElementById("matrix^3");
const elem_connectivity_matrix = document.getElementById("connectivity_matrix");
const elem_connectivity_matrix_komponenta = document.getElementById("connectivity_matrix_komponenta");
const elem_table_komponents = document.getElementById("table_komponents");
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
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix_undirected[i][j] = 0;
        matrix[i][j] = matrix_from_scilab[i][j];
    }
}


checked();


// Перевірка на напрямленість графу
function checked() {

    all_calculation();

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
        degree_undirect(matrix_undirected);
        draw_degree(vertexs_degrees);

        isolated(vertexs_degrees);
        draw_isolated_vertexs();

        pendant(vertexs_degrees);
        draw_pendant_vertexs();

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
        draw_degree(vertexs_degrees);

        out_degree(matrix);
        elem_vertex_degree = document.getElementById("out_degree");
        draw_degree(vertexs_degrees);

        pendant(vertexs_degrees_in_out);
        draw_pendant_vertexs();

        isolated(vertexs_degrees_in_out);
        draw_isolated_vertexs();

        matrix_in_2 = multiplication_matrix(matrix, matrix);
        matrix_in_3 = multiplication_matrix(matrix_in_2, matrix);
        draw_matrix(matrix_in_2, elem_table_in_2);
        draw_matrix(matrix_in_3, elem_table_in_3);
    }

    connectivity_matrix = connectivity(array_reachability);
    draw_matrix(connectivity_matrix, elem_connectivity_matrix);
    
    komponenta(connectivity_matrix);
    draw_matrix(connectivity_matrix, elem_connectivity_matrix_komponenta);
    vec(vector_index);
    search_komponenta(connectivity_matrix, vector_index);
    draw_komponents(komponents);


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

    //array_reachability = multiplication_matrix(result, result);
    array_reachability = result;
    return result;
}


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


function komponenta(connectivity_matrix) {
    vector_index = [];
    let last1;

    for (let i = 0; i < n; i++) {
        vector_index[i] = i;
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


function vec(vector_index) {
    let row = elem_connectivity_matrix_komponenta.insertRow(n);
    for (let i = 0; i < n; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = vector_index[i];
    }

}

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

function swap_index(vector_index, ind1, ind2) {
    let temp = vector_index[ind1];
    vector_index[ind1] = vector_index[ind2];
    vector_index[ind2] = temp;

}


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


function sort_matrix(matrix, vector_index) {
    

    
}

function draw_komponents(komponents) {
    elem_table_komponents.innerHTML = "";
    for (let i = 0; i < komponents.length; i++) {
        let row = elem_table_komponents.insertRow(i);
        let cell = row.insertCell(0);
        cell.innerHTML = "K" + (i+1) + " = " + komponents[i];
    }
}

// Try
//n = 5;
// const elem_try_matrix = document.getElementById("try_matrix");
// const try_matrix = [[0,1,0,1,0],
//                     [0,0,0,0,1],
//                     [1,0,0,0,0],
//                     [0,0,1,0,1],
//                     [0,1,0,0,0]];

// draw_matrix(try_matrix, elem_try_matrix);

// const elem_try_matrix_reachability = document.getElementById("try_matrix_reachability");
// const try_matrix_reachability = reachability2(try_matrix);

// draw_matrix(try_matrix_reachability, elem_try_matrix_reachability);

// const elem_try_connectivity_matrix = document.getElementById("try_connectivity_matrix");
// const try_connectivity_matrix = connectivity(try_matrix_reachability);

// draw_matrix(try_connectivity_matrix, elem_try_connectivity_matrix);

// const elem_try_matrix_reachability_2 = document.getElementById("try_matrix_reachability_2");
// const try_matrix_reachability_2 = multiplication_matrix(try_matrix_reachability, try_matrix_reachability);

// draw_matrix(try_matrix_reachability_2, elem_try_matrix_reachability_2);
