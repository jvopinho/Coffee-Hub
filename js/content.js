import md from '/js/markdown.js'

const contentsList = document.getElementById('contents-list')

const response = await fetch('/api/contents/2.json')

const data = await response.json()

console.log(data);

function createArticle(content, isMain) {
    const contentInMarkdown = md.render(content.body)

    console.log(content, contentInMarkdown);

    const child = document.createElement('article')
    child.classList.add('content-wrapper')

    if(!isMain) {
        child.classList.add('comment')
    }

    child.innerHTML = /*html*/`
        <img class="author-avatar" src="${content.author.avatar_url}" alt="foto de perfil de João Pinho">

        <div class="content-wrapper">
            <div class="header" id="main-post-header">
            <div><span class="author-display-name">${content.author.display_name}</span> <span class="author-username">@${content.author.username}</span></div>
            <span>•</span>
            <span><time datetime="2025-09-10 16:02">1 dia atrás</time></span>

            <!-- <button class="reaction up-vote reacted">
                <i class="fas fa-arrow-up"></i>
                <span class="reactions-count">16</span>
            </button> -->
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
        </div>  
    `

    contentsList.appendChild(child)

    for(const comment of (content.comments ?? [])) {
        createArticle(comment,false)
    }
}

createArticle(data, true)