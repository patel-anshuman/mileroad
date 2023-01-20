const url = "scripts/products.json";

    let parent = document.getElementById("container");
    let fetchData = null;

    fetchURL();
    async function fetchURL(){
      try {
        let result = await fetch(url);
        let product = await result.json();
        console.log(product.data);
        displayData(product.data);
        fetchData = product.data;
      } catch (error) {
        console.log(error);
      }
    }
    
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

    function displayData(data) {
        parent.innerHTML = "";
        data.forEach((ele,ind) => {
          let card = document.createElement("div");
          let image = document.createElement("img");
          let name = document.createElement("h2");
          let ingredients = document.createElement("p");
          let description = document.createElement("p");
          let price = document.createElement("h4");
          let buyBtn = document.createElement("button");
  
          image.src = ele.image;
          name.innerText = ele.title;
          ingredients.innerText = ele.ingredients[0];
          description.innerText = ele.description;
          price.innerText = `₹ ${ele.price}`;
          buyBtn.textContent = "Buy";
  
          buyBtn.addEventListener("click", () => {
            let buyCoffee = JSON.parse(localStorage.getItem("buy"))||[];
            if(checkDuplicate(ele)){
              alertHead.innerText = "Already Placed Order";
            } else {
              alertHead.innerText = "Successfully Placed Order";
              buyCoffee.push(ele);
            }
            localStorage.setItem("buy",JSON.stringify(buyCoffee));
          });
  
          card.append(image,name,ingredients,description,price,buyBtn);
          parent.append(card);
        });
      };
  
      function checkDuplicate(element){
        let buyData = JSON.parse(localStorage.getItem("buy"))||[];
        for(let i=0;i<buyData.length;i++){
          if(element.id==buyData[i].id){
            return true;
          }
        }
        return false;
      }