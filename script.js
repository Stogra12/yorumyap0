document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. YILDIZ VE YORUM İŞLEMLERİ ---
    const stars = document.querySelectorAll('.star');
    const submitBtn = document.getElementById('submit-review');
    const commentText = document.getElementById('comment-text');
    const commentsList = document.getElementById('comments-list');
    let selectedRating = 0;

    if (stars.length > 0 && submitBtn) {
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
            
            // Yeni yorumu en üste ekle
            commentsList.prepend(div); 
            
            // Formu temizle
            commentText.value = ""; selectedRating = 0;
            stars.forEach(s => s.classList.remove('active'));
        });
    }

    // --- 2. GOOGLE MAPS ARAMA ---
    const searchInput = document.getElementById('searchInput');
    
    function searchLocation() {
        if (searchInput && searchInput.value.trim() !== "") {
            window.open(`http://googleusercontent.com/maps.google.com/?q=${encodeURIComponent(searchInput.value.trim())}`, '_blank');
            searchInput.value = '';
        } else {
            alert("Lütfen haritada aramak için bir mekan girin!");
        }
    }

    if (searchInput) {
        // Arama kutusundayken "Enter" tuşuna basıldığında çalıştır
        searchInput.addEventListener('keypress', e => { 
            if(e.key === 'Enter') searchLocation(); 
        });
    }

    // --- 3. AÇILIR FORM (MODAL) İŞLEMLERİ ---
    const openLogin = document.getElementById('openLogin');
    const loginModal = document.getElementById('loginModal');
    const pageOverlay = document.getElementById('pageOverlay');
    const closeBtns = document.querySelectorAll('.modal-close');

    function openModal(e) {
        if(e) e.preventDefault();
        if(loginModal && pageOverlay) {
            loginModal.classList.remove('hidden-element');
            pageOverlay.classList.remove('hidden-element');
        }
    }

    function closeModal() {
        if(loginModal && pageOverlay) {
            loginModal.classList.add('hidden-element');
            pageOverlay.classList.add('hidden-element');
        }
    }

    if (openLogin) openLogin.addEventListener('click', openModal);
    if (pageOverlay) pageOverlay.addEventListener('click', closeModal);
    
    if (closeBtns.length > 0) {
        closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
    }
    
    // --- 4. SİTE AÇILIŞ UYARISI ---
    alert("Hazırlayan: Emirhan Tuğra Balcı -- 257351060\nYerGez Premium'a Hoş Geldiniz!");
});
