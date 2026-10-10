let products = [];

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const sortFilter = document.getElementById("sortFilter");
const categoryFilter = document.getElementById("categoryFilter");

async function loadProducts() {
    try {
        const response = await fetch(
            "http://localhost:5001/api/products"
        );

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        products = await response.json();

        displayProducts(products);

    } catch (error) {
        console.error("Error loading products:", error);

        productContainer.innerHTML =
            "<h2>Failed to load products</h2>";
    }
}



function displayProducts(productList) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {
        productContainer.innerHTML =
            "<h2>No products found</h2>";
        return;
    }

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="category">
                    ${product.category.toUpperCase()}
                </p>

                <p class="price">
                    ₹${product.price}
                </p>

                <p class="rating">
                    ⭐ ${product.rating} / 5
                </p>

                <p class="stock">
                    ${product.stock ? "In Stock" : "Out of Stock"}
                </p>

                <button
                    class="view-btn"
                    onclick="viewProduct('${product.id}')"
                >
                    View Details
                </button>

                <button
                    class="cart-btn"
                    onclick="addToCart('${product.id}')"
                >
                    Add to Cart 🛒
                </button>

            </div>
        `;

        productContainer.appendChild(card);
    });
}



function filterProducts() {

    const searchText =
        searchInput.value.toLowerCase();

    const selectedCategory =
        categoryFilter.value;

    const selectedSort =
        sortFilter.value;

    let filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category.toLowerCase() ===
            selectedCategory.toLowerCase();

        return matchesSearch && matchesCategory;
    });


    if (selectedSort === "low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    } else if (selectedSort === "high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    } else if (selectedSort === "name") {

        filteredProducts.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );
    }


    displayProducts(filteredProducts);
}



function viewProduct(productId) {

    const product = products.find(
        product => product.id === productId
    );

    if (product) {

        window.location.href =
            `product-details.html?id=${encodeURIComponent(product.id)}`;
    }
}


async function addToCart(productId) {

    const product = products.find(
        product => product.id === productId
    );

    if (!product) {
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5001/api/cart",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    productId: product.id,
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to add product to cart"
            );
        }


        alert(
            `${product.name} added to cart!`
        );

    } catch (error) {

        console.error(
            "Add to cart error:",
            error
        );

        alert(error.message);
    }
}


searchInput.addEventListener(
    "input",
    filterProducts
);

categoryFilter.addEventListener(
    "change",
    filterProducts
);


loadProducts();