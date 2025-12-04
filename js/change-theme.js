const button = document.getElementById('change-theme-button')

localStorageSchema = localStorage.getItem('color-schema')
if (localStorageSchema) {
    setColorSchema(localStorageSchema)
}

console.log(button);

if (button) {
    button.onclick = function () {
        const body = document.querySelector('body')
        setColorSchema(body.getAttribute('data-colors-schema') == 'light' ? 'dark' : 'light')
        localStorage.setItem('color-schema', body.getAttribute('data-colors-schema'))
    }
}

function setColorSchema(schema) {
    const body = document.querySelector('body')
    body.setAttribute('data-colors-schema', schema)

    if(button) {
        button.innerText = schema == 'light' ? '🌙' : '☀️'
    }
}
