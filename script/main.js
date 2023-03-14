var upgrades = new Upgrades();

document.getElementById("atomBtn").addEventListener("click", createAtoms);
document.getElementById("ebsBtn").addEventListener("click", upgrades.purchase);
document.getElementById("ucfBtn").addEventListener("click", upgrades.purchase);

class Upgrades {
    constructor() {
        this.upgradeElems = document.querySelectorAll('#upgrades p');
        this.upgradeCosts = []
        for (var i = 0; i < this.upgradeElems.length; i++) {
            // get the cost of the upgrade (last element in the p tag)
            var cost = parseInt(this.upgradeElems[i].lastElementChild.textContent);
            this.upgradeCosts.push(cost);

            this.upgradeElems[i].style.display = 'none';
        }
    }

    get costs() {
        return this.upgradeCosts;
    }

    setElementVisibility(index, visibility) {
        if (visibility) {
            this.upgradeElems[index].style.display = 'block';
        }
        else {
            this.upgradeElems[index].style.display = 'none';
        }
    }

    purchase() {
        var upgrade = this.parentElement;
        var cost = parseInt(upgrade.lastElementChild.textContent);
        if (atomCount >= cost) {
            updateAtoms(-cost);
        }
    }
}

function createAtoms() {
    updateAtoms(Math.floor(Math.random() * 10) + 1);
}

function updateAtoms(amount) {
    var atomCountElem = document.getElementById("atomCount");
    atomCount = parseInt(atomCountElem.textContent);
    atomCount += amount;
    atomCountElem.textContent = atomCount;

    for (var i = 0; i < upgrades.costs.length; i++) {
        if (atomCount > upgrades.costs[i] * 0.8) {
            upgrades.setElementVisibility(i, true);
        }
    }
}

function updateButton(name, value) {
    var button = document.getElementById(name);
    button.textContent = value;
}

function getButton(name) {
    return document.getElementById(name);
}
