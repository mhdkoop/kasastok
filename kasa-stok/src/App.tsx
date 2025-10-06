import React, { useState, useEffect } from 'react';
import './App.css';

interface AppState {
  // Başlangıçta girilecek değerler
  a: number;
  IP0: number;
  f0: number;
  IPmax: number;
  faltın: number;
  
  // Hesaplanan ve değişen değerler
  AP: number;
  AP0: number;
  IP: number;
  IPsatılan: number;
  fkar: number;
  APharcanan: number;
  toplamHarcanan: number; // Toplam harcanan AP miktarı
  ftl: number;
  trig: boolean;
  APpozitif: number;
  IPpozitif: number;
  APnegatif: number;
  IPnegatif: number;
  Fkartotal: number;
  Ftltotal: number;
  
  // Dizi
  Dizi: number[];
  
  // Form durumu
  isInitialized: boolean;
  
  // Toplu işlem değerleri
  topluAlimMiktari: number;
  topluSatimMiktari: number;
}

function App() {
  const [state, setState] = useState<AppState>({
    // Başlangıçta girilecek değerler
    a: 0,
    IP0: 0,
    f0: 0,
    IPmax: 0,
    faltın: 0,
    
    // Hesaplanan ve değişen değerler
    AP: 0,
    AP0: 0,
    IP: 0,
    IPsatılan: 0,
    fkar: 0,
    APharcanan: 0,
    toplamHarcanan: 0,
    ftl: 0,
    trig: false,
    APpozitif: 0,
    IPpozitif: 0,
    APnegatif: 0,
    IPnegatif: 0,
    Fkartotal: 0,
    Ftltotal: 0,
    
    // Dizi
    Dizi: [],
    
    // Form durumu
    isInitialized: false,
    
    // Toplu işlem değerleri
    topluAlimMiktari: 1,
    topluSatimMiktari: 1
  });

  // Başlangıç değerlerini ayarlama
  const handleInitialize = () => {
    const newDizi = new Array(state.IPmax).fill(0);
    
    // Dizinin 0. indisinden IP0. indisine kadar her indise f0'ı yaz
    for (let i = 0; i <= state.IP0; i++) {
      newDizi[i] = state.f0;
    }
    
    setState(prev => ({
      ...prev,
      IP: prev.IPmax, // IP başlangıçta IPmax'a eşit
      Dizi: newDizi,
      isInitialized: true,
      IPsatılan: prev.IPmax - prev.IPmax // Başlangıçta 0
    }));
  };

  // IPsatılan'ı güncelle
  useEffect(() => {
    setState(prev => ({
      ...prev,
      IPsatılan: prev.IPmax - prev.IP
    }));
  }, [state.IP, state.IPmax]);

  // APharcanan değiştiğinde AP'yi güncelle
  useEffect(() => {
    if (state.isInitialized) {
      const eskiHarcanan = state.toplamHarcanan;
      const yeniHarcanan = state.APharcanan;
      const fark = yeniHarcanan - eskiHarcanan;
      
      if (fark !== 0) {
        setState(prev => ({
          ...prev,
          AP: prev.AP - fark,
          toplamHarcanan: yeniHarcanan
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.APharcanan]);

  // Tetikleme kontrolü
  useEffect(() => {
    if (!state.trig && state.IPsatılan === state.IP0 && state.isInitialized) {
      triggerCalculations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.IPsatılan, state.IP0, state.trig, state.isInitialized]);

  const triggerCalculations = () => {
    const newDizi = [...state.Dizi];
    let newAP0 = state.AP;
    newDizi[state.IP0] = state.f0;
    
    // Pozitif döngü (İP0+1, İP0+2, ... İPmax-1 indislerine)
    let APpozitif = state.AP;
    let IPpozitif = state.IP;
    
    for (let i = 1; i <= (state.IPmax - state.IP0); i++) {
      if (i === 1) {
        APpozitif = state.AP;
        IPpozitif = state.IP;
      }
      
      const formula = (state.a * (APpozitif / newAP0) + (IPpozitif / state.IP)) / 
                     ((APpozitif / newAP0) + (state.a * (IPpozitif / state.IP)));
      newDizi[state.IP0 + i] = formula * newDizi[state.IP0];
      APpozitif += newDizi[state.IP0 + i];
      IPpozitif -= 1;
    }
    
    // Negatif döngü (İP0-1'den başlayıp 0'a kadar)
    let APnegatif = newAP0 - state.f0;
    let IPnegatif = state.IP +1;
    
    for (let i = state.IP0 - 1; i >= 0; i--) {
      if (i === state.IP0 - 1) {
        APnegatif = newAP0 - state.f0;
        IPnegatif = state.IP +1;
      }
      
      const formula = ((state.a * (APnegatif / newAP0)) + (IPnegatif / state.IP)) / 
                     ((APnegatif / newAP0) + (state.a * (IPnegatif / state.IP)));
      newDizi[i] = formula * newDizi[state.IP0];
      APnegatif -= newDizi[i];
      IPnegatif += 1;
    }
    
    setState(prev => ({
      ...prev,
      AP0: newAP0,
      Dizi: newDizi,
      trig: true,
      APpozitif: APpozitif,
      IPpozitif: IPpozitif,
      APnegatif: APnegatif,
      IPnegatif: IPnegatif
    }));
  };

  // Alış butonu
  const handleAlis = () => {
    if (!state.trig) {
      // trig = false durumu
      setState(prev => ({
        ...prev,
        IP: prev.IP - 1,
        AP: prev.AP + prev.f0
      }));
    } else {
      // trig = true durumu
      // Alış yapıldığında: IP azalır, İPsatılan artar
      // Yeni İPsatılan = Mevcut İPsatılan + 1
      const newIPsatilan = state.IPsatılan + 1;
      setState(prev => ({
        ...prev,
        IP: prev.IP - 1,
        AP: prev.AP + prev.Dizi[newIPsatilan]
      }));
    }
  };

  // Satış butonu
  const handleSatis = () => {
    if (!state.trig) {
      // trig = false durumu
      setState(prev => ({
        ...prev,
        IP: prev.IP + 1,
        AP: prev.AP - prev.f0
      }));
    } else {
      // trig = true durumu
      // Satış yapıldığında: IP artar, İPsatılan azalır
      // Mevcut İPsatılan kullanılır
      setState(prev => ({
        ...prev,
        IP: prev.IP + 1,
        AP: prev.AP - prev.Dizi[state.IPsatılan]
      }));
    }
  };

  // Toplu alış toplam fiyatını hesapla
  const calculateTopluAlisToplam = () => {
    const miktar = state.topluAlimMiktari;
    if (state.IP - miktar < 0) return 0;
    
    let totalCost = 0;
    let currentIP = state.IP;
    
    for (let i = 0; i < miktar; i++) {
      if (!state.trig) {
        totalCost += state.f0;
      } else {
        const currentIPsatilan = state.IPmax - currentIP;
        const newIPsatilan = currentIPsatilan + 1;
        totalCost += state.Dizi[newIPsatilan] || 0;
      }
      currentIP -= 1;
    }
    
    return totalCost;
  };

  // Toplu satış toplam fiyatını hesapla
  const calculateTopluSatisToplam = () => {
    const miktar = state.topluSatimMiktari;
    if (state.IP + miktar > state.IPmax) return 0;
    
    let totalRevenue = 0;
    let currentIP = state.IP;
    
    for (let i = 0; i < miktar; i++) {
      if (!state.trig) {
        totalRevenue += state.f0;
      } else {
        const currentIPsatilan = state.IPmax - currentIP;
        totalRevenue += state.Dizi[currentIPsatilan] || 0;
      }
      currentIP += 1;
    }
    
    return totalRevenue;
  };

  // Toplu alış butonu
  const handleTopluAlis = () => {
    const miktar = state.topluAlimMiktari;
    if (state.IP - miktar < 0) return; // Yeterli IP yok
    
    let totalCost = 0;
    let currentIP = state.IP;
    
    for (let i = 0; i < miktar; i++) {
      if (!state.trig) {
        totalCost += state.f0;
      } else {
        // Her alış için İPsatılan artar
        const currentIPsatilan = state.IPmax - currentIP;
        const newIPsatilan = currentIPsatilan + 1;
        totalCost += state.Dizi[newIPsatilan];
      }
      currentIP -= 1;
    }
    
    setState(prev => ({
      ...prev,
      IP: currentIP,
      AP: prev.AP + totalCost
    }));
  };

  // Toplu satış butonu
  const handleTopluSatis = () => {
    const miktar = state.topluSatimMiktari;
    if (state.IP + miktar > state.IPmax) return; // Maksimum IP'yi aşar
    
    let totalRevenue = 0;
    let currentIP = state.IP;
    
    for (let i = 0; i < miktar; i++) {
      if (!state.trig) {
        totalRevenue += state.f0;
      } else {
        // Her satış için mevcut İPsatılan kullan
        const currentIPsatilan = state.IPmax - currentIP;
        totalRevenue += state.Dizi[currentIPsatilan];
      }
      currentIP += 1;
    }
    
    setState(prev => ({
      ...prev,
      IP: currentIP,
      AP: prev.AP - totalRevenue
    }));
  };

  // Kar ekle butonu
  const handleKarEkle = () => {
    if (state.ftl !== 0) {
      const yeniFkar = (state.ftl / state.faltın) / (state.IPmax - state.IP);
      const toplamFkar = state.fkar + yeniFkar; // Mevcut fkar'a ekle
      const newDizi = [...state.Dizi];
      newDizi[state.IP0] = state.f0 + toplamFkar;
      
      // Pozitif döngü (İP0+1, İP0+2, ... İPmax-1 indislerine)
      let APpozitif = state.AP;
      let IPpozitif = state.IP;
      
      for (let i = 1; i <= (state.IPmax - state.IP0); i++) {
        if (i === 1) {
          APpozitif = state.AP0;
          IPpozitif = state.IPmax - state.IP0;
        }
        
        const formula = (state.a * (APpozitif / state.AP0) + (IPpozitif / (state.IPmax - state.IP0))) / 
                       ((APpozitif / state.AP0) + (state.a * (IPpozitif / (state.IPmax - state.IP0))));
        newDizi[state.IP0 + i] = formula * newDizi[state.IP0];
        APpozitif += newDizi[state.IP0 + i];
        IPpozitif -= 1;
      }
      
      // Negatif döngü (İP0-1'den başlayıp 0'a kadar)
      let APnegatif = state.AP0 - newDizi[state.IP0];
      let IPnegatif = state.IPmax - state.IP0 +1;
      
      for (let i = state.IP0 - 1; i >= 0; i--) {
        if (i === state.IP0 - 1) {
          APnegatif = state.AP0 - newDizi[state.IP0];
          IPnegatif = state.IPmax - state.IP0 +1;
        }
        
        const formula = (state.a * (APnegatif / state.AP0) + (IPnegatif / (state.IPmax - state.IP0))) / 
                       ((APnegatif / state.AP0) + (state.a * (IPnegatif / (state.IPmax - state.IP0))));
        newDizi[i] = formula * newDizi[state.IP0];
        APnegatif -= newDizi[i];
        IPnegatif += 1;
      }
      
      setState(prev => ({
        ...prev,
        fkar: toplamFkar, // Toplam fkar'ı güncelle
        ftl: 0, // Ftl'yi sıfırla
        Dizi: newDizi,
        APpozitif: APpozitif,
        IPpozitif: IPpozitif,
        APnegatif: APnegatif,
        IPnegatif: IPnegatif
      }));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kasa Stok Test Ekranı</h1>
        
        {!state.isInitialized ? (
          <div className="initialization-form">
            <h2>Başlangıç Değerleri</h2>
            <div className="form-group">
              <label>a (tamsayı):</label>
              <input 
                type="number" 
                value={state.a} 
                onChange={(e) => setState(prev => ({...prev, a: parseInt(e.target.value) || 0}))}
              />
            </div>
            
            <div className="form-group">
              <label>İP0:</label>
              <input 
                type="number" 
                value={state.IP0} 
                onChange={(e) => setState(prev => ({...prev, IP0: parseInt(e.target.value) || 0}))}
              />
            </div>
            
            <div className="form-group">
              <label>f0 (başlangıç fiyatı):</label>
              <input 
                type="number" 
                value={state.f0} 
                onChange={(e) => setState(prev => ({...prev, f0: parseInt(e.target.value) || 0}))}
              />
            </div>
            
            <div className="form-group">
              <label>İPmax (maksimum ip adedi):</label>
              <input 
                type="number" 
                value={state.IPmax} 
                onChange={(e) => setState(prev => ({...prev, IPmax: parseInt(e.target.value) || 0}))}
              />
            </div>
            
            <div className="form-group">
              <label>faltın:</label>
              <input 
                type="number" 
                value={state.faltın} 
                onChange={(e) => setState(prev => ({...prev, faltın: parseInt(e.target.value) || 0}))}
              />
            </div>
            
            <button onClick={handleInitialize} className="initialize-btn">
              Sistemi Başlat
            </button>
          </div>
        ) : (
          <div className="main-interface">
            <div className="left-column">
              <div className="status-panel">
                <h2>Durum Bilgileri</h2>
                <div className="status-grid">
                  <div className="status-item">
                    <span>Kasadaki AP Miktarı:</span>
                    <span>{state.AP.toFixed(4)}</span>
                  </div>
                  <div className="status-item">
                    <span>Kasadaki İP sayısı:</span>
                    <span>{state.IP}</span>
                  </div>
                  <div className="status-item">
                    <span>Satılan İP sayısı:</span>
                    <span>{state.IPsatılan}</span>
                  </div>
                  <div className="status-item">
                    <span>IP0:</span>
                    <span>{state.IP0}</span>
                  </div>
                  <div className="status-item">
                    <span>AP0:</span>
                    <span>{state.AP0.toFixed(4)}</span>
                  </div>
                  <div className="status-item">
                    <span>Tetikleme Durumu:</span>
                    <span>{state.trig ? 'Aktif' : 'Pasif'}</span>
                  </div>
                  <div className="status-item">
                    <span>fkar:</span>
                    <span>{state.fkar.toFixed(4)}</span>
                  </div>
                  <div className="status-item">
                    <span>Toplam Harcanan AP:</span>
                    <span>{state.toplamHarcanan.toFixed(4)}</span>
                  </div>
                  <div className="status-item">
                    <span>a Katsayısı:</span>
                    <span>{state.a}</span>
                  </div>
                  <div className="status-item">
                    <span>faltın:</span>
                    <span>{state.faltın}</span>
                  </div>
                </div>
              </div>
              
              <div className="parameters-panel">
                <h2>Parametre Ayarları</h2>
                <div className="parameters-grid">
                  <div className="form-group">
                    <label>a Katsayısı:</label>
                    <input 
                      type="number" 
                      value={state.a} 
                      onChange={(e) => setState(prev => ({...prev, a: parseInt(e.target.value) || 0}))}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>faltın:</label>
                    <input 
                      type="number" 
                      value={state.faltın} 
                      onChange={(e) => setState(prev => ({...prev, faltın: parseInt(e.target.value) || 0}))}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>APharcanan:</label>
                    <input 
                      type="number" 
                      value={state.APharcanan} 
                      onChange={(e) => setState(prev => ({...prev, APharcanan: parseFloat(e.target.value) || 0}))}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="right-column">
              <div className="controls-panel">
              <h2>İşlemler</h2>
              <div className="button-group">
                {state.IP > 0 && (
                  <div className="button-container">
                    <div className="button-info">
                      <div>Alınacak Payın Fiyatı:</div>
                      <div>{state.trig && state.IPsatılan + 1 < state.Dizi.length ? state.Dizi[state.IPsatılan + 1].toFixed(4) : (state.trig ? 'N/A' : state.f0.toFixed(4))}</div>
                    </div>
                    <button 
                      onClick={handleAlis} 
                      className="action-btn buy-btn"
                    >
                      Alış
                    </button>
                  </div>
                )}
                {state.IP < state.IPmax && state.IP > 0 && (
                  <div className="button-container">
                    <div className="button-info">
                      <div>Satılacak Payın Fiyatı:</div>
                      <div>{state.trig && state.IPsatılan < state.Dizi.length ? state.Dizi[state.IPsatılan].toFixed(4) : (state.trig ? 'N/A' : state.f0.toFixed(4))}</div>
                    </div>
                    <button 
                      onClick={handleSatis} 
                      className="action-btn sell-btn"
                    >
                      Satış
                    </button>
                  </div>
                )}
              </div>
              
              <div className="bulk-operations">
                <h3>Toplu İşlemler</h3>
                <div className="bulk-controls">
                  <div className="bulk-section">
                    <div className="form-group">
                      <label>Toplu Alım Miktarı:</label>
                      <input 
                        type="number" 
                        min="1"
                        value={state.topluAlimMiktari} 
                        onChange={(e) => setState(prev => ({...prev, topluAlimMiktari: parseInt(e.target.value) || 1}))}
                      />
                    </div>
{state.IP > 0 && (
                      <>
                        <div className="button-info">
                          <div>Toplam Alış Fiyatı:</div>
                          <div>{calculateTopluAlisToplam().toFixed(4)}</div>
                        </div>
                        <button 
                          onClick={handleTopluAlis} 
                          className="action-btn bulk-buy-btn"
                          disabled={state.IP - state.topluAlimMiktari < 0}
                        >
                          Toplu Alış ({state.topluAlimMiktari})
                        </button>
                      </>
                    )}
                  </div>
                  
                  <div className="bulk-section">
                    <div className="form-group">
                      <label>Toplu Satım Miktarı:</label>
                      <input 
                        type="number" 
                        min="1"
                        value={state.topluSatimMiktari} 
                        onChange={(e) => setState(prev => ({...prev, topluSatimMiktari: parseInt(e.target.value) || 1}))}
                      />
                    </div>
{state.IP < state.IPmax && (
                      <>
                        <div className="button-info">
                          <div>Toplam Satış Fiyatı:</div>
                          <div>{calculateTopluSatisToplam().toFixed(4)}</div>
                        </div>
                        <button 
                          onClick={handleTopluSatis} 
                          className="action-btn bulk-sell-btn"
                          disabled={state.IP + state.topluSatimMiktari > state.IPmax}
                        >
                          Toplu Satış ({state.topluSatimMiktari})
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="additional-controls">
                <div className="form-group">
                  <label>ftl (Kar Girişi):</label>
                  <input 
                    type="number" 
                    value={state.ftl} 
                    placeholder="Kar miktarını girin"
                    onChange={(e) => setState(prev => ({...prev, ftl: parseFloat(e.target.value) || 0}))}
                  />
                </div>
                
                <button 
                  onClick={handleKarEkle} 
                  className="action-btn profit-btn"
                  disabled={state.ftl === 0}
                >
                  Kar Ekle
                </button>
              </div>
              </div>
            </div>
            
            <div className="array-panel">
              <h2>Dizi Değerleri</h2>
              <div className="array-display">
                {state.Dizi.map((value, index) => (
                  <div key={index} className={`array-item ${index === state.IP ? 'current' : ''}`}>
                    <span>Dizi[{index}]:</span>
                    <span>{value.toFixed(4)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;