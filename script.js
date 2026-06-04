// --- 1. YILDIZ PUANLAMA VE YORUM EKLEME ---
const stars = document.querySelectorAll('.star');
const submitBtn = document.getElementById('submit-review');
const commentText = document.getElementById('comment-text');
const commentsList = document.getElementById('comments-list');
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = this.getAttribute('data-value');
        stars.forEach(s => {
            if (s.getAttribute('data-value') <= selectedRating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
});

submitBtn.addEventListener('click', function() {
    const text = commentText.value.trim();
    if (selectedRating === 0) {
        alert("Lütfen bir puan verin!");
        return;
    }
    if (text === "") {
        alert("Lütfen bir yorum yazın!");
        return;
    }
    let starIcons = "★".repeat(selectedRating) + "☆".repeat(5 - selectedRating);
    const newCommentBlock = document.createElement('div');
    newCommentBlock.classList.add('single-comment');
    newCommentBlock.innerHTML = `
        <div class="comment-stars">${starIcons}</div>
        <p><strong>Ziyaretçi:</strong> ${text}</p>
    `;
    commentsList.appendChild(newCommentBlock);
    commentText.value = "";
    selectedRating = 0;
    stars.forEach(s => s.classList.remove('active'));
});

// --- 2. GOOGLE MAPS ARAMA İŞLEMİ ---
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function searchLocation() {
    const query = searchInput.value.trim(); 
    if (query !== "") {
        const mapsUrl = `http://googleusercontent.com/maps.google.com/?q=${encodeURIComponent(query)}`;
        window.open(mapsUrl, '_blank');
        searchInput.value = '';
    } else {
        alert("Lütfen aramak için bir mekan veya şehir adı girin!");
    }
}

if(searchBtn && searchInput) {
    searchBtn.addEventListener('click', searchLocation);
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchLocation();
        }
    });
}

// --- 3. HAMBURGER MENÜ VE AÇILIR FORMLAR (MODALS) ---
const hamburgerBtn = document.getElementById('hamburgerBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const modalOverlay = document.getElementById('modalOverlay');
const closeBtns = document.querySelectorAll('.modal-close');

if(hamburgerBtn && dropdownMenu) {
    // Hamburger Menüyü Aç/Kapat
    hamburgerBtn.addEventListener('click', function() {
        dropdownMenu.classList.toggle('hidden-menu');
    });
}

// Formları açan fonksiyon
function openModal(linkId, modalId) {
    const linkElement = document.getElementById(linkId);
    if(linkElement) {
        linkElement.addEventListener('click', function(e) {
            e.preventDefault(); 
            document.getElementById(modalId).classList.remove('hidden-modal');
            modalOverlay.classList.remove('hidden-modal');
            dropdownMenu.classList.add('hidden-menu'); 
        });
    }
}

// Butonları ve formları eşleştir
openModal('openLogin', 'loginModal');
openModal('openRegister', 'registerModal');
openModal('openFeedback', 'feedbackModal');

// Formları kapatma işlemi
function closeAllModals() {
    document.querySelectorAll('.modal-box').forEach(modal => modal.classList.add('hidden-modal'));
    if(modalOverlay) modalOverlay.classList.add('hidden-modal');
}

closeBtns.forEach(btn => btn.addEventListener('click', closeAllModals));
if(modalOverlay) modalOverlay.addEventListener('click', closeAllModals);
