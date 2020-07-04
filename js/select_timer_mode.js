/* This script handles the different modes of the timer,
and switches between them when the mode button are clicked. */

function __config_select_countup() {
    $(".timer-settings").hide();
    $("#countup-settings").show();
    __config_select_mode();
}

function __config_select_countdown() {
    $(".timer-settings").hide();
    $("#countdown-settings").show();
    __config_select_mode();
}

function __config_select_mode() {
    $(".mode-btn").addClass("selected-mode-btn");
}
