// global variable. usually is a bad idea.
const events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

// builds a drop down with a list of unique cities
function buildDropDown() {

    // first step is get a handle on the drop down
    let eventDD = document.getElementById("eventDropDownList");
    // reset the list
    eventDD.innerHTML = "";

    // <li><a class="dropdown-item" href="#"></a><li>
    let ddTemplate = document.getElementById("dropDownTemplate");
    //get the template
    let ddNode = document.importNode(ddTemplate.content, true);


    // add all the items to the dropdown
    let ddLink = ddNode.querySelector("a");
    ddLink.setAttribute("data-city", "All");
    ddLink.textContent = "All";
    eventDD.appendChild(ddNode);

    // add links for the unique cities
    let curEvents = getEvents();

    // get our data

    // get a distinct array of city names
    let distinctCities = [...new Set(curEvents.map((event) => event.city))];

    // filter that data to unique set of cities
    for (let index = 0; index < distinctCities.length; index++) {

        let ddNode = document.importNode(ddTemplate.content, true);


        // add all the items to the dropdown
        let ddLink = ddNode.querySelector("a");
        ddLink.setAttribute("data-city", distinctCities[index]);
        ddLink.textContent = distinctCities[index];
        eventDD.appendChild(ddNode);

    }
    // set the header
    let statsHeader =document.getElementById("statsHeader");
    statsHeader.innerHTML = `Stats for All events`
    // show stats for all events
    displayStats(curEvents)
}
// this is called everytime a city name is clicked in the dropdown
function getEventData(element) {
    let city = element.getAttribute("data-city");


    // create the stats for the clicked city 
    let curEvents = getEvents();
    let filteredEvents = curEvents;

    if (city != 'All') {
        // return an array with only the events for the selected city
        filteredEvents = curEvents.filter(function (event) {
            if (event.city == city) {
                return event;
            }

        });
    }
    let statsHeader = document.getElementById("statsHeader");
    statsHeader.innerHTML = `Stats for ${city} events`;
    // call a funtion 
    displayStats(filteredEvents);
}


// pull the events from local storage or the default array events.
function getEvents() {
    let curEvents = JSON.parse(localStorage.getItem("eventData"));

    if (curEvents === null) {
        curEvents = events;
        localStorage.setItem("eventData", JSON.stringify(curEvents));
    }

    return curEvents;
}
// this function displays stats for the selected city
function displayStats(filteredEvents) {

    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;


    for (let index = 0; index < filteredEvents.length; index++) {

        currentAttendance = filteredEvents[index].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }

        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }

    }


    average = total / filteredEvents.length;

    // write values to the page
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );


}