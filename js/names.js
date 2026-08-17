const namesData = {
    germany: {
        male: [
            "Ганс", "Карл", "Вильгельм", "Фридрих", "Генрих", "Отто", "Эрнст", "Вальтер", "Курт", "Альберт", 
            "Фриц", "Эрих", "Пауль", "Рихард", "Йозеф", "Герман", "Вернер", "Густав", "Артур", "Макс", 
            "Рудольф", "Эмиль", "Иоганнес", "Георг", "Франц", "Роберт", "Эдуард", "Бернгард", "Гуго", "Юлиус", 
            "Виктор", "Антон", "Оскар", "Мартин", "Эвальд", "Людвиг", "Альфред", "Август", "Гельмут", "Готфрид",
            "Дитрих", "Ульрих", "Клаус", "Дитер", "Вольфганг", "Хайнц", "Герхард", "Гюнтер", "Манфред", "Юрген"
        ],
        female: [
            "Анна", "Мария", "Марта", "Фрида", "Эмма", "Маргарета", "Берта", "Элизабет", "Клара", 
            "Эльза", "Иоганна", "Гертруда", "Минна", "Хелена", "Ида", "Луиза", "Эрна", "Хедвиг", 
            "Августа", "Эмилия", "Кете", "Лина", "Элиза", "Магдалена", "Доротея", "Вильгельмина", 
            "Шарлотта", "Эльфрида", "Роза", "Матильда", "Агнес", "Паулина", "Лотта", "София", "Ирена",
            "Хильдегарда", "Ильза", "Герда", "Урсула", "Инга", "Лизелотта", "Эдит", "Рут", "Гизела", "Криста"
        ],
        surname: [
            "Мюллер", "Шмидт", "Шнайдер", "Фишер", "Вебер", "Майер", "Вагнер", "Беккер", "Шульц", "Гофман", 
            "Шефер", "Кох", "Бауэр", "Рихтер", "Кляйн", "Вольф", "Шрёдер", "Нойман", "Браун", "Вернер", 
            "Генрих", "Краузе", "Зоммер", "Леман", "Горн", "Гюнтер", "Келлер", "Кёлер", "Шлоссер", 
            "Франк", "Шуберт", "Рот", "Бек", "Хаас", "Лоренц", "Краус", "Штайн", "Егер", "Отто", 
            "Ланге", "Бём", "Кремер", "Фогель", "Хофман", "Фукс", "Петерс", "Ланг", "Шмитт",
            "Циммерман", "Крюгер", "Хубер", "Кайзер", "Мёллер", "Шмид", "Кюн", "Циглер", "Буш", "Поль"
        ]
    },
    usa: {
        male: [
            "Джон", "Уильям", "Джеймс", "Роберт", "Чарльз", "Томас", "Ричард", "Джозеф", "Дэвид", "Майкл", 
            "Джордж", "Кристофер", "Дэниел", "Пол", "Марк", "Эдвард", "Стивен", "Эндрю", "Кеннет", "Джошуа", 
            "Кевин", "Брайан", "Питер", "Джейсон", "Мэтью", "Тимоти", "Джеффри", "Райан", "Джейкоб", "Гэри"
        ],
        female: [
            "Мэри", "Линда", "Барбара", "Элизабет", "Сьюзан", "Джессика", "Сара", "Карен", "Нэнси", "Лиза", 
            "Маргарет", "Бетти", "Сандра", "Эшли", "Дороти", "Кимберли", "Эмили", "Донна", "Мишель", "Кэрол", 
            "Аманда", "Мелисса", "Дебора", "Стефани", "Ребекка", "Лора", "Шерон", "Синтия", "Кэтлин", "Эми"
        ],
        surname: [
            "Смит", "Джонсон", "Уильямс", "Браун", "Джонс", "Миллер", "Дэвис", "Уилсон", "Андерсон", "Томас", 
            "Тейлор", "Мур", "Джексон", "Мартин", "Томпсон", "Уайт", "Харрис", "Кларк", "Льюис", "Робинсон", 
            "Уокер", "Янг", "Аллен", "Кинг", "Райт", "Скотт", "Хилл", "Грин", "Адамс", "Бейкер",
            "Гонсалес", "Нельсон", "Картер", "Митчелл", "Перес", "Робертс", "Тернер", "Филлипс", "Кэмпбелл", "Паркер"
        ]
    },
    ussr: {
        male: [
            "Иван", "Пётр", "Николай", "Александр", "Михаил", "Владимир", "Алексей", "Василий", "Сергей", "Павел", 
            "Дмитрий", "Степан", "Анатолий", "Виктор", "Георгий", "Евгений", "Фёдор", "Григорий", "Константин", "Илья", 
            "Борис", "Юрий", "Валентин", "Роман", "Леонид", "Вячеслав", "Геннадий", "Олег", "Игорь", "Максим"
        ],
        female: [
            "Мария", "Анна", "Александра", "Екатерина", "Татьяна", "Наталья", "Елена", "Ольга", "Евдокия", "Нина", 
            "Надежда", "Валентина", "Любовь", "Вера", "Зинаида", "Галина", "Лидия", "Антонина", "Прасковья", "Клавдия", 
            "Тамара", "Людмила", "Раиса", "Зоя", "Анастасия", "Светлана", "Ирина", "Лариса", "Марина", "Юлия"
        ],
        surname: [
            "Иванов", "Смирнов", "Кузнецов", "Попов", "Соколов", "Лебедев", "Козлов", "Новиков", "Морозов", "Петров", 
            "Волков", "Соловьёв", "Васильев", "Зайцев", "Павлов", "Семёнов", "Голубев", "Виноградов", "Богданов", "Воробьёв", 
            "Фёдоров", "Михайлов", "Беляев", "Тарасов", "Белов", "Комаров", "Орлов", "Киселёв", "Макаров", "Андреев", 
            "Ковалёв", "Ильин", "Гусев", "Титов", "Кузьмин", "Кудрявцев", "Баранов", "Куликов", "Алексеев", "Степанов"
        ]
    }
};

let currentGender = 'all';
let currentFaction = 'germany';

function initGenerator() {
    // Gender tabs
    document.querySelectorAll('.gender-tabs .control-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.gender-tabs .control-btn').forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            currentGender = target.dataset.gender;
            generateNames();
        });
    });

    // Faction tabs
    document.querySelectorAll('.faction-tabs .control-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.faction-tabs .control-btn').forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            currentFaction = target.dataset.faction;
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

function getUssrSurname(base, gender) {
    if (gender === 'male') return base;
    // Basic rules for female Russian surnames
    if (base.endsWith('ов') || base.endsWith('ев') || base.endsWith('ин') || base.endsWith('ёв')) {
        return base + 'а';
    }
    if (base.endsWith('ский')) {
        return base.slice(0, -4) + 'ская';
    }
    if (base.endsWith('ый')) {
        return base.slice(0, -2) + 'ая';
    }
    return base;
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
        
        let data = namesData[currentFaction];
        let first = getRandomElement(data[genderSelect]);
        let last = getRandomElement(data.surname);
        
        if (currentFaction === 'ussr') {
            last = getUssrSurname(last, genderSelect);
        }
        
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
