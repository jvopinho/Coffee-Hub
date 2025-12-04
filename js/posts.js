async function loadPosts() {
    const postList = document.getElementById('posts-list')

    const posts = await fetch('/api/contents.json')

    const postsData = await posts.json()

    const append = []

    let i = 0;

    postsData.forEach(post => {
        const article = document.createElement('article')

        article.innerHTML = `
                    <div class="header">
                        <div class="author">
                            <span title="Autor: ${post.author.username}"><a>u/${post.author.username}</a></span>
                        </div>
                        <span>•</span>
                        <time>1 dia atrás</time>
                    </div>
                    <h3><a href="/contents/index.html?c=${post.slug}">${post.title}</a></h3>
                    <p>${post.body}</p>
                    <ul class="tags">
                        ${post.tags.map(tag => `<li><a>${tag}</a></li>`).join('')}
                    </ul>
                    <span class="tag"></span>
                    <div class="info">
                        <span>${post.boosts.count} votos</span> · ${post.comments?.length} comentários ${post.solved ? '· <span class="solved">Resolvido</span>' : ''}
                    </div>
                `

        i++

        append.push(article)
        if(postsData[i]) {
           append.push(document.createElement('hr')) 
        }
    })

    append.forEach(article => postList.appendChild(article))
}

loadPosts()