// largeur et hauteur de la fenêtre
let width = window.innerWidth;
let height = window.innerHeight;

// création du canvas
let canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;

// init du context de dessin 2D
let ctx = canvas.getContext('2d');

// ajout d'un fond bleu nuit
ctx.fillStyle = '0C546F';
ctx.fillRect(0, 0, width, height);

// fonction aléatoire
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// 1.créez un constructeur pour notre objet Balle, qui définit sa couleur, sa taille et sa position de départ
function Balle(couleur, taille, x, y, vitesseX, vitesseY) {
    this.couleur = couleur;
    this.taille = taille;
    this.x = x;
    this.y = y;

    // 5 : ajouter 2 propriétés vitesseX et vitesseY au constructeur Balle
    this.vitesseX = vitesseX;
    this.vitesseY = vitesseY;

}


// 2.ajouter à son prototype une fonction "draw" qui dessine la balle sur le canvas
Balle.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.couleur;
    ctx.arc(this.x, this.y, this.taille, 0, 2 * Math.PI);
    ctx.fill();
}

Balle.prototype.bouger = function () {

    if ((this.x + this.vitesseX) > (width - this.taille)) {
        this.vitesseX = -this.vitesseX;
    }

    if ((this.x + this.vitesseX) < (0 + this.taille)) {
        this.vitesseX = -this.vitesseX;
    }

    if ((this.y + this.vitesseY) > (height - this.taille)) {
        this.vitesseY = -this.vitesseY;
    }

    if ((this.y + this.vitesseY) < (0 + this.taille)) {
        this.vitesseY = -this.vitesseY;
    }

    this.x += this.vitesseX;
    this.y += this.vitesseY;

}

// 3.définisez un tableau et ajoutez-y 25 balles aléatoires
let tab = [];
for (let i = 0; i < 25; i++) {
    let couleur = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
    let taille = random(10, 30);
    let x = random(taille, width - taille);
    let y = random(taille, height - taille)

    // ajouter une initialisation aléatoire lors de la création des balles, entre -7 et 7
    let vitesseX = random(-7, 7);
    let vitesseY = random(-7, 7);
    let balle = new Balle(couleur, taille, x, y, vitesseX, vitesseY);
    tab.push(balle);
}


Balle.prototype.testCollision = function () {
    for (let i = 0; i < tab.length; i++) {
        if (!(this === tab[i])) {
            let dx = this.x - tab[i].x;
            let dy = this.y - tab[i].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.taille + tab[i].taille) {
                this.couleur = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
}


function affichage() {
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 25; i++) {
        let balle = tab[i];
        balle.bouger();
        balle.testCollision(); //change la couleur en cas de collision
        balle.draw();
    }
    requestAnimationFrame(affichage);
}
affichage();





//ctx.clearRect(0, 0, canvas.width, canvas.height);
