let points = 0;
const pointsCounter = document.getElementById("pointsCounter");
const rank = document.getElementById("rank");

const activeActions = document.getElementById("activeActions");

const newActionButton = document.getElementById("newAction");

const actionsPanel = document.getElementById("actions");
const closeActionsButton = document.getElementById("closeActions")

const plasticAction = document.getElementById("plastic");
const energyAction = document.getElementById("energy");
const waterAction = document.getElementById("water");
const saplingAction = document.getElementById("sapling");

newActionButton.onclick = function () {
    actionsPanel.style.display = "";
    newActionButton.style.display = "none";
}

closeActionsButton.onclick = function () {
    newActionButton.style.display = "";
    actionsPanel.style.display = "none";
}

class Action {
    constructor (title = "", unit = "", pointsMultiplier = 0) {
        let thisAction = this;
        this.points = 0;

        const actionDiv = document.createElement("div");
        actionDiv.className = "activeAction";

        const actionContent = document.createElement("div");
        actionContent.className = "activeActionContent";
        actionDiv.appendChild(actionContent);

        const actionTitle = document.createElement("div");
        actionTitle.className = "activeActionTitle";
        actionTitle.textContent = title;
        actionContent.appendChild(actionTitle);

        const quantity = document.createElement("div");
        actionContent.appendChild(quantity);

        const quantityText = document.createElement("span");
        quantityText.textContent = "Cantitate:";
        quantity.appendChild(quantityText);
        quantity.appendChild(document.createTextNode(" "));

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = 0;
        quantityInput.style.width = "48px";
        quantity.appendChild(quantityInput);
        quantity.appendChild(document.createTextNode(" "));
        quantityInput.onkeydown = function (event) {
            if (event.key == "Enter") {
                quantityInput.blur();
            }
        }
        quantityInput.onfocus = function () {
            quantityInput.select();
        }
        quantityInput.onblur = function () {
            if (quantityInput.value.length == 0) {
                quantityInput.value = 0;
            }

            let value = quantityInput.valueAsNumber;
            value = Math.max(value, 0);
            value = Math.min(value, 10000);
            value = Math.round(value);

            quantityInput.value = value;

            thisAction.points = value * pointsMultiplier;
            let wording = " puncte)";
            if (thisAction.points == 1) {
                wording = " punct)"
            } else if (thisAction.points > 19) {
                wording = " de puncte)";
            }

            quantityPoints.textContent = "(" + thisAction.points + wording;
        }

        const quantityUnit = document.createElement("span");
        quantityUnit.textContent = unit;
        quantity.appendChild(quantityUnit);
        quantity.appendChild(document.createTextNode(" "));

        const quantityPoints = document.createElement("span");
        quantityPoints.className = "pointsInfo";
        quantityPoints.textContent = "(0 puncte)";
        quantity.appendChild(quantityPoints);

        const finishButton = document.createElement("div");
        finishButton.className = "activeActionFinish";
        finishButton.textContent = "Gata!";
        actionDiv.appendChild(finishButton);
        finishButton.onclick = function () {
            points += thisAction.points;

            let wording = " puncte";
            if (points == 1) {
                wording = " punct"
            } else if (points > 19) {
                wording = " de puncte";
            }

            pointsCounter.textContent = points + wording;

            actionDiv.remove();
            thisAction = null;
        }

        activeActions.appendChild(actionDiv);
    }
}

plasticAction.onclick = function () {
    newActionButton.style.display = "";
    actionsPanel.style.display = "none";
    new Action("Plastic reciclat", "g", 1);
}

energyAction.onclick = function () {
    newActionButton.style.display = "";
    actionsPanel.style.display = "none";
    new Action("Energie economisită", "Wh", 1);
}

waterAction.onclick = function () {
    newActionButton.style.display = "";
    actionsPanel.style.display = "none";
    new Action("Apă economisită", "L", 8);
}

saplingAction.onclick = function () {
    newActionButton.style.display = "";
    actionsPanel.style.display = "none";
    new Action("Puieți plantați", "", 3500);
}