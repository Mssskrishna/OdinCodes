
const contentblock = document.querySelector('#content')

const aboutblock = () =>{
    contentblock.innerHTML = '';
    const container = document.createElement('div')
    container.classList.add('aboutcon')

    const aboutheading = document.createElement('h1');
    aboutheading.textContent = "About us";
    // aboutheading.classList.add('about')
    const aboutContent = document.createElement('p');
    aboutContent.textContent = "Welcome to [Restaurant Name], where culinary excellence meets warm ambiance. Since [Year], we've delighted guests with a diverse menu crafted from the freshest ingredients. Our inviting space, friendly staff, and commitment to exceptional service create a memorable dining experience. Join us for a journey where passion meets plate.";


    // container.textContent = ''
    container.appendChild(aboutheading)
    container.appendChild(aboutContent)
    contentblock.appendChild(container)
}

export {aboutblock};