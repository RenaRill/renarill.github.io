function addToCart(button) {
  let card = button.parentElement.parentElement;
  let name = card.dataset.name;
  let price = parseFloat(card.dataset.price);
  let imageUrl = card.dataset.image;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name, price, imageUrl });
  localStorage.setItem('cart', JSON.stringify(cart));
}