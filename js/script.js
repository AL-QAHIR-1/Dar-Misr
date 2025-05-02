// تغيير وضع الإضاءة
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('night-mode');
    themeToggle.textContent = body.classList.contains('night-mode') ? '☀️' : '🌙';
    
    // تغيير الصور حسب الوضع
    const heroImage = document.querySelector('.hero-image');
    if(body.classList.contains('night-mode')) {
        heroImage.style.backgroundImage = "url('compound-night.jpg')";
    } else {
        heroImage.style.backgroundImage = "url('compound-day.jpg')";
    }
});

// تسجيل الدخول
const loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', () => {
    showLoginModal();
});

function showLoginModal() {
    // إنشاء عنصر النافذة المنبثقة
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>تسجيل الدخول</h3>
            <div class="user-type-selector">
                <button class="user-type-btn active" data-type="owner">مالك</button>
                <button class="user-type-btn" data-type="tenant">مستأجر</button>
            </div>
            
            <form id="login-form">
                <div class="form-group">
                    <label for="name">الاسم بالكامل</label>
                    <input type="text" id="name" required>
                </div>
                
                <div class="form-group">
                    <label for="building">رقم العمارة</label>
                    <input type="number" id="building" required>
                </div>
                
                <div class="form-group">
                    <label for="apartment">رقم الشقة</label>
                    <input type="number" id="apartment" required>
                </div>
                
                <div class="form-group" id="document-field">
                    <label for="documents">تحميل الأوراق الثبوتية</label>
                    <input type="file" id="documents" required>
                </div>
                
                <button type="submit" class="submit-btn">إرسال الطلب</button>
            </form>
            
            <p class="modal-note">سيتم مراجعة طلبك من قبل الإدارة وتفعيل الحساب خلال 24 ساعة</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // تغيير نوع المستخدم
    const userTypeBtns = modal.querySelectorAll('.user-type-btn');
    userTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            userTypeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const docField = modal.querySelector('#document-field');
            if(btn.dataset.type === 'tenant') {
                docField.innerHTML = `
                    <label for="documents">تحميل عقد الإيجار</label>
                    <input type="file" id="documents" required>
                `;
            } else {
                docField.innerHTML = `
                    <label for="documents">تحميل الأوراق الثبوتية</label>
                    <input type="file" id="documents" required>
                `;
            }
        });
    });
    
    // إغلاق النافذة
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // إرسال النموذج
    modal.querySelector('#login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // هنا كود إرسال البيانات إلى الخادم
        alert('تم إرسال طلب التسجيل بنجاح، سيتم التواصل معك بعد المراجعة');
        document.body.removeChild(modal);
    });
}

// توليد كروت العمارات
function generateBuildingCards() {
    const buildingsContainer = document.querySelector('.buildings-showcase');
    
    // بيانات العمارات (سيتم جلبها من قاعدة البيانات في الواقع)
    const buildings = [
        { id: 1, name: 'العمارة 1', apartments: 24, image: 'building1.jpg' },
        { id: 2, name: 'العمارة 2', apartments: 24, image: 'building2.jpg' },
        { id: 3, name: 'العمارة 3', apartments: 24, image: 'building3.jpg' },
        // ... يمكن إضافة المزيد
    ];
    
    buildings.forEach((building, index) => {
        const card = document.createElement('div');
        card.className = 'building-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <img src="${building.image}" alt="${building.name}">
            <div class="card-info">
                <h4>${building.name}</h4>
                <p>عدد الشقق: ${building.apartments}</p>
                <button class="view-btn" data-building="${building.id}">عرض الشقق</button>
            </div>
        `;
        
        buildingsContainer.appendChild(card);
    });
    
    // زر "تصفح المزيد"
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.className = 'load-more-btn';
    loadMoreBtn.textContent = 'تصفح المزيد';
    buildingsContainer.appendChild(loadMoreBtn);
    
    loadMoreBtn.addEventListener('click', () => {
        // في الواقع، هنا سيتم جلب المزيد من البيانات من الخادم
        alert('سيتم تحميل المزيد من العمارات');
    });
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    generateBuildingCards();
});
document.addEventListener('keydown', function(e) {
    if(e.key === 'PrintScreen') {
        e.preventDefault();
        alert('غير مسموح بأخذ لقطات شاشة من هذه الصفحة');
    }
});
// صور الجاردن والباركنج
const images = [
    "images/جاردن 1.jpg",
    "images/جاردن 2.jpg",
    "images/جاردن 3.jpg",
    "images/جاردن 4.jpg",
  ];
  
  let currentIndex = 0;
  const sliderImage = document.getElementById("sliderImage");
  
  function showImage(index) {
    sliderImage.src = images[index];
  }
  
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }
  
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }
  
  // تشغيل تلقائي كل 5 ثواني
  setInterval(nextImage, 5000);
  
  function toggleCitizenMenu() {
    const list = document.getElementById('citizenList');
    const arrow = document.getElementById('arrow');
  
    if (list.classList.contains('hidden')) {
      list.classList.remove('hidden');
      arrow.style.transform = 'rotate(180deg)'; // السهم يتقلب للأعلى
    } else {
      list.classList.add('hidden');
      arrow.style.transform = 'rotate(0deg)'; // السهم يرجع للأسفل
    }
  }
  