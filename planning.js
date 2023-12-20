document.addEventListener('DOMContentLoaded', function () {
    var cities;

    function updateCityInformation(city, selectedDays) {
        var cityNameElement = document.querySelector('section h4');
        var budgetElement = document.querySelector('.budget');
        var budList = document.querySelector('.Bud');
        var imgElement = document.querySelector('section img');

        cityNameElement.textContent = city.head;
        var newBudget = city.estbud * selectedDays;
        budgetElement.textContent = 'Estimated budget: ($' + newBudget + ')';

        budList.innerHTML = `<li>Food ($${city.fd * selectedDays})</li>
                            <li>Accommodation ($${city.acc * selectedDays})</li>
                            <li>Transportation ($${city.trns * selectedDays})</li>`;
        imgElement.src = city.img;
        cityInfoCard.render(city);
    }

    var sortOptions = document.querySelectorAll('.Sort');
    sortOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            var sortBy = option.textContent.trim();
            var sortedCities;

            switch (sortBy) {
                case 'Accomodation cost':
                    sortedCities = cities.slice().sort((a, b) => a.acc - b.acc);
                    break;
                case 'Food cost':
                    sortedCities = cities.slice().sort((a, b) => a.fd - b.fd);
                    break;
                case 'Transportation cost':
                    sortedCities = cities.slice().sort((a, b) => a.trns - b.trns);
                    break;
                default:
                    sortedCities = cities.slice().sort((a, b) => a.estbud - b.estbud);
                    break;
            }

            if (sortedCities.length > 0) {
                var selectedDays = parseInt(document.querySelector('input[name="filter"]:checked').value);
                updateCityInformation(sortedCities[0], selectedDays);
            }
        });
    });

    const cityData = [
        { head: "Tokyo", estbud: "160", fd: "49", acc: "60", trns: "47", img: "assets/tokyo.jpg" },
        { head: "Bali", estbud: "207", fd: "81", acc: "67", trns: "59", img: "assets/bali.jpg" },
        { head: "Moscow", estbud: "220", fd: "92", acc: "67", trns: "61", img: "assets/moscow.jpg" }
    ];

    const container = document.querySelector('.city-info-card_container');
    const template = document.getElementById('city-info-card-template');

    cityData.forEach(city => {
        const clone = document.importNode(template.content, true);
        clone.querySelector('h4').textContent = city.head;
        clone.querySelector('img').src = city.img;
        container.appendChild(clone);
    });
    fetch('cities.json')
        .then(response => response.json())
        .then(data => {
            cities = data;
            var radioButtons = document.getElementsByName('filter');
            radioButtons.forEach(function (radioButton) {
                radioButton.addEventListener('change', function () {
                    var selectedDays = parseInt(this.value);

                    if (cities) {
                        var sortedCities = cities.slice().sort((a, b) => a.budget - b.budget);
                        if (sortedCities.length > 0) {
                            updateCityInformation(sortedCities[0], selectedDays);
                        }
                    }
                });
            });

            radioButtons[0].checked = true;
        })
        .catch(error => console.error('Error fetching city data:', error));
});
