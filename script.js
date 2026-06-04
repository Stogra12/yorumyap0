document.addEventListener('DOMContentLoaded', function() {
    
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
                if (s.getAttribute('data-value') <= selectedRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    submitBtn.addEventListener('click', function() {
        if (selectedRating === 0 || commentText.value.trim() === "") {
            alert("Lütfen puan verin ve yorum yazın!");
            return;
        }
        let starIcons = "★".repeat(selectedRating) + "☆".repeat(5 - selectedRating);
        const newCommentBlock = document.createElement('div');
        newCommentBlock.classList.add('single-comment');
        newCommentBlock.innerHTML = `<div class="comment-stars">${starIcons}</div><p><strong>Ziyaretçi:</strong> ${commentText.value}</p>`;
        commentsList.appendChild(newCommentBlock);
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

    // 3. MENÜ VE POP-UP İŞLEMLERİ
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const modalOverlay = document.getElementById('modalOverlay');

    hamburgerBtn.addEventListener('click', function() {
        dropdownMenu.classList.toggle('hidden-menu');
    });

    function setupModal(btnId, modalId) {
        document.getElementById(btnId).addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById(modalId).classList.remove('hidden-modal');
            modalOverlay.classList.remove('hidden-modal');
            dropdownMenu.classList.add('hidden-menu');
        });
    }

    setupModal('openLogin', 'loginModal');
    setupModal('openRegister', 'registerModal');
    setupModal('openFeedback', 'feedbackModal');

    function closeModals() {
        document.querySelectorAll('.modal-box').forEach(m => m.classList.add('hidden-modal'));
        modalOverlay.classList.add('hidden-modal');
    }

    document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', closeModals));
    modalOverlay.addEventListener('click', closeModals);
});
