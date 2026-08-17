const germanNames = {
    male: [
        "Ганс", "Карл", "Вильгельм", "Фридрих", "Генрих", "Отто", "Эрнст", "Вальтер", "Курт", "Альберт", 
        "Фриц", "Эрих", "Пауль", "Рихард", "Йозеф", "Герман", "Вернер", "Густав", "Артур", "Макс", 
        "Рудольф", "Эмиль", "Иоганнес", "Георг", "Франц", "Роберт", "Эдуард", "Бернгард", "Гуго", "Юлиус", 
        "Виктор", "Антон", "Оскар", "Мартин", "Эвальд", "Людвиг", "Альфред", "Август", "Гельмут", "Готфрид",
        "Дитрих", "Ульрих", "Клаус", "Дитер", "Вольфганг", "Хайнц", "Герхард", "Гюнтер", "Манфред", "Юрген",
        "Иоахим", "Рольф", "Хорст", "Ральф", "Кнут", "Бруно", "Фердинанд", "Феликс", "Леонгард", "Себастьян"
    ],
    female: [
        "Анна", "Мария", "Марта", "Фрида", "Эмма", "Маргарета", "Мария", "Берта", "Элизабет", "Клара", 
        "Эльза", "Иоганна", "Гертруда", "Минна", "Хелена", "Ида", "Луиза", "Эрна", "Берта", "Хедвиг", 
        "Августа", "Иоганна", "Эмилия", "Кете", "Лина", "Маргарета", "Элиза", "Магдалена", "Доротея", "Вильгельмина", 
        "Шарлотта", "Эльфрида", "Роза", "Матильда", "Агнес", "Паулина", "Лотта", "Клара", "София", "Ирена",
        "Хильдегарда", "Ильза", "Герда", "Урсула", "Инга", "Лизелотта", "Эдит", "Рут", "Гизела", "Криста",
        "Хельга", "Рената", "Карин", "Моника", "Бригитта", "Ута", "Петра", "Сабина", "Сюзанна", "Ева"
    ],
    surname: [
        "Мюллер", "Шмидт", "Шнайдер", "Фишер", "Вебер", "Майер", "Вагнер", "Беккер", "Шульц", "Гофман", 
        "Шефер", "Кох", "Бауэр", "Рихтер", "Кляйн", "Вольф", "Шрёдер", "Нойман", "Браун", "Вернер", 
        "Генрих", "Краузе", "Майер", "Зоммер", "Леман", "Горн", "Гюнтер", "Келлер", "Кёлер", "Шлоссер", 
        "Франк", "Шуберт", "Рот", "Бек", "Хаас", "Лоренц", "Краус", "Штайн", "Егер", "Отто", 
        "Ланге", "Бём", "Генрих", "Кремер", "Фогель", "Хофман", "Фукс", "Петерс", "Ланг", "Шмитт",
        "Циммерман", "Крюгер", "Хубер", "Кайзер", "Мёллер", "Шмид", "Кюн", "Циглер", "Буш", "Поль",
        "Вернер", "Граф", "Байер", "Зайдель", "Крамер", "Шольц", "Хаас", "Дитрих", "Энгель", "Герман"
    ]
};

let currentGender = 'all';

function initGenerator() {
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            currentGender = target.dataset.gender;
            generateNames();
        });
    });

    document.getElementById('generate-btn').addEventListener('click', generateNames);
    
    // Initial generation
    generateNames();
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateNames() {
    const grid = document.getElementById('results-grid');
    grid.innerHTML = '';
    
    let count = 12; // Generate 12 names at once
    for(let i=0; i<count; i++) {
        let genderSelect = currentGender;
        if (genderSelect === 'all') {
            genderSelect = Math.random() > 0.5 ? 'male' : 'female';
        }
        
        let first = getRandomElement(germanNames[genderSelect]);
        let last = getRandomElement(germanNames.surname);
        
        let card = document.createElement('div');
        card.className = 'name-card';
        card.textContent = `${first} ${last}`;
        
        card.addEventListener('click', () => {
            navigator.clipboard.writeText(card.textContent).then(() => {
                card.classList.add('copied');
                setTimeout(() => card.classList.remove('copied'), 1500);
            });
        });
        
        grid.appendChild(card);
    }
}

document.addEventListener('DOMContentLoaded', initGenerator);
