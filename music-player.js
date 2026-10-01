document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bg-music');
    const toggleButton = document.getElementById('music-toggle');
    const volumeSlider = document.getElementById('volume-slider');

    // Быстрая загрузка настроек
    const savedVolume = localStorage.getItem('musicVolume');
    const savedTime = localStorage.getItem('musicTime');
    const isPlaying = localStorage.getItem('musicPlaying') === 'true';

    // Устанавливаем настройки ДО загрузки страницы
    audio.volume = savedVolume ? parseFloat(savedVolume) : 0.5;
    volumeSlider.value = audio.volume;

    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    // Воспроизводим сразу если нужно
    if (isPlaying) {
        // Не ждем загрузки страницы - пробуем сразу
        const playMusic = () => {
            audio.play().then(() => {
                updateButton();
            }).catch(error => {
                // Если не получилось, ждем клика пользователя
                console.log("Ждем клика для воспроизведения");
            });
        };
        
        // Пробуем воспроизвести сразу
        playMusic();
    }

    function updateButton() {
        toggleButton.textContent = audio.paused ? '🔈 Вкл' : '🔊 Выкл';
    }

    updateButton();

    toggleButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            localStorage.setItem('musicPlaying', 'true');
        } else {
            audio.pause();
            localStorage.setItem('musicPlaying', 'false');
        }
        updateButton();
    });

    volumeSlider.addEventListener('input', function() {
        audio.volume = volumeSlider.value;
        localStorage.setItem('musicVolume', audio.volume);
    });

    // Сохраняем время чаще - каждые 500мс
    setInterval(function() {
        if (!audio.paused) {
            localStorage.setItem('musicTime', audio.currentTime);
        }
    }, 500);
});