const products = [
  {
    id: 1,
    name: "MAGMA manchette en résine rouge",
    category: ["bracelets", "accessoires"],
    description: "Résine · Rouge",
    price: 9.90,
    tag: "",
    image: "./images/manchetteMAGMA.jpg"
  },
  {
    id: 2,
    name: "SERPENTINE collier argenté",
    category: ["colliers", "accessoires"],
    description: "collier · argenté",
    price: 12.90,
    tag: "",
    image: "./images/collierSERPENTINE.jpg"
  },
  {
    id: 3,
    name: "42 broche escargot",
    category: ["broches", "accessoires"],
    description: "broche · argenté",
    price: 9.90,
    tag: "",
    image: "./images/broche42.jpg"
  },
  {
    id: 4,
    name: "ROI SOLEIL broche soleil",
    category: ["broches", "accessoires"],
    description: "broche · Red",
    price: 9.90,
    tag: "",
    image: "./images/brocheROISOLEIL.jpg"
  },
  {
    id: 5,
    name: "ACIER chaine sac monochrome argenté Holder",
    category: ["chaîne de sac", "accessoires"],
    description: "Handmade · Everyday essential",
    price: 14.90,
    tag: "fait main",
    image: "./images/chaineACIER.jpg"
  },
  {
    id: 7,
    name: "RELIEF boucles d'oreilles argentées",
    category: ["boucles d'oreilles", "accessoires"],
    description: "Handmade · Statement piece",
    price: 15.90,
    tag: "",
    image: "./images/bouclesRELIEF.jpg"
  },
  {
    id: 8,
    name: "EFFUSION bague argentée",
    category: ["bagues", "accessoires"],
    description: "Accessories · Limited edit",
    price: 9.90,
    tag: "",
    image: "./images/bagueEFFUSION.jpg"
  },
   {
    id: 8,
    name: "CHEVALIERE bague argentée",
    category: ["bagues", "accessoires"],
    description: "Accessories · Limited edit",
    price: 9.90,
    tag: "",
    image: "./images/bagueCHEVALIERE.jpg"
  },
   {
    id: 8,
    name: "SHANNON'S boucles d'oreilles argentées",
    category: ["boucles d'oreilles", "accessoires"],
    description: "Accessories · Limited edit",
    price: 9.90,
    tag: "",
    image: "./images/bouclesSHANNONS.jpg"
  },
   {
    id: 8,
    name: "RED SAILOR bracelet perles",
    category: ["bracelets", "accessoires"],
    description: "Accessories · Limited edit",
    price: 9.90,
    tag: "fait main",
    image: "./images/braceletREDSAILOR.jpg"
  },
   {
    id: 8,
    name: "PATCHWORK bracelet perles",
    category: ["bracelets", "accessoires"],
    description: "Accessories · Limited edit",
    price: 9.90,
    tag: "fait main",
    image: "./images/braceletPATCHWORK.jpg"
  },
   {
    id: 8,
    name: "NUANCES collier perles",
    category: ["colliers", "accessoires"],
    description: "Accessories · Limited edit",
    price: 12.90,
    tag: "fait main",
    image: "./images/collierNUANCES.jpg"
  }
];

const cart = [];

const productGrid = document.querySelector("#product-grid");
const cartPanel = document.querySelector("#cart-panel");
const overlay = document.querySelector("#overlay");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");

const euro = amount =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(amount);

function renderProducts(category = "all") {
  const filtered = category === "all"
    ? products
    : products.filter(product => product.category.includes(category));
    

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
        ${product.tag
          ? `<span class="product-tag">${product.tag}</span>`
          : ""}
      </div>
      <div class="product-info">
        <div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
        </div>
        <span class="product-price">${euro(product.price)}</span>
      </div>
      <button class="add-button" data-add="${product.id}" type="button">
        ADD TO BAG +
      </button>
    </article>
  `).join("");
}
document.addEventListener("DOMContentLoaded", () => {
  renderProducts("all");
});

function renderCart() {
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img
        src="${item.image}"
        alt="${item.name}"
        class="cart-item-image"
      >

      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>${euro(item.price)}</p>
        <p>Quantité : ${item.quantity}</p>
        <button type="button" data-remove="${item.id}">
          Supprimer
        </button>
      </div>
    </div>
  `).join("");

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = euro(totalPrice);
}

// Ajouter un produit au panier
document.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");

  if (button) {
    const product = products.find(
      item => String(item.id) === button.dataset.add
    );

    if (!product) return;

    const existingItem = cart.find(
      item => String(item.id) === String(product.id)
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    renderCart();
  }

  const removeButton = event.target.closest("[data-remove]");

  if (removeButton) {
    cart = cart.filter(
      item => String(item.id) !== removeButton.dataset.remove
    );

    renderCart();
  }
});

renderCart();

function addToCart(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.image,
  quantity: 1
});
  }

  renderCart();
}

function removeFromCart(id) {
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) cart.splice(index, 1);
  renderCart();
}

function openCart() {
  document.body.classList.add("cart-open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  document.body.classList.remove("cart-open");
  cartPanel.setAttribute("aria-hidden", "true");
}

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  addToCart(Number(button.dataset.add));
  openCart();
});

document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach(filter => {
      filter.classList.remove("active");
    });

    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

document.querySelector("#cart-toggle").addEventListener("click", openCart);
document.querySelector("#cart-close").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeCart();
});

document.querySelector("#checkout-button").addEventListener("click", () => {
  alert(
    "Le paiement n'est pas encore activé. " +
    "Nous allons connecter Stripe dans la prochaine étape."
  );
});

document.querySelector("#year").textContent = new Date().getFullYear();

renderProducts();
renderCart();