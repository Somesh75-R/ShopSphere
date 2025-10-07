let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.querySelector(".cart-container");

function renderCart() {
  if(cart.length===0){
    cartContainer.innerHTML="<p>Your cart is empty.</p>";
    return;
  }

  let total=0;
  cartContainer.innerHTML = cart.map((item,index)=>{
    const subtotal = item.price * item.qty;
    total += subtotal;
    return `
      <div class="cart-item" data-id="${item.id}">
        <img src="../${item.image}" alt="${item.name}" width="80"/>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: 
          <button class="decrease-qty">-</button>
          ${item.qty}
          <button class="increase-qty">+</button>
        </p>
        <p>Subtotal: ₹${subtotal}</p>
        <button class="remove-item">Remove</button>
      </div>
      ${index<cart.length-1 ? '<hr/>' : ''}
    `;
  }).join('') + `<h3>Total: ₹${total}</h3>`;
}

function removeFromCart(productId){
  const item = cart.find(i=>i.id===productId);
  cart = cart.filter(item => item.id != productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();

  showToast(`${item.name} removed from cart`);
}

function updateQuantity(productId, change){
  const item = cart.find(i=>i.id===productId);
  cart = cart.map(item => {
    if(item.id===productId) return {...item, qty: Math.max(1, item.qty+change)};
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();

  showToast(`Quantity updated for ${item.name}`);
}

cartContainer.addEventListener("click", e=>{
  const itemDiv = e.target.closest(".cart-item");
  if(!itemDiv) return;

  const id = parseInt(itemDiv.dataset.id,10);
  if(e.target.classList.contains("remove-item")) removeFromCart(id);
  else if(e.target.classList.contains("increase-qty")) updateQuantity(id,1);
  else if(e.target.classList.contains("decrease-qty")) updateQuantity(id,-1);
});

renderCart();

const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", () => {
  if(cart.length === 0){
    showToast("Cart is empty! Add some products first");
    return;
  }
  window.location.href = "checkout.html";
});
