let cards = document.querySelectorAll('.list .card');
let currentVal = 1;
let currentFilter = 'Всё';
let link = document.getElementsByClassName("link");

function activeLink(event) {
  for (a of link) {
    a.classList.remove("active");
  }

  event.target.classList.add("active");
  currentVal = parseInt(event.target.getAttribute("value"));;

  updateCardDisplay(currentFilter);
}

function prevbtn() {
  if (currentVal > 1) {
    let links = document.querySelectorAll('.pagination .link');

    currentVal--;

    updatePagination(links);
    updateCardDisplay(currentFilter);
  }
}

function nextbtn() {
  let links = document.querySelectorAll('.pagination .link');


  if (currentVal < links.length) {
    currentVal++;

    updatePagination(links);
    updateCardDisplay(currentFilter);
  }
}

function updatePagination(links) {
  for (let i = 0; i < link.length; i++) {
    if (i === currentVal - 1) {
      link[i].classList.add("active");
    } else {
      link[i].classList.remove("active");
    }
    link[i].style.display = i < links ? 'inline-block' : 'none';
  }
}

function updateCardDisplay(filter) {
  let show_per_page = 8;
  let filteredCards = Array.from(cards).filter(card => {
    let cardType = card.getAttribute('data-type');
    return (filter === 'Всё' || cardType === filter);
  });

  let total_pages = Math.ceil(filteredCards.length / show_per_page);
  currentVal = Math.min(currentVal, total_pages);
  let start_index = (currentVal - 1) * show_per_page;
  let end_index = Math.min(start_index + show_per_page, filteredCards.length);

  for (let i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }

  for (let i = start_index; i < end_index; i++) {
    filteredCards[i].style.display = "block";
  }

  updatePagination(total_pages);
}

function filterProduct(filter) {
  currentFilter = filter;
  currentVal = 1;

  updateCardDisplay(filter);
}

updateCardDisplay(currentFilter);