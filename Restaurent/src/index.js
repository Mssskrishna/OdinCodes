import { addcontainer } from "./menu"
import { aboutblock } from "./about"
import { homeblock } from "./home"

homeblock()
const menu = document.querySelector('.menu')
const about = document.querySelector('.about')
const home = document.querySelector('.home')
const navelements = document.querySelectorAll(".nav");
const buttondisable = (item) => {
    navelements.forEach(element => {
        element.disabled = false;
    })
    item.disabled = true
}

menu.addEventListener('click', () => {
    addcontainer()
    buttondisable(menu)
})
about.addEventListener('click', () => {
    aboutblock();
    buttondisable(about)
})
home.addEventListener('click', () => {
    homeblock();
    buttondisable(home)
})
console.log("everthing is working as expected")