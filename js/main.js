let serverData = [];

function makeServiceCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            console.log(methodType + "state changed called Ready state" + xhr.readyState + "status" + xhr.status);
            if (xhr.status.toString().match("^[2][0-9]{2}$")) {
                resolve(xhr.responseText);
            } else if (xhr.status.toString().match("^[4,5][0-9]{2}$")) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR failes");
                console.log("Handle 400 Client error or 500 Server Error");
            }
        };
        xhr.onerror = function () {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
            console.log(methodType + "request sent to the server");
        }
    });
}

const getDataFromServer = () => {
    makeServiceCall("GET", "http://localhost:3000/section1Content/1", true)
        .then((responseText) => {
            serverData = JSON.parse(responseText);
            document.querySelector("#title").innerHTML = serverData.title;
            document.querySelector("#description").innerHTML = serverData.description;
            document.querySelector("#s1img1").src = serverData.s1img1;
            document.querySelector("#s1img2").src = serverData.s1img2;
        })
        .catcth((error) => {
            console.log("GET Error status: " + JSON.stringify(error));
            serverData = [];
        });
};

getDataFromServer();
