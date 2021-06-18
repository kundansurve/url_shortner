window.onload = () => {
    console.log("Started");
    const inputVal = document.querySelector("input");
    const button = document.querySelector("#btn");


    const form = document.querySelector(".form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = encodeURIComponent(inputVal.name) + '=' + encodeURIComponent(inputVal.value);

        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: formData
        }

        fetch('https://weburlshort.herokuapp.com/', options)
            .then(response => response.json())
            .then(data => {
                console.log(data.shortUrl);
                inputVal.value = data.shortUrl;
                button.textContent = "Copy";
                button.addEventListener("click", () => {
                    button.textContent = "Copied";
                    inputVal.select();
                    document.execCommand('copy');

                });
                inputVal.addEventListener("input", () => {

                    button.textContent = "Shorten";
                });
            });
    });


}