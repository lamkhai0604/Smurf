// js for signin html
let loginBtn = document.querySelector(".btn");

let userName = document.querySelector("#inputEmail");

userName.addEventListener('input', () => {
    // debugger;
    if (userName.value.length > 0) {
        loginBtn.disabled = false;
    } else {
        loginBtn.disabled = true;
    }
});

userName.addEventListener('click',(e)=>{
    e.stopPropagation();
})

loginBtn.addEventListener('click',(e)=> {
    let inputUserName = document.querySelector("#inputEmail").value;
    console.log('inputUserName',inputUserName);
    e.preventDefault();
    localStorage.setItem("inputUserName", inputUserName);
    window.location.href = "/home.html";
 
})

