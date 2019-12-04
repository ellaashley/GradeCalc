function calculateCurrentGrade() {
    var hwGrades = (document.getElementById("hwG")).value;
    var hwArray = convertArrayStringToNumber(hwGrades);

    var cwGrades = (document.getElementById("cwG")).value;
    var cwArray = convertArrayStringToNumber(cwGrades);

    var testGrades = (document.getElementById("testsG")).value;
    var testArray = convertArrayStringToNumber(testGrades);

    var partGrades = (document.getElementById("partG")).value;
    var partArray = convertArrayStringToNumber(partGrades);

    var proGrades = (document.getElementById("projG")).value;
    var proArray = convertArrayStringToNumber(proGrades);

    var hwAvg = averageArray(hwArray);
    var cwAvg = averageArray(cwArray);
    var testAvg = averageArray(testArray);
    var partAvg = averageArray(partArray);
    var proAvg = averageArray(proArray);

    document.getElementById("row1").style.backgroundColor= rowColor(hwAvg);
    document.getElementById("row2").style.backgroundColor= rowColor(cwAvg);
    document.getElementById("row3").style.backgroundColor= rowColor(testAvg);
    document.getElementById("row4").style.backgroundColor= rowColor(partAvg);
    document.getElementById("row5").style.backgroundColor= rowColor(proAvg);

    var hw = hwAvg * parseInt(document.getElementById("hwW").value) / 100;
    var cw = cwAvg * parseInt(document.getElementById("cwW").value) / 100;
    var tests = testAvg * parseInt(document.getElementById("testsW").value) / 100;
    var part = partAvg * parseInt(document.getElementById("partW").value) / 100;
    var pro = proAvg * parseInt(document.getElementById("projW").value) / 100;
    var currentGrade = (hw + cw + tests + part + pro) / (100 - parseInt(document.getElementById("finalW").value)) * 100;
    var hwWeight = document.getElementById("hwW").value;
    var cwWeight = document.getElementById("cwW").value;
    var testsWeight = document.getElementById("testsW").value;
    var partWeight = document.getElementById("partW").value;
    var projWeight = document.getElementById("projW").value;
    var finalWeight = document.getElementById("finalW").value;
    var allWeights = parseInt(hwWeight) + parseInt(cwWeight) + parseInt(testsWeight) + parseInt(partWeight) + parseInt(projWeight) + parseInt(finalWeight);
    if (allWeights != 100 || isNaN(currentGrade) || hw<0 || cw<0 || tests<0 || part<0 || pro<0) {
        document.getElementById("currentGrade").innerHTML = "Uh oh! Please make sure your weights add up to 100 and all grades are entered."
    } else {
        document.getElementById("currentGrade").innerHTML = "Your current grade is " + currentGrade.toFixed(2) + "%";
        return currentGrade;
    }
}

function calculateFinal() {
    var currentGrade = calculateCurrentGrade();
    var gradeWanted = document.getElementById("finalG").value;
    var finalWeight = document.getElementById("finalW").value;
    if (isNaN(gradeWanted) || isNaN(finalWeight) || gradeWanted == "" || isNaN(currentGrade)) {
        document.getElementById("examGrade").innerHTML = "Uh oh! Please enter a valid desired grade and make sure your weights add up to 100."
    } else {
        var decimal = currentGrade / 100;
        var gradeNoFinal = decimal * (100 - finalWeight);
        var left = gradeWanted - gradeNoFinal;
        var decimal2 = left / finalWeight;
        var examGrade = decimal2 * 100;
        document.getElementById("examGrade").innerHTML = "You need a " + examGrade.toFixed(2) + "% on the final to get a " + gradeWanted + "% in the class";
    }

    document.getElementById("row6").style.backgroundColor= rowColor(gradeWanted);
}

function convertArrayStringToNumber(str){
    var arr = str.split(",");
    for(var i=0; i<arr.length; i++){
        arr[i] = parseInt(arr[i]);
    }
    return arr;
}

function averageArray(arr){
    sum = 0
    for(var i=0; i<arr.length; i++){
        sum = sum + arr[i];
    }
    var average = sum/arr.length;
    return average;
}

function rowColor(grade){
    if (grade >= 90){
       return "green";
    }
    if(grade < 90 && grade >= 80){
        return "yellow";
    }
    if(grade <80 && grade >= 70){
        return "orange";
    }
    if(grade < 70){
        return "red";
    }
}