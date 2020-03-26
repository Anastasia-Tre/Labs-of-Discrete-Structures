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
   [0,   0,   0,   1,   0,   0,   0,   0,   0,   0,   0,   0,],
   [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
   [0,   0,   0,   0,   0,   0,   1,   0,   0,   0,   0,   0,],
   [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
   [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
   [0,   0,   0,   0,   0,   0,   1,   0,   0,   0,   0,   0,],
   [0,   0,   0,   1,   1,   0,   0,   0,   0,   0,   1,   0,],
   [0,   0,   0,   0,   0,   0,   0,   0,   1,   0,   0,   0,],
   [1,   0,   0,   0,   1,   1,   0,   0,   0,   0,   0,   0,],
   [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   1,   0,],
   [0,   0,   1,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
  ];

let vertexs_degrees = [];
let isolated_vertex = [];
let pendant_vertex = [];

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.font = "15px Arial";



const directed = document.getElementById("directed"); // Перевірка на напрямленість графу
const elem_table = document.getElementById("matrix");
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



all_calculation();
draw_graph();
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
    }

    else {
        draw_matrix(matrix);
        
        in_degree(matrix);
        elem_vertex_degree = document.getElementById("in_degree");
        elem_vertex_degree.innerHTML = "";
        draw_degree(vertexs_degrees);

        elem_pendant_vertex.innerHTML = "";
        pendant(vertexs_degrees);
        draw_pendant_vertexs();

        elem_isolated_vertex.innerHTML = "";
        isolated(vertexs_degrees);
        draw_isolated_vertexs();

        out_degree(matrix);
        elem_vertex_degree = document.getElementById("out_degree");
        elem_vertex_degree.innerHTML = "";
        draw_degree(vertexs_degrees);
    }

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elem_table.innerHTML = "";
    elem_vertex_degree.innerHTML = "";
    all_calculation();
    draw_graph();
    checked();
    
    
}

directed.oninput = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elem_table.innerHTML = "";

    elem_vertex_degree = document.getElementById("vertex_degree");
    elem_vertex_degree.innerHTML = "";
    elem_vertex_degree = document.getElementById("in_degree");
    elem_vertex_degree.innerHTML = "";
    elem_vertex_degree = document.getElementById("out_degree");
    elem_vertex_degree.innerHTML = "";
    
    
    draw_graph();
    checked();
    
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
        for (let i = 0; i < n; i++) {
            if(matrix[i][j]) {
                vertexs_degrees[j]++;
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
            }
        }
    }
}


/**
 * Зображення таблиць степенів і напівстепенів
 * 
 */
function draw_degree(vertexs_degrees) {
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
 * Зображення ізольованих вершин
 * 
 */
function draw_isolated_vertexs() {
    let row = elem_isolated_vertex.insertRow(0);
    for (let i = 0; i < isolated_vertex.length; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = isolated_vertex[i] + 1;
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
 * Зображення висячих вершин
 * 
 */
function draw_pendant_vertexs() {
    let row = elem_pendant_vertex.insertRow(0);
    for (let i = 0; i < pendant_vertex.length; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = pendant_vertex[i] + 1;
    }
}

/**
 * Функція для визначення регулярності графа
 * 
 */
function regular_graph() {
    let flag = 0;
    for (let i = 0; i < n; i++) {
        if (vertexs_degrees[i] === vertexs_degrees[0]) {
            continue;
        }
        else return false;
    }
    return true;
}




