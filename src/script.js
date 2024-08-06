document.addEventListener("DOMContentLoaded", (event) => {
    let form = document.querySelector("#input-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        let output = document.querySelector("#output");
        
        let link = this.input.value; 
        output.innerText = await shortenLink(link);
    })
})

async function shortenLink(link){
    let params = {
        "long_url": link
    };

    return await fetch(
        "https://api-ssl.bitly.com/v4/shorten",
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer {TOKEN}",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        }
    )
    .then((response) => response.json())
    .then((link) => link.id)
    .catch((err) => console.log(err));
}