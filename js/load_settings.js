/* This script handles the design of the timer */

function get_settings_json(function_to_run) {
    /* Runs the given function and passes the first
    parameter with the json settings file. */

    $.getJSON("settings/settings.json", function_to_run);
}

function load_settings() {
    /* Loads the setting input fields from the settings json file,
    and returns the settings dict or array. */

    let settings = $("#settings");

    get_settings_json(function (json_data) {
        /* Create a new div for the current settings type */
        for (const [settings_type, setting_in_type] of Object.entries(
            json_data
        )) {
            settings_container = document.createElement("div");
            settings_container.id = settings_type;
            settings_container.classList.add("setting-type");

            settings.append(settings_container);

            /* Creating and adding each setting in current type */
            for (const [setting_id, setting] of Object.entries(
                setting_in_type
            )) {
                setting_element = get_settings_element(setting_id, setting);
                settings_container.append(setting_element);

                input_element = setting_element.getElementsByClassName(
                    "slider"
                )[0];

                update_value_on_slider_input(
                    `${setting_id}`,
                    input_element.value,
                    setting["set-function"]
                );
            }
        }
    });
}

function get_settings_element(id, data) {
    /* Generates and returns one input element */

    element = document.createElement("div");
    element.classList.add("setting");

    /* Default HTML template of each input field.
    m e s s y   c o d e   s o r r y   o k */
    element.innerHTML = `
        <h3 data-i18n="${data["label"]}"></h3>
        <div class="setting-row">
            <input type="range" min=${data["slider"]["min"]} max="${data["slider"]["max"]}" step="${data["slider"]["step"]}" value="${data["slider"]["default"]}"
            class="slider" id="${id}-slider" oninput="update_value_on_slider_input('${id}', this.value, '${data["set-function"]}')"/>
            <span class="value-section">
                <input id="${id}-value" type="number" onclick="this.select();"
                oninput="update_value_on_text_input('${id}', this.value, '${data["set-function"]}')"
                onfocusout="update_value_on_text_focusout(this, '${data["slider"]["default"]}', '${id}', '${data["set-function"]}')"/>
                <span class="unit" data-i18n="${data["units"]}"></span>
            </span>
        </div>`;

    return element;
}

function search_for_setting_data(setting_id, function_to_run) {
    /* Will search the given setting via the id of it,
    and runs the given function with the first parameter
    as the dict of the setting. */

    /* Searching through all of the settings. */
    get_settings_json(function (json_data) {
        for (const [settings_type, setting_in_type] of Object.entries(
            json_data
        )) {
            for (const [search_setting_id, setting_data] of Object.entries(
                setting_in_type
            )) {
                /* Checking if current setting is the given one */
                if (setting_id == search_setting_id) {
                    function_to_run(setting_data); // Found! run the given function
                    break; // Stop searching
                }
            }
        }
    });
}

function update_value_on_slider_input(element_id, value, set_function_name) {
    /* This function is called everytime the user changes
    the slider value in one of the settings. It updates the 
    'value' text of the same setting, and updates the
    preview design of the timer! */

    $(`#${element_id}-value`).val(value); // Update "value" text
    update_display_on_value_change(value, set_function_name);
}

function update_value_on_text_input(element_id, value, set_function_name) {
    /* This function is called everytime the user changes
    the value of one of the settings (in text form).
    It updates the 'slider' of the same setting, and updates the
    preview design of the timer! */

    $(`#${element_id}-slider`).val(value);
    update_display_on_value_change(value, set_function_name);
}

function update_value_on_text_focusout(
    element,
    default_value,
    id,
    set_function_name
) {
    /* This function is called when the user focuses out
    of the input field. */

    if (element.value == "") {
        element.value = default_value;
        update_value_on_text_input(id, element.value, set_function_name);
    }
}

function update_display_on_value_change(value, set_function_name) {
    /* This function is called everytime one of
    the settings change, and it updates the preview design. */

    element = $("#timer-container");
    eval(`${set_function_name}(element, value)`);
}

const settings = load_settings();
