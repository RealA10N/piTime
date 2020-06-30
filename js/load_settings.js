/* This script handles the design of the timer */

SETTINGS_JSON_PATH = "settings/settings.json";

function load_settings() {
    /* Loads the setting input fields from the settings json file */

    $.getJSON(SETTINGS_JSON_PATH, function (json_data) {
        settings = $("#settings");

        /* Create a new div for the current settings type */
        for (const [settings_type, settings_val] of Object.entries(json_data)) {
            settings_container = document.createElement("div");
            settings_container.id = settings_type;
            settings_container.classList.add("setting-type");

            settings.append(settings_container);

            /* Creating and adding each setting in current type */
            for (const setting of settings_val) {
                setting_element = get_settings_element(setting);
                settings_container.append(setting_element);

                input_element = setting_element.getElementsByTagName(
                    "input"
                )[0];

                update_value_on_slider_input(
                    `${setting["id"]}`,
                    input_element.value
                );
            }
        }
    });
}

function get_settings_element(data) {
    /* Generates and returns one input element */

    element = document.createElement("div");
    element.classList.add("setting");

    /* Default HTML template of each input field */
    element.innerHTML = `
        <h3 data-i18n="${data["label"]}"></h3>
        <div class="setting-row">
            <input type="range" min=${data["slider"]["min"]} max="${data["slider"]["max"]}" step="${data["slider"]["step"]}" value="${data["slider"]["default"]}"
            id="${data["id"]}-slider" oninput="update_value_on_slider_input('${data["id"]}', this.value)"/>
            <span class="value-section">
                <input id="${data["id"]}-value" type="number" onclick="this.select();"
                oninput="update_value_on_text_input('${data["id"]}', this.value)"/>
                <span class="unit" data-i18n="${data["units"]}"></span>
            </span>
        </div>`;

    return element;
}

function update_value_on_slider_input(element_id, value) {
    /* This function is called everytime the user changes
    the slider value in one of the settings. It updates the 
    'value' text of the same setting, and updates the
    preview design of the timer! */

    $(`#${element_id}-value`).val(value); // Update "value" text
    update_display_on_value_change(element_id, value);
}

function update_value_on_text_input(element_id, value) {
    /* This function is called everytime the user changes
    the value of one of the settings (in text form).
    It updates the 'slider' of the same setting, and updates the
    preview design of the timer! */

    /* If all text deleted */
    if (value == "") {
        value = 0;
        $(`#${element_id}-value`).val(0);
    }

    $(`#${element_id}-slider`).val(value);
    update_display_on_value_change(element_id, value);
}

function update_display_on_value_change(element_id, value) {
    /* This function is called everytime one of
    the settings change, and it updates the preview design. */

    timer = $("#timer-container");

    /* Handling different settings */
    switch (element_id) {
        case "timer-font-size":
            timer.css("font-size", value + "px");
            break;

        case "timer-letter-spacing":
            timer.css("letter-spacing", value + "px");
            break;

        case "timer-x-offset":
            timer.css("left", value + "px");
            break;

        case "timer-y-offset":
            timer.css("top", value + "px");
            break;

        case "timer-rotation":
            timer.css("transform", `rotate(${value}deg)`);
            break;
    }
}

load_settings();
