import './style.css'
import pizza from './cheese.jpg'
import idly from './idly.jpg'
const menuItems = [
    {
        title: 'Pizza',
        description: 'Delicious pizza with your favorite toppings.',
        image: pizza
    },

    {
        title: 'Idly',
        description: 'Delicious Idly with your favorite chutney',
        image: idly
    },
    {

        title: 'Pizza',
        description: 'Delicious pizza with your favorite toppings.',
        image: pizza
    },

    {
        title: 'Idly',
        description: 'Delicious Idly with your favorite chutney',
        image: idly
    }
];

const contentblock = document.querySelector('#content')

const addcontainer = () => {

    contentblock.innerHTML = '';
    const container = document.createElement('div');
    container.classList.add('container')

    menuItems.forEach(item => {

        const card = document.createElement('div');
        card.classList.add('card')

        const image = new Image()
        image.src = item.image
        image.classList.add('img')
        card.appendChild(image)

        const title = document.createElement('h2');
        title.textContent = item.title;

        const pp = document.createElement('p');
        pp.textContent = item.description;

        card.appendChild(title)
        card.appendChild(pp)

        container.appendChild(card)
    })

    // document.body.appendChild(container)
    contentblock.appendChild(container)
}

export { addcontainer }