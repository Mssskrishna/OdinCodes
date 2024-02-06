const slider = document.querySelectorAll('img');
const buttons = document.querySelectorAll('button')
let currentIndex = 0;

function process() {
    slider.forEach(element => {
        element.style.display = 'none';
    });
    buttons.forEach(element => {
        element.style.backgroundColor = 'white'
    })
    slider[currentIndex].style.display = 'inline';
    buttons[currentIndex].style.backgroundColor = 'black'

    currentIndex = (currentIndex + 1) % slider.length;
}
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        currentIndex = index;
        process()
    })
})
setInterval(process, 5000);