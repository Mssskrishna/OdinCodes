function validatepassword() {
    let password = document.querySelector('#password');
    let confirm = document.querySelector('#confirm')
    let input = document.querySelector("input[type='password']")
    console.log(password.textContent)
    if (password.textContent === confirm.textContent) {
        input.style.cssText = "border:2px solid green"
    } else {
        input.style.cssText = "border:2px solid red"
    }
}