// let password = document.querySelector("#password")
// let passChange = document.querySelector("#password")
let confirm = document.querySelector("#confirm")
let conchange = document.querySelector("#confirm")

confirm.addEventListener('input',validatepassword);

function validatepassword() {
    let password = document.querySelector('#password').value;
    let confirm = document.querySelector('#confirm').value;
    let input = document.querySelector("input[type='password']")
    console.log(password.textContent)
    if (password === confirm) {
        conchange.style.cssText = "border:2px solid green"
    } else {
        conchange.style.cssText = "border:2px solid red"
    }
}
