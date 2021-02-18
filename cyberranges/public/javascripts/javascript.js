function updatePercentage(element) {

    // change element
    siblingSpan = element.nextElementSibling;
    console.log(element.value)
    siblingSpan.innerHTML = element.value + '%'

    // validate 
    var formInputLength = document.getElementsByTagName('input').length;
    var total = 0;

    // checking out the total 
    for (i = 0; i < formInputLength; i++) {
        total += parseInt(document.getElementsByTagName('input')[i].value);
    }

    // if the total is greater than 100, disable the buttons
    var nextSimulationButton = document.getElementById('nextButton');
    if (total > 100) {
        nextSimulationButton.disable = true;
    } else {
        nextSimulationButton.disable = false;
    }

}