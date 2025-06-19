const bodyElement = document.querySelector(".body");
const dropdown = document.querySelector(".navbar-collapse");

async function fetchYemekler(tiklanan) {
    try {    
        bodyElement.innerHTML = `<span class="loader"></span>`;
        const response = await fetch(`http://localhost:3000/yemekler?tiklanan=${encodeURIComponent(tiklanan)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Ağdan veri alınamadı');
        }
        
        const yemekler = await response.json();
        bodyElement.innerHTML = '';
        yemekler.forEach(yemek => {
            const yemekCard = `
                <div class="card mb-3" style="max-width: 29.5rem; margin:1rem">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="data:image/png;base64,${yemek.YemekResmi}" class="img-fluid rounded-start" alt="${yemek.YemekIsmi} Resmi">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${yemek.YemekIsmi}</h5>
                                <li class="card-text">${yemek.YemekKalorisi} Kalori</li>
                                <li class="card-text">Hazırlanma Süresi: ${yemek.YemekHazirlamaSuresi} Dk.</li>
                                <h6 class="fiyat">Fiyat: ${yemek.YemekFiyati} TL</h6>
                            </div>
                        </div>
                    </div>
                </div>`;
            bodyElement.innerHTML += yemekCard; 
        });

    } catch (error) {
        console.error('Veri çekilirken hata:', error);
    }
}

window.onload = () => fetchYemekler("Tum Yemekler");

let navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((element) => {
    element.addEventListener("click", (event) => {
        dropdown.classList.remove("show");
        
        // Tüm nav-linklerden 'active' sınıfını kaldır.
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Tıklanan öğeye 'active' sınıfını ekle.
        event.currentTarget.classList.add('active');
        
        const tus = event.currentTarget.innerHTML.trim();
        fetchYemekler(tus);
    });
});
