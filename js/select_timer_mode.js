/* This script handles the different modes of the timer,
and switches between them when the mode button are clicked. */

let SELECTED_MODE_BUTTON;

function select_mode_countdown(button_element) {
    // Called when the user clicks on the "countdown" mode button

    if (mark_selected(button_element)) {
        console.log("selected countdown.");
    }
}

function select_mode_countup(button_element) {
    // Called when the user clicks on the "countup" mode button

    if (mark_selected(button_element)) {
        console.log("selected countup.");
    }
}

function select_mode_curtime(button_element) {
    // Called when the user clicks on the "current time" mode button

    if (mark_selected(button_element)) {
        console.log("selected current time.");
    }
}

function mark_selected(button_element) {
    /* Returns false if the button was selected before clicking,
    and true if wasen't. If the button wasen't selected, it will
    be marked as selected, and the button that was selected before
    it will become not selected! */

    if (button_element.classList.contains("selected-mode")) {
        return false;
    }

    if (SELECTED_MODE_BUTTON != null) {
        SELECTED_MODE_BUTTON.classList.remove("selected-mode");
    }

    button_element.classList.add("selected-mode");
    SELECTED_MODE_BUTTON = button_element;

    return true;
}

// Clicks on the first button
$("#mode-selector > a").eq(0).trigger("click");
