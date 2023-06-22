const button = document.querySelector("button");
const locationDataElement = document.getElementById("locationData");

/* Utilisation de l'API - nominatim.openstreetmap */
button.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(position => {
        // Getting latitude and longitude from position object
        const { latitude, longitude } = position.coords;
        // Getting location of passed coordinates using geocoding API
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const address = data.address;
                const htmlString = 
                `<table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Pays</th> 
                            <th>Région</th>
                            <th>Département</th>
                            <th>Ville</th>
                            <th>N°</th>
                            <th>Rue</th>
                            <th>Code Postale</th>
                        <tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${address.country}</td>
                            <td>${address.state}</td>
                            <td>${address.state_district}</td>
                            <td>${address.town}</td>
                            <td>${address.house_number}</td>
                            <td>${address.road}</td>
                            <td>${address.postcode}</td>
                    </tbody>
                </table>`;
                locationDataElement.innerHTML = htmlString;
                console.table(data.address);
        }).catch(() => {
            console.log("Error fetching data from API");
        });
    });
});


/* Création de l'effet du bouton */
const btn = document.querySelector('.location');

btn.addEventListener('mouseover', function(e) {
    const x = e.pageX - btn.offsetLeft;
    const y = e.pageY - btn.offsetTop;

    const btnFill = document.querySelector('.btn-fill');
    btnFill.style.top = y + 'px';
    btnFill.style.left = x + 'px';
});


