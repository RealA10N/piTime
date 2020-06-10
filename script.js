
function add_all_parameters() {
    /* Creates the text in the developer tool window. */

    var params = 0;

    for (const key of urlParams.keys()) {
        add_parameter(key);
        params++;
    }

    if (params == 0) {
        add_no_parameters_message();
    }
}

function get_devbox() {
    /* Returns the developer tool window element */
    return document.getElementById("dev-tool");
}

function add_no_parameters_message() {
    /* This fucntion adds a message to the developer tool window that
    indecates that the there is no parameters in the given url. */

    get_devbox().innerHTML += "<br/>No parameters were given in the URL.";
}

function add_parameter(stat_name) {
    /* This function adds the given stat name to developer tool window. */

    var stat_value = urlParams.get(stat_name);
    get_devbox().innerHTML += `<br/><strong>${stat_name}:</strong> ${stat_value}`;
}

const urlParams = new URLSearchParams(window.location.search);
add_all_parameters();
