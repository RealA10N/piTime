/* This JavaScript code handles the clock
that appears in the "about" section of the websiteb */

function load_clock(clock_container) {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    clock_container.find("#hours").text(fix_two_digit(hour));
    clock_container.find("#minutes").text(fix_two_digit(minute));
    clock_container.find("#seconds").text(fix_two_digit(second));

    let t = setTimeout(load_clock, 1000, clock_container);
}

function fix_two_digit(number) {
    if (number < 10) {
        number = "0" + number;
    }
    return String(number);
}

load_clock($("#clock"));
