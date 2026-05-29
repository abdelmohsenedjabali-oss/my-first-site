// 1. ميزة تبديل مظهر المتجر البنفسجي وتحديد الصفحة النشطة تلقائياً
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = {
        'index.html': 'nav-index',
        'products.html': 'nav-products',
        'cart.html': 'nav-cart',
        'about.html': 'nav-about'
    };
    
    const activeLinkId = navLinks[currentPage];
    if (activeLinkId) {
        const activeLink = document.getElementById(activeLinkId);
        if (activeLink) activeLink.classList.add('active');
    }

    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-purple');
            themeBtn.textContent = document.body.classList.contains('dark-purple') ? "الوضع الفاتح" : "تغيير النمط";
        });
    }

    // 2. كود قراءة المنتج من الرابط وعرضه داخل صفحة السلة (cart.html)
    const cartItemsList = document.getElementById('cart-items-list');
    const totalPriceAmount = document.getElementById('total-price-amount');
    
    if (cartItemsList) {
        // قراءة اسم المنتج من الرابط (URL Parameters)
        const urlParams = new URLSearchParams(window.location.search);
        const productName = urlParams.get('item');
        
        const prices = {
            'معطف شتوي أنيق': 150,
            'قميص قطني كاجوال': 45,
            'فستان سهرة عصري': 200,
            'بنطال جينز كلاسيك': 60,
            'حذاء رياضي مريح': 85
        };

        if (productName && prices[productName]) {
            cartItemsList.innerHTML = `
                <div class="cart-item-row">
                    <span>${productName}</span>
                    <strong>${prices[productName]} د.أ</strong>
                </div>
            `;
            totalPriceAmount.textContent = `${prices[productName]} د.أ`;
        }
    }
});

// 3. دالة الانتقال المباشر للسلة عند الضغط على "إضافة للسلة"
function addToCart(productName) {
    // الانتقال لصفحة السلة مع إرسال اسم المنتج في الرابط
    window.location.href = `cart.html?item=${encodeURIComponent(productName)}`;
}

// 4. معالجة وتأكيد طلب الشراء النهائي للزبون
function submitOrder(event) {
    event.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('item');
    
    if (!productName) {
        alert("سلتك فارغة! يرجى العودة لصفحة المنتجات واختيار قطعة ملابس أولاً.");
        return;
    }

    alert("🎉 شكراً لثقتكم بمتجر أورا! تم استقبال معلوماتكم وتأكيد طلب الشراء بنجاح، وسيتم الشحن قريباً.");
    window.location.href = 'index.html'; 
}
