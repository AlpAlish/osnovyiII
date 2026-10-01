// Интерактивная карта функция
function initInteractiveMap() {
    console.log("Инициализация карты...");
    
    const cityMarkers = document.querySelectorAll('.city-marker');
    const cityPreview = document.getElementById('city-preview');
    
    if (cityMarkers.length === 0) {
        console.error("Метки городов не найдены");
        return;
    }
    
    if (!cityPreview) {
        console.error("Контейнер информации о городе не найден");
        return;
    }

    console.log(`Найдено меток: ${cityMarkers.length}`);

    // Добавление обработчиков событий для каждой метки города
    cityMarkers.forEach(marker => {
        console.log(`Добавление метки: ${marker.dataset.city}`);
        
        // При наведении курсора
        marker.addEventListener('mouseenter', function(e) {
            e.stopPropagation();
            const cityName = this.querySelector('.city-name').textContent;
            cityPreview.innerHTML = `<p><strong>${cityName}</strong> - нажмите для информации</p>`;
            console.log(`Наведение: ${cityName}`);
        });

        // При клике
        marker.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            const city = this.dataset.city;
            console.log(`Клик: ${city}`);
            showCityInfo(city);
        });

        // При уходе курсора
        marker.addEventListener('mouseleave', function(e) {
            e.stopPropagation();
            // Не очищаем информацию
        });
    });

    // Начальное сообщение
    cityPreview.innerHTML = '<p>Нажмите на любую метку города на карте</p>';
}

// Функция отображения информации о городе
function showCityInfo(city) {
    const cityPreview = document.getElementById('city-preview');
    
    const cityData = {
        'beijing': {
            name: 'Пекин',
            description: 'Столица Китая, один из крупнейших городов мира с богатой историей и культурным наследием',
            population: '21.7 млн человек',
            area: '16,411 км²',
            founded: '1045 г. до н.э.',
            language: 'Севернокитайский язык (путунхуа)',
            attractions: ['Запретный город', 'Великая Китайская стена', 'Храм Неба', 'Летний дворец'],
            facts: ['Один из древнейших городов мира - более 3000 лет истории', 'Столица Китая с 1264 года', 'Здесь находится крупнейший дворцовый комплекс в мире - Запретный город', 'В 2008 году принимал Летние Олимпийские игры']
        },
        'shanghai': {
            name: 'Шанхай', 
            description: 'Крупнейший финансовый и торговый центр Китая, важнейший порт страны',
            population: '24.9 млн человек',
            area: '6,341 км²',
            founded: '746 год',
            language: 'Шанхайский диалект, путунхуа',
            attractions: ['Набережная Вайтань', 'Шанхайская башня', 'Саду Юйюань', 'Шанхайский Диснейленд'],
            facts: ['Крупнейший город мира по численности населения', 'Важнейший финансовый центр Азии', 'Имеет самый длинный метрополитен в мире - 831 км', 'Порт Шанхая - самый загруженный контейнерный порт в мире']
        },
        'guangzhou': {
            name: 'Гуанчжоу',
            description: 'Крупный промышленный и торговый центр Южного Китая, столица провинции Гуандун',
            population: '15.3 млн человек',
            area: '7,434 км²',
            founded: '214 г. до н.э.',
            language: 'Кантонский диалект, путунхуа',
            attractions: ['Башня Кантон', 'Остров Шамянь', 'Храм шести баньяновых деревьев', 'Парк Юэсю'],
            facts: ['Один из древнейших портовых городов мира', 'Ежегодно здесь проводится Кантонская ярмарка - крупнейшая в Китае', 'Родина кантонской кухни - одной из самых известных в мире', 'Исторический центр Шелкового пути морской торговли']
        },
        'chengdu': {
            name: 'Чэнду',
            description: 'Столица провинции Сычуань, известная как "Родина гигантских панд" и центр сычуаньской кухни',
            population: '16.3 млн человек',
            area: '14,378 км²',
            founded: '316 г. до н.э.',
            language: 'Сычуаньский диалект, путунхуа',
            attractions: ['Исследовательский центр гигантских панд', 'Храм Цинъянгуну', 'Парк Ванцзянлоу', 'Древняя улица Цзиньли'],
            facts: ['Здесь находится крупнейший в мире центр по разведению гигантских панд', 'Столица провинции Сычуань - самой густонаселенной в Китае', 'Родина знаменитой сычуаньской кухни, известной своей остротой', 'Один из самых важных экономических центров Западного Китая']
        }
    };

    const data = cityData[city];
    
    if (data) {
        cityPreview.innerHTML = `
            <div class="city-details">
                <h4>🎌 ${data.name}</h4>
                <p class="city-description">${data.description}</p>
                
                <div class="city-basic-info">
                    <div class="info-item">
                        <span class="info-label">👥 Население:</span>
                        <span class="info-value">${data.population}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">📏 Площадь:</span>
                        <span class="info-value">${data.area}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">🏛️ Основан:</span>
                        <span class="info-value">${data.founded}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">🗣️ Язык:</span>
                        <span class="info-value">${data.language}</span>
                    </div>
                </div>
                
                <div class="city-attractions">
                    <h5>🏆 Главные достопримечательности:</h5>
                    <ul>
                        ${data.attractions.map(attr => `<li>⭐ ${attr}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="city-facts">
                    <h5>🔍 Интересные факты:</h5>
                    <ul>
                        ${data.facts.map(fact => `<li>📌 ${fact}</li>`).join('')}
                    </ul>
                </div>
                
                <button onclick="exploreCity('${city}')" class="visit-button">🚀 Исследовать город</button>
            </div>
        `;
        console.log(`Информация о городе показана: ${data.name}`);
    } else {
        cityPreview.innerHTML = '<p>Информация о городе не найдена</p>';
    }
}

// Функция исследования города
function exploreCity(city) {
    const cityNames = {
        'beijing': 'Пекине',
        'shanghai': 'Шанхае',
        'guangzhou': 'Гуанчжоу',
        'chengdu': 'Чэнду'
    };
    
    alert(`🎌 Переход на страницу исследования ${cityNames[city]}...`);
    // Для будущей реализации:
    // window.location.href = `pages/city-${city}.html`;
}

// Инициализация карты при загрузке документа
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM загружен, настройка карты...");
    initInteractiveMap();
});

// Если DOM уже загружен
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractiveMap);
} else {
    initInteractiveMap();
}