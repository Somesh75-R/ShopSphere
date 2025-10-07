function renderOrderSummary(){
  const cart = JSON.parse(localStorage.getItem("cart"))||[];
  const summaryDiv = document.getElementById("order-summary");
  if(cart.length===0){ summaryDiv.innerHTML="<p>Your cart is empty.</p>"; return; }

  let total=0;
  summaryDiv.innerHTML = cart.map(item=>{
    const subtotal=item.price*item.qty;
    total+=subtotal;
    return `<div class="summary-item"><p>${item.name} (x${item.qty})</p><p>₹${subtotal}</p></div>`;
  }).join('') + `<hr/><h3>Total: ₹${total}</h3>`;
}

function handleCheckoutForm(){
  const form = document.getElementById("checkout-form");
  form.addEventListener("submit", e=>{
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name").trim();
    const address = formData.get("address").trim();
    const email = formData.get("email").trim();
    const payment = formData.get("payment");

    if(!name || !address || !email || !payment){
      showToast("Please fill all fields");
      return;
    }
    
    showToast(`✅ Thank you ${name}! Your order has been placed.`, 3000);
    localStorage.removeItem("cart");
    updateCartCount();
    window.location.href="../index.html";
  });
}

// Init
renderOrderSummary();
handleCheckoutForm();
updateCartCount();
