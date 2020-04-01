var taskJSON ={
    "9AM":"",
    "10AM":"",
    "11AM":"",
    "12PM":"",
    "1PM":"",
    "2PM":"",
    "3PM":"",
    "4PM":"",
    "5PM":""
}

function loadAllTasks() {
    existingTaskJSON = JSON.parse(localStorage.getItem("tasks"));
    if (existingTaskJSON != null) {
        taskJSON = existingTaskJSON;
    }
    $(".task").each(function(taskIndex, taskValue){
        var task = $(taskValue).attr("id");
        $(taskValue).val(taskJSON[task]);
    });
}

function loadTask(taskID) {
    existingTaskJSON = JSON.parse(localStorage.getItem("tasks"));
    if (existingTaskJSON != null) {
        taskJSON = existingTaskJSON;
    }
    $("#"+taskID).val(taskJSON[taskID]);
}

function saveTasks() {
    var task = $(this).parents(".row").children(".task");
    var taskID = task.attr("id");
    console.log(taskID+" "+task.val());
    taskJSON[taskID] = $(task).val();

    console.log(taskJSON);
    localStorage.setItem("tasks", JSON.stringify(taskJSON));
    loadTask(taskID);
}

function initTextAreas(parsedHour) {
    $(".row").each(function(rowIndex, rowValue){
        $(rowValue).children().each(function(childIndex, childValue){
            if ($(childValue).attr("class").includes("task")) {
                var rowTime = parseInt(moment($(childValue).attr("id"), ["h:mm A"]).format("HH"));
                if (rowTime < parsedHour) {
                    $(childValue).removeClass("past present future");
                    $(childValue).addClass("past");
                }
                if (rowTime === parsedHour) {
                    $(childValue).removeClass("past present future");
                    $(childValue).addClass("present");
                }
                if (rowTime > parsedHour) {
                    $(childValue).removeClass("past present future");
                    $(childValue).addClass("future");
                }
            }
        });
    });
}

$( document ).ready(function() {
    console.log( "ready!" );

    // this will go above the line break display current day and date
    const currDay = moment().format("dddd, Do MMMM YYYY");
    console.log("Today is: " + currDay + ".");
    $("#current-day").html("Today is " + currDay + ".");

    // parsedHour will get the current hour in military time
    var parsedHour = parseInt(moment().get('hour'));
    console.log("Current timeblock is " + parsedHour);
    
    // COMMENT OUT BELOW IF REVIEWING MY HOMEWORK AFTER 5PM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // parsedHour = 11; // for testing purposes

    //init textareas
    initTextAreas(parsedHour);

    //bind event listeners
    $(".save").click(saveTasks);
    
    //load existing tasks
    loadAllTasks();
        
});