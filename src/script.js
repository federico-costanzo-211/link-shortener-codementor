document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    
    const form = document.querySelector("#input-form");
    const output = document.querySelector("#output");
    let copybutton = document.querySelector("#copy-link-button");

    copybutton.onclick = async () => {
        await navigator.clipboard.writeText(`${output.value}`);
    };
    
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const link = this.input.value; 
        output.value = await shortenLink(link);

        copybutton.style.display = "block";
    })
});

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
    .then((link) => {
        if (link.id !== undefined) {
            return link.id;
        } else throw new Error("Link not valid. Try again.");
    })
    .catch((err) => console.log(err));
}