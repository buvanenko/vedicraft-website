// Обновление количества игроков с реального сервера
async function updatePlayerCount() {
    const playerCountElement = document.getElementById('playerCount');
    const serverIP = 'vedicraft.ru'; // 🛠️ ЗАМЕНИТЕ НА СВОЙ IP!

    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
        const data = await response.json();

        if (data.online && data.players && data.players.online !== undefined) {
            playerCountElement.textContent = data.players.online;
        } else {
            playerCountElement.textContent = '0';
        }
    } catch (error) {
        console.error('Ошибка получения данных с сервера:', error);
        playerCountElement.textContent = '—';
    }
}

// Вызываем раз в 10 секунд
setInterval(updatePlayerCount, 10000);

// Вызываем сразу при загрузке страницы
updatePlayerCount();

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация при скролле
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .mode-card, .community-feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
