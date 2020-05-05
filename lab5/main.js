/**
 * @fileOverview Labs DS.
 * @author <a>Trembach Anastasiya</a>
 * @version 1.1.0
 */
'use strict';

check_matrix();
checked();


// Перевірка графу
function checked() {

    calculate_vertex_matrix(n);
    elem_halt.setAttribute("max", n-1);
    
    if (!directed.checked) {
        
        calculation(matrix_undirected, n);

    }

    else {
        
        calculation(matrix, n);

    }

    draw_weights();
    algorithm_kraskala();
    build_matrix_kistyak();
    build_weight_matrix_kistyak();
    draw_tree_kistyak();
    draw_matrix(matrix_kistyak, elem_matrix_kistyak, n);


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

    let v1 = min_kistyak[halt][0];
    let v2 = min_kistyak[halt][1];

    for (let i = 0; i < halt; i++) {
        let q1 = min_kistyak[i][0];
        let q2 = min_kistyak[i][1];
        draw_vertex(array_vertex[q1][0], array_vertex[q1][1], q1+1, 2);
        draw_vertex(array_vertex[q2][0], array_vertex[q2][1], q2+1, 2);
        line(q1, q2, 2);


    }

    draw_vertex(array_vertex[v1][0], array_vertex[v1][1], v1+1, 1);
    draw_vertex(array_vertex[v2][0], array_vertex[v2][1], v2+1, 1);

    
    line(v1, v2, 1);
 
}


/**
 * Перевірка відповідності матриці суміжності і матриці графу
 * 
 */
function check_matrix() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix_from_scilab[i][j] == 1 && weights_matrix[i][j] == 0) {
                matrix_from_scilab[i][j] = 0;
            }
            if (matrix_from_scilab[i][j] == 0 && weights_matrix[i][j] !== 0) {
                weights_matrix[i][j] = 0;
            }
        }
    }
}



/**
 * Зображення ваг ребер на графу
 * 
 */
function draw_weights(cond = 1) {
    let temp_matrix = matrix;
    if (cond == 2) matrix = matrix_kistyak;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] && i !== j) {

                let x = (array_vertex[i][0] + array_vertex[j][0])/2;
                let y = (array_vertex[i][1] + array_vertex[j][1])/2;

                
                let label = weights_matrix[i][j];
                if (cond == 2) label = weight_matrix_kistyak[i][j];

                ctx.fillStyle = '#ffffff';
                ctx.fillRect(x-2, y-10, 15, 15);
                
                ctx.fillStyle = '#000000';
                ctx.font = "10px Arial";
                
                ctx.fillText(label, x, y);
                

                ctx.fillStyle = '#000000';
                ctx.font = "15px Arial";
            }
        }
    }
    matrix = temp_matrix;
}



/**
 * Алгоритм Краскала - пошук мінімального кістяка
 * 
 */
function algorithm_kraskala() {
    weight_of_edges();
    sort_edges_by_weight()
    
    used = [];
    min_kistyak = [];

    for (let i = 0; i < sorted_array_edges.length; i++) {
        if (array_weight_of_edges[i] !== 0) {
            if (!used.includes(sorted_array_edges[i][0])) {
                used.push(sorted_array_edges[i][0]);
                min_kistyak.push(sorted_array_edges[i]);
            }
        }
    }


}



/**
 * Визначення ваги кожного ребра
 * 
 */
function weight_of_edges() {
    array_weight_of_edges = []

    for (let elem of array_edges) {
        let q = weights_matrix[elem[0]][elem[1]];
        array_weight_of_edges.push(q);
    }
}




/**
 * Відсортування ваг ребер за зростання
 * 
 */
function sort_edges_by_weight() {
    sorted_array_edges = [];

    for (let i = 0; i < array_edges.length; i++) {
        sorted_array_edges[i] = [array_edges[i][0], array_edges[i][1]];
    }

    
    let len = array_edges.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (array_weight_of_edges[j] > array_weight_of_edges[j + 1]) {
                let tmp = array_weight_of_edges[j];
                let tmp2 = sorted_array_edges[j];

                array_weight_of_edges[j] = array_weight_of_edges[j + 1];
                sorted_array_edges[j] = sorted_array_edges[j + 1];

                array_weight_of_edges[j + 1] = tmp;
                sorted_array_edges[j + 1] = tmp2;
            }
        }
    }
}



/**
 * Побудова матриці суміжності кістяка
 * 
 */
function build_matrix_kistyak() {
    matrix_kistyak = [];

    for (let i = 0; i < n; i++) {
        matrix_kistyak[i] = [];
        for (let j = 0; j < n; j++) {
            matrix_kistyak[i][j] = 0;
        }
    }

    for (let elem of min_kistyak) {
        matrix_kistyak[elem[0]][elem[1]] = 1;
    }
}




/**
 * Побудова матриці ваг кістяка
 * 
 */
function build_weight_matrix_kistyak() {
    weight_matrix_kistyak = [];

    for (let i = 0; i < n; i++) {
        weight_matrix_kistyak[i] = [];
        for (let j = 0; j < n; j++) {
            weight_matrix_kistyak[i][j] = 0;
        }
    }
    
    for (let elem of min_kistyak) {
        weight_matrix_kistyak[elem[0]][elem[1]] = weights_matrix[elem[0]][elem[1]];
    }
}


/**
 * Зображення графу мінімального кістяка з вагами
 * 
 */
function draw_tree_kistyak() {
    ctx = tree_canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    calculate_vertex_matrix(n, 3);
    draw_graph(n);

    for (let i = 0; i < n; i++) {
        draw_vertex(array_vertex[i][0], array_vertex[i][1], i+1);
    }

    draw_weights(2);

    calculate_vertex_matrix(n);
    ctx = canvas.getContext("2d");
}



