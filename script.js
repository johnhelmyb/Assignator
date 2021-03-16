let inputName = document.getElementById("name");                // Input name
let listName = document.getElementById("listName");             // Ul names
let names = listName.children;                                  // Li names
let buttonName = document.getElementById("buttonName");         // Button add name

let inputVeille = document.getElementById("veille");            // Input veille
let listVeille = document.getElementById("listVeille");         // Ul veilles
let buttonAssign = document.getElementById("buttonAssign");     // Button assign

let buttonRefresh = document.getElementById("refresh");         // Button refresh
let buttonClear = document.getElementById("clear");             // Button clear


/* -------------------------- Ajouter un nom --------------------------- */
addName = () => {
    if (inputName.value === "") {                                // Si la valeur de l'input ne correspond à rien...
        return null;                                             // ... on return null et le reste de la fonction ne s'éxecute pas
    }

    let newName = document.createElement("li");                  // On crée un élément <li>
    newName.innerHTML = inputName.value;                         // On écrit dans cet élément la valeur de l'input name
    listName.appendChild(newName);                               // Ce nouvel élément <li> devient enfant de <ul> names
    inputName.value = "";                                        // La valeur de l'input est réinitialisée

    localStorage.setItem('namesItems', listName.innerHTML);      // On stock dans la mémoire tout notre <ul> names
};

buttonName.onclick = () => {                                     // Quand on clique sur le bouton add name...
    addName();                                                   // ... la fonction addName() est appelée
};

inputName.onkeyup = (event) => {                                 // Quand une touche est pressée dans l'input name...
    if (event.keyCode === 13) {                                  // ... si c'est la touche Entrée...
        addName();                                               // ... la fonction addName() est appelée
    }

};


/* --------------- Ajouter une veille et assigner un nom -----------*/
assignRandom = () => {
    let namesNotCrossed = [];                                                   // On crée un array vide

    for (let i = 0; i < names.length; i++) {                                    // On va itérer à travers tous les éléments <li> names
        if (names[i].className != "crossed") {                                  // Si un élément n'a pas la classe #crossed...
            namesNotCrossed.push(names[i]);                                     // ...on l'ajoute à notre array vide qui ne contiendra alors que les <li> n'ayant pas la classe #crossed
        }
    }

    if (namesNotCrossed.length === 0) {                                         // Si l'array namesNotCrossed est vide et donc que tous les <li> on déjà la classe #crossed...
        window.alert("No student available")                                    // ... on appelle la fonction alert()...
        return null;                                                            // ... on return null et le reste de la fonction ne s'éxecute pas
    } else {                                                                    // Sinon...
        let nameRandom = namesNotCrossed[Math.floor((Math.random()) * namesNotCrossed.length)]; // ... on assigne à la variable nameRandom l'un des éléments <li> de l'array namesNotCrossed au hasard...
        nameRandom.classList.add("crossed");                                    // ... on lui ajoute la classe #crossed...
        let content = nameRandom.innerHTML;                                     // ... on assigne à la variable content le contenu de son Html...
        return content;                                                         // ... et on return content
    }
};

addVeille = () => {
    if (inputVeille.value === "") {                                             // Si la valeur de l'input ne correspond à rien...
        return null;                                                            // ... on return null et le reste de la fonction ne s'éxecute pas
    }

    let studentAvailable = assignRandom();                                      // On stock dans la variable studentAvailable le résulat de la fonction assignRandom()

    if (studentAvailable) {                                                     // Si ce résultat correspond à quelque chose...
        let newVeille = document.createElement("li");                           // ... on crée un élément <li>...
        newVeille.innerHTML = inputVeille.value + " - " + studentAvailable;     // ... on écrit dans cet élément la valeur de l'input veille et le résultat de la fonction assignRandom()...
        listVeille.appendChild(newVeille);                                      // ... ce nouvel élément <li> devient enfant de <ul> veilles...
        inputVeille.value = "";                                                 // ... et la valeur de l'input est réinitialisée
        localStorage.setItem('veilleItems', listVeille.innerHTML);              // On stock dans la mémoire tout notre <ul> veilles
        localStorage.setItem('namesItems', listName.innerHTML);                 // On stock dans la mémoire tout notre <ul> names
    }
};



buttonAssign.onclick = () => {                                                  // Quand on clique sur le bouton assign...       
    addVeille();                                                                // ... la fonction addVeille() est appelée
};

inputVeille.onkeyup = (event) => {                                              // Quand une touche est pressée dans l'input veille...
    if (event.keyCode === 13) {                                                 // ... si c'est la touche Entrée...
        addVeille();                                                            // ... la fonction addVeille() est appelée
    }
};



/* -------------------------- Bouton refresh -------------------------*/
refresh = () => {
    for (let i = 0; i < names.length; i++) {                                   // On va itérer à travers tous les éléments <li> names
        if (names[i].className === "crossed") {                                // Si un élément a la classe #crossed...
            names[i].classList.remove("crossed");                              // ... on lui supprime la classe #crossed
        }
    }
    localStorage.setItem('namesItems', listName.innerHTML);                    // On stock dans la mémoire tout notre <ul> names
}

buttonRefresh.onclick = () => {                                                // Quand on clique sur le bouton refresh...
    refresh();                                                                 // ... la fonction refresh() est appelée
}



/*--------------------------- Local storage ------------------------- */
let savedNames = localStorage.getItem('namesItems');                           // On assigne à la variable savedNames notre <ul> names qu'on avait stocké dans la mémoire

if (savedNames) {                                                              // Si savedNames correspond à quelque chose...
    listName.innerHTML = savedNames;                                           // ... le contenu Html de <ul> names est maitenant ce qu'on avait stocké dans la mémoire
}

let savedVeilles = localStorage.getItem('veilleItems');                        // On assigne à la variable savedVeilles notre <ul> veilles qu'on avait stocké dans la mémoire

if (savedVeilles) {                                                            // Si savedVeilles correspond à quelque chose...
    listVeille.innerHTML = savedVeilles;                                       // ... le contenu Html de <ul> veilles est maintenant ce qu'on avait stocké dans la mémoire
}

buttonClear.onclick = () => {                                                  // Quand on clique sur le bouton clear...
    localStorage.clear();                                                      // ... on efface les données de la mémoire...
    document.location.reload(true);                                            // ... et la page est automatiquement refresh
}