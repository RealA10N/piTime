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
}

load_i18n("en");
