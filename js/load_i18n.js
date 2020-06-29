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

    /* Save the selected language as a cookie,
    to load automaticly next time the user visites the website. */
    Cookies.set("language", lang, { expires: 100 });
}

function load_lang_selector() {
    $.getJSON(LANG_JSON_PATH, function (json_data) {
        LangList = $("#lang-list");

        for (let [lang_code, lang_dict] of Object.entries(json_data)) {
            LangList.append(
                `<li><a onclick="load_i18n('${lang_code}')">${lang_dict["name"]}</a></li>`
            );
        }
    });
}

function load_cookie_lang() {
    /* This function is called on page load.
    it checks a cookie that specifies the language of the user exicts,
    and if it does it pulled the saved value and loads the saved language.
    if it's the first time the user visites the website (or the language cookie expired),
    a propmpt will popup usking the lanugae of the user. */

    lang_cookie = Cookies.get("language");

    if (lang_cookie != null) {
        load_i18n(lang_cookie);
    } else {
        load_i18n("en");
    }
}

load_lang_selector("i18n/languages.json");
load_cookie_lang();
