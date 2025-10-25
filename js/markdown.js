import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm'   
import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/es/highlight.min.js'

export default markdownIt({
    // Enable HTML tags in source
    html: true,

    // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    xhtmlOut: false,

    // Convert '\n' in paragraphs into <br>
    breaks: true,

    // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    langPrefix: '',

    // Autoconvert URL-like text to links
    linkify: true,

    // Enable some language-neutral replacement + quotes beautification
    // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',

    fences: true,

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externally.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: function (str, lang) {
        console.log(str, lang);
        if (lang && hljs.getLanguage(lang)) {
            try {
                return /* html */`${hljs.highlight(str, { language: lang }).value}`
            } catch (__) {}
        }

        return str
    },
})