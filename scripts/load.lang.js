function check_site_lang(urlParams) {
    /* Returns the language code of the page.
     * Language is given from a url paramter called 'lang'. */

    var lang = 'en';  // Default language - "english"

    console.log()

    if (urlParams.has('lang')) {
        lang = urlParams.get('lang');
    } else {
        /* If 'lang' paramter isn't given,
         * Save add the default lang to url. */
        window.history.replaceState(null, null, "?lang=" + lang + "&" + urlParams.toString());
    }

    return lang;
}

function load_i18n(lang) {
    /* Loads the i18n moudle to translate the site interface.
     * The given 'lang' parameter should be a language code,
     * All of the string are taken from the /i18n/ folder.
     * If the given language code isn't legal,
     * the default language will be English. */

    $.i18n({
        locale: lang
    }).load({
        // Path to the i18n string files - relative to root folder
        en: 'i18n/en.json',
        he: 'i18n/he.json'
    }).done(
        function() {

            // Set direction (dir) of head to the direction of the given language
            document.getElementById("body").style.direction = $.i18n("lang-dir");

            // Update all of the tags with 'data-i18n' in body
            $('body').i18n();

            // Update all of the string that function with js
            load_no_css_alert()
        }
    )
}

function load_no_css_alert() {
    $("#no-css").append(
        $.i18n(`piTime-no-css-1`) + "<br/>" + $.i18n("piTime-no-css-2", `<a href="https://reala10n.github.io/piTime/">reala10n.github.io/piTime</a>`)
    )
}

urlParams = new URLSearchParams(window.location.search);
lang = check_site_lang(urlParams);
load_i18n(lang);
