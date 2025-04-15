# Deniz Güvenlik & Otomasyon Web Sitesi

Bu depo, Deniz Güvenlik & Otomasyon şirketi için tasarlanmış basit ve modern bir web sitesi içerir.

## İçerik

- Ana Sayfa
- Hizmetler Bölümü
- Video Galerisi (YouTube videoları)
- İletişim Formu ve Bilgileri

## Teknolojiler

- HTML5
- CSS3 (Özel tasarım, responsive layout)
- JavaScript (Vanilla JS, harici kütüphane kullanılmamıştır)
- Font Awesome ikonları

## Kurulum

1. Dosyaları web sunucunuza yükleyin.
2. `script.js` dosyasında YouTube video ID'lerini şirketin kendi YouTube videoları ile güncelleyin.
3. İsteğe bağlı olarak `styles.css` içindeki renkleri şirket renkleri ile uyumlu hale getirin.
4. Logo hazır olduğunda, HTML içindeki yorum satırlarını kaldırarak logoyu ekleyin.

## Özelleştirme İpuçları

### YouTube Videolarını Değiştirme

`script.js` dosyasında aşağıdaki array'i şirketin gerçek YouTube video ID'leri ile değiştirin:

```javascript
const videoIds = [
    'dQw4w9WgXcQ', // YouTube video ID'si
    'jNQXAC9IVRw', // YouTube video ID'si
    'C0DPdy98e4c'  // YouTube video ID'si
];
```

Video ID'leri, YouTube video URL'sinde `v=` parametresinden sonraki kısımdır.
Örnek: `https://www.youtube.com/watch?v=dQw4w9WgXcQ` -> Video ID: `dQw4w9WgXcQ`

### Renkleri Özelleştirme

Ana renkleri değiştirmek için `styles.css` dosyasındaki `:root` bölümünü düzenleyin:

```css
:root {
    --primary-color: #0056b3;   /* Ana renk */
    --secondary-color: #003a75; /* İkincil renk */
    --accent-color: #ff9800;    /* Vurgu rengi */
    /* Diğer renkler... */
}
```

### Logo Ekleme

Logo hazır olduğunda, `index.html` dosyasındaki ilgili bölümü düzenleyin:

```html
<div class="logo">
    <!-- Yorum satırını kaldırın ve logo dosya yolunu güncelleyin -->
    <img src="logo.png" alt="Deniz Güvenlik & Otomasyon Logo">
    <!-- <h1>Deniz Güvenlik & Otomasyon</h1> -->
</div>
```

## İletişim Formu

Şu anda iletişim formu statik olarak oluşturulmuştur. Gerçek bir sunucu tarafında işlenmesi için:

1. PHP ile: Bir `process-form.php` dosyası oluşturun ve `index.html` dosyasındaki form özelliğini `action="process-form.php"` olarak güncelleyin.
2. Bir form servisi kullanarak: Formspree, Netlify Forms gibi hizmetler kullanarak form verilerini e-posta olarak alabilirsiniz.

## Lisans

Bu web sitesi Deniz Güvenlik & Otomasyon'a özel olarak tasarlanmıştır ve tüm hakları saklıdır.

---

## Geliştirme Notları

Bu site statik HTML/CSS/JS kullanılarak oluşturulmuştur. İleriki aşamalarda:

1. SEO optimizasyonu yapılabilir
2. Daha fazla sayfa eklenebilir (Hakkımızda, SSS vb.)
3. Daha gelişmiş bir form işleme sistemi entegre edilebilir
4. Gerçek YouTube API entegrasyonu yapılarak videolar otomatik olarak çekilebilir 