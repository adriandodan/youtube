function authenticate() {
    return gapi.auth2
        .getAuthInstance()
        .signIn({
            scope: "https://www.googleapis.com/auth/youtube.readonly",
        })
        .then(
            function(response) {
                $("#googlebtn").addClass("hide");
                $("#content").addClass("padding-top");
                $("#start").css( { "height" : "170px" , "padding-top" : "40px"});
                $("#profile-info-signout").removeClass("hide");
                $("#info-container").removeClass("hide");
                $("#select").removeClass("hide");
                $("#videobtn").removeClass("hide");
                $("#profile-email").html( response.Pt.yu);
                $("#profile-name").html( "Welcome, " + (response.Pt.Ad) + "!");
                 document.getElementById("email-img").src =  response.Pt.QK;
               
                console.log("Sign-in successful");
            },
            function(err) {
                console.error("Error signing in", err);
            }
        );
}

function loadClient() {
    gapi.client.setApiKey("AIzaSyAv5equY4Ih4Mnrg5Hm9_0roDfpF2crI5E");
    return gapi.client
        .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(
            function() {
                console.log("GAPI client loaded for API");
            },
            function(err) {
                console.error("Error loading GAPI client for API", err);
            }
        );
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
    var elCountryCode = document.getElementById("countriesList");
    var countryCode =
        elCountryCode.options[elCountryCode.selectedIndex].value;
    displayCountryInfo(countryCode);

    return gapi.client.youtube.videos
        .list({
            part: "snippet,contentDetails,statistics",
            chart: "mostPopular",
            regionCode: countryCode,
        })
        .then(
            function(response) {
                $("#allVideos").removeClass("hide");
                $("#content").removeClass("container-height");
               
                document.getElementById("countryInfo").style.display = "block";
                var iframes = document.getElementsByTagName("iframe");
                for (var i = 0; i < iframes.length; i++) {
                    iframes[i].style.display = "inline";
                }
                for (var i = 0; i < 5; i++) {
                    var iframeId = "video" + i;
                    var videoId = response.result.items[i].id;
                    document.getElementById(iframeId).width = 560;
                    document.getElementById(iframeId).height = 315;
                    document.getElementById(iframeId).src =
                        "https://www.youtube.com/embed/" + videoId;
                    document.getElementById(iframeId).frameborder = 0;
                    document.getElementById(iframeId).allow =
                        "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
                    document.getElementById(iframeId).allowfullscreen = "true";

                    document.getElementById(iframeId + "pb" + i).textContent = (response.result.items[i].snippet.publishedAt);
                    document.getElementById(iframeId + "views" + i).textContent = (response.result.items[i].statistics.viewCount);
                    document.getElementById(iframeId + "likes" + i).textContent = (response.result.items[i].statistics.likeCount);
                    document.getElementById(iframeId + "dislikes" + i).textContent = (response.result.items[i].statistics.dislikeCount);
                    document.getElementById(iframeId + "comments" + i).textContent = (response.result.items[i].statistics.commentCount);
                }
            },
            function(err) {
                console.error("Execute error", err);
            }
        );
}
gapi.load("client:auth2", function() {
    gapi.auth2.init({
        client_id: "578129708410-8lrl3jn90f31uu7ngg0lp6d66o6s8k3t.apps.googleusercontent.com",
    });
});

function showCountries() {
    fetch("https://restcountries.eu/rest/v2/all")
        .then((res) => res.json())
        .then(function(data) {
            for (var i = 0; i < data.length; i++) {
                var option = document.createElement("OPTION");
                option.innerHTML = data[i].name;
                option.value = data[i].alpha2Code;
                document.getElementById("countriesList").appendChild(option);
            }
        })
        .catch((err) => console.log("Error:", err));
}

function displayCountryInfo(countryByAlpha2Code) {
    fetch("https://restcountries.eu/rest/v2/all")
        .then((res) => res.json())
        .then(function(data) {
            const countryData = data.find(
                (country) => country.alpha2Code === countryByAlpha2Code
            );
            document.querySelector("#flag-container img").src =
                countryData.flag;
            document.querySelector(
                "#flag-container img"
            ).alt = `Flag of ${countryData.name}`;
            document.querySelector("#flag-container img").width = 300;
            document.getElementById("capital").innerHTML = countryData.capital;
            document.getElementById(
                "population"
            ).innerHTML = countryData.population.toLocaleString("en-US");
            document.getElementById(
                    "currencies"
                ).innerHTML = countryData.currencies
                .filter((c) => c.name)
                .map((c) => `${c.name} (${c.code})`)
                .join(", ");
            document.getElementById("region").innerHTML = countryData.region;
            document.getElementById("subregion").innerHTML =
                countryData.subregion;
        })
        .catch((err) => console.log("Error:", err));
}

function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function (response) {
            auth2.disconnect();
               
                $("#googlebtn").removeClass("hide");
                $("#content").removeClass("padding-top");
                $("#content").css({"padding-top": "190px"});
                $("#profile-info-signout").addClass("hide");
                $("#info-container").addClass("hide");
                $("#select").addClass("hide");
                $("#videobtn").addClass("hide");
                $("#allVideos").addClass("hide");
                $("#content").addClass("container-height");
        });

    }