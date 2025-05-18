let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart();
  alert(`${name} added to cart!`);
}

function displayCart() {
  const cartContainer = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');
  if (!cartContainer || !totalPriceEl) return;

  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceEl.textContent = '₹0';
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <span>${item.name}</span>
      <span>₹${item.price}</span>
      <span>
        Qty: 
        <button onclick="decreaseQuantity(${index})">-</button>
        ${item.quantity}
        <button onclick="increaseQuantity(${index})">+</button>
      </span>
      <button onclick="removeFromCart(${index})">❌</button>
    `;
    cartContainer.appendChild(itemEl);
  });

  totalPriceEl.textContent = `₹${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
  displayCart();
}

function increaseQuantity(index) {
  cart[index].quantity++;
  saveCart();
  displayCart();
}

function orderViaWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add products before ordering.");
    return;
  }

  let message = "Hello, I want to place an order:\n";
  cart.forEach(item => {
    message += `- ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}\n`;
  });

  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `Total: ₹${total}`;

  const whatsappNumber = "917014150761";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, '_blank');

  // Optional: Clear cart after order
  // cart = [];
  // saveCart();
  // displayCart();
}

if (document.getElementById('cart-items')) {
  displayCart();
}
