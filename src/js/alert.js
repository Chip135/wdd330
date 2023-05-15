export default class Alert {
      
    renderAlert() {
        //Fetching the alert.json and get the response
        const alerts = fetch("./js/alert.json")
            .then((response) => response.json())
            .then((user) => user);

        //Prepend the section with alert-list class
        const main = document.querySelector("main");
        const section = document.createElement("section");
        section.classList.add("alert-list");
        main.prepend(section);
        
        //await the results from fetching and get the message, background and color, append each 
        //message with a "p" element in the DOM
        const appendAlerts = async () => {
            const a = await alerts;
            a.forEach(element => {
                const p = document.createElement("p");
                document.querySelector(".alert-list").appendChild(p);
                p.innerHTML = element.message;
                p.style.backgroundColor = element.background;
                p.style.color = element.color;    
            });      
        };

        appendAlerts();
        
 
    }
}

const thisalert = new Alert();
thisalert.renderAlert();

