 // pievieno notikumu klausītāju notikumam DOMContentLoaded, kas tiek izpildīts, kad sākotnējais HTML dokuments ir pilnībā ielādēts.
document.addEventListener('DOMContentLoaded', function() {
 // izveido jaunu URLSearchParams objektu no vaicājuma parametriem pašreizējā URL.
    const queryParams = new URLSearchParams(window.location.search);
 // no URL izgūst vaicājuma parametra ar nosaukumu 'name' vērtību.
    const habitName = queryParams.get('name');
// pārbauda, vai mainīgais habitName satur patiesu vērtību.
    if (habitName) {
//ja vaicājuma parametros tiek atrasts ieraduma nosaukums, tiek izsaukta populateFormForEditing funk., kas ir atbildīga pa veidlapas aizpildīšanu ar datiem, un saistīta ar rediģēšanas ieradumu.
        populateFormForEditing(habitName);
    }
// izvēlas formas elementu rediģēšanas paradumiem
    const editHabitForm = document.getElementById('edit-habit-form');
// pievieno notikumu klausītāju veidlapas iesniegšanai
    editHabitForm.addEventListener('submit', function(e) {
// novērš veidlapas iesniegšanas noklusējuma darbību un tiek izsaukta updateHabit funk., kas ļauj atjaunināt ieraduma datus.
        e.preventDefault();
        updateHabit(habitName);
    });
});
// funkcija, lai aizpildītu veidlapas laukus ar ieraduma datiem priekš rediģēšanas.
function populateFormForEditing(habitName) {
// iegūst ieraduma sarakstu no lokālās krātuves vai palaiž tukšu masīvu.
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
// atrod ieradumu ar atbilstošu nosaukumu no saraksta    
    const habitToEdit = habits.find(habit => habit.name === habitName);
 // Ja netiek atrasts atbilstošs ieradums, iziet no funkcijas   .
    if (!habitToEdit) return;
// aizpilda veidlapu laukus ar ieraduma datiem.
    document.getElementById ('habit-name').value = habitToEdit.name;
    document.getElementById ('habit-description').value = habitToEdit.description;
    document.getElementById ('habit-category').value = habitToEdit.category;
    document.getElementById ('habit-frequency').value = habitToEdit.frequency;
    document.getElementById ('habit-timeframe').value = habitToEdit.timeframe;
    document.getElementById ('habit-difficulty').value = habitToEdit.difficulty;
    document.getElementById ('habit-type').value = habitToEdit.type;
    document.getElementById ('habit-goal').value = habitToEdit.goal;
}
// funkcija, lai atjauninātu ieraduma datus lokālajā krātuvē.
function updateHabit(originalName) {
// iegūst atjauninātus ieraduma datus no veidlapas laukiem.
    const habitData = {
        name: document.getElementById('habit-name').value.trim(),
        description: document.getElementById('habit-description').value.trim(),
        category: document.getElementById('habit-category').value,
        frequency: document.getElementById('habit-frequency').value,
        timeframe: document.getElementById('habit-timeframe').value,
        difficulty: document.getElementById('habit-difficulty').value,
        type: document.getElementById('habit-type').value,
        goal: document.getElementById('habit-goal').value.trim(),
    };
//iegūst ieraduma sarakstu no lokālās krātuves vai palaiž tukšu masīvu
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
    // atrod sarakstā atjaunināto ieraduma indeksu
    const habitIndex = habits.findIndex(habit => habit.name === originalName);
// Ja tiek atrasts atjaunotais ieradums
    if (habitIndex !== -1) {
// atjaunina ieraduma datus sarakstā
        habits[habitIndex] = { ...habits[habitIndex], ...habitData };
// atjaunināto ieradumu sarakstu ieliek atpakaļ vietējā krātuvē
        localStorage.setItem('habits', JSON.stringify(habits));
//izmetas paziņojums, ka rediģētais ieradums ir atjaunots veiksmīgi.
        alert('Habit updated successfully!');
//Aizmet lietotāju atpakaļ uz mainpage
        window.location.href = 'index.html'; 
    } else {
        alert('Habit not found.');
    }
}
