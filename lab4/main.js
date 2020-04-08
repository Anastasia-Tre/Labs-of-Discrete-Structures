/**
 * @fileOverview Labs DS.
 * @author <a>Trembach Anastasiya</a>
 * @version 1.1.0
 */
'use strict';

checked();


// Перевірка на напрямленість графу
function checked() {

    calculate_vertex_matrix(n, false);

    // elem_vertex_degree = document.getElementById("vertex_degree");
    // elem_vertex_degree.innerHTML = "";
    // elem_vertex_degree = document.getElementById("in_degree");
    // elem_vertex_degree.innerHTML = "";
    // elem_vertex_degree = document.getElementById("out_degree");
    // elem_vertex_degree.innerHTML = "";
    
    if (!directed.checked) {
        
        
        // elem_vertex_degree = document.getElementById("vertex_degree");
        // degree_undirect(matrix_undirected);
        // draw_degree(vertexs_degrees);

        // isolated(vertexs_degrees);
        // draw_isolated_vertexs();

        // pendant(vertexs_degrees);
        // draw_pendant_vertexs();

        calculation(matrix_undirected, n);

    }

    else {

        // in_degree(matrix);
        // elem_vertex_degree = document.getElementById("in_degree");
        // draw_degree(vertexs_degrees);

        // out_degree(matrix);
        // elem_vertex_degree = document.getElementById("out_degree");
        // draw_degree(vertexs_degrees);

        // pendant(vertexs_degrees_in_out);
        // draw_pendant_vertexs();

        // isolated(vertexs_degrees_in_out);
        // draw_isolated_vertexs();

        calculation(matrix, n);


    }

    //regular_graph();
}

elem_slider.oninput = function() {
    elem_output.innerHTML = this.value;
    n = +this.value;
    
    checked();
}

directed.oninput = function() {
    
    checked();
}











