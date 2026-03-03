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



// --- 2. KAYIT VE KONTROL MANTIĞI ---

document.getElementById('dataForm').addEventListener('submit', function(e) {

    e.preventDefault();



    const name = document.getElementById('name').value.trim();

    const tc = document.getElementById('tc').value.trim();

    const age = document.getElementById('age').value;



    // Önceki kayıtları kontrol et

    let existingData = JSON.parse(localStorage.getItem('userDB')) || [];

    

    // Aynı isim VEYA aynı TC var mı kontrolü

    const isDuplicate = existingData.some(user => user.tc === tc || user.ad.toLowerCase() === name.toLowerCase());



    if (isDuplicate) {

        alert("Hata: Bu isim veya TC ile daha önce kayıt yapılmış!");

        return;

    }



    // Geçerlilik kontrolleri

    if (name === "" || !/^[0-9]{11}$/.test(tc) || age === "") {

        alert("Lütfen tüm alanları doğru doldurun (TC 11 hane olmalı)!");

        return;

    }



    const userData = {

        ad: name,

        tc: tc,

        yas: parseInt(age),

        kayitTarihi: new Date().toLocaleString('tr-TR')

    };



    // Google Sheets'e gönder

    fetch(GOOGLE_SHEET_URL, {

        method: 'POST',

        mode: 'no-cors',

        body: JSON.stringify(userData)

    })

    .then(() => {

        // Yerel hafızaya da ekle ki bir dahaki sefere kontrol edebilelim

        existingData.push(userData);

        localStorage.setItem('userDB', JSON.stringify(existingData));

        

        alert("Bilgilerin başarıyla kaydedildi!");

        location.reload(); // Sayfayı yenileyerek butonu eski yerine getirir

    });

});
