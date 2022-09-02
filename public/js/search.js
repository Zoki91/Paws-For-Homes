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
      const cardTitle = document.createElement("h2");
      const cardSubtitle = document.createElement("h6");
      const cardText1 = document.createElement("p");
      const cardText2 = document.createElement("p");
      const cardText3 = document.createElement("p");
      const cardText4 = document.createElement("p");
      const cardText5 = document.createElement("p");

      container.setAttribute("class", "col-lg-4 mb-4");
      card.setAttribute("class", "card card-width search-form");
      cardBody.setAttribute("class", "card-body");
      cardTitle.setAttribute("class", "card-title");
      cardSubtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
      cardText1.setAttribute("class", "card-text");
      cardText2.setAttribute("class", "card-text");
      cardText3.setAttribute("class", "card-text");
      cardText4.setAttribute("class", "card-text");
      cardText5.setAttribute("class", "card-text");

      cardTitle.textContent = pet.typeOfPet;
      cardSubtitle.textContent = pet.name;
      cardText1.textContent = "Breed: " + pet.breed;
      cardText2.textContent = pet.age;
      cardText3.textContent = pet.gender;
      cardText4.textContent = pet.description;
      cardText5.textContent = "Location: " + pet.location;

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardSubtitle);
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

