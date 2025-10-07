let items = [
  { id: 1, name: "Wireless Headphones", price: 1999, image: "headphones.jpg" },
  { id: 2, name: "Smart Watch", price: 2999, image: "smartwatch.jpg" },
  { id: 3, name: "Sports Shoes", price: 2499, image: "shoes.jpg" },
  { id: 4, name: "Backpack", price: 1499, image: "backpack.jpg" }
];

const imageBasePath = "images/";
items.forEach(item => item.image = imageBasePath + item.image);

const itemsContainer = document.querySelector(".items-container");
itemsContainer.innerHTML = items.map(item => `
  <div class="item-card" data-id="${item.id}">
    <img src="${item.image}" alt="${item.name}" />
    <h3>${item.name}</h3>
    <p>₹${item.price}</p>
    <button class="add-to-cart">Add to cart</button>
  </div>
`).join('');

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const product = items.find(p => p.id == productId);
  if(!product) return;

  const existing = cart.find(p => p.id == productId);
  if(existing) existing.qty++;
  else cart.push({...product, qty:1});

  saveCart();
  updateCartCount();

  showToast(`${product.name} added to cart`);
}

itemsContainer.addEventListener("click", e => {
  if(e.target.classList.contains("add-to-cart")) {
    const card = e.target.closest(".item-card");
    const id = parseInt(card.dataset.id,10);
    addToCart(id);
    
  }
});
