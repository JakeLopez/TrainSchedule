var config = {
    apiKey: "AIzaSyAYXVUwSsi_NA4OLZ_oQs3BStOLEAYOhdM",
    authDomain: "train-schedule-55487.firebaseapp.com",
    databaseURL: "https://train-schedule-55487.firebaseio.com",
    projectId: "train-schedule-55487",
    storageBucket: "train-schedule-55487.appspot.com",
    messagingSenderId: "630877712250"
};
firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";
var totalBilled = "";

// Capture Button Click
$("#addEmployeeBtn").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#firstTrain-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // Code for handling the push
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

});



database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().firstTrain);
    // console.log(childSnapshot.val());

    var frequency = childSnapshot.val().frequency;
    console.log(frequency);
    // var trainArrive = moment(childSnapshot.val().firstTrain, "HH:mma");
    var firstTimeConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment().format("hh:mm");
    console.log(currentTime);

    var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(moment(timeDifference).format("hh:mm"));

    var tRemainder = timeDifference % frequency
    console.log(tRemainder);

    var tMinuetsTillTrain = frequency - tRemainder;
    console.log(tMinuetsTillTrain);

    var nextTrain = moment().add(tMinuetsTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");
    console.log(nextTrain);











    // if (timeDifference < 0) {
    //   timeDifference = timeDifference + 1440
    // }

    //moment.


    // full list of items to the well
    $("tbody").append("<tr><td> " + childSnapshot.val().trainName +
        "</td><td>" + childSnapshot.val().destination +
        " </td><td> " + childSnapshot.val().frequency +
        "</td><td> " + nextTrain +
        "</td><td> " + tMinuetsTillTrain + "</td></tr>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

//   // Change the HTML to reflect
//   $("#name-display").html(snapshot.val().name);
//   $("#email-display").html(snapshot.val().email);
//   $("#age-display").html(snapshot.val().age);
//   $("#comment-display").html(snapshot.val().comment);
// });



// Handle the errors
