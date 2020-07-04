function progress_bar__moveToSection(step_element) {
    /* Called when the user moves from one step to another
    in the design process. */

    $(".step-btn.active").removeClass("active");
    $(step_element).addClass("active");
}
