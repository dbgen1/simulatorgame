function toNumString(number) {
    if (number <= 10000000) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else {
        var exponent = Math.floor(Math.log10(number));
        var mantissa = number / Math.pow(10, exponent);
        return mantissa.toFixed(4) + "e" + exponent;
    }
}


class Game {
    constructor() {
        this.atoms = 100000000;

        this.additive = 1;
        this.multiplicative = 1;
        this.passive = 0;
        this.upgrades = new UpgradeList();

        this.createAtoms = this.createAtoms.bind(this);
    }

    updateAtoms(amount) {
        var atomCountElem = document.getElementById("atomCount");
        this.atoms += amount;
        atomCountElem.textContent = toNumString(this.atoms);
    
        this.upgrades.updateVisibility(this.atoms);
    }

    createAtoms() {
        this.updateAtoms(Math.floor((Math.random() * 10 + this.additive) * this.multiplicative));
    }

    purchaseUpgrade(name, effect_type = "additive", effect_amount = 1) {
        if (!(this.upgrades.purchase(name, this.atoms))) {
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
    constructor(elem, name, cost, type) {
        this.type = type
        this.elem = elem;
        this.name = name;
        this.cost = cost;
        this.amount = 0;

        this.elem.style.display = "none";
    }

    updateElement() {
        this.elem.firstElementChild.textContent = toNumString(this.amount);
        this.elem.lastElementChild.textContent = toNumString(this.cost);
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

    hide() {
        this.elem.style.display = "none";
    }
}

class UpgradeList {
    constructor() {
        // get upgrade class from html
        this.upgradeElems = document.getElementsByClassName("upgrade");
        this.permUpgradeElems = document.getElementsByClassName("permUpgrade");
        this.upgrades = [];
        this.permUpgrades = [];

        for (var i = 0; i < this.upgradeElems.length; i++) {
            var upgrade = new Upgrade(
                this.upgradeElems[i], 
                this.upgradeElems[i].firstElementChild.id, 
                this.upgradeElems[i].lastElementChild.textContent,
                "normal"
            );
            upgrade.updateElement();
            this.upgrades.push(upgrade);
        }

        for (var i = 0; i < this.permUpgradeElems.length; i++) {
            var upgrade = new Upgrade(
                this.permUpgradeElems[i], 
                this.permUpgradeElems[i].children[1].id, 
                this.permUpgradeElems[i].lastElementChild.textContent,
                "permanent"
            );
            upgrade.updateElement();
            this.permUpgrades.push(upgrade);
        }
    }

    getUpgrade(name) {
        for (var i = 0; i < this.upgrades.length; i++) {
            if (this.upgrades[i].name == name) {
                return this.upgrades[i];
            }
        }
        for (var i = 0; i < this.permUpgrades.length; i++) {
            if (this.permUpgrades[i].name == name) {
                return this.permUpgrades[i];
            }
        }
    }

    updateVisibility(balance) {
        for (var i = 0; i < this.upgrades.length; i++) {
            if (balance > (this.upgrades[i].cost * 0.8)) {
                this.upgrades[i].makeVisible();
            }
        }
        for (var i = 0; i < this.permUpgrades.length; i++) {
            if (balance > (this.permUpgrades[i].cost * 0.8) && this.permUpgrades[i].amount == 0) {
                this.permUpgrades[i].makeVisible();
            }
        }
    }

    purchase(name, balance) {
        var upgrade = this.getUpgrade(name);
        if (upgrade.cost > balance) {
            return false
        }

        upgrade.setAmount(upgrade.amount + 1);
        if (upgrade.type == "permanent") {
            upgrade.hide();
        }
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
document.getElementById("hog1Btn").addEventListener("click", () => game.purchaseUpgrade("hog1Btn", "additive", 100000));



