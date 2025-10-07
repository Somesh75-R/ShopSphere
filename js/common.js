function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountE1 = document.getElementById("cart-count");
  if(cartCountE1) {
    let totalItems = 0;
    cart.forEach(item => totalItems += item.qty);
    cartCountE1.textContent = totalItems;
  }
}


function showToast(message, duration = 2000) {
  const container = document.getElementById("toast-container");
  if(!container) return;

  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.marginTop = "10px";
  toast.style.borderRadius = "5px";
  toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s";

  container.appendChild(toast);

  // Fade in
  setTimeout(()=> toast.style.opacity = "1", 50);

  // Remove after duration
  setTimeout(()=>{
    toast.style.opacity = "0";
    setTimeout(()=> container.removeChild(toast), 300);
  }, duration);
}
updateCartCount();
