function myFunction(icon) {
    icon.classList.toggle("change");
    var nav = document.getElementById("display");
    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
    }
}
function bodyclose() {
    var x = document.getElementById("display");
    if (x.style.display == "flex") {
        var y = document.getElementById("menu-icon");

        y.classList.toggle("change");

        x.style.display = "none";
    }
    var z = document.getElementById("search-form");
    if (z.style.display == "flex") {

        z.style.display = "none";
    }
}
function searchbar() {
    var nav = document.getElementById("search-form");
    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
    }
}
function filter() {
    var nav = document.querySelector('.filt')
    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
    }
}

// Get all "Add to Cart" buttons

// cart.js

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const noOfItemsElement = document.getElementById('no-of-items');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalPrice = parseInt(localStorage.getItem('totalPrice')) || 0;

    // Update the number of items displayed in the cart
    if (noOfItemsElement) {
        noOfItemsElement.textContent = cartItems.length;
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.closest('.pproduct');
            const productDescription = productElement.querySelector('.pro-decp').textContent;
            const price = parseInt(productElement.querySelector('#p-price span').textContent);
            const imageSrc = productElement.querySelector('img').src; // Get the image source

            cartItems.push({ product: productDescription, price, image: imageSrc });
            totalPrice += price;

            // Save cart data to localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            localStorage.setItem('totalPrice', totalPrice);

            // Update cart display
            const cartList = document.getElementById('cart-list');
            const totalPriceElement = document.getElementById('total-price');

            // Check if cartList exists before manipulating it
            if (cartList) {
                // Clear existing items
                cartList.innerHTML = '';

                // Add new items to the cart list
                cartItems.forEach(item => {
                    const listItem = document.createElement('li');
                    const img = document.createElement('img');
                    img.src = item.image; // Set the image source
                    img.alt = 'Product Image'; // Set alt text for accessibility
                    listItem.appendChild(img);
                    listItem.textContent += ` - ₹${item.price}`;
                    cartList.appendChild(listItem);
                });
            }

            if (totalPriceElement) {
                totalPriceElement.textContent = `₹${totalPrice}`;
            }

            // Update the number of items displayed in the cart
            if (noOfItemsElement) {
                noOfItemsElement.textContent = cartItems.length;
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    // Function to handle search
    function searchProducts() {
        const searchInput = document.getElementById('search-input');
        console.log(searchInput)
        if (!searchInput) return; // Check if the search input element exists
        const searchText = searchInput.value.trim().toLowerCase(); // Trim whitespace and convert to lowercase
        const products = document.querySelectorAll('.pproduct');

        products.forEach(product => {
            const productName = product.querySelector('.pro-decp');
            if (!productName) return; // Check if the product name element exists
            const productNameText = productName.textContent.toLowerCase();
            const isVisible = productNameText.includes(searchText);

            // Toggle visibility based on search result
            product.style.display = isVisible ? 'block' : 'none';
        });
    }

    // Event listeners for search functionality
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission
            searchProducts(); // Call search function
            var nav = document.getElementById("search-form");
            if (nav.style.display === "flex") {
                nav.style.display = "none";
            } else {
                nav.style.display = "flex";
            }
        });
    }


});




document.addEventListener('DOMContentLoaded', () => {
    const sortAscendingButton = document.getElementById('sort-ascending');
    const sortDescendingButton = document.getElementById('sort-descending');
    const productList = document.getElementById('pproducts');
    const removeFilterButton = document.getElementById('remove-filter');
    let originalOrder = Array.from(productList.children);
    // Function to sort products by price in ascending order
    function sortProductsAscending() {
        const products = Array.from(productList.children);
        products.sort((a, b) => {
            const priceA = parseInt(a.querySelector('#p-price span').textContent);
            const priceB = parseInt(b.querySelector('#p-price span').textContent);
            return priceA - priceB;
        });
        products.forEach(product => productList.appendChild(product));
    }

    // Function to sort products by price in descending order
    function sortProductsDescending() {
        const products = Array.from(productList.children);
        products.sort((a, b) => {
            const priceA = parseInt(a.querySelector('#p-price span').textContent);
            const priceB = parseInt(b.querySelector('#p-price span').textContent);
            return priceB - priceA;
        });
        products.forEach(product => productList.appendChild(product));
    }
    function removeFiltering() {
        originalOrder.forEach(product => {
            productList.appendChild(product); // Append each product in its original order
        });
    }
    // Event listeners for sorting buttons
    sortAscendingButton.addEventListener('click', sortProductsAscending);
    sortDescendingButton.addEventListener('click', sortProductsDescending);
    removeFilterButton.addEventListener('click', removeFiltering);
});
