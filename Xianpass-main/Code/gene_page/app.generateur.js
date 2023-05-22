// Déclaration des constantes et variables pour les éléments HTML et les caractères autorisés dans le mot de passe

const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input-box span"),
passwordInput = document.querySelector(".input-box input"),
passIndicator = document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn");

const characters = { // objet contenant les lettres, chiffres et symboles autorisés
lowercase: "abcdefghijklmnopqrstuvwxyz",
uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
numbers: "0123456789",
symbols: "^!$%&|{}:;.,*+-#@<>~"
}

// Définition de la fonction qui génère le mot de passe
const generatePassword = () => {
let staticPassword = "", // partie fixe du mot de passe
randomPassword = "", // partie aléatoire du mot de passe
excludeDuplicate = false, // exclusion de caractères en double
passLength = lengthSlider.value; // longueur du mot de passe définie par l'utilisateur.

    // Boucle à travers chaque case à cocher d'option
    options.forEach(option => {
        if(option.checked) { // si la case est cochée
             // si l'ID de la case n'est pas "exc-duplicate" et "spaces"
            if(option.id !== "exc-duplicate" && option.id !== "spaces") {
                // ajouter la valeur correspondante de l'objet characters à staticPassword
                staticPassword += characters[option.id];
            } else if(option.id === "spaces") { // si l'ID est "spaces"
                staticPassword += ` ${staticPassword} `; // ajouter un espace au début et à la fin de staticPassword
            } else { // sinon passer la valeur true à excludeDuplicate
                excludeDuplicate = true;
            }
        }
    });


// Boucle pour générer la partie aléatoire du mot de passe
    for (let i = 0; i < passLength; i++) {
        // Obtenir un caractère aléatoire de la partie fixe du mot de passe
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate) { // si l'option "exclure les caractères en double" est activée
            // si la partie aléatoire du mot de passe ne contient pas le caractère aléatoire actuel OU si le caractère aléatoire est un espace
            // ajouter le caractère aléatoire à la partie aléatoire du mot de passe, sinon décrémenter i de -1 pour recommencer la boucle
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else { // sinon ajouter simplement le caractère aléatoire à la partie aléatoire du mot de passe
            randomPassword += randomChar;
    }
    // Mettre à jour la valeur de l'élément input avec le mot de passe aléatoire généré
    passwordInput.value = randomPassword;
}
}


// Fonction qui met à jour l'indicateur de sécurité du mot de passe
const upadatePassIndicator = () => {
    // Si la valeur du curseur lengthSlider est inférieure à 8, l'ID de l'indicateur est "weak", 
    // sinon si la valeur est inférieure à 16, l'ID est "medium", sinon l'ID est "strong".
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

// Fonction qui met à jour le curseur et génère un nouveau mot de passe
const updateSlider = () => {
    // Met à jour la valeur du compteur en utilisant la valeur du curseur
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    upadatePassIndicator();
}

// Met à jour le curseur et l'indicateur de sécurité lors de la première exécution de la page
updateSlider();

// Fonction qui copie le mot de passe généré dans le presse-papiers
const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value); // copie du mot de passe aléatoire
    copyIcon.innerText = "check"; // Changement de l'icône en tick
    copyIcon.style.color = "#4285F4";
    setTimeout(() => { // Après 1500 ms, l'icône redevient "copy_all"
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
}
    
// Ajout d'un événement click sur l'icône de copie pour déclencher la fonction copyPassword
copyIcon.addEventListener("click", copyPassword);

// Ajout d'un événement input sur le curseur pour déclencher la fonction updateSlider
lengthSlider.addEventListener("input", updateSlider);

// Ajout d'un événement click sur le bouton "Generate" pour déclencher la fonction generatePassword
generateBtn.addEventListener("click", generatePassword);