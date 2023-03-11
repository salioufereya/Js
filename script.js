let test = document.querySelector(".test")
//boutonGenerateur
let boutonGenerer = document.getElementById('btnGenerer');
//copyPassword
let clipboard = document.getElementById("clipboard");
let copy_text = document.getElementById("copy_text")
//nombreCaracterePasse
let nCaractere = document.getElementById('nCaractere').value;
let verifiNombres = document.getElementById('nCaractere');
function getValue() {
    let nCaractere = document.getElementById('nCaractere').value;
    return nCaractere
}

//notifications
notifications = () => {
    var divNotif = document.createElement("div")
    divNotif.innerHTML = "Veillez saisir un nombre compris entre 1 et 20  <i class='fa-solid fa-square-xmark' style='margin-left:15px' id='btnAnnuler'></i>"
    divNotif.classList.add("divNotif")
    test.appendChild(divNotif)
    let btnAnnuler = document.getElementById('btnAnnuler')
    btnAnnuler.addEventListener('click', () => {
        divNotif.remove()
    })
    setTimeout(() => {
        divNotif.remove()
    }, 5000);
}


let controleSaisi = () => {

    var myArray = ["2", "1", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];

    if (myArray.indexOf(getValue()) === -1) {
        notifications()
    }
    else {
        return true
    }
}

//elements selectionnés
let ElementSelection = () => {
    let n = 0
    let inputSelectionne = document.querySelectorAll("input[type='checkBox']")
    for (let i = 0; i < inputSelectionne.length; i++) {
        if (inputSelectionne[i].checked == true) {
            n++;
        }
    }
    return n
}

//controleDeCorrespondance
function controleCorrespondance() {
    if (ElementSelection() > getValue()) {
        var divNotif = document.createElement("div")
        divNotif.innerHTML = "Error !!! <i class='fa-solid fa-square-xmark' style='margin-left:15px' id='btnAnnuler'></i>"
        divNotif.classList.add("divNotif")
        test.appendChild(divNotif)
        let btnAnnuler = document.getElementById('btnAnnuler')
        btnAnnuler.addEventListener('click', () => {
            divNotif.remove()
        })
        setTimeout(() => {
            divNotif.remove();
        }, 5000);

    }
    else {
        return true
    }
}
//messageEncasdeNonSelection
function messageNonSelection() {

    if (ElementSelection() <= 0) {
        var divNotif = document.createElement("div")
        divNotif.innerHTML = "Veillez  cocher au moins un type  <i class='fa-solid fa-square-xmark' style='margin-left:15px' id='btnAnnuler'></i>"
        divNotif.classList.add("divNotif")
        test.appendChild(divNotif)
        let btnAnnuler = document.getElementById('btnAnnuler')
        btnAnnuler.addEventListener('click', () => {
            divNotif.remove()
        })

        setTimeout(() => {
            divNotif.remove()
        }, 5000);
    } else {
        return true
    }

}


//les chaines de caracteres
let nombres = "1234567890";
let caratereSpeciaux = "@!#%&)-_><~+$¤="
let minuscules = "abcdefghijklmnopqrstuvwxyz";
let majuscules = minuscules.toUpperCase();


//recuperations des inputs selectiones
let nMajuscule = document.getElementById('nMajuscule')
let nMinuscule = document.getElementById('nMinuscule')
let caracSpeciaux = document.getElementById('caracSpeciaux')
let number = document.getElementById('nombre')
let generer = document.querySelector(".generer")
let genererTop = document.querySelector(".genererTop")


//concatener les tableaux
let tabElements = () => {
    var a = 0
    let object
    let tabElement = ""
    while (a < getValue()) {
        if ((number.checked == true) && a < getValue()) {
            let randomNumber = Math.floor(Math.random() * nombres.length)
            object = randomNumber
            tabElement = tabElement + object
            a++;
        }
        if ((nMajuscule.checked == true) && a < getValue()) {
            let randomNumber = Math.floor(Math.random() * majuscules.length)
            tabElement += majuscules[randomNumber]
            a++;
        }

        if ((nMinuscule.checked == true) && a < getValue()) {
            let randomNumber = Math.floor(Math.random() * minuscules.length)
            tabElement += minuscules[randomNumber]
            a++;
        }

        if (caracSpeciaux.checked == true && a < getValue()) {
            let randomNumber = Math.floor(Math.random() * caratereSpeciaux.length)
            tabElement += caratereSpeciaux[randomNumber]
            a++;
        }

    }

    return generer.textContent = tabElement


}




//generer
boutonGenerer.addEventListener('click', () => {
    if (messageNonSelection() && controleCorrespondance() && controleSaisi()) {
        tabElements()
    }
    
})


//masquer le bouton copier
clipboard.style.display = "none"

genererTop.addEventListener('mousemove', () => {
    clipboard.style.display = "block"
})
genererTop.addEventListener('mouseout', () => {
    clipboard.style.display = "none"
})


//copy password
clipboard.addEventListener('click', () => {

    if(generer.textContent==0){
        copy_text.textContent = "Rien à copier";
        copy_text.style.backgroundColor="red"
    }else{
    navigator.clipboard.writeText(generer.innerText);
    copy_text.textContent = "Password copied";
    copy_text.style.backgroundColor="green"
    copy_text.style.display = "block";
    }
    setTimeout(() => {
        copy_text.style.display = "none";
    }, 4000);
});
