class Game {
    constructor() {
        this.upgrades = new Upgrades();
        this.additive = 1;
        this.multiplicative = 1;

        this.createAtoms = this.createAtoms.bind(this);
    }

    updateAtoms(amount) {
        var atomCountElem = document.getElementById("atomCount");
        var atomCount = parseInt(atomCountElem.textContent);
        atomCount += amount;
        atomCountElem.textContent = atomCount;
    
        for (var i = 0; i < this.upgrades.costs.length; i++) {
            if (atomCount > this.upgrades.costs[i] * 0.8) {
                this.upgrades.setElementVisibility(i, true);
            }
        }
    }

    createAtoms() {
        this.updateAtoms(Math.floor(Math.random() * 10) * this.multiplicative + this.additive);
    }
}


var game = new Game();

document.getElementById("atomBtn").addEventListener("click", game.createAtoms);
document.getElementById("ebsBtn").addEventListener("click", game.upgrades.purchase);
document.getElementById("ucfBtn").addEventListener("click", game.upgrades.purchase);




