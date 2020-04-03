/**
 * @fileOverview Labs DS.
 * @author <a>Trembach Anastasiya</a>
 * @version 1.1.0
 */
'use strict';

checked();


// Перевірка на напрямленість графу
function checked() {

    calculate_vertex_matrix();
    
    if (!directed.checked) {
        
        calculation(matrix_undirected);
        
        elem_vertex_degree = document.getElementById("vertex_degree");
        degree_undirect(matrix_undirected);
        draw_degree(vertexs_degrees);

        isolated(vertexs_degrees);
        draw_isolated_vertexs();

        pendant(vertexs_degrees);
        draw_pendant_vertexs();

    }

    else {
        calculation(matrix);

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

    }
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
 * Зобрження матриці досяжності.
 * 
 */
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


function sort_matrix(matrix, vector_index) {
    

    
}


/**
 * Зображення компонент сильної зв'язності
 * 
 */
function draw_komponents(komponents) {
    elem_table_komponents.innerHTML = "";
    for (let i = 0; i < komponents.length; i++) {
        let row = elem_table_komponents.insertRow(i);
        let cell = row.insertCell(0);
        cell.innerHTML = "K" + (i+1) + " = " + komponents[i];
    }
}

