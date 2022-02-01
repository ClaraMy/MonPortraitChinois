// fonction pour ajouter le texte des analogies
function ajouteAnal(data) {
    data.forEach(function (f) {
        var blocAnal = document.createElement("div");
        blocAnal.innerHTML =
            '<div class="fenetre fenetre-invisible"  id="i' + f.number + '">'
                + '<section>'
                    + '<h3>'
                        + 'Si j’étais '
                        + '<span>'
                            + f.analogie 
                        + '</span>'
                        + ', je serais... '
                    + '</h3>'
                    + '<h2>'
                        + '<span>'
                            + f.valeur
                        + '</span>'
                    + '</h2>'
                    + '<div class = "img-container">'
                    + '<img src="' + f.url + '" alt="" class ="imageAnalogie" id = "img' + f.number + '">'
                    + '</div>'
                    + '<p class="texte">'
                        + '<span>'
                            + f.txt
                        + '</span>'
                    + '</p>'
                + '</section>'
            + '</div>';
        document.querySelector(".popup").append(blocAnal);
    });
}

// fonction pour ajouter les images des nacelles 
function ajouteNacelle(data) {
    data.forEach(function (n) {
        var imageNacelle = document.createElement("div");
        imageNacelle.innerHTML =
            '<img src="' + n.images + '" alt="' + n.alt + '" class="nacelle" id="n' + n.number + '">';
        document.querySelector(".img_nacelle").append(imageNacelle);

    })

    var count = 0
    document.querySelectorAll(".img_nacelle > div").forEach (function(classN) {
        count ++
        classN.classList.add("img" + count)
    })
}

// fonction qui permet d'ajouter le formulaire
function ajouteForm(data) {

    data.forEach(function (b) {
        var buttonForm = document.createElement("div");
        buttonForm.innerHTML =
            '<label for="' + b.forName + '">' + b.indication + '</label>'
            + '</br>'
            + '<input type="' + b.type + '" placeholder="' + b.placeholder + '" id="' + b.forName + '" name="' + b.forName + '"' 
            + 'required>'
            + '<br>'
        document.querySelector(".formulaire").append(buttonForm);
    })

    document.querySelectorAll(".formulaire > div").forEach (function(c){
        c.classList.add("input-container")
    })

    document.querySelector(".formulaire").innerHTML += 
    "<div class = 'input-container'><label for='accept' id='acceptCheck'> <input type='checkbox' name='accept'> J'autorise à ce que mes informations personnelles soient récupérées dans le cadre de ce projet </label></div>" + 
    "<br> <input type='submit' value=\"Et c'est parti !\">"

}

// ! L'unité est le vh
// Taille de la roue : 70 x 70 vh
// Taille d'une nacelle : 12 x 19 vh
// Position de la roue (7,79;10,52)
// Position du centre de la roue (42,79;45,52) car (35 + 7.79; 35 + 10,52)
//  + (diametre/2)*Math.sin(angle)


// Placement des naclles + animation
var diametre = 67;
var angle = (0.5) * Math.PI;

var numero = [1, 2, 3, 4, 5, 6, 7, 8];

// fonction qui chnager la position des nacelles
function bougeNacelle() {
    // angle = angle + ((0.0001)*Math.PI);
    angle += ((0.001) * Math.PI);
    numero.forEach(function (nombre) {
        angle += ((0.25) * Math.PI);
        var y = (43.52) + (diametre / 2) * Math.sin(angle);
        var x = (36.79) + (diametre / 2) * Math.cos(angle);
        // console.log(nombre)
        document.querySelector('#n' + nombre).style.left = '' + x + 'vh';
        document.querySelector('#n' + nombre).style.top = '' + y + 'vh';
        // document.querySelector('#n' + nombre).style.zIndex = 5 + nombre;
    })
}

// fonction pour l'événement clic sur la nacelle
function clicNacelle() {
    document.querySelectorAll('.nacelle').forEach(function (i) {
        i.addEventListener('click', function (e) {

            // juste un p'tit console.log pour vérifier que c'est bon
            console.log(e.target.getAttribute('id').replace("n", "i"));

            if (document.querySelector(".titre").classList.contains("pascache")) {
                document.querySelector(".pascache").classList.replace("pascache", "cache")
            }

            if (document.querySelector(".myName").classList.contains("pascache")) {
                document.querySelector(".pascache").classList.replace("pascache", "cache")
            }

            //pour vérifier si la popup est invisible ou non
            if (document.querySelector('.popup').classList.contains("popup-invisible")) {
                document.querySelector(".popup").classList.replace("popup-invisible", "popup-visible")
            }

            // pour supprimer le formulaire s'il est ouvert
            document.querySelector(".popupForm").classList.replace("form-visible", "form-invisible");

            // pour retirer les anciens textes
            document.querySelectorAll('.fenetre-visible').forEach(function (change) {
                change.classList.replace("fenetre-visible", "fenetre-invisible");
            })

            // pour ajouter le nouveau texte lié à la nacelle choisie/cliquée
            document.querySelector("#" + e.target.getAttribute('id').replace("n", "i")).classList.replace("fenetre-invisible", "fenetre-visible")
        })
    })
}

// fonction pour faire apparaître le formulaire
function clicForm() {
    document.querySelector('#n8').addEventListener('click', function () {
            document.querySelector('.popupForm').classList.replace("form-invisible", "form-visible")
        })
}

// fonction pour ouvrir les mentions légales
function clicMentionsLegales() {
    document.querySelector('.mentionsLegales').addEventListener('click', function (e) {
        document.querySelector('.volet').classList.replace('volet-invisible', 'volet-visible')
})
}

// fonction pour appeler la fonction suppTexte lorsque l'on clique sur n'importe où dans la page hormis la popup
function clicSuppTexte () {
    document.querySelector(".background").addEventListener('click', suppTexte)

    document.querySelector(".grande_roue").addEventListener('click', suppTexte)

    document.querySelector(".nuage").addEventListener('click', suppTexte)

    document.querySelector("footer").addEventListener('click', suppTexte)
}

// fonction pour fermer les mentions légales
function closeMentionsLegales() {
    document.querySelector('.cross').addEventListener('click', function (e) {
        document.querySelector('.volet').classList.replace('volet-visible', 'volet-invisible')
    })
}

// fonction pour lorsque l'on clique sur le bouton d'envoi, l'url de l'API se modifie avec les données renseignées
function envoi() {
    document.querySelector("input[type='submit']").addEventListener('click', function(e) {
        e.preventDefault();
        var urlVisitee = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=" + document.querySelector("#nom").value + "&courriel=" + document.querySelector("#email").value + "&message=Si j'étais..." + document.querySelector("#analogie").value + ", je serais ..." + document.querySelector("#valeurAnalogie").value + "parce que ..." + document.querySelector("#explication").value + "image : " + document.querySelector("#image").value;

        fetch(urlVisitee).then(function(response) {
            response.json().then(function(data){
                console.log("Réponse reçue : ")
                console.log(data);
                
                messCheck(data)
                clicNacelle();
                
                console.log(data);
                console.log(urlVisitee);
            })
        }) 
    })
}

// fonction pour récupérer les données du formulaire
function getValue() {
    document.querySelector("#analogie").addEventListener('keyup',function () {
        document.querySelector("#i8 > section > h3 > span").innerHTML = document.querySelector("#analogie").value
    })

    document.querySelector("#valeurAnalogie").addEventListener('keyup',function () {
        document.querySelector("#i8 > section > h2 > span").innerHTML = document.querySelector("#valeurAnalogie").value
    })

    document.querySelector("#explication").addEventListener('keyup',function () {
        document.querySelector("#i8 > section > p > span").innerHTML = document.querySelector("#explication").value
    })

    document.querySelector("#image").addEventListener('keyup',function () {
        var srcValue = document.querySelector("#image").value
        document.querySelector("#i8 > section > img").setAttribute ('src',srcValue)
    })
}

// fonction pour supprimer le texte apparant 
function suppTexte() {
    document.querySelector(".popup").classList.replace("popup-visible", "popup-invisible");
    document.querySelector(".titre").classList.replace("cache", "pascache")
    document.querySelector(".myName").classList.replace("cache", "pascache")
    document.querySelector(".popupForm").classList.replace("form-visible", "form-invisible");
}

// fonction pour dire que le message avec les données a bien été envoyé et enlever le texte + changer la nacelle pour montrer que c'est fait !
function messCheck(data) {

    document.querySelector(".popup").classList.replace("popup-visible", "popup-invisible");
    document.querySelector(".titre").classList.replace("cache", "pascache")
    document.querySelector(".popupForm").classList.replace("form-visible", "form-invisible");

    if (data.status == "success") {
        document.querySelector(".img8").innerHTML =
        '<img src="images/nacelles/nacelle8_formulaireCheck.svg" alt="Partie : Modifier le formulaire" class="nacelle" id="n8">';
        alert("Votre message a bien été envoyé !");
    }

    else {
        alert("Echec d'envoi.. Veuillez recommencer s'il-vous-plaît");
    }
}
// problème le statut est toujours "success" même si l'on ne renseigne rien dans le login, dans le mail..


// chargement du DOM :
document.addEventListener("DOMContentLoaded", function () {
    fetch('js/analogies.json').then(function (response) {
        response.json().then(function (data) {
            ajouteNacelle(data);
            ajouteAnal(data);
            clicNacelle();
            setInterval(bougeNacelle, 25);
            clicForm()
            clicMentionsLegales()
            closeMentionsLegales()
        })
    })

    fetch('js/formulaire.json').then(function (response) {
        response.json().then(function (data) {
            ajouteForm(data);
            getValue()
            suppTexte()
            clicSuppTexte ()
            envoi()
        })
    })
});