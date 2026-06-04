// --- SİTE AÇILIŞ UYARISI ---
window.addEventListener('load', function() {
    alert("Hazırlayan: Emirhan Tuğra Balcı -- 257351060\nYerGez'e Hoş Geldiniz!");
});
// 1. YILDIZ VE YORUM İŞLEMLERİ
const stars = document.querySelectorAll('.star');
const submitBtn = document.getElementById('submit-review');
const commentText = document.getElementById('comment-text');
const commentsList = document.getElementById('comments-list');
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = this.getAttribute('data-value');
        stars.forEach(s => {
            s.classList.toggle('active', s.getAttribute('data-value') <= selectedRating);
        });
    });
});

submitBtn.addEventListener('click', function() {
    if (selectedRating === 0 || commentText.value.trim() === "") {
        alert("Lütfen puan verin ve yorum yazın!");
        return;
    }
    let starIcons = "★".repeat(selectedRating) + "☆".repeat(5 - selectedRating);
    const div = document.createElement('div');
    div.className = 'single-comment';
    div.innerHTML = `<div class="comment-stars">${starIcons}</div><p><strong>Ziyaretçi:</strong> ${commentText.value}</p>`;
    commentsList.appendChild(div);
    commentText.value = ""; selectedRating = 0;
    stars.forEach(s => s.classList.remove('active'));
});

// 2. GOOGLE MAPS ARAMA
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function searchLocation() {
    if (searchInput.value.trim() !== "") {
        window.open(`http://googleusercontent.com/maps.google.com/?q=${encodeURIComponent(searchInput.value.trim())}`, '_blank');
        searchInput.value = '';
    } else {
        alert("Lütfen bir yer girin!");
    }
}
searchBtn.addEventListener('click', searchLocation);
searchInput.addEventListener('keypress', e => { if(e.key === 'Enter') searchLocation(); });

// 3. YANDAN AÇILAN MENÜ VE FORMLAR (MODALS)
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sideMenu = document.getElementById('sideMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const pageOverlay = document.getElementById('pageOverlay');

// Menüyü Aç
hamburgerBtn.addEventListener('click', () => {
    sideMenu.classList.add('open');
    pageOverlay.classList.remove('hidden-element');
});

// Her Şeyi Kapat (Menü ve Formlar)
function closeAll() {
    sideMenu.classList.remove('open');
    pageOverlay.classList.add('hidden-element');
    document.querySelectorAll('.modal-box').forEach(m => m.classList.add('hidden-element'));
}

closeMenuBtn.addEventListener('click', closeAll);
pageOverlay.addEventListener('click', closeAll);
document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', closeAll));

// Formları Açan Fonksiyon
function setupFormLink(linkId, modalId) {
    document.getElementById(linkId).addEventListener('click', (e) => {
        e.preventDefault();
        sideMenu.classList.remove('open'); // Menüyü gizle
        document.getElementById(modalId).classList.remove('hidden-element'); // Formu göster
    });
}

setupFormLink('openLogin', 'loginModal');
setupFormLink('openRegister', 'registerModal');
setupFormLink('openFeedback', 'feedbackModal');
