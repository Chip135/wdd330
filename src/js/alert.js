export default class Alert {
      
    renderAlert() {
        //Fetching the alert.json and get the response
        const alerts = fetch("https://wdd330-alerts.onrender.com/alerts")
            .then((response) => response.json())
            .then((user) => user)
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error)
              });

        //Prepend the section with alert-list class
        const main = document.querySelector("main");
        const section = document.createElement("section");
        section.classList.add("alert-list");
        main.prepend(section);
        
        //await the results from fetching and get the message, background and color, append each 
        //message with a "p" element in the DOM
        const appendAlerts = async () => {
            const a = await alerts;
            //Checking if there are values in the alerts constant
            if(!a) {
                return;
            } else {
            a.forEach(element => {
                const p = document.createElement("p");
                document.querySelector(".alert-list").appendChild(p);
                p.innerHTML = element.message;
                p.style.backgroundColor = element.background;
                p.style.color = element.color;    
            });      
        };
    }

        appendAlerts();
        
 
    }
}

const thisalert = new Alert();
thisalert.renderAlert();

