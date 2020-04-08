/**
 * @fileOverview Labs DS.
 * @author <a>Trembach Anastasiya</a>
 * @version 1.1.0
 */
'use strict';

checked();


// Перевірка на напрямленість графу
function checked() {

    calculate_vertex_matrix(n);

    
    if (!directed.checked) {
        
        calculation(matrix_undirected, n);

    }

    else {
        
        calculation(matrix, n);

    }

    dfs(array_edges[0][0]);
    console.log(array_dfs);

    let max = array_halt.length;
    elem_halt.setAttribute("max", max - 1);

    build_matrix_tree();
    draw_tree();

    draw_matrix(matrix_tree, elem_matrix_tree, n);

    build_matrix_conformity();
    draw_matrix(matrix_conformity, elem_matrix_conformity, n);

}

elem_slider.oninput = function() {
    elem_output.innerHTML = this.value;
    n = +this.value;
    
    checked();
}

directed.oninput = function() {
    
    checked();
}


/**
 * Контроль покрокового виконання
 * 
 */
elem_halt.oninput = function() {

    checked();

    halt = +this.value;

    let v1 = array_halt[halt][0];
    let v2 = array_halt[halt][1];

    for (let i = 0; i < halt; i++) {
        let v = array_halt[i][0];
        draw_vertex(array_vertex[v][0], array_vertex[v][1], v+1, 2);
        let q = array_halt[i+1][0];
        line(v, q, 2);
    }

    draw_vertex(array_vertex[v1][0], array_vertex[v1][1], v1+1, 1);
    draw_vertex(array_vertex[v2][0], array_vertex[v2][1], v2+1, 1);

    
    line(v1, v2, 1);
 
}


/**
 * Обхід в глибину
 * 
 */
function dfs(a) {
    array_dfs = Array(n).fill(0);
    array_halt = [];

    array_dfs[a] = 1;
    k = 1;
    dfs_routine(a);

    
}



/**
 * Функція, що рекурсивно викликається з основної
 * 
 */
function dfs_routine(v) {
    for (let u = 0; u < n; u++) {
        if (if_in_array_edges(v, u)) {
            if (array_dfs[u] === 0) {
                array_halt.push([v, u]);
                k++;
                array_dfs[u] = k;
                dfs_routine(u);
            }
        }
    }

}


/**
 * Знаходження ребра між вершинами
 * 
 */
function if_in_array_edges(u, v) {
    for (let elem of array_edges) {
        if (elem[0] == u && elem[1] == v) return true;
    }
}


/**
 * Побудова матриці дерева обходу
 * 
 */
function build_matrix_tree() {
    matrix_tree = [];

    for (let i = 0; i < n; i++) {
        matrix_tree[i] = []
        for (let j = 0; j < n; j++) {
            matrix_tree[i][j] = 0;
        }
    }

    for (let elem of array_halt) {
        matrix_tree[elem[0]][elem[1]] = 1;
    }
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
    calculate_vertex_matrix(n);
    ctx = canvas.getContext("2d");
}


/**
 * Побудова матриці відповідності вершин і одержаної нумерації
 * 
 */
function build_matrix_conformity() {
    matrix_conformity = [];

    for (let i = 0; i < n; i++) {
        matrix_conformity[i] = []
        for (let j = 0; j < n; j++) {
            matrix_conformity[i][j] = 0;
        }
    }

    for (let i = 0; i < n; i++) {
        matrix_conformity[i][array_dfs[i]-1] = 1;
    }    
}





