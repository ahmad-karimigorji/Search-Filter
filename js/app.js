// http://localhost:3000/items

const productsCenter = document.querySelector(".products-center");
const searchInput = document.querySelector("#search");
const btns = document.querySelectorAll(".header a");

let allProduct = [];

const filters = {
  searchFilter: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((response) => {
      allProduct = response.data;

      // render product on DOM
      renderProduct(response.data, filters);
    })
    .catch((error) => console.log(error));
});

// render product on DOM
function renderProduct(_products, _filters) {
  productsCenter.innerHTML = "";

  const filterProduct = _products.filter((p) => {
    return p.title
      .toLowerCase()
      .includes(_filters.searchFilter.trim().toLowerCase());
  });

  filterProduct.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="product-img">
        <img src=${item.image} alt="">
        </div>
        <div class="product-desc">
        <span class="product-price">$${item.price}</span>
        <span class="product-name">${item.title}</span>
        </div>`;

    productsCenter.appendChild(div);
  });
}

searchInput.addEventListener("input", () => {
  filters.searchFilter = searchInput.value;
  renderProduct(allProduct, filters);
});

// filter based on group
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;

    filters.searchFilter = filter;
    renderProduct(allProduct, filters);
  });
});
