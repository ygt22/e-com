// Sayfa yüklendiğinde sepeti ve header'ı güncelle
document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount(); // Header'daki sepet sayısını güncelle
    loadCartItems(cart); // Sepeti sayfaya yükle
});

// Sepet verilerini sayfada göster
function loadCartItems(cart) {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    let subtotal = 0;

    if (!cartItemsContainer || cart.length === 0) {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        }
        if (subtotalElement) subtotalElement.textContent = '$0.00';
        if (totalElement) totalElement.textContent = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = ''; // Eski ürünleri temizle

    cart.forEach(item => {
        const productHTML = `
            <div class="cart-item d-flex align-items-center p-3 mb-3" style="border: 1px solid #ddd; border-radius: 8px;">
                <div class="cart-item-image">
                    <img src="${item.image || 'dist/images/product-placeholder.jpg'}" alt="${item.name}" 
                         style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px;">
                </div>
                <div class="cart-item-details flex-grow-1 ml-3">
                    <p class="mb-1 font-weight-bold">${item.name}</p>
                    <p class="mb-0">Price: <span class="text-primary item-price" data-id="${item.id}">$${item.price}</span></p>
                </div>
                <div class="cart-item-actions d-flex align-items-center">
                    <input type="number" min="1" value="${item.quantity || 1}" class="quantity-input" data-id="${item.id}" 
                        style="width: 60px; text-align: center; margin-right: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    <button class="btn btn-outline-danger btn-sm remove-item" data-id="${item.id}">Del</button>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += productHTML;
        subtotal += parseFloat(item.price) * (item.quantity || 1);
    });

    updatePageTotals(cart); // Toplam değerlerini güncelle
    setupRemoveButtons(); // Silme olaylarını bağla
    setupQuantityChange(); // Miktar değişikliği olaylarını bağla
}

// Header'daki toplam ürün sayısını günceller
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart'); // Header'daki sepet sayacı
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    if (cartCountElement) {
        cartCountElement.textContent = totalQuantity; // Sepet ikonunu güncelle
    }
}

// Alt toplam ve toplam değerlerini günceller
function updatePageTotals(cart) {
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * (item.quantity || 1), 0);

    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${subtotal.toFixed(2)}`;
}

// Sepeti günceller ve header'ı yeniler
function updateCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart)); // Sepeti kaydet
    updateCartCount(); // Header'ı güncelle
    updatePageTotals(cart); // Toplam değerlerini güncelle
}

// Ürünü sepetten çıkar
function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.dataset.id;
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== productId); // Ürünü sepetten kaldır
            updateCart(cart); // Sepeti güncelle
            loadCartItems(cart); // Sayfayı yeniden yükle
        });
    });
}

// Miktar değişikliğini yönet
function setupQuantityChange() {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function () {
            const productId = this.dataset.id;
            const newQuantity = parseInt(this.value);

            if (newQuantity < 1) {
                alert('Quantity cannot be less than 1');
                this.value = 1;
                return;
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.map(item => {
                if (item.id === productId) {
                    item.quantity = newQuantity; // Yeni miktarı güncelle
                }
                return item;
            });

            updateCart(cart); // Sepeti güncelle
            loadCartItems(cart); // Sayfayı yeniden yükle
        });
    });
}


// Sepeti LocalStorage'da güncelleme

function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        // Eğer ürün zaten sepette varsa miktarını artır
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
        // Ürünü yeni olarak sepete ekle
        cart.push({ id, name, price, image, quantity: 1 });
    }

    // Güncellenmiş sepeti kaydet
    localStorage.setItem('cart', JSON.stringify(cart));

    // Header'daki sepet sayısını güncelle
    updateCartCount();
}
