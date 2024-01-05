const largediv = document.querySelector("#largediv")

const bigbutton = document.querySelector(".bigbutton")
const smallbutton = document.querySelector(".smallbutton")
const mediumbutton = document.querySelector(".mediumbutton")
const conwidth = 500;
const height = 500;
const rainbow = document.querySelector('.rainbow')
const black = document.querySelector('.black')

let colourpos = 0;
let colour;
let integer = 0;
function createcolour() {
    let array = [Math.round(Math.random() * 256), Math.round(Math.random() * 256), Math.round(Math.random() * 256)];
    if (colourpos == 0)
        colour = "rgb(" + array[0] + "," + array[1] + "," + array[2] + ")";
    else
        colour = 'black';
    return colour;
}
rainbow.addEventListener('click', () => {
    // answer = createcolour();
    console.log("rainbow");
    colourpos = 0;

    adddivs(integer)
})

black.addEventListener('click', () => {
    // colour = 'black';
    console.log("black");
    colourpos = 1;
    adddivs(integer)
})

function adddivs(inte) {
    integer = inte
    largediv.innerHTML = ''
    let width, height;
    switch (inte) {
        case 16:
            width = conwidth / 4;
            height = conwidth / 4; break;
        case 64:
            width = conwidth / 8;
            height = conwidth / 8;
            break;
        case 100:
            width = conwidth / 10;
            height = conwidth / 10;
            break;
    }
    for (let i = 0; i < inte; i++) {
        const smalldiv = document.createElement("button");
        smalldiv.style.cssText = "width: " + width + "px;height:" + height + ";border:1px solid #ccc;"
        smalldiv.addEventListener("click", () => {
            if (colourpos === 0) {
                smalldiv.style.cssText = "background: " + createcolour() + ";width: " + width + "px;border:1px solid #cdc";
            } else {
                smalldiv.style.cssText = "background: white ;width: " + width + "px;border:1px solid #cdc";

            }
        });
        largediv.appendChild(smalldiv)
    }
}

bigbutton.addEventListener("click", () => adddivs(16));
smallbutton.addEventListener("click", () => adddivs(100));
mediumbutton.addEventListener("click", () => adddivs(64));
