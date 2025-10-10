const miniCart = document.querySelector(".mini-cart");
const miniCartItemsContainer = document.querySelector(".mini-cart-items");
const miniCartTotal = document.querySelector(".mini-cart-total");
const cartIcon = document.querySelector(".cart-link");
const closeMiniCartBtn = document.querySelector(".mini-cart-close");
const toastContainer = document.getElementById("toast-container");

function renderMiniCart() {
  const cart = getCart();
  miniCartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    miniCartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    miniCartTotal.textContent = "₹0";
    return;
  }

  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    const itemDiv = document.createElement("div");
    itemDiv.className = "mini-cart-item";
    itemDiv.dataset.id = item.id;
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="40"/>
      <p>${item.name}</p>
      <div class="mini-qty">
        <button class="decrease-qty">-</button>
        <span>${item.qty}</span>
        <button class="increase-qty">+</button>
      </div>
      <span>₹${subtotal}</span>
      <button class="remove-item">×</button>
    `;
    miniCartItemsContainer.appendChild(itemDiv);
  });
  miniCartTotal.textContent = `₹${total}`;
}

miniCartItemsContainer.addEventListener("click", e => {
  const itemDiv = e.target.closest(".mini-cart-item");
  if (!itemDiv) return;
  const id = parseInt(itemDiv.dataset.id, 10);
  let cart = getCart();
  const item = cart.find(p => p.id === id);

  if (e.target.classList.contains("increase-qty")) {
    item.qty++;
    saveCart(cart);
    renderMiniCart();
    showToast(`Increased quantity of ${item.name}`);
  } else if (e.target.classList.contains("decrease-qty")) {
    item.qty = Math.max(1, item.qty - 1);
    saveCart(cart);
    renderMiniCart();
    showToast(`Decreased quantity of ${item.name}`);
  } else if (e.target.classList.contains("remove-item")) {
    cart = cart.filter(p => p.id !== id);
    saveCart(cart);
    renderMiniCart();
    showToast(`${item.name} removed from cart`);
  }
});

cartIcon.addEventListener("click", () => {
  miniCart.classList.toggle("active");
  renderMiniCart();
});

closeMiniCartBtn.addEventListener("click", () => miniCart.classList.remove("active"));

document.addEventListener("cartUpdated", () => {
  renderMiniCart();
  showToast("Cart updated!");
});

renderMiniCart();
updateCartCount();