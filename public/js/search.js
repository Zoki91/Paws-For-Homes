const searchBar = document.getElementById("search-bar");
const searchResults = document.getElementById("search-results");

let petData = [];

const render = () => {
  if (petData.length > 0) {
    const value = searchBar.value.slice().toLowerCase();
    const fragment = new DocumentFragment();
    const data = value?petData.filter((pet) => pet.typeOfPet.toLowerCase().includes(value)):petData;
    data.forEach((pet) => {
      const container = document.createElement("div");
      const card = document.createElement("div");
      const cardBody = document.createElement("div");
      const cardTitle = document.createElement("h5");
      const cardSubtitle = document.createElement("h1");
      const cardText1 = document.createElement("p");
      const cardText2 = document.createElement("p");
      const cardText3 = document.createElement("p");
      const cardText4 = document.createElement("p");
      const cardText5 = document.createElement("p");

      container.setAttribute("class", "col-lg-4 mb-4");
      card.setAttribute("class", "card card-width search-form");
      cardBody.setAttribute("class", "card-body");
      cardTitle.setAttribute("class", "card-title-typeofpet"); // Type of Pet
      cardSubtitle.setAttribute("class", "card-title1 "); // Name of Pet
      cardText1.setAttribute("class", "card-text-breed"); // Breed
      cardText2.setAttribute("class", "card-text-location"); // Age of Pet
      cardText3.setAttribute("class", "card-text-gender"); // Gender of Pet
      cardText4.setAttribute("class", "card-text-description"); // Description
      cardText5.setAttribute("class", "card-text-location"); // Location

      cardTitle.textContent = pet.typeOfPet;
      cardSubtitle.textContent = pet.name;
      cardText1.textContent = "Breed: " + pet.breed;
      cardText2.textContent = "Age: " + pet.age;
      cardText3.textContent = "Gender: " + pet.gender;
      cardText4.textContent = "Description: " + pet.description;
      cardText5.textContent = "Location: " + pet.location;

      cardBody.appendChild(cardSubtitle);
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText1);
      cardBody.appendChild(cardText2);
      cardBody.appendChild(cardText3);
      cardBody.appendChild(cardText4);
      cardBody.appendChild(cardText5);

      card.appendChild(cardBody);
      container.appendChild(card);

      fragment.appendChild(container);
    });
    searchResults.replaceChildren(fragment);
  }
};

searchBar.addEventListener("input", (event) => {
  render()
});

fetch("api/pets/")
  .then((response) => response.json())
  .then((response) => {
    petData = response.slice();

    render();
  });

