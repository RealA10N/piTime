function show_debug_params(urlParams) {
    /* Creates the text in the developer tool window. */
    
    for (const key of urlParams.keys()) {
        add_parameter(key);
    }
}

function add_parameter(stat_name) {
    /* This function adds the given stat name to developer tool window. */

    var stat_value = urlParams.get(stat_name);
    var element = document.getElementById("dev-tool")
    element.innerHTML += `<strong>${stat_name}:</strong> ${stat_value}<br/>`;
}

const urlParams = new URLSearchParams(window.location.search);
show_debug_params(urlParams);