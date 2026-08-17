const germanNames = {
    male: [
        "Hans", "Karl", "Wilhelm", "Friedrich", "Heinrich", "Otto", "Ernst", "Walter", "Kurt", "Albert", 
        "Fritz", "Erich", "Paul", "Richard", "Josef", "Hermann", "Werner", "Gustav", "Arthur", "Max", 
        "Rudolf", "Emil", "Johannes", "Georg", "Franz", "Robert", "Eduard", "Bernhard", "Hugo", "Julius", 
        "Viktor", "Anton", "Oskar", "Martin", "Ewald", "Ludwig", "Alfred", "August", "Helmut", "Gottfried",
        "Dietrich", "Ulrich", "Klaus", "Dieter", "Wolfgang", "Heinz", "Gerhard", "Günter", "Manfred", "Jürgen",
        "Joachim", "Rolf", "Horst", "Ralf", "Knut", "Bruno", "Ferdinand", "Felix", "Leonhard", "Sebastian"
    ],
    female: [
        "Anna", "Maria", "Martha", "Frieda", "Emma", "Margarete", "Marie", "Bertha", "Elisabeth", "Klara", 
        "Else", "Johanne", "Gertrud", "Minna", "Helene", "Ida", "Luise", "Erna", "Berta", "Hedwig", 
        "Auguste", "Johanna", "Emilie", "Käthe", "Lina", "Margaretha", "Elise", "Magdalene", "Dorothea", "Wilhelmine", 
        "Charlotte", "Elfriede", "Rosa", "Mathilde", "Agnes", "Pauline", "Lotte", "Clara", "Sophie", "Irene",
        "Hildegard", "Ilse", "Gerda", "Ursula", "Inge", "Liselotte", "Edith", "Ruth", "Gisela", "Christa",
        "Helga", "Renate", "Karin", "Monika", "Brigitte", "Ute", "Petra", "Sabine", "Susanne", "Eva"
    ],
    surname: [
        "Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker", "Schulz", "Hoffmann", 
        "Schäfer", "Koch", "Bauer", "Richter", "Klein", "Wolf", "Schröder", "Neumann", "Braun", "Werner", 
        "Heinrich", "Krause", "Meier", "Sommer", "Lehmann", "Horn", "Günther", "Keller", "Köhler", "Schlosser", 
        "Frank", "Schubert", "Roth", "Beck", "Haas", "Lorenz", "Kraus", "Stein", "Jäger", "Otto", 
        "Lange", "Böhm", "Heinrich", "Krämer", "Vogel", "Hofmann", "Fuchs", "Peters", "Lang", "Schmitt",
        "Zimmermann", "Krüger", "Huber", "Kaiser", "Möller", "Schmid", "Kühn", "Ziegler", "Busch", "Pohl",
        "Werner", "Graf", "Beyer", "Seidel", "Kramer", "Scholz", "Haas", "Dietrich", "Engel", "Hermann"
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
