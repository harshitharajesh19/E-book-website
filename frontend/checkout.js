document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkoutItems = document.getElementById("checkout-items");
    const totalPriceElement = document.getElementById("total-price");

    // Clear previous content
    checkoutItems.innerHTML = "";

    if (cart.length === 0) {
        checkoutItems.innerHTML = "<p>Your cart is empty!</p>";
        return;
    }

    let totalPrice = 0;

    cart.forEach(item => {
        // Create container for cart item
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("row", "mb-3", "border-bottom", "pb-2");

        // Add content to item container
        itemDiv.innerHTML = `
            <div class="col-md-8">
                <h5>${item.title}</h5>
                <p>by ${item.author}</p>
            </div>
            <div class="col-md-2 text-end">
                <p>$${item.price.toFixed(2)}</p>
            </div>
        `;

        // Append to checkout items container
        checkoutItems.appendChild(itemDiv);

        // Update total price
        totalPrice += item.price;
    });

    // Display total price
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
});

// Function to confirm order
function confirmOrder() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Confirm and clear the cart
    alert("Your order has been confirmed! Thank you for shopping.");
    localStorage.removeItem("cart");
    window.location.href = "index.html"; // Redirect to the homepage
}
