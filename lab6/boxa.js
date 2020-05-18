
let array_vertex = [];
let matrix_undirected = [];
let matrix = [];
let matrix_from_scilab = [
    [0,   1,   1,   0,   0,   1,   0,   0,   1,   0,   1,   0,],
    [0,   1,   1,   1,   1,   0,   0,   1,   1,   0,   0,   1,],
    [0,   0,   1,   1,   1,   0,   0,   0,   0,   0,   1,   0,],
    [0,   0,   0,   0,   0,   1,   1,   0,   1,   0,   0,   0,],
    [0,   0,   0,   0,   0,   0,   0,   1,   1,   0,   1,   1,],
    [0,   0,   0,   0,   0,   0,   1,   1,   0,   0,   1,   1,],
    [1,   0,   0,   0,   1,   0,   1,   0,   0,   0,   1,   1,],
    [0,   0,   1,   1,   1,   0,   0,   1,   1,   0,   1,   0,],
    [1,   0,   0,   0,   0,   1,   0,   0,   1,   0,   1,   1,],
    [1,   0,   0,   0,   1,   1,   0,   1,   1,   0,   0,   0,],
    [0,   0,   0,   0,   0,   1,   1,   0,   0,   0,   1,   1,],
    [1,   0,   1,   1,   0,   0,   0,   0,   0,   1,   0,   0,],
];

let weights_matrix = [
    [0,    48,   48,   0,    0,    31,   3,    0,    74,   34,   21,   98,],
    [48,   0,    3,    36,   53,   0,    0,    80,   21,   0,    0,    46,],
    [48,   3,    0,    16,   25,   0,    0,    21,   0,    0,    27,   74,],
    [0,    36,   16,   0,    0,    59,   0,    22,   99,   0,    0,    6,],
    [0,    53,   25,   0,    0,    0,    73,   30,   59,   50,   68,   97,],
    [31,   0,    0,    59,   0,    0,    87,   95,   9,    16,   70,   64,],
    [3,    0,    0,    0,    73,   87,   0,    0,    0,    0,    43,   90,],
    [0,    80,   21,   22,   30,   95,   0,    0,    78,   0,    14,   0,],
    [74,   21,   0,    99,   59,   9,    0,    78,   0,    33,   62,   27,],
    [34,   0,    0,    0,    50,   16,   0,    0,    33,   0,    0,    19,],
    [21,   0,    27,   0,    68,   70,   43,   14,   62,   0,    0,    49,],
    [98,   46,   74,   6,    97,   64,   90,   0,    27,   19,   49,   0,],
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

let array_weights = [];
let array_weight_of_edges = [];
let min_kistyak = [];
let matrix_kistyak = [];
let weight_matrix_kistyak = [];
let sorted_array_edges = [];

const inf = 10000;
let route_lenght = [];
let routs = [];
let used = [];
let elem_end_vertex = document.getElementById("end");
let end_vertex = 12;

let array_dfs = [];
let array_halt = [];
let k;
let color = [];
let matrix_tree = [];
let matrix_conformity = [];

const canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.font = "15px Arial";

// const elem_graph_condition = document.getElementById("graph_condition");
// const graph_cond = elem_graph_condition.getContext("2d");
// graph_cond.font = "15px Arial";

// const elem_tree = document.getElementById("tree");
// const tree_canvas = elem_tree.getContext("2d");
// tree_canvas.font = "15px Arial";

// const elem_matrix_tree = document.getElementById("matrix_tree");
// const elem_matrix_conformity = document.getElementById("matrix_conformity");

const directed = document.getElementById("directed"); // Перевірка на напрямленість графу
const elem_table = document.getElementById("matrix");
const elem_dijkstra = document.getElementById("dijkstra");
// const elem_matrix_kistyak = document.getElementById("matrix_kistyak");
// const elem_weights_matrix = document.getElementById("weights_matrix");
// const elem_weight_matrix_kistyak = document.getElementById("weight_matrix_kistyak");
// const elem_table_reachability = document.getElementById("matrix_reachability");
// const elem_table_in_2 = document.getElementById("matrix^2");
// const elem_table_in_3 = document.getElementById("matrix^3");
// const elem_connectivity_matrix = document.getElementById("connectivity_matrix");
// const elem_connectivity_matrix_komponenta = document.getElementById("connectivity_matrix_komponenta");
// const elem_table_komponents = document.getElementById("table_komponents");
// const elem_walk_2 = document.getElementById("walk_2");
// const elem_walk_3 = document.getElementById("walk_3");
// const elem_matrix_condition = document.getElementById("matrix_condition");
//

// let elem_vertex_degree = document.getElementById("vertex_degree");
// let elem_isolated_vertex = document.getElementById("isolated_vertex");
// let elem_pendant_vertex = document.getElementById("pendant_vertex")
// let elem_regulara_graph = document.getElementById("regular_graph");


let elem_slider = document.getElementById("number_of_vertex");
let elem_output = document.getElementById("output");
elem_output.innerHTML = elem_slider.value;
let n = +elem_slider.value; // кількість вершин

let elem_halt = document.getElementById("halt");
let halt = +elem_halt.value;

for (let i = 0; i < n; i++) {
    matrix_undirected[i] = [];
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix_undirected[i][j] = 0;
        matrix[i][j] = matrix_from_scilab[i][j];
    }
}