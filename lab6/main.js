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
    
    
    if (!directed.checked) {
        
        calculation(matrix_undirected, n);

    }

    else {
        
        calculation(matrix, n);

    }

    draw_weights();
    dijkstra(0);
    draw_dijkstra();

}

elem_slider.oninput = function() {
    elem_output.innerHTML = this.value;
    n = +this.value;
    
    checked();
}

directed.oninput = function() {
    
    checked();
}

elem_end_vertex.oninput = function() {
    end_vertex = +this.value;
    elem_halt.setAttribute("max", routs[end_vertex-1].length+1);

    checked();
    
}


/**
 * Контроль покрокового виконання
 * 
 */
elem_halt.oninput = function() {

    checked();

    halt = +this.value;
    console.log(halt);

    let v1 = routs[end_vertex-1][halt-1] - 1;
    let v2 = (routs[end_vertex-1][halt] - 1) || end_vertex-1;

    for (let i = 0; i < halt-1; i++) {
        let q1 = routs[end_vertex-1][i] - 1;
        let q2 = (routs[end_vertex-1][i+1] - 1) || end_vertex-1;
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
            if (matrix_from_scilab[i][j] == 0 && matrix_from_scilab[j][i] == 0 && weights_matrix[i][j] !== 0) {
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
 * Алгоритм пошуку найкоротшого шляку 
 * з вершини s до всіх вершин
 */
function dijkstra(s) {

    route_lenght = [];
    routs = [];
    used = [];

    for (let i = 0; i < n; i++) {
        route_lenght[i] = inf;
        routs[i] = [];
        used[i] = 0;
    }
    route_lenght[s] = 0;

    for (let i = 0; i < n; i++) {
        let v = -1;
        for (let j = 0; j < n; j++) {
            if (used[j] == 0 && (v == -1 || 
                route_lenght[j] < route_lenght[v])) {
                    v = j;
                }
        }

        if (route_lenght[v] == inf) break;
        used[v] = 1;

        for (let elem of array_edges) {
            if (elem[0] == v) {
                let to = elem[1];
                let len = weights_matrix[v][to];
                if (route_lenght[v] + len < route_lenght[to]) {
                    route_lenght[to] = route_lenght[v] + len;
                    routs[to] = routs[v].concat(v+1);
                }
            }
        }
    }
}



/**
 * Зображення найкоротших шляхів і їх довжин
 * 
 */
function draw_dijkstra() {
    elem_dijkstra.innerHTML = '';

    let row = elem_dijkstra.insertRow(0);
    let str = 'Вершина';
    let cell = row.insertCell(0);
    cell.innerHTML = str;
    str = 'Довжина шляху';
    cell = row.insertCell(1);
    cell.innerHTML = str;
    str = 'Шлях';
    cell = row.insertCell(2);
    cell.innerHTML = str;

    let r = -1, s=0;

    for (let i = 0; i < n; i++) {
        if (i == s) continue;
        else r++;
        row = elem_dijkstra.insertRow(r+1);
        cell = row.insertCell(0);
        cell.innerHTML = i+1;
        cell = row.insertCell(1);
        cell.innerHTML = route_lenght[i];
        cell = row.insertCell(2);
        cell.innerHTML = routs[i].concat(i+1).toString();
    }
}