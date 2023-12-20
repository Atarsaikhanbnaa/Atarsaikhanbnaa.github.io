class CityInfoCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.getElementById('city-info-card-template');
        const templateContent = template.content.cloneNode(true);
        this.shadowRoot.appendChild(templateContent);

        this.cityNameElement = this.shadowRoot.querySelector('h4');
        this.imageElement = this.shadowRoot.querySelector('img');
        this.estimatedBudgetElement = this.shadowRoot.querySelector('#estPrice');
        this.foodCostElement = this.shadowRoot.querySelector('#fdPrice');
        this.accommodationCostElement = this.shadowRoot.querySelector('#accPrice');
        this.transportationCostElement = this.shadowRoot.querySelector('#trnsPrice');
    }

    connectedCallback() {
        const radioButtons = this.shadowRoot.querySelectorAll('input[name="filter"]');
        radioButtons.forEach(radioButton => {
            radioButton.addEventListener('change', () => {
                this.updateCosts(parseInt(radioButton.value));
            });
        });
        this.updateCosts(1);
    }

    updateCosts(selectedDays) {
        const cityName = this.getAttribute('head');
        const budget = parseFloat(this.getAttribute('estbud'));
        const foodCost = parseFloat(this.getAttribute('fd'));
        const accommodationCost = parseFloat(this.getAttribute('acc'));
        const transportationCost = parseFloat(this.getAttribute('trns'));
        const imageUrl = this.getAttribute('img');

        this.cityNameElement.textContent = cityName;
        this.imageElement.src = imageUrl;
        this.estimatedBudgetElement.textContent = `($${(budget * selectedDays).toFixed(2)})`;
        this.foodCostElement.textContent = `$${(foodCost * selectedDays).toFixed(2)}`;
        this.accommodationCostElement.textContent = `$${(accommodationCost * selectedDays).toFixed(2)}`;
        this.transportationCostElement.textContent = `$${(transportationCost * selectedDays).toFixed(2)}`;
    }
}

customElements.define('city-info-card', CityInfoCard);

//     connectedCallback(){
//         this.querySelectorAll .addeventlistener
//     }

//     ondayclick(e){
//         e.target.value * this.food
//     }
//     set cityname(value) {
//         this.citynameelement.textcontent = value;
//     }

//     set budget(value) {
//         this.budgetelement.textcontent = `estimated budget: ($${value})`;
//     }

//     render(city) {
//         this.cityname = city.name;
//         this.budget = city.budget;
//     }
// }

class ClubComment extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML=`
        <link rel="stylesheet" href="./assets/style/city.css"/>
        <li class="user-cpmment">
        <span>${this.getAttribute('ognoo')}</span>
        <p>${this.getAttribute('txt')}</p>
        </li>`;
    }
}