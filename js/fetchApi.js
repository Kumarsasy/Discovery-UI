fetch("http://localhost:3000/section1Content/1")
    .then((response) => response.json())
    .then((data) => {
        document.querySelector("#title").innerHTML = data.title;
        document.querySelector("#description").innerHTML = data.description;
        document.querySelector("#s1img1").src = data.s1img1;
        document.querySelector("#s1img2").src = data.s1img2;
    })
    .catch((error) => {
        console.log("Get Error status: " + JSON.stringify(error));
    });
