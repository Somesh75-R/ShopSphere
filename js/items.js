const imageBasePath = "images/";

const items = [
  { id: 1, name: "Wireless Headphones", price: 1999, image: "headphones.jpg" },
  { id: 2, name: "Smart Watch", price: 2999, image: "smartwatch.jpg" },
  { id: 3, name: "Sports Shoes", price: 2499, image: "shoes.jpg" },
  { id: 4, name: "Backpack", price: 1499, image: "backpack.jpg" }
];

items.forEach(item => item.image = imageBasePath + item.image);

const itemsContainer = document.querySelector(".items-container");
itemsContainer.innerHTML = items.map(item => `
  <div class="item-card" data-id="${item.id}">
    <img src="${item.image}" alt="${item.name}" />
    <h3>${item.name}</h3>
    <p>₹${item.price}</p>
    <button class="add-to-cart">Add to cart</button>
  </div>
`).join("");

let cart = getCart();

function addToCart(productId) {
  console.log("addToCart called with Id : ", productId);
  const product = items.find(p => p.id == productId);
  if (!product) {
    console.log("Product not found");
    return;
  }

  const existing = cart.find(p => p.id == productId);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });

  saveCart(cart); 
  updateCartCount();
  showToast(`${product.name} added to cart`);

  document.dispatchEvent(new Event("cartUpdated"));

  console.log("Cart after add:", cart);
  console.log("LocalStorage after save:", localStorage.getItem("cart"));
}

itemsContainer.addEventListener("click", e => {
  console.log("Click detected", e.target);
  if (e.target.classList.contains("add-to-cart")) {
    console.log("Add to cart clicked");
    const card = e.target.closest(".item-card");
    addToCart(parseInt(card.dataset.id, 10));
  }
});