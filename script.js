const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyelXRtGmn2LT3qmLQ_zMGqdbUgKFLQE3-eJv3xeuVx2qtxU7qF5aMUw_KdEgjQtqu_/exec"; // Kopyaladığın URL'yi buraya yapıştır

document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const tc = document.getElementById('tc').value.trim();
    const age = document.getElementById('age').value;
    
    // Kontroller
    if (name === "" || !/^[0-9]{11}$/.test(tc) || age < 0 || age === "") {
        alert("Lütfen tüm alanları doğru doldurun!");
        return;
    }

    const userData = {
        ad: name,
        tc: tc,
        yas: parseInt(age),
        kayitTarihi: new Date().toLocaleString('tr-TR')
    };

    // Veriyi Google Sheets'e gönderiyoruz
    fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors', // GitHub Pages için gerekli güvenlik ayarı
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    .then(() => {
        alert("Bilgilerin başarıyla kaydedildi!");
        document.getElementById('dataForm').reset();
    })
    .catch(error => console.error('Hata:', error));
});