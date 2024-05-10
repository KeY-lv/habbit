    // Notikumu klausītājs aktivizējas, kad DOM saturs ir pilnībā ielādēts.
document.addEventListener('DOMContentLoaded', function() {
    // Izsauc funkciju displayHabits, lai sākotnēji parādītu ieradumus.
    displayHabits();
    // Izgūst atsauci uz jauno ieraduma veidlapu un pievieno sumbit event listener.
    const newHabitForm = document.getElementById('new-habit-form');
    newHabitForm.addEventListener('submit', function(e) {
    // neļauj veidlapas iesniegšanas noklusējuma darbību.

        e.preventDefault();
    // Izsauc funkciju addOrUpdateHabit, kad veidlapa ir iesniegta.
        addOrUpdateHabit();
    });
    // click event listener to the habits list
    document.getElementById('habits-list').addEventListener('click', function(e) {
    // iegūst vistuvāko ancestor elementu ar klasi “habit” pie elementa, uz kura noklikšķināts.
        const habitElement = e.target.closest('.habit');
    //Ja "habit" elements nav atrasts,iziet no funkcijas
        if (!habitElement) return;
    // iegūst ieraduma nosaukumu no noklikšķinātā ieraduma elementa.
        const habitName = habitElement.querySelector('h3').textContent;
    // Ja noklikšķinātais elements ir dzēšanas poga, ieradums tiek izdzēsts no lokālās krātuves un ir atjaunināts.  
        if (e.target.classList.contains('delete-habit-btn')) {
            deleteHabitFromLocalStorage(habitName);
            displayHabits();
     // Ja noklikšķinātais elements ir rediģēšanas poga, pāriet uz rediģēšanas lapu ar ieraduma nosaukumu kā vaicājuma parametru.
        } else if (e.target.classList.contains('edit-habit-btn')) {
            window.location.href = `edit_habit.html?name=${encodeURIComponent(habitName)}`;
        }
    });
});
    //Funkcija, lai pievienotu vai atjaunotu ieradumus.
function addOrUpdateHabit() {
    //Tiek iegūtas ievades vērtības no formas
    const habitNameInput = document.getElementById('habit-name');
    const habitData = {
        name: habitNameInput.value.trim(),
        description: document.getElementById('habit-description').value.trim(),
        category: document.getElementById('habit-category').value,
        frequency: document.getElementById('habit-frequency').value,
        timeframe: document.getElementById('habit-timeframe').value,
        difficulty: document.getElementById('habit-difficulty').value,
        type: document.getElementById('habit-type').value,
        goal: document.getElementById('habit-goal').value.trim(),
        dateAdded: new Date().toISOString().split('T')[0],
        
    };
    // Pārbaude, vai ir aizpildīti nepieciešamie lauki
    if (!habitData.name || !habitData.goal) {
        alert('Please fill in all required fields.');
        return;
    }
    // iegūst ieradumus no lokālās krātuves 
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
    // atrod esošo ieraduma indeksu ar tādu pašu nosaukumu.
    const existingIndex = habits.findIndex(habit => habit.name === habitData.name);
    // Ja tiek atrasts esošs ieradums, tas tiek atjaunināts, pretējā gadījumā pievienots jaunam ieradumam.
    if (existingIndex > -1) {
        habits[existingIndex] = { ...habits[existingIndex], ...habitData };
    } else {
        habits.push(habitData);
    }
    // Saglabā atjaunināto ieradumu lokālajā krātuvē,display updatated habits un restartē formu.
    localStorage.setItem('habits', JSON.stringify(habits));
    //Izsauc funkciju displayHabits.
    displayHabits();
    document.getElementById('new-habit-form').reset(); 
}
    //Izsauc funkciju displayHabits.
function displayHabits() {
    //Iegūst ieraduma saraksta elementu.
    const habitsList = document.getElementById('habits-list');
    //Notīra esošos ieradumus, kas ir displayoti.
    habitsList.innerHTML = ''; 
    //iegūst ieraduma sarakstu no lokālās krātuves vai palaiž tukšu masīvu
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
    // iterē katru ieradumu un izveido DOM elementu, lai tas tiktu parādīts
    habits.forEach(habitData => {
        habitsList.appendChild(createHabitElement(habitData));
    });
    // vēlreiz pievieno notikuma klausītaju pogām.
    attachButtonListeners(); 
}
    //Funkcija, kas uztaisa DOM elementu priekš ieraduma.
function createHabitElement(habitData) {
    const habitElement = document.createElement('div');
    habitElement.className = 'habit';
    habitElement.innerHTML = `
        <h3>${habitData.name}</h3>
        <p>Description: ${habitData.description}</p>
        <p>Category: ${habitData.category}</p>
        <p>Frequency: ${habitData.frequency}</p>
        <p>Timeframe: ${habitData.timeframe}</p>
        <p>Difficulty: ${habitData.difficulty}</p>
        <p>Type: ${habitData.type}</p>
        <p>Goal: ${habitData.goal}</p>
        <p>Date Added: ${habitData.dateAdded}</p> 
        <button class="edit-habit-btn">Edit</button>
        <button class="delete-habit-btn">Delete</button>
    `;
    return habitElement;
}
    //Funkcija,priekš ieraduma izdzēšans.
function deleteHabitFromLocalStorage(habitName) {
    //iegūst ieraduma sarakstu no lokālās krātuves vai palaiž tukšu masīvu
    let habits = JSON.parse(localStorage.getItem('habits')) || [];
    //Filtrs priekš ieraduma ar specifisku name.
    habits = habits.filter(habit => habit.name !== habitName);
    //saglabā atjauninātos ieradumus lokālajā krātuvē.
    localStorage.setItem('habits', JSON.stringify(habits));
}

    // AttachButtonListeners function priekš delete,edit pogas katram ieraduma sarakstam.
function attachButtonListeners() {
    document.querySelectorAll('.delete-habit-btn').forEach(button => {
        button.addEventListener('click', function(e) {
    //iegūst ieraduma elementu, kas saistīts ar noklikšķināto dzēšans pogu.
            const habitElement = e.target.closest('.habit');
    //izmantojot habit name no habit elementa
            const habitName = habitElement.querySelector('h3').textContent;
    //izdzēš ieradumu no lokālās krātuves un displayo atjaunināto ieradumu.
            deleteHabitFromLocalStorage(habitName);
            displayHabits();
        });
    });
    //tiek pievienots notikuma klausītājs priekš edit pogām.
    document.querySelectorAll('.edit-habit-btn').forEach(button => {
        button.addEventListener('click', function(e) {
    //iegūst ieraduma elementu, kas saistīts ar noklikšīnāto edit pogu.
            const habitElement = e.target.closest('.habit');
    //iegūst ieraduma nosaukumu no ieraduma elementa 
            const habitName = habitElement.querySelector('h3').textContent;
    // novirza atpakaļ uz rediģēšanas lapu, izmantojot habit nosaukumu kā vaicājuma parametru.
            window.location.href = `edit_habit.html?name=${encodeURIComponent(habitName)}`;
        });
    });
}
