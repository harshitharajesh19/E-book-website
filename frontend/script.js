let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            const title = card.querySelector(".card-title").textContent;
            const author = card.querySelector(".card-text").textContent.split("by ")[1];
            const price = parseFloat(card.querySelector(".card-text:nth-child(3)").textContent.replace("$", ""));

            const book = { title, author, price };

            // Check for duplicates
            if (!cart.some(item => item.title === book.title)) {
                cart.push(book);
                localStorage.setItem("cart", JSON.stringify(cart));
                alert(`${title} added to cart.`);
            } else {
                alert(`${title} is already in your cart.`);
            }
        });
    });
});


// Update Cart Modal
function updateCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';

    cart.forEach((book, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('d-flex', 'justify-content-between', 'align-items-center');
        
        listItem.innerHTML = `
            ${book.title} - ${book.price} 
            <button class="btn btn-danger btn-sm remove-from-cart" data-index="${index}">Remove</button>
        `;
        
        cartList.appendChild(listItem);
    });

    // Add remove functionality
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1); // Remove book from cart
            updateCart();
        });
    });
}



// Category Filter
document.getElementById('category-filter').addEventListener('change', (e) => {
    const selectedCategory = e.target.value;
    const bookItems = document.querySelectorAll('.book-item');

    bookItems.forEach(item => {
        if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Search Function
document.getElementById('search-bar').addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const bookItems = document.querySelectorAll('.book-item');
    
    bookItems.forEach(item => {
        const title = item.querySelector('.card-title').innerText.toLowerCase();
        const author = item.querySelector('.card-text').innerText.toLowerCase();

        if (title.includes(searchText) || author.includes(searchText)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});


// Example list of recommended books
const recommendedBooks = [
    {
        title: 'The Time Machine',
        author: 'H.G. Wells',
        price: '$15.00',
        category: 'fiction',
        image: 'https://via.placeholder.com/150'
    },
    {
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        price: '$18.00',
        category: 'science',
        image: 'https://via.placeholder.com/150'
    },
    {
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        price: '$20.00',
        category: 'non-fiction',
        image: 'https://via.placeholder.com/150'
    },
    {
        title: 'The Origins of Political Order',
        author: 'Francis Fukuyama',
        price: '$22.00',
        category: 'history',
        image: 'https://via.placeholder.com/150'
    },
    {
        title: 'The Selfish Gene',
        author: 'Richard Dawkins',
        price: '$17.00',
        category: 'science',
        image: 'https://via.placeholder.com/150'
    }
];

// Function to display recommended books
function displayRecommendedBooks() {
    const recommendedBooksSection = document.getElementById('recommended-books');
    recommendedBooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('col-md-4', 'book-item', 'mb-3');
        bookCard.setAttribute('data-category', book.category);

        bookCard.innerHTML = `
            <div class="card">
                <img src="${book.image}" class="card-img-top" alt="${book.title}">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.author}</p>
                    <p class="card-text">${book.price}</p>
                    <button class="btn btn-primary add-to-cart">Add to Cart</button>
                </div>
            </div>
        `;
        recommendedBooksSection.appendChild(bookCard);
    });

    // Add event listener for "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const bookCard = e.target.closest('.book-item');
            const bookTitle = bookCard.querySelector('.card-title').innerText;
            const bookPrice = bookCard.querySelector('.card-text').innerText;

            const book = {
                title: bookTitle,
                price: bookPrice
            };

            // Check if the book is already in the cart
            const existingBook = cart.find(item => item.title === book.title);

            if (!existingBook) {
                cart.push(book);
                updateCart();
            } else {
                alert('This book is already in your cart!');
            }
        });
    });
}

document.getElementById('checkout-button').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});



// Call the display function when the page loads
displayRecommendedBooks();
