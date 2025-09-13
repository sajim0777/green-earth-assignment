
const treeContaner = document.querySelector(".products");
const allCategory = document.querySelector(".all");
const categoryMenu = document.querySelector(".categoryMenu");
const cartContainer = document.querySelector(".cart-container");
const cartTotal = document.querySelector(".cart-total");


let cart = [];


function fetchAllCategories() {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((response) => response.json())
    .then((data) => {
      const categories = data.categories;
      categories.forEach((category) => {
        const categoryItem = document.createElement("li");
        categoryItem.innerText = category.category_name;
        const categoryId = category.id;
        categoryMenu.appendChild(categoryItem);

        categoryItem.addEventListener("click", () => {
          const categoryLi = document.querySelectorAll(".categoryMenu li");
          categoryLi.forEach((li) => li.classList.remove("active"));
          categoryItem.classList.add("active");
          fetchTreeByCategoryId(categoryId);
        });
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));
}

fetchAllCategories();


function fetchAllPlants() {
  treeContaner.innerHTML = "Loading...";
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      const plants = data.plants;
      treeContaner.innerHTML = "";
      categoryMenu.querySelectorAll("li").forEach((li) => {
        li.classList.remove("active");
      });

      allCategory.classList.add("active");
      showPlants(plants);
    });
}
fetchAllPlants();


function fetchTreeByCategoryId(id) {
  treeContaner.innerHTML = "Loading...";
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((response) => response.json())
    .then((data) => {
      showPlants(data.plants);
    })
    .catch((error) => console.error("Error fetching trees:", error));
}


const showPlants = (trees) => {
  treeContaner.innerHTML = "";
  trees.forEach((tree) => {
    const treeCard = document.createElement("div");
    treeCard.className = "card";
    treeCard.innerHTML = `
      <img src="${tree.image}" alt="${tree.name}" />
      <h3 class="name">${tree.name}</h3>
      <p>${tree.description.slice(0, 60)}...</p>
      <div class="card-footer">
        <span class="tag">${tree.category}</span>
        <p class="price">Price: ৳${tree.price}</p>
      </div>
      <button class="btn">Add to Cart</button>
    `;

    
    treeCard.querySelector(".name").addEventListener("click", () => {
      showDetails(tree);
    });

    
    treeCard.querySelector("button").addEventListener("click", () => {
      addToCart(tree);
    });

    treeContaner.appendChild(treeCard);
  });
};

const showDetails = (plant) => {
  
  const existingModal = document.getElementById("detailsModal");
  if (existingModal) existingModal.remove();

  
  const modal = document.createElement("div");
  modal.id = "detailsModal";
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <h3>${plant.name}</h3>
    <img class="modal-img" src="${plant.image}" alt="${plant.name}">
     
    
      
      <p><strong>Category:</strong> ${plant.category}</p>
      <p><strong>Price:</strong> ৳${plant.price}</p>
      <p><strong>Description:</strong>${plant.description}</p>
       <span class="close-btn">Close</span>
    </div>
  `;

  
  document.body.appendChild(modal);

 
  modal.style.display = "block";

  
  modal.querySelector(".close-btn").onclick = () => {
    modal.remove();
  };

 
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  };

  
  modal.querySelector(".btn").onclick = () => {
    addToCart(plant);
    modal.remove();
  };
};

const addToCart = (plant) => {
  cart.push(plant);
  showCartItems();
  calculateTotal();
  alert(`${plant.name} added to cart!`);
};


const removeFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id);
  showCartItems();
  calculateTotal();
};


const calculateTotal = () => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.innerText = `Total: ৳${total}`;
};


const showCartItems = () => {
  cartContainer.innerHTML = ""; 
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <span>৳${item.price} × 1</span>
      </div>
      <button class="remove-btn">X</button>
    `;

    cartItem.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(item.id);
    });

    cartContainer.appendChild(cartItem);
  });
};
