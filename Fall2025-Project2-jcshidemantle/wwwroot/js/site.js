var bgNum = 1;

// Initialize time dialog
$("#time").dialog({
    title: "Current Local Time",
    autoOpen: false,
})

// When "display current time" button is pressed, get current time, format
// as HH:MM, inject html into dialog and open dialog.
$("#timeButton").on("click", function () {
    const d = new Date();
    let hrs = d.getHours();
    let mins = d.getMinutes();
    if (hrs < 10) hrs = '0' + hrs;
    if (mins < 10) mins = '0' + mins;

 
    $("#time").html(`<p>${hrs}:${mins}</p>`);
    $("#time").dialog("open");
})

// Get data from google API using query
function getData(query) {
    // Sensitive data removed
    return $.ajax(`https://www.googleapis.com/customsearch/v1?key=[INSERT_KEY_HERE]&cx=[INSERT_CX_TAG_HERE]&q=${query}`);
}

// Get search results, then put results inside searchResult div.
$('#searchButton').on('click', function () {
    const query = $('#query').val();
    if (!query || query == "") return null;
    getData(query)
        .done(function (data) {
            let searchResults = '';
            data.items.forEach(result => {
                searchResults += `
                <div id="resultCard">
                    <a href="${result.link}">${result.title}</a>
                    <p>${result.htmlSnippet}</p>
                </div>
                `;
            });
            $("#query").css({ "border-bottom-left-radius": "0", "border-bottom-right-radius": "0" })
            $("#searchResults").html(searchResults);
            $("#searchResults").css({
                "display": "block",
            });
        })
        .fail(function () {
            alert("Error: Could not fetch results");
        })
});

// Get data for query, then redirect user to first result
$('#luckyButton').on("click", function () {
    const query = $('#query').val();
    if (!query || query == "") return null;
    getData(query).done(function (data) {
        window.location.href = data.items[0].link;
    });
});

// Picks next background, looping around using %, and sets the new background.
$('#header').on("click", function () {
    bgNum = (bgNum + 1) % 3;
    $('body').css({ "background": `url(../assets/background${bgNum}.jpg) no-repeat center center fixed` });
});