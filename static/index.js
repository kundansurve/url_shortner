window.onload = () => {
    console.log("Started");
    const inputVal = document.querySelector("input");
    const button = document.querySelector("#btn");
    const long_url = document.querySelector(".long_urls");
    const short_url = document.querySelector(".short_urls");
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

        fetch('http://localhost:3000/', options)
            .then(response => response.json())
            .then(data => {
                console.log(data.shortUrl);
                let lurl = document.createElement('h5');
                lurl.textContent = inputVal.value;
                let surl = document.createElement('h5');
                surl.textContent = data.shortUrl;
                long_url.insertBefore(lurl, long_url.children[1]);
                short_url.insertBefore(surl, short_url.firstChild[1]);
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