class Game {
    constructor() {
        this.additive = 1;
        this.multiplicative = 1;
        this.passive = 0;
        this.upgrades = new UpgradeList();

        this.createAtoms = this.createAtoms.bind(this);

    }

    updateAtoms(amount) {
        var atomCountElem = document.getElementById("atomCount");
        var atomCount = parseInt(atomCountElem.textContent);
        atomCount += amount;
        atomCountElem.textContent = atomCount;
    
        this.upgrades.updateVisibility(atomCount);
    }
S
    getAtoms() {
        return parseInt(document.getElementById("atomCount").textContent);
    }

    createAtoms() {
        this.updateAtoms(Math.floor((Math.random() * 10 + this.additive) * this.multiplicative));
    }

    purchaseUpgrade(name, effect_type = "additive", effect_amount = 1) {
        if (!(this.upgrades.purchase(name, this.getAtoms()))) {
            return;
        }

        this.updateAtoms(-this.upgrades.getUpgrade(name).cost);
        this.upgrades.increaseCost(name);
        if (effect_type == "additive") {
            this.additive += effect_amount;
        } 
        else if (effect_type == "multiplicative") {
            this.multiplicative += effect_amount;
        }
        else if (effect_type == "passive-additive") {
            this.passive += effect_amount;
        }
        else if (effect_type == "passive-multiplicative") {
            this.passive *= effect_amount;
        }
    }
}

class Upgrade {
    constructor(elem, name, cost) {
        this.elem = elem;
        this.name = name;
        this.cost = cost;
        this.amount = 0;

        this.elem.style.display = "none";
    }

    updateElement() {
        this.elem.firstElementChild.textContent = this.amount;
        this.elem.lastElementChild.textContent = this.cost;
    }

    setCost(cost) {
        this.cost = cost;
        this.updateElement();
    }

    setAmount(amount) {
        this.amount = amount;
        this.updateElement();
    }

    makeVisible() {
        this.elem.style.display = "block";
    }
}

class UpgradeList {
    constructor() {
        // get upgrade class from html
        this.upgradeElems = document.getElementsByClassName("upgrade");
        this.upgrades = [];
        console.log(this.upgradeElems.length)

        for (var i = 0; i < this.upgradeElems.length; i++) {
            var upgrade = new Upgrade(
                this.upgradeElems[i], 
                this.upgradeElems[i].firstElementChild.id, 
                this.upgradeElems[i].lastElementChild.textContent
            );
            this.upgrades.push(upgrade);
        }
    }

    getUpgrade(name) {
        for (var i = 0; i < this.upgrades.length; i++) {
            if (this.upgrades[i].name == name) {
                return this.upgrades[i];
            }
        }
    }

    updateVisibility(balance) {
        for (var i = 0; i < this.upgrades.length; i++) {
            if (balance > (this.upgrades[i].cost * 0.8)) {
                this.upgrades[i].makeVisible();
            }
        }
    }

    purchase(name, balance) {
        var upgrade = this.getUpgrade(name);
        if (upgrade.cost > balance) {
            return false
        }

        upgrade.setAmount(upgrade.amount + 1);
        return true;
    }

    increaseCost(name) {
        this.getUpgrade(name).setCost(Math.round(this.getUpgrade(name).cost * 1.2));
    }
}


var game = new Game();

setInterval(async function() {
    await game.updateAtoms(Math.round(game.passive)); 
    }, 200);

document.getElementById("atomBtn").addEventListener("click", game.createAtoms);
document.getElementById("ebsBtn").addEventListener("click", () => game.purchaseUpgrade("ebsBtn", "additive", 10));
document.getElementById("ucfBtn").addEventListener("click", () => game.purchaseUpgrade("ucfBtn", "multiplicative", 0.15));
document.getElementById("wnfBtn").addEventListener("click", () => game.purchaseUpgrade("wnfBtn", "passive-additive", 50));
document.getElementById("snfBtn").addEventListener("click", () => game.purchaseUpgrade("snfBtn", "passive-multiplicative", 1.2));




