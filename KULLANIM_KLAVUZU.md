# 📖 Kasa Stok Yönetim Sistemi - Kullanım Kılavuzu

Bu kılavuz, Kasa Stok Yönetim Sistemi'ni etkili bir şekilde kullanmanız için hazırlanmıştır.

## 🚀 Hızlı Başlangıç

### 1. Sistem Kurulumu

**İlk Açılış:**
- Uygulama açıldığında "Başlangıç Değerleri" ekranı görünür
- Tüm alanları dikkatli bir şekilde doldurun
- Bu değerler sistem başladıktan sonra değiştirilemez (sadece `a` ve `faltın` hariç)

**Gerekli Parametreler:**

| Parametre | Açıklama | Örnek Değer |
|-----------|----------|-------------|
| `a` | Sistem katsayısı (tamsayı) | 2 |
| `İP0` | Başlangıç IP pozisyonu | 1000 |
| `f0` | Başlangıç fiyatı | 180 |
| `İPmax` | Maksimum IP adedi | 1200 |
| `faltın` | Kar hesaplama parametresi | 5000 |

### 2. "Sistemi Başlat" Butonuna Tıklayın

Sistem başladıktan sonra ana ekrana yönlendirilirsiniz.

---

## 🎯 Ana Ekran Rehberi

### Sol Taraf: Bilgi Panelleri

#### 📊 Durum Bilgileri
```
┌─────────────────────────────────────┐
│ Kasadaki AP Miktarı: 36000.0000     │
│ Kasadaki İP sayısı: 200             │
│ Satılan İP sayısı: 1000             │
│ IP0: 1000                           │
│ AP0: 36000.00                       │
│ Tetikleme Durumu: Aktif             │
│ fkar: 0.00                          │
│ Toplam Harcanan AP: 144000.0000     │
│ a Katsayısı: 2                      │
│ faltın: 5000                        │
└─────────────────────────────────────┘
```

**Önemli Bilgiler:**
- **Tetikleme Durumu**: "Aktif" olduğunda dinamik fiyatlandırma çalışır
- **IP0**: Tetikleme noktası (IPsatılan = IP0 olduğunda tetiklenir)
- **AP0**: Tetikleme anındaki AP değeri (hesaplamalarda referans)

#### ⚙️ Parametre Ayarları
```
┌─────────────────────────────────────┐
│ a Katsayısı: [2        ] [Değiştir] │
│ faltın:      [5000     ] [Değiştir] │
│ APharcanan:  [144000   ] [Değiştir] │
└─────────────────────────────────────┘
```

**Canlı Değiştirilebilir Parametreler:**
- **a Katsayısı**: Fiyat hesaplamalarını etkiler
- **faltın**: Kar hesaplamalarında kullanılır
- **APharcanan**: Otomatik olarak AP'den düşülür (tetiklenme işleminden sonra düşürülmez)

### Sağ Taraf: İşlem Paneli

#### 🎯 Tekli İşlemler
```
┌─────────────────────────┐
│ Alınacak Payın Fiyatı:  │
│      214.8724           │
│ ┌─────────────────────┐ │
│ │        Alış         │ │
│ └─────────────────────┘ │
└─────────────────────────┘

┌─────────────────────────┐
│ Satılacak Payın Fiyatı: │
│      214.1102           │
│ ┌─────────────────────┐ │
│ │        Satış        │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

#### 📦 Toplu İşlemler
```
┌─────────────────────────┐
│ Toplu Alım Miktarı: 50  │
│ Toplam Alış Fiyatı:     │
│      10743.6200         │
│ ┌─────────────────────┐ │
│ │ Toplu Alış (50)     │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

#### 💰 Kar Ekleme
```
┌─────────────────────────┐
│ ftl (Kar Girişi):       │
│ [Kar miktarını girin]   │
│ ┌─────────────────────┐ │
│ │     Kar Ekle        │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

---

## 🔄 İşlem Adımları

### Alış İşlemi
1. **Fiyat Kontrolü**: Alış butonunun üstünde fiyatı görün
2. **Buton Durumu**: IP > 0 ise buton aktif
3. **Tıklayın**: "Alış" butonuna tıklayın
4. **Sonuç**: IP azalır, AP artar

### Satış İşlemi
1. **Fiyat Kontrolü**: Satış butonunun üstünde fiyatı görün
2. **Buton Durumu**: IP < IPmax ve IP > 0 ise buton aktif
3. **Tıklayın**: "Satış" butonuna tıklayın
4. **Sonuç**: IP artar, AP azalır

### Toplu İşlemler
1. **Miktar Girin**: İstediğiniz adedi yazın
2. **Toplam Fiyat**: Otomatik hesaplanır ve gösterilir
3. **İşlem Yapın**: Toplu alış/satış butonuna tıklayın

### Kar Ekleme
1. **ftl Girin**: Kar miktarını yazın
2. **Kar Ekle**: Butona tıklayın
3. **Otomatik**: 
   - Kar hesaplanır ve fkar'a eklenir
   - ftl alanı sıfırlanır
   - Yeni kar girişi yapabilirsiniz

---

## 📐 Sistem Mantığı

### Tetikleme Sistemi

**Tetikleme Öncesi (Pasif):**
- Tüm işlemler `f0` fiyatı ile yapılır
- Basit alış/satış mantığı

**Tetikleme Sonrası (Aktif):**
- Dinamik fiyat hesaplama devreye girer
- Her IP pozisyonu için farklı fiyat

**Tetikleme Koşulu:**
```
IPsatılan = IP0
```

### Fiyat Hesaplama Algoritması

**Pozitif Döngü (IP0+1, IP0+2, ... IPmax-1):**
```
Formül = (a × (AP/AP0) + (IP/IP)) / ((AP/AP0) + (a × (IP/IP)))
Dizi[IP0 + i] = Formül × Dizi[IP0]
```

**Negatif Döngü (IP0-1, IP0-2, ... 0):**
```
Formül = (a × (AP/AP0) + (IP/IP)) / ((AP/AP0) + (a × (IP/IP)))
Dizi[i] = Formül × Dizi[IP0]
```

### Kar Hesaplama
```
yeniFkar = (ftl / faltın) / (IPmax - IP)
toplamFkar = mevcutFkar + yeniFkar
```

---

## ⚠️ Önemli Notlar

### Sınırlamalar
- **IP = 0**: Satış yapılamaz (buton gizlenir)
- **IP = IPmax**: Alış yapılamaz (buton gizlenir)
- **Tetikleme**: Sadece bir kez gerçekleşir

### Parametre Değişiklikleri
- **a ve faltın**: Canlı olarak değiştirilebilir
- **Diğer parametreler**: Sistem yeniden başlatılmalı

### Veri Güvenliği
- Tüm veriler tarayıcıda saklanır
- Sayfa yenilendiğinde veriler kaybolur
- Önemli verileri not alın

---

## 🎨 Görsel İpuçları

### Renk Kodları
- **🟢 Yeşil Butonlar**: Alış işlemleri
- **🔴 Kırmızı Butonlar**: Satış işlemleri
- **🟠 Turuncu Buton**: Kar ekleme

### Durum Göstergeleri
- **Aktif**: Tetikleme sistemi çalışıyor
- **Pasif**: Sabit fiyat sistemi
- **N/A**: Geçersiz/hesaplanamaz değer

---

## 🔧 Sorun Giderme

### Sık Karşılaşılan Durumlar

**"Butonlar görünmüyor"**
- IP değerini kontrol edin
- Sınır değerlerde (0 veya IPmax) butonlar gizlenir

**"Fiyatlar N/A gösteriyor"**
- Tetikleme durumunu kontrol edin
- Dizi değerlerinin hesaplanmış olduğundan emin olun

**"Kar ekleme çalışmıyor"**
- ftl değerinin 0'dan büyük olduğundan emin olun
- faltın değerinin pozitif olduğunu kontrol edin

**"Sistem yavaş çalışıyor"**
- Tarayıcı sekmesini yenileyin
- Büyük miktarlarda toplu işlem yapmaktan kaçının

---

## 📞 Destek

Sorunlarınız için:
- GitHub Issues: [https://github.com/mhdkoop/kasastok/issues](https://github.com/mhdkoop/kasastok/issues)
- Proje Sahibi: [@mhdkoop](https://github.com/mhdkoop)

---

## 📚 Ek Kaynaklar

- **Proje Ana Sayfası**: [https://github.com/mhdkoop/kasastok](https://github.com/mhdkoop/kasastok)
- **Kaynak Kod**: Tüm kodlar açık kaynak olarak mevcuttur
- **Güncellemeler**: GitHub'da yeni sürümler takip edilebilir

---

*Bu kılavuz sürekli güncellenmektedir. En son sürüm için GitHub repository'sini ziyaret edin.*
