
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
let array_edges = [];
let array_walk_2 = [];
let array_walk_3 = [];
let matrix_condition = [];
let vertex_komponent = [];

const canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.font = "15px Arial";

const elem_graph_condition = document.getElementById("graph_condition");
const graph_cond = elem_graph_condition.getContext("2d");
graph_cond.font = "15px Arial";


const directed = document.getElementById("directed"); // Перевірка на напрямленість графу
const elem_table = document.getElementById("matrix");
const elem_table_reachability = document.getElementById("matrix_reachability");
const elem_table_in_2 = document.getElementById("matrix^2");
const elem_table_in_3 = document.getElementById("matrix^3");
const elem_connectivity_matrix = document.getElementById("connectivity_matrix");
const elem_connectivity_matrix_komponenta = document.getElementById("connectivity_matrix_komponenta");
const elem_table_komponents = document.getElementById("table_komponents");
const elem_walk_2 = document.getElementById("walk_2");
const elem_walk_3 = document.getElementById("walk_3");
const elem_matrix_condition = document.getElementById("matrix_condition");

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