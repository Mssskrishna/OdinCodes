const container = document.querySelector('#content')

const homeblock = ()=>{
    
    const cont = document.createElement('div')
    cont.classList.add('homecon')

    cont.textContent = "hello"
    container.appendChild(cont)
}

export {homeblock}