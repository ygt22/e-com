// Öne çıkan ürünleri dinamik olarak oluşturmak için fonksiyon
function renderFeaturedProducts(containerId, products) {
    const productContainer = document.getElementById(containerId);

    if (!productContainer) {
        console.error(`Element with ID "${containerId}" not found.`);
        return;
    }

    // Mevcut içeriği temizle
    productContainer.innerHTML = '';

    // Ürünleri döngüyle HTML'e ekle
    products.forEach(product => {
        const productHTML = `
            <div class="product-item">
                <div class="product-item-image">
                    <a href="product-details.html">
                        <img src="${product.image}" alt="${product.name}" class="img-fluid">
                    </a>
                    <div class="cart-icon">
                        <a href="#" class="add-to-cart" 
                           data-id="${product.id}" 
                           data-name="${product.name}" 
                           data-price="${product.price}" 
                           data-image="${product.image}"> <!-- Görseli data-image ile ekliyoruz -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.75" height="16.75" viewBox="0 0 16.75 16.75">
                                <g id="Your_Bag" data-name="Your Bag" transform="translate(0.75)">
                                    <g id="Icon" transform="translate(0 1)">
                                        <ellipse id="Ellipse_2" data-name="Ellipse 2" cx="0.682" cy="0.714" rx="0.682" ry="0.714" transform="translate(4.773 13.571)" fill="none" stroke="#1a2224" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                                        <ellipse id="Ellipse_3" data-name="Ellipse 3" cx="0.682" cy="0.714" rx="0.682" ry="0.714" transform="translate(12.273 13.571)" fill="none" stroke="#1a2224" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                                        <path id="Path_3" data-name="Path 3" d="M1,1H3.727l1.827,9.564a1.38,1.38,0,0,0,1.364,1.15h6.627a1.38,1.38,0,0,0,1.364-1.15L16,4.571H4.409" transform="translate(-1 -1)" fill="none" stroke="#1a2224" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="product-item-info">
                    <a href="product-details.html">${product.name}</a>
                    <span>$${product.price}</span> <del>$${product.oldPrice}</del>
                </div>
            </div>
        `;
        productContainer.innerHTML += productHTML;
    });

    // "Add to Cart" butonları için olayları bağla
    setupAddToCartButtons();
}

// "Add to Cart" butonlarına tıklama olaylarını bağlama
function setupAddToCartButtons() {
    const cartButtons = document.querySelectorAll('.add-to-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

            // Ürün bilgilerini al
            const productId = this.dataset.id;
            const productName = this.dataset.name;
            const productPrice = this.dataset.price;
            const productImage = this.dataset.image; // Görsel URL'sini alıyoruz
            // Sepete ekle
            addToCart(productId, productName, productPrice, productImage);

            // Kullanıcıya bilgi ver
            alert('Ürün sepete eklendi!');
        });
    });
}

// Ürünleri dinamik olarak render eden fonksiyon
function renderProducts(containerId, products) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with id "${containerId}" not found.`);
        return;
    }

    container.innerHTML = ''; // Mevcut içeriği temizle

    products.forEach(product => {
        const productHTML = `
            <div class="col-md-4 col-sm-6">
                <div class="product-item">
                    <div class="product-item-image">
                        <a href="product-details.html">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid">
                        </a>
                        <div class="cart-icon">
                            <a href="#" class="add-to-cart" 
                               data-id="${product.id}" 
                               data-name="${product.name}" 
                               data-price="${product.price}" 
                               data-image="${product.image}"> <!-- Görseli data-image ile ekliyoruz -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="16.75" height="16.75"
                                    viewBox="0 0 16.75 16.75">
                                    <g id="Your_Bag" data-name="Your Bag" transform="translate(0.75)">
                                        <g id="Icon" transform="translate(0 1)">
                                            <ellipse id="Ellipse_2" data-name="Ellipse 2" cx="0.682" cy="0.714"
                                                rx="0.682" ry="0.714" transform="translate(4.773 13.571)"
                                                fill="none" stroke="#1a2224" stroke-linecap="round"
                                                stroke-linejoin="round" stroke-width="1.5" />
                                            <ellipse id="Ellipse_3" data-name="Ellipse 3" cx="0.682" cy="0.714"
                                                rx="0.682" ry="0.714" transform="translate(12.273 13.571)"
                                                fill="none" stroke="#1a2224" stroke-linecap="round"
                                                stroke-linejoin="round" stroke-width="1.5" />
                                            <path id="Path_3" data-name="Path 3"
                                                d="M1,1H3.727l1.827,9.564a1.38,1.38,0,0,0,1.364,1.15h6.627a1.38,1.38,0,0,0,1.364-1.15L16,4.571H4.409"
                                                transform="translate(-1 -1)" fill="none" stroke="#1a2224"
                                                stroke-linecap="round"
                                                stroke-linejoin="round" stroke-width="1.5" />
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="product-item-info">
                        <a href="product-details.html">${product.name}</a>
                        <span>$${product.price}</span> <del>$${product.oldPrice}</del>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productHTML;
    });

    // Sepete ekleme olaylarını bağla
    setupAddToCart();
}

// Sepete ürün ekleme fonksiyonu

// "Add to Cart" butonlarına tıklama olayını bağlar
function setupAddToCart() {
    const cartButtons = document.querySelectorAll('.add-to-cart');

    cartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            const productId = this.dataset.id;
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price);
            const productImage = this.dataset.image; // Görsel URL'sini alıyoruz

            // Sepete ürün ekle
            addToCart(productId, productName, productPrice, productImage);

            alert('Ürün sepete eklendi!');
        });
    });
}
