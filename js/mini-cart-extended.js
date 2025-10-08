// ======= DOM Elements =======
const miniCart = document.querySelector(".mini-cart");
const miniCartItemsContainer = document.querySelector(".mini-cart-items");
const miniCartTotal = document.querySelector(".mini-cart-total");
const cartIcon = document.querySelector(".cart-icon"); // your cart icon button
const closeMiniCartBtn = document.querySelector(".mini-cart-close");
const toastContainer = document.querySelector(".toast-container");

// ======= Render Mini-Cart =======
function renderMiniCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
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
        itemDiv.classList.add("mini-cart-item");
        itemDiv.innerHTML = `
            <p>${item.name} x ${item.qty}</p>
            <span>₹${subtotal}</span>
        `;
        miniCartItemsContainer.appendChild(itemDiv);
    });

    miniCartTotal.textContent = `₹${total}`;
}

// ======= Toggle Mini-Cart =======
cartIcon.addEventListener("click", () => {
    miniCart.classList.toggle("active");
    renderMiniCart();
});

closeMiniCartBtn.addEventListener("click", () => {
    miniCart.classList.remove("active");
});

// ======= Toast Notifications =======
function showToast(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("hide");
    }, 2000);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}

// ======= Auto Refresh on Cart Update =======
document.addEventListener("cartUpdated", () => {
    renderMiniCart();
    showToast("Cart updated!");
});

// ======= Example: Dispatch cartUpdated when adding item =======
// in items.js when adding an item to cart:
const event = new Event("cartUpdated");
document.dispatchEvent(event);
