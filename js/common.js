function getCart() {
  try {
    const data = localStorage.getItem("cart");
    if (!data || data === "undefined") return [];
    return JSON.parse(data);
  } catch (e) {
    console.warn("Corrupted cart data, resetting...");
    localStorage.removeItem("cart");
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalItems;
  }
}

function showToast(message, duration = 2000) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add("hide"), duration);
  setTimeout(() => toast.remove(), duration + 500);
}

updateCartCount();