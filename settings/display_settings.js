/* This file contains all of the functions that display each
string in the timer window. Those functions are called when loading
a timer with a url, or when displaying it in the preview window
while editing your timer.

/ - - - - - - - - - - - - - - - - - - - - - - - - - - - - \
|      All of the settings in this file can be found      |
|    with the commented id in the 'settings.json' file.   |
\ - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

// ID: font-size
function _set_font_size(element, value) {
    element.css("font-size", `${value}px`);
}

// ID: x-offset
function _set_x_offset(element, value) {
    element.css("left", `${value}px`);
}

// ID: y-offset
function _set_y_offset(element, value) {
    element.css("top", `${value}px`);
}

// ID: rotation
function _set_rotation(element, value) {
    element.css("transform", `rotate(${value}deg)`);
}

// ID: letter-spacing
function _set_letter_spacing(element, value) {
    element.css("letter-spacing", `${value}px`);
}
