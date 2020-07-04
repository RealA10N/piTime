/* This script handles the different modes of the timer,
and switches between them when the mode button are clicked. */

function __config_select_countup() {
    __config_select_mode();
}

function __config_select_countdown() {
    __config_select_mode();
}

function __config_select_mode() {
    $(".mode-btn").addClass("selected-mode-btn");
}
