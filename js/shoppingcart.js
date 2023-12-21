function displayCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartTable = document.getElementById('cartTable');
  let subtotal = 0;

  let tbody = cartTable.getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';

  cart.forEach((item, index) => {
    let row = tbody.insertRow();

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell1.innerHTML = `
      <div class="cart-info">
      <img src="${item.imageUrl}" alt="Изображение товара">
      <div class="text-info">
        <p>${item.name}</p>
        <a href="#" onclick="removeFromCart(${index})">Удалить</a>
      </div>
    </div>
      `;

    cell2.innerHTML = `<input type="number" value="${item.quantity || 1}" onchange="updateQuantity(${index}, this.value)">`;
    cell3.textContent = `${item.price} ₽`;

    let itemTotal = item.price * (item.quantity || 1);
    cell4.textContent = `${itemTotal} ₽`;

    subtotal += itemTotal;
  });

  document.getElementById('subtotal').textContent = `${subtotal} руб`;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);

  localStorage.setItem('cart', JSON.stringify(cart));

  displayCart();
}

function updateQuantity(index, newQuantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity = parseInt(newQuantity, 10);

  localStorage.setItem('cart', JSON.stringify(cart));

  displayCart();
}

displayCart();

function showPaymentConfirmation() {
  document.getElementById('modalMessage').textContent = "Инструкции по оплате были высланы на почту, указанной при регистрации. Если у вас проблемы с доступом к данной почте, сообщите нам об этом по одному из указанных контактов.";
  document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('myModal').style.display = 'none';
}