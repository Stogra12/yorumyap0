window.onload = function() {
    alert("Emirhan Tuğra Balcı -- 257351060");
};
// Gerekli HTML elemanlarını seçiyoruz
const stars = document.querySelectorAll('.star');
const submitBtn = document.getElementById('submit-review');
const commentText = document.getElementById('comment-text');
const commentsList = document.getElementById('comments-list');

let selectedRating = 0; // Başlangıçta puan 0

// 1. YILDIZLARA TIKLAMA İŞLEMİ
stars.forEach(star => {
    star.addEventListener('click', function() {
        // Tıklanan yıldızın değerini al (1 ile 5 arası)
        selectedRating = this.getAttribute('data-value');
        
        // Tüm yıldızları temizle ve seçilen değere kadar olanları sarıya boya
        stars.forEach(s => {
            if (s.getAttribute('data-value') <= selectedRating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
});

// 2. YORUM GÖNDERME İŞLEMİ
submitBtn.addEventListener('click', function() {
    const text = commentText.value.trim();

    // Kullanıcı puan vermediyse veya yazı yazmadıysa uyar
    if (selectedRating === 0) {
        alert("Lütfen bir puan verin!");
        return;
    }
    if (text === "") {
        alert("Lütfen bir yorum yazın!");
        return;
    }

    // Puanı yıldız ikonlarına (★) çevirme
    let starIcons = "★".repeat(selectedRating) + "☆".repeat(5 - selectedRating);

    // Yeni yorum için bir HTML bloğu (div) oluşturma
    const newCommentBlock = document.createElement('div');
    newCommentBlock.classList.add('single-comment');
    
    newCommentBlock.innerHTML = `
        <div class="comment-stars">${starIcons}</div>
        <p><strong>Ziyaretçi:</strong> ${text}</p>
    `;

    // Yeni yorumu listenin en üstüne ekle
    commentsList.appendChild(newCommentBlock);

    // Formu sıfırla (Bir sonraki yorum için hazırlık)
    commentText.value = "";
    selectedRating = 0;
    stars.forEach(s => s.classList.remove('active'));
});
// --- GOOGLE MAPS ARAMA İŞLEMİ ---
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function searchLocation() {
    const query = searchInput.value.trim(); 
    
    if (query !== "") {
        // Doğru ve Resmi Google Maps Arama Linki
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
        
        // Linki yeni bir sekmede aç
        window.open(mapsUrl, '_blank');
        
        // Aradıktan sonra kutuyu temizle
        searchInput.value = '';
    } else {
        alert("Lütfen aramak için bir mekan veya şehir adı girin!");
    }
}

// "Ara" butonuna tıklanınca çalıştır
searchBtn.addEventListener('click', searchLocation);

// Arama kutusundayken klavyeden "Enter" tuşuna basılınca çalıştır
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchLocation();
    }
});
// --- HAMBURGER MENÜ VE POP-UP İŞLEMLERİ ---
const hamburgerBtn = document.getElementById('hamburgerBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const modalOverlay = document.getElementById('modalOverlay');
const closeBtns = document.querySelectorAll('.modal-close');

// 1. Hamburger Menüyü Aç/Kapat
hamburgerBtn.addEventListener('click', function() {
    dropdownMenu.classList.toggle('hidden-menu');
});

// 2. Tıklanan linke göre ilgili pop-up formunu açma
function openModal(linkId, modalId) {
    document.getElementById(linkId).addEventListener('click', function(e) {
        e.preventDefault(); // Linkin sayfayı yenilemesini engelle
        document.getElementById(modalId).classList.remove('hidden-modal');
        modalOverlay.classList.remove('hidden-modal');
        dropdownMenu.classList.add('hidden-menu'); // Form açılınca menüyü gizle
    });
}

openModal('openLogin', 'loginModal');
openModal('openRegister', 'registerModal');
openModal('openFeedback', 'feedbackModal');

// 3. Formları kapatma (Kapat butonuna veya arka plan karanlığına basınca)
function closeAllModals() {
    document.querySelectorAll('.modal-box').forEach(modal => modal.classList.add('hidden-modal'));
    modalOverlay.classList.add('hidden-modal');
}

closeBtns.forEach(btn => btn.addEventListener('click', closeAllModals));
modalOverlay.addEventListener('click', closeAllModals);
