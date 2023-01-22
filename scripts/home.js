let profileEl = document.querySelector("#profile>p");
let user = JSON.parse(localStorage.getItem("user"))||[];

if(user==[]){
    profileEl.textContent = "Login";
} else {
    profileEl.textContent = `Hi, ${user.mob}`;
}

let searchEl = document.getElementById("search");

searchEl.addEventListener("click", () => {
    
});



