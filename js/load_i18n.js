const LANG_JSON_PATH = "i18n/languages.json";

function load_i18n(lang) {
    /* Loads the i18n moudle to translate the site interface.
     * The given 'lang' parameter should be a language code,
     * All of the string are taken from the /i18n/ folder.
     * If the given language code isn't legal,
     * the default language will be English. */

    var lang_dict = { en: "i18n/en.json" };
    lang_dict[lang] = `i18n/${lang}.json`;

    $.i18n({
        locale: lang,
    })
        .load(lang_dict)
        .done(function () {
            // Update all of the tags with 'data-i18n' in body
            $("body").i18n();
        });

    $.getJSON(LANG_JSON_PATH, function (json_data) {
        // Update direction of text on the page
        $("body")[0].style.direction = json_data[lang]["direction"];

        // Update the text of the language selector to show the selecter language
        $("#cur-lang").text(json_data[lang]["name"]);
    });
}

function load_lang_selector() {
    $.getJSON(LANG_JSON_PATH, function (json_data) {
        LangList = $("#lang-list");

        console.log(LangList);

        for (let [lang_code, lang_dict] of Object.entries(json_data)) {
            LangList.append(
                `<li><a onclick="load_i18n('${lang_code}')">${lang_dict["name"]}</a></li>`
            );
        }
    });
}

load_lang_selector("i18n/languages.json");
load_i18n("en");
