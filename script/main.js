document.getElementById("atomBtn").addEventListener("click", createAtoms);

var upgradeElems = document.querySelectorAll('#upgrades p');
for (var i = 0; i < 10; i++) {
    upgradeElems[i].style.display = 'none';
}

function createAtoms() {
    var atomCountElem = document.getElementById("atomCount");
    atomCount = parseInt(atomCountElem.textContent);

    atomCount += Math.floor(Math.random() * 10) + 1;
    atomCountElem.textContent = atomCount;
}

