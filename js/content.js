import md from '/js/markdown.js'

const contentsList = document.getElementById('contents-list')

const response = await fetch('/api/contents.json')

const data = await response.json()

const search = new URLSearchParams(window.location.search)
const slug = search.get('c')

console.log(slug);

if(!slug) {
    window.location.href = '/'
}    

createArticle(data.find(content => content.slug == slug), true)

console.log(data);

function createArticle(content, isMain) {
    const contentInMarkdown = md.render(content.body)

    console.log(content, contentInMarkdown);

    const child = document.createElement('article')
    child.classList.add('content-wrapper')

    if(!isMain) {
        child.classList.add('comment')
    } else {
        document.getElementById('content-title').innerHTML = `${content.title} <span>#${content.id.toString().padStart(3, '0')}</span>`
    }

    child.innerHTML = /*html*/`
        <div class="header" id="main-post-header">
            <span class="author-username">u/${content.author.username}</span>
            <span>•</span>
            <span><time datetime="2025-09-10 16:02">1 dia atrás</time></span>
        </div>

        <div class="content markdown">
            ${contentInMarkdown}
        </div>

        <div class="reactions">
            <button class="reaction up-vote ${content.boosts.reacted ? "reacted" : ""}">
                <i class="fas fa-arrow-up"></i>
                <span class="reactions-count">${content.boosts.count}</span>
            </button>

            ${(content.reactions ?? []).sort((a, b) => b.count - a.count).map(reaction => /*html*/`
                <button class="reaction ${reaction.reacted ? "reacted" : ""}">
                    <span>${reaction.emoji}</span>
                    <span class="reactions-count">${reaction.count}</span>
                </button>
            `).join('\n')}
        </div>
    `

    contentsList.appendChild(child)

    for(const comment of (content.comments ?? [])) {
        createArticle(comment,false)
    }
}