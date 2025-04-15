// DOM yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // YouTube videolarını yükle
    loadYouTubeVideos();
    
    // İletişim formunu yakala
    setupContactForm();
    
    // Menü bağlantılarına yumuşak kaydırma ekle
    setupSmoothScrolling();
    
    // Yılı otomatik güncelle
    updateCopyrightYear();
    
    // Lazyload fonksiyonunu çağır
    setupLazyLoading();
});

// YouTube videolarını yükleyen fonksiyon
function loadYouTubeVideos() {
    const videosContainer = document.getElementById('youtube-videos');
    
    if (!videosContainer) return;
    
    // YouTube kanal ID'si (DenizHayati kanalı)
    const channelId = 'UCZMWkTqe3gVSHbxJpuKQuXQ'; // @DenizHayati kanalı ID'si
    
    // YouTube Data API kullanılarak son videoları çek
    fetchLatestVideos(channelId, videosContainer);
}

// YouTube API kullanarak son videoları çeken fonksiyon
async function fetchLatestVideos(channelId, container) {
    try {
        // Önce statik videoları göster (yükleme durumunda gösterilecek)
        showStaticVideos(container);
        
        // Güncel video ID'lerini manuel olarak ekleyelim
        const latestVideoIds = [
            'g8lh7sirMeo',
            'CdgCe7qGD3U',
            'lec3gCP2kqk',
            'zFSXgHcN9Co',
            'ODDHbxOgctU'
        ];

        // Video başlıklarını dinamik olarak çek
        const videoDetails = await fetchVideoDetails(latestVideoIds);
        
        // Video detaylarıyla göster
        updateVideosWithDetails(container, videoDetails);
    } catch (error) {
        console.error('YouTube videoları yüklenirken hata oluştu:', error);
        // Hata durumunda statik videoları göster (zaten showStaticVideos fonksiyonu çağrıldı)
        updateLatestVideos(container); // Yedek olarak manuel video bilgileri
    }
}

// Video detaylarını çeken fonksiyon
async function fetchVideoDetails(videoIds) {
    try {
        // Her video ID'si için Oembedapi.com kullanarak detayları çek
        const videoDetails = await Promise.all(
            videoIds.map(async (videoId) => {
                try {
                    // Oembed API üzerinden video başlığı çekme
                    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
                    
                    if (response.ok) {
                        const data = await response.json();
                        return {
                            id: videoId,
                            title: data.title,
                            author_name: data.author_name,
                            publishDate: new Date().toLocaleDateString('tr-TR') // Gerçek tarih API'de yok, şimdilik bugünü kullan
                        };
                    } else {
                        throw new Error('Oembed API yanıt vermedi');
                    }
                } catch (err) {
                    console.warn(`Video ID ${videoId} için detaylar çekilemedi:`, err);
                    // Hata durumunda varsayılan değerler
                    return {
                        id: videoId,
                        title: `YouTube Video ${videoId}`,
                        author_name: '@DenizHayati',
                        publishDate: new Date().toLocaleDateString('tr-TR')
                    };
                }
            })
        );
        
        return videoDetails;
    } catch (error) {
        console.error('Video detayları çekilirken hata oluştu:', error);
        // Hata durumunda boş dizi döndür
        return [];
    }
}

// Çekilen video detayları ile videoları göster
function updateVideosWithDetails(container, videoDetails) {
    // Container içeriğini temizle
    container.innerHTML = '';
    
    // Eğer detay bulunamadıysa yedek fonksiyonu çağır
    if (!videoDetails || videoDetails.length === 0) {
        updateLatestVideos(container);
        return;
    }
    
    // Video detaylarını kullanarak videoları göster
    videoDetails.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.setAttribute('data-index', index);
        
        videoItem.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${video.id}" 
                title="YouTube Video: ${video.title}" 
                frameborder="0" 
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
            <div class="video-info">
                <h3>${video.title}</h3>
         
                <p>YouTube kanalımız: <a href="https://www.youtube.com/@DenizHayati" target="_blank">@DenizHayati</a></p>
            </div>
        `;
        
        container.appendChild(videoItem);
    });
}

// Güncel YouTube videoları (manuel olarak güncellenecek)
function updateLatestVideos(container) {
    // En son bilinen güncel videolar (periyodik olarak güncellenebilir)
    const latestVideoIds = [
        'g8lh7sirMeo',
        'CdgCe7qGD3U',
        'lec3gCP2kqk',
        'zFSXgHcN9Co',
        'ODDHbxOgctU'
    ];
    
    const latestVideoTitles = [
        'İntel Teknoloji Tanıtım',
        'Deniz Güvenlik & Otomasyon Hizmetleri',
        'Profesyonel TV Tamir Hizmetlerimiz',
        'Otomatik Kapı Sistemleri Kurulumu',
        'Güvenlik Sistemleri Çözümleri'
    ];
    
    const publishDates = [
        '10 Mayıs 2023',
        '5 Nisan 2023',
        '20 Mart 2023',
        '15 Şubat 2023',
        '1 Şubat 2023'
    ];
    
    // Container içeriğini temizle
    container.innerHTML = '';
    
    // En son videoları göster
    latestVideoIds.forEach((videoId, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.setAttribute('data-index', index);
        
        videoItem.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${videoId}" 
                title="YouTube Video: ${latestVideoTitles[index]}" 
                frameborder="0" 
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
            <div class="video-info">
                <h3>${latestVideoTitles[index]}</h3>
                <p><small>${publishDates[index]} tarihinde yayınlandı</small></p>
                <p>YouTube kanalımız: <a href="https://www.youtube.com/@DenizHayati" target="_blank">@DenizHayati</a></p>
            </div>
        `;
        
        container.appendChild(videoItem);
    });
}

// API başarısız olursa veya bağlantı yoksa kullanılacak statik video listesi
function showStaticVideos(container) {
    // Güncel video ID'leri
    const videoIds = [
        'g8lh7sirMeo',
        'CdgCe7qGD3U', 
        'lec3gCP2kqk',
        'zFSXgHcN9Co',
        'ODDHbxOgctU'
    ];
    
    // Video başlıkları (varsayılan, gerçek başlıklar API'den gelecek)
    const videoTitles = [
        'Bft BTA 600 motor dişli değişimi detaylı',
        'Bft Clonix Hafıza Silme',
        'Bft Switch Kasası',
        'Bft Bt A600 Bağlantı ve Ayar',
        'Nice Robo Rox Güzel bir Özellik'
    ];
    
    // Container içeriğini temizle
    container.innerHTML = '';
    
    // Her video için bir video kartı oluştur
    videoIds.forEach((videoId, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.setAttribute('data-index', index);
        
        videoItem.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${videoId}" 
                title="YouTube Video: ${videoTitles[index]}" 
                frameborder="0" 
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
            <div class="video-info">
                <h3>${videoTitles[index]}</h3>
                <p>YouTube kanalımız: <a href="https://www.youtube.com/@DenizHayati" target="_blank">@DenizHayati</a></p>
            </div>
        `;
        
        container.appendChild(videoItem);
    });
}

// İletişim formunu ayarla
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Basit form doğrulama
            if (!name || !email || !message) {
                alert('Lütfen tüm zorunlu alanları doldurun.');
                return;
            }
            
            // E-posta formatını kontrol et
            if (!isValidEmail(email)) {
                alert('Lütfen geçerli bir e-posta adresi girin.');
                return;
            }
            
            // Gerçek uygulamada burada bir e-posta göndermek veya 
            // sunucuya form verilerini göndermek için AJAX kullanılabilir
            
            // Şimdilik sadece bir onay mesajı gösterelim
            alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.');
            contactForm.reset();
        });
    }
}

// E-posta formatını doğrula
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sayfa içi yumuşak kaydırma
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Header yüksekliği için ayar
                    behavior: 'smooth'
                });
                
                // Tarayıcı geçmişini URL ile güncelle (opsiyonel)
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Telif hakkı yılını güncelle
function updateCopyrightYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Görseller için lazy loading
function setupLazyLoading() {
    // Modern tarayıcılar loading="lazy" özelliğini destekler
    // Eski tarayıcılar için ek bir lazy loading çözümü
    if ('IntersectionObserver' in window) {
        const lazyElements = document.querySelectorAll('[data-src]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.src = element.dataset.src;
                    observer.unobserve(element);
                }
            });
        });
        
        lazyElements.forEach(el => observer.observe(el));
    }
}

// Sayfa yükleme animasyonunu yönet
window.addEventListener('load', function() {
    // Sayfa tamamen yüklendiğinde animasyonları göster
    document.body.classList.add('loaded');
    
    // Sayfanın performans metriklerini topla (opsiyonel)
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Sayfa yükleme süresi: ${pageLoadTime}ms`);
    }
});

// Yukarı çık butonu için işlevsellik
// Eklenebilir özellik - şu anda HTML'de yok
function setupScrollToTopButton() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Sayfanın üstüne çık');
    document.body.appendChild(scrollTopBtn);
    
    // Butonun görünürlüğünü kaydırma pozisyonuna göre yönet
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    // Butona tıklandığında sayfanın en üstüne çık
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
} 