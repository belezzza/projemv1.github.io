const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyelXRtGmn2LT3qmLQ_zMGqdbUgKFLQE3-eJv3xeuVx2qtxU7qF5aMUw_KdEgjQtqu_/exec";

const submitBtn = document.getElementById('submitBtn');



// --- 1. KAÇAN BUTON MANTIĞI ---

submitBtn.addEventListener('mouseenter', function() {

    // Ekran boyutlarını alıyoruz

    const x = Math.random() * (window.innerWidth - submitBtn.clientWidth);

    const y = Math.random() * (window.innerHeight - submitBtn.clientHeight);

    

    // Butonu yeni rastgele konuma ışınlıyoruz

    submitBtn.style.position = 'fixed';

    submitBtn.style.left = x + 'px';

    submitBtn.style.top = y + 'px';

});



// --- KAYIT VE KONTROL MANTIĞI ---
document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const tc = document.getElementById('tc').value.trim();
    const age = document.getElementById('age').value;

    // 1. Önceki kayıtları localStorage'dan temiz bir şekilde çek
    let existingData = JSON.parse(localStorage.getItem('userDB')) || [];
    
    // 2. Sıkı Kontrol: Aynı TC veya aynı isim (küçük harfe çevirerek) var mı?
    const isDuplicate = existingData.some(user => {
        return user.tc === tc || user.ad.toLowerCase() === name.toLowerCase();
    });

    if (isDuplicate) {
        alert("HATA: Bu isim veya TC ile zaten kayıt yapılmış!");
        // Formu sıfırlayıp işlemi durduruyoruz
        this.reset();
        return; 
    }

    // 3. Veri geçerli ise kaydetme işlemine geç
    const userData = {
        ad: name,
        tc: tc,
        yas: parseInt(age),
        kayitTarihi: new Date().toLocaleString('tr-TR')
    };

    // Veriyi hem Google Sheets'e hem de yerel hafızaya gönder
    saveData(userData);
});

function saveData(userData) {
    // Google Sheets Gönderimi
    fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(userData)
    }).then(() => {
        // Yerel hafızaya ekle
        let db = JSON.parse(localStorage.getItem('userDB')) || [];
        db.push(userData);
        localStorage.setItem('userDB', JSON.stringify(db));
        
        alert("Başarıyla kaydedildi!");
        location.reload(); // Sayfayı yenileyerek butonu ve formu sıfırla
    });
}
