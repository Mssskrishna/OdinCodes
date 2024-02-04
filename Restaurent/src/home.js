const container = document.querySelector('#content')

const homeblock = () => {
    container.innerHTML = ''
    const cont = document.createElement('div')
    cont.classList.add('homecon')
    const title = document.createElement('h1')
    title.textContent = 'Welcome, Brainers'
    title.style.cssText = "padding : 10px"
    cont.appendChild(title)
    container.appendChild(cont)
}

export { homeblock }