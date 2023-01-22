let profileEl = document.querySelector("#profile>p");
profileEl.textContent = "Login";
let user = JSON.parse(localStorage.getItem("user"))||[];

if(user==[] || user.mob==undefined){
    profileEl.textContent = "Login";
} else {
    profileEl.textContent = `Hi, ${user.mob}`;
}

let imageSlide = [ "https://img1.junaroad.com//assets/images/mobileNotif/img-1672290419954.jpg?crsl_pos=0",
        "https://img1.junaroad.com//assets/images/mobileNotif/img-1674044135107.jpg?crsl_pos=0",
        "https://img0.junaroad.com/images/banners/B2G1_13january2023_1673587401792.jpg?crsl_pos=0",
        "https://img1.junaroad.com//assets/images/mobileNotif/img-1667388470485.jpg?crsl_pos=0",
        "https://img1.junaroad.com//assets/images/mobileNotif/img-1658918101342.jpg?crsl_pos=0",
        "https://img1.junaroad.com//assets/images/mobileNotif/img-1667988209100.jpg?crsl_pos=0",
        "https://img1.junaroad.com//assets/images/mobileNotif/img-1674029296684.jpg?crsl_pos=0",
        "https://img1.junaroad.com//assets/images/mobileNotif/img-1652694665568.jpg?crsl_pos=0",
        "https://img1.junaroad.com//assets/images/mobileNotif/img-1661924796571.jpg?crsl_pos=0",
        "https://img1.junaroad.com//assets/images/mobileNotif/img-1657799410925.jpg?crsl_pos=0" 
    ];

let imageBox1 = document.getElementById("image-box1");
let imageBox2 = document.getElementById("image-box2");
let i=0;

setInterval(() => {
    if(i==imageSlide.length-2){
        i=0;
    }
    imageBox1.src = imageSlide[i];
    imageBox2.src = imageSlide[i+1];
    i++;
},2000);






