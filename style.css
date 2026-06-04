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
