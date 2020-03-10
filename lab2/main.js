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
const table = document.getElementById("matrix");
let elem_vertex_degree = document.getElementById("vertex_degree");
let elem_isolated_vertex = document.getElementById("isolated_vertex");
let elem_pendant_vertex = document.getElementById("pendant_vertex")
let elem_regulara_graph = document.getElementById("regular_graph");
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
checked();

// Перевірка на напрямленість графу
function checked() {

    

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
        isolated(matrix_undirected);
        draw_isolated_vertexs();

        elem_pendant_vertex.innerHTML = "";
        pendant(matrix_undirected);
        draw_pendant_vertexs();
    }
    else {
        draw_matrix(matrix);

        elem_isolated_vertex.innerHTML = "";
        isolated(matrix_undirected);
        draw_isolated_vertexs();

        elem_pendant_vertex.innerHTML = "";
        pendant(matrix_undirected);
        draw_pendant_vertexs();
        
        in_degree(matrix);
        elem_vertex_degree = document.getElementById("in_degree");
        elem_vertex_degree.innerHTML = "";
        draw_degree(vertexs_degrees);

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

slider.oninput = function() {
    output.innerHTML = this.value;
    n = +this.value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    table.innerHTML = "";
    elem_vertex_degree.innerHTML = "";
    all_calculation();
    draw_graph();
    checked();
    
    
}

directed.oninput = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    table.innerHTML = "";

    elem_vertex_degree = document.getElementById("vertex_degree");
    elem_vertex_degree.innerHTML = "";
    elem_vertex_degree = document.getElementById("in_degree");
    elem_vertex_degree.innerHTML = "";
    elem_vertex_degree = document.getElementById("out_degree");
    elem_vertex_degree.innerHTML = "";
    
    
    draw_graph();
    checked();
    
}


function degree_undirect(matrix) {
    for (let i = 0; i < n; i++) {
        vertexs_degrees[i] = 0;
        for (let j = 0; j < n; j++) {
            if (matrix[i][j]) {
                vertexs_degrees[i]++;
            }
        }
    }
}

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


function isolated(matrix) {

    

    let mas = [];
    isolated_vertex = [];
    for (let i = 0; i < n; i++) {
        mas[i] = 0;
        for (let j = 0; j < n; j++) {
            if(i !== j && matrix[i][j]) {
                mas[i]++;
            } 
        }
    }

    for (let i = 0; i < n; i++) {
        if(!mas[i]) isolated_vertex.push(i);
    }
}


function draw_isolated_vertexs() {
    let row = elem_isolated_vertex.insertRow(0);
    for (let i = 0; i < isolated_vertex.length; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = isolated_vertex[i] + 1;
    }
}


function pendant(matrix) {
    let mas = [];
    pendant_vertex = [];
    for (let i = 0; i < n; i++) {
        mas[i] = 0;
        for (let j = 0; j < n; j++) {
            if(i !== j && matrix[i][j]) {
                mas[i]++;
            } 
        }
    }

    for (let i = 0; i < n; i++) {
        if(mas[i] === 1) pendant_vertex.push(i);
    }
}

function draw_pendant_vertexs() {
    let row = elem_pendant_vertex.insertRow(0);
    for (let i = 0; i < pendant_vertex.length; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = pendant_vertex[i] + 1;
    }
}


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




