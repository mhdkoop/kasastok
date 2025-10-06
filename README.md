# Kasa Stok Yönetim Sistemi

Modern ve kullanıcı dostu bir kasa-stok yönetim uygulaması. React ile geliştirilmiş, dinamik fiyatlandırma algoritması ve gerçek zamanlı hesaplamalar sunar.

## 🚀 Özellikler

- **Dinamik Fiyatlandırma**: Gelişmiş algoritma ile otomatik fiyat hesaplama
- **Gerçek Zamanlı Takip**: Anlık AP ve IP durumu görüntüleme
- **Parametre Yönetimi**: Sistem parametrelerini canlı olarak değiştirme
- **Toplu İşlemler**: Çoklu alış/satış işlemleri
- **Kar Yönetimi**: Esnek kar ekleme sistemi
- **Modern UI**: Responsive ve kullanıcı dostu arayüz

## 📋 Sistem Gereksinimleri

- Node.js 14.0 veya üzeri
- npm 6.0 veya üzeri
- Modern web tarayıcısı

## 🛠️ Kurulum

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/mhdkoop/kasastok.git
cd kasastok
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Uygulamayı başlatın:**
```bash
npm start
```

4. **Tarayıcınızda açın:**
```
http://localhost:3000
```

## 📖 Kullanım Kılavuzu

### İlk Kurulum

1. **Başlangıç Parametreleri:**
   - `a`: Sistem katsayısı (tamsayı)
   - `İP0`: Başlangıç IP pozisyonu
   - `f0`: Başlangıç fiyatı
   - `İPmax`: Maksimum IP adedi
   - `faltın`: Kar hesaplama parametresi

2. **"Sistemi Başlat" butonuna tıklayın**

### Ana Ekran Bileşenleri

#### 🔍 Durum Bilgileri
- **Kasadaki AP Miktarı**: Mevcut AP bakiyesi
- **Kasadaki İP sayısı**: Eldeki IP adedi
- **Satılan İP sayısı**: Satılmış IP adedi
- **IP0**: Başlangıç IP pozisyonu
- **AP0**: Tetikleme anındaki AP değeri
- **Tetikleme Durumu**: Sistem durumu (Aktif/Pasif)
- **fkar**: Toplam kar miktarı
- **Toplam Harcanan AP**: Harcanan toplam AP
- **a Katsayısı**: Güncel sistem katsayısı
- **faltın**: Güncel kar parametresi

#### ⚙️ Parametre Ayarları
- **a Katsayısı**: Sistem hesaplamalarında kullanılan katsayı
- **faltın**: Kar hesaplamalarında kullanılan değer
- **APharcanan**: Otomatik olarak AP'den düşülen miktar

#### 🎯 İşlemler

**Tekli İşlemler:**
- **Alış**: Tek IP alımı (fiyat üstte gösterilir)
- **Satış**: Tek IP satışı (fiyat üstte gösterilir)

**Toplu İşlemler:**
- **Toplu Alış**: Çoklu IP alımı (toplam fiyat gösterilir)
- **Toplu Satış**: Çoklu IP satışı (toplam fiyat gösterilir)

**Kar Ekleme:**
- `ftl` alanına kar miktarını girin
- "Kar Ekle" butonuna tıklayın
- Sistem otomatik olarak kar'ı hesaplar ve ekler
- `ftl` alanı sıfırlanır, yeni kar girişi yapılabilir

### 🔄 Sistem Mantığı

#### Tetikleme Sistemi
- **Koşul**: `IPsatılan = IP0` olduğunda tetiklenir
- **Sonuç**: Dinamik fiyat hesaplaması aktif olur
- **Öncesi**: Sabit `f0` fiyatı kullanılır
- **Sonrası**: Algoritma ile hesaplanan fiyatlar kullanılır

#### Fiyat Hesaplama
```
Pozitif Döngü: IP0+1, IP0+2, ... IPmax-1
Negatif Döngü: IP0-1, IP0-2, ... 0

Formül: (a × (AP/AP0) + (IP/IP)) / ((AP/AP0) + (a × (IP/IP)))
```

#### Kar Hesaplama
```
yeniFkar = (ftl / faltın) / (IPmax - IP)
toplamFkar = mevcutFkar + yeniFkar
```

### 💡 Kullanım İpuçları

1. **Başlangıç Ayarları**: Dikkatli seçin, sistem başladıktan sonra sadece `a` ve `faltın` değiştirilebilir
2. **Tetikleme**: IP0 değerine ulaştığınızda sistem otomatik tetiklenir
3. **Kar Ekleme**: Birden fazla kez kar ekleyebilirsiniz, tümü birikimlidir
4. **Sınır Durumlar**: IP=0'da satış, IP=IPmax'da alış yapılamaz
5. **Parametre Değişimi**: Canlı olarak `a` ve `faltın` değerlerini değiştirebilirsiniz

### 🎨 Arayüz Özellikleri

- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Gerçek Zamanlı**: Tüm değerler anlık güncellenir
- **Görsel Geri Bildirim**: Buton durumları ve fiyat gösterimleri
- **Kolay Navigasyon**: Mantıklı gruplandırma ve düzen

## 🔧 Geliştirme

### Mevcut Komutlar

```bash
npm start          # Geliştirme sunucusunu başlat
npm test           # Testleri çalıştır
npm run build      # Üretim için derle
npm run eject      # Create React App yapılandırmasını çıkar
```

### Proje Yapısı

```
kasastok/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.tsx        # Ana uygulama bileşeni
│   ├── App.css        # Stil dosyası
│   ├── index.tsx      # Giriş noktası
│   └── ...
├── package.json
└── README.md
```

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📞 İletişim

Proje Sahibi: [@mhdkoop](https://github.com/mhdkoop)

Proje Linki: [https://github.com/mhdkoop/kasastok](https://github.com/mhdkoop/kasastok)

## 🙏 Teşekkürler

- Muhteşem Süleyman'a hürmetlerimizle

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
