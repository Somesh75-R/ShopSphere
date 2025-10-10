function renderOrderSummary() {
  const cart = getCart();
  const summaryDiv = document.getElementById("order-summary");
  if (cart.length === 0) {
    summaryDiv.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  summaryDiv.innerHTML = cart.map(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    return `<div class="summary-item"><p>${item.name} (x${item.qty})</p><p>₹${subtotal}</p></div>`;
  }).join("") + `<hr/><h3>Total: ₹${total}</h3>`;
}

function handleCheckoutForm() {
  const form = document.getElementById("checkout-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name").trim();
    const address = data.get("address").trim();
    const email = data.get("email").trim();
    const payment = data.get("payment");

    if (!name || !address || !email || !payment) {
      showToast("Please fill all fields");
      return;
    }

    showToast(`✅ Thank you ${name}! Your order has been placed.`, 3000);
    localStorage.removeItem("cart");
    updateCartCount();
    setTimeout(() => (window.location.href = "../index.html"), 500);
  });
}

renderOrderSummary();
handleCheckoutForm();
updateCartCount();