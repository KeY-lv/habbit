
//Gaida priekš DOM conent pilnas ielāds pirms palaiž initializePage funkc.
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});
//izsauc inicializācijas funkciju priekš vaiŗāk fīčām lapā
function initializePage() {
//Rate sistēma preikš katra resursa, ko lietotājs var ielikt no 1-5
    setupRatingSystem();
//Ielādē datus no lokālās krātuves.
    loadAllData();
//Displejo saraksti, kas ir izveidota
    displayLists();
}
// funkcijas izveide priekš vērtēšanas skalas katram krājumam resursa kategorijā.
function setupRatingSystem() {
// Atlasa visus saraksta elementus resursu kategorijā un iestatata katram novērtējumu.
    document.querySelectorAll('.resource-category li').forEach(item => {
        // iegūst pašreizējā resursa  ID.
        const resourceId = item.getAttribute('id');
        //atrod rating div priekš šī item.
        const ratingElement = document.getElementById('rating-' + resourceId);
        //aizpilda rating div ar saderīgo html.
        ratingElement.innerHTML = generateRatingHTML(resourceId);
    });
}
//uzgenere html prieks rating dropdownmenu.
function generateRatingHTML(id) {
// saglabā vērtējumu lokālajā krātuvē, ja ir atlasīts jauns vērtējums.
    const rating = localStorage.getItem(id + '-rating') || 'Rate'; //iegūst saglabāto vērtību vai izmanto "rate"kā default.
// izveio  dropdown ar vērtēšanas opcijām.
    return `<select onchange="saveRating(this.value, '${id}')">
            <option disabled selected>${rating}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>`;
}
//saglabā izvēlēto rating vērtību, lokālajā krātuvē.
function saveRating(value, id) {
//saglabā rating vērtību zem specifiska id.
    localStorage.setItem(id + '-rating', value);
//paziņo lietotājam, kas rates ir saglabāts.
    alert(`Rating saved: ${value}`);
}
//funkcijai priekš notiem grāmatas sadaļā
function setupNotes() {
    document.querySelectorAll('#books .resource-category li').forEach(item => {
    //dabū id katram grāmatas itemam.
        const resourceId = item.getAttribute('id');
        //ieslēdz note veidlapu katrai grāmatai.
        toggleNoteForm(resourceId);
    });
}
//ieslēdz funk. lai displayot note form.
function toggleNoteForm(id) {
    //iegūst note container.
    const noteDiv = document.getElementById('note-' + id);
    const savedNote = localStorage.getItem(id + '-note') || '';//iegūst jau saglabātus notes.Un  displayo textarea ar jau saglabātiem notes.
    noteDiv.innerHTML = `<textarea id='text-${id}'>${savedNote}</textarea> 
                         <button onclick="saveNote('${id}')">Save Note</button>`;//pievieno save pogu, onclick.
}
//saglabā note uz lokālokrātuvi.
function saveNote(id) {
    const noteText = document.getElementById('text-' + id).value;//iegust text no textarea.
    if (noteText.trim()) {
        //saglabā note sem specifiska id
        localStorage.setItem(id + '-note', noteText);
        //ziņo lietotājam, ka notes ir savots
        alert('Note saved for ' + id);
        //pretējā gadijumā izmet paziņojumu, kas notes ir tukšs.
    } else {
        alert('Note cannot be empty.');
    }
}
//izdzēšs note no lokalās krātuves
function deleteNote(id) {
    //idzēšs jau saglabāto note.
    localStorage.removeItem(id + '-note');
    //izdzēš textarea.
    document.getElementById('text-' + id).value = '';
    //izmet lietotājam brīdinājumu, ka notes ir dzēsts.
    alert('Note deleted for ' + id);
}
//ielādē visus datus no resource 
function loadAllData() {
//dabū id priekš katra item.
    document.querySelectorAll('.resource-category li').forEach(item => { 
        const id = item.getAttribute('id');
        if (id.startsWith('book')) {
            toggleNoteForm(id); // palaiž note form, ja tas ir grāmatas item.
        }
    });
}
//funck priekš new custome list izveides.
function createNewList() {
    //pasaka, lai lietotājs ievada list nosaukumu.
    const listName = prompt('Enter a name for your new list:');
    if (listName) {
        //dabū jau eksistējošu saraksti vai palaiž tukšu masīvu.
        const lists = JSON.parse(localStorage.getItem('customLists') || '[]');
        //pievieno new list
        lists.push({name: listName, items: []});
        //saglabā atjaunoto lists.
        localStorage.setItem('customLists', JSON.stringify(lists));
        displayLists();//displayo lists.
    }
}
//funck. priekš custome list-delete
function deleteList(index) {
    //iegūst eksistējošo listu
    const lists = JSON.parse(localStorage.getItem('customLists') || '[]');
    //izdzēš list ar specifisko index.
    lists.splice(index, 1);
    //saglabā atjaunināto list pēc izdzēšanas
    localStorage.setItem('customLists', JSON.stringify(lists));
    displayLists();//atjaunināto sarakstu izsauc lai displayot
}
//Pievieno notes funkc katram custome listam.
function addNoteToList(listIndex) {
    //pasaka lietotājam, lai ievada notes.
    const noteText = prompt('Enter your note:');
    if (noteText) {
        const lists = JSON.parse(localStorage.getItem('customLists') || '[]'); //dabūt jau eksistējošu lists.
        lists[listIndex].items.push(noteText); // pievieno note tam specifiskajam sarakstam.
        localStorage.setItem('customLists', JSON.stringify(lists)); //saglabā atjaunināto sarakstu.
        displayLists();//atjauno lista displeju.
    }
}
//Displayo visus custome listus.
function displayLists() {
    //iegūst konteiner priekš sarakstu parādīšanas
    const listsContainer = document.getElementById('lists-container');
    listsContainer.innerHTML = ''; //clearo konteineru.
    const lists = JSON.parse(localStorage.getItem('customLists') || '[]');//dabū eksistējošos lists
    lists.forEach((list, listIndex) => { // new div priekš katra list.
        const div = document.createElement('div');
        //aizpilda div ar lists nosaukumu un dzēšanas pogu.
        div.innerHTML = `<strong>${list.name}</strong> <button onclick="deleteList(${listIndex})">Delete List</button>`;
        //izveido  list prikš items.
        const ul = document.createElement('ul');
        list.items.forEach((item, noteIndex) => {
         //izveido list item priekš katra note.
            const li = document.createElement('li');
            //ieseto texta saturu priekš note.
            li.textContent = item;
            ul.appendChild(li);
        });
        //poga priekš adding
        const addNoteButton = document.createElement('button');
        //ieseto button text
        addNoteButton.textContent = 'Add Note';
        //ieseto onlick event priekš add note.
        addNoteButton.onclick = () => addNoteToList(listIndex);
        div.appendChild(ul);//pievieno sarakstu div
        div.appendChild(addNoteButton);//pievieno add note pogu priekš div
        listsContainer.appendChild(div);//pievieno div sarakstu konteineram.
    });
}
