function isLocal() {
    return true;
}

function graphData() {
    loadXML(myModel);

    var infoSecurityPrimitive = findName("Information Security Investment");
    var threatManagementPrimitive = findName("Threat and Vulnerability management investment");
    var infoSharingPrimitive = findName("Information sharing investment");
    var trainingPrimitive = findName("Training investment");
    var businessContinuityPrimitive = findName("Business continuity management investment");

    setValue(infoSecurityPrimitive, parseInt(document.getElementById("infoSecurityId").value));
    setValue(threatManagementPrimitive, parseInt(document.getElementById("threatManagementId").value));
    setValue(infoSharingPrimitive, parseInt(document.getElementById("infoSharingId").value));
    setValue(trainingPrimitive, parseInt(document.getElementById("trainingId").value));
    setValue(businessContinuityPrimitive, parseInt(document.getElementById("businessContinuityId").value));

    var res = runModel(true);

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Week');
        data.addColumn('number', 'Vulnerabilities');
        data.addColumn('number', 'Technology');
        data.addColumn('number', 'Impact');
        data.addColumn('number', 'Training');

        var i = 0;
        while (i < res.periods) {
            // get my data to set the chart
            var weeks = parseInt(res.times[i]);
            var Vulnerabilities = parseInt(res.value(findName("Discovered Vulnerabilities"))[i]);
            var Technology = parseInt(res.value(findName("Technology"))[i]);
            var Impact = parseInt(res.value(findName("Impact"))[i]);
            var Training = parseInt(res.value(findName("Training"))[i]);

            data.addRows([[weeks, Vulnerabilities, Technology, Impact, Training]]);

            // Set chart options
            var options = {
                'title': 'General Cyber Resilience',
                'width': 400,
                'height': 300
            };

            console.log(data);

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.LineChart(document.getElementById('chart'));
            chart.draw(data, options);
            i++
        }
    }



}

// $(document).ready(callback());

// function callback() {

//     // controller settings
//     var simulateController = null;
//     var index = 0;

//     // load model
//     loadXML(myModel);
//     setPauseInterval(1);


//     // find primitive values
//     var infoSecurityPrimitive = findName("Information Security Investment");
//     var threatManagementPrimitive = findName("Threat and Vulnerability management investment");
//     var infoSharingPrimitive = findName("Information sharing investment");
//     var trainingPrimitive = findName("Training investment");
//     var businessContinuityPrimitive = findName("Business continuity management investment");

//     function logUpdate(res) {
//         // let put the last values that the user used on display every time
//         if (index !== 0) {
//             document.getElementById("infoSecurityId").value = res.lastValue(infoSecurityPrimitive);
//             document.getElementById("threatManagementId").value = res.lastValue(threatManagementPrimitive);
//             document.getElementById("infoSharingId").value = res.lastValue(infoSharingPrimitive);
//             document.getElementById("trainingId").value = res.lastValue(trainingPrimitive);
//             document.getElementById("businessContinuityId").value = res.lastValue(businessContinuityPrimitive);
//         }

//         // get google charts api
//         google.charts.load('current', { 'packages': ['corechart'] });
//         google.charts.setOnLoadCallback(drawChart);

//         // set up data inside nested function
//         function drawChart() {
//             var data = new google.visualization.DataTable();
//             data.addColumn('number', 'Week');
//             data.addColumn('number', 'Vulnerabilities');
//             data.addColumn('number', 'Technology');
//             data.addColumn('number', 'Impact');
//             data.addColumn('number', 'Training');

//             if (index === 0) {
//                 data.addRows([[0, 0, 0, 0, 0], [1, 1, 1, 1, 1]]);
//                 index = 2;
//             }

//             while (index < res.periods) {
//                 // get my data to set the chart
//                 var weeks = parseInt(res.times[index]);
//                 var Vulnerabilities = parseInt(res.value(findName("Discovered Vulnerabilities"))[index]);
//                 var Technology = parseInt(res.value(findName("Technology"))[index]);
//                 var Impact = parseInt(res.value(findName("Impact"))[index]);
//                 var Training = parseInt(res.value(findName("Training"))[index]);

//                 data.addRows([[weeks, Vulnerabilities, Technology, Impact, Training]]);

//                 // Set chart options
//                 var options = {
//                     'title': 'General Cyber Resilience',
//                     'width': 400,
//                     'height': 300
//                 };

//                 // Instantiate and draw our chart, passing in some options.
//                 var chart = new google.visualization.PieChart(document.getElementById('chart'));
//                 chart.draw(data, options);

//             }
//         }
//     }

//     function restartSimulation() {
//         // document.getElementById('chart').innerHTML = '';
//         console.log("restarting simulation");
//         index = 0;

//         runModel({
//             silent: true,
//             onPause: function (res) {
//                 logUpdate(res);
//                 simulateController = res;
//             },
//             onSuccess: function (res) {
//                 logUpdate(res);
//                 simulateController = null;
//             }
//         });
//     }

//     function updateSimulation() {
//         if (simulateController != null) {
//             simulateController.setValue(infoSecurityPrimitive, parseInt(document.getElementById("infoSecurityId").value));
//             simulateController.setValue(threatManagementPrimitive, parseInt(document.getElementById("threatManagementId").value));
//             simulateController.setValue(infoSharingPrimitive, parseInt(document.getElementById("infoSharingId").value));
//             simulateController.setValue(trainingPrimitive, parseInt(document.getElementById("trainingId").value));
//             simulateController.setValue(businessContinuityPrimitive, parseInt(document.getElementById("businessContinuityId").value));

//             simulatorController.resume();
//         } else {
//             alert("Simulation is at its final step, you must Restart to continue");
//         }
//     }

//     restartSimulation();
// }
