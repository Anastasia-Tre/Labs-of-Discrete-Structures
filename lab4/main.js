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

    
    if (!directed.checked) {
        
        
        
        calculation(matrix_undirected, n);

    }

    else {

        
        calculation(matrix, n);


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











