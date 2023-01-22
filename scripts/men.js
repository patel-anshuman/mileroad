const url = "scripts/men-products.json";

    let parent = document.getElementById("container");
    let fetchData = null;

    fetchURL();
    async function fetchURL(){
      try {
        let result = await fetch(url);
        let product = await result.json();
        console.log(product);
        displayData(product);
        fetchData = product;
      } catch (error) {
        console.log(error);
      }
    }
    
    let sortEl = document.getElementById("sort");

    sortEl.addEventListener("change", () => {
      let sortSel = sortEl.value;
      if(sortSel==""){
        let sortData = fetchData;
        displayData(sortData);
      } else if(sortSel=="h2l"){
        let sortData = fetchData.sort((a,b) => {
          return b.price - a.price;
        });
        displayData(sortData);
      } else if(sortSel=="l2h"){
        let sortData = fetchData.sort((a,b) => {
          return a.price - b.price;
        });
        displayData(sortData);
      }
    });


    let minEl = document.getElementById("lower");
    let maxEl = document.getElementById("upper");
    let filterBtn = document.getElementById("filter-price-btn");

    filterBtn.addEventListener("click", () => {
      let min = minEl.value;
      let max = maxEl.value;
      let filterData = fetchData.filter((ele,ind) => {
        if(ele.price>=min && ele.price<=max){
          return ele;
        }
      })
      displayData(filterData);
    });

    let ratingEl = document.querySelector("#rating-select");

    ratingEl.addEventListener("change", () => {
      let selRating = ratingEl.value;
      let filterData = fetchData.filter((ele,ind) => {
        if(selRating==""){
          return ele;
        } else if(selRating=="4na") {
          if(ele.rating>=4.0){
            return ele;
          }
        } else if(selRating=="3n4") {
          if(ele.rating>=3.0 && ele.rating<4.0){
            return ele;
          }
        } else if(selRating=="2n3") {
          if(ele.rating>=2.0 && ele.rating<3.0){
            return ele;
          }
        }
      })
      displayData(filterData);
    })



    function displayData(data) {
        parent.innerHTML = "";
        data.forEach((ele,ind) => {
          let card = document.createElement("div");
          let image = document.createElement("img");
          let brand = document.createElement("p")
          let price = document.createElement("h4");
          let rating = document.createElement("p");

          let buyBtn = document.createElement("button");
  
          image.src = ele.image;
          
          price.innerText = `₹ ${ele.price}`;
          brand.innerText = `Brand ${ele.brand}`;
          rating.innerText = `Rating ${ele.rating}`;
          buyBtn.textContent = "Add to Cart";
          
          buyBtn.addEventListener("click", () => {
            let buyItem = JSON.parse(localStorage.getItem("cart"))||[];
            if(checkDuplicate(ele)){
              alert("Product already in cart");
            } else {
              alert("Item added to cart");
              buyItem.push(ele);
            }
            localStorage.setItem("cart",JSON.stringify(buyItem));
          });
          
          card.append(image,price,brand,rating,buyBtn);
          parent.append(card);
        });
      };
  
      function checkDuplicate(element){
        let buyData = JSON.parse(localStorage.getItem("cart"))||[];
        for(let i=0;i<buyData.length;i++){
          if(element.id==buyData[i].id){
            return true;
          }
        }
        return false;
      }

      let profileEl = document.querySelector("#profile>p");
      profileEl.textContent = "Login";
      let user = JSON.parse(localStorage.getItem("user"))||[];

      if(user==[] || user.mob==undefined){
          profileEl.textContent = "Login";
      } else {
          profileEl.textContent = `Hi, ${user.mob}`;
      }

      let searchBtn = document.getElementById("search");
      let searchBar = document.getElementById("search-bar");
      let searchBox = document.getElementById("search-box");
      
      searchBtn.addEventListener("click",() => {
        searchBar.style.display = "flex";
      });

      searchBar.addEventListener("submit", (e) => {
        e.preventDefault();
        let searchPara = searchBox.value;

        let filterData = fetchData.filter(ele => {
          if(ele.name.toUpperCase().includes(searchPara.toUpperCase())){
            return ele;
            console.log(ele);
          }
        });
        displayData(filterData);
        searchBar.style.display = "none";
      });
