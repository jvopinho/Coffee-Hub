import md from '/js/markdown.js'

const markdownInput = document.getElementById('editor-input');
const htmlPreview = document.getElementById('preview');

markdownInput.addEventListener('input', () => {
    const markdownText = markdownInput.value;
    const html = md.render(markdownText)
    htmlPreview.innerHTML = html;
});