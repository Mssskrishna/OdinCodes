const button = document.querySelector('.menu')
const menubars = document.querySelector('.menubar')
const container = document.querySelector('.container')
button.addEventListener('mouseover',()=>{

    container.style.cssText = "display:grid"
    menubars.style.cssText = "display:flex;"
    button.classList.add('active')
})

button.addEventListener('mouseout',()=>{
    container.style.cssText = "display:block;"
    
    menubars.style.cssText = "display:none"
    button.classList.remove('active')
})