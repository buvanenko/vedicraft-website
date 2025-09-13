// Обновление количества игроков из статического JSON-файла
async function updatePlayerCount() {
    const playerCountElement = document.getElementById('playerCount');
    const jsonUrl = 'https://buvanenko.github.io/vedicraft-website/player-count.json'; // ← ЗАМЕНИТЕ!

    try {
        const response = await fetch(jsonUrl);
        const data = await response.json();

        if (data.players !== undefined) {
            playerCountElement.textContent = data.players;
        } else {
            playerCountElement.textContent = '—';
        }
    } catch (error) {
        console.error('Ошибка получения данных:', error);
        playerCountElement.textContent = '—';
    }
}

// Обновляем каждые 10 секунд
setInterval(updatePlayerCount, 10000);

// Вызываем сразу при загрузке
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

