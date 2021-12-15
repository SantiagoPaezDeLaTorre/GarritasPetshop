let containerCard = document.getElementById("listOfBreeds");

fetch("https://dog.ceo/api/breeds/list/all")
  .then((resp) => resp.json())
  .then(function (data) {
    const res = Object.keys(data.message);
    for (raza of res) {
      let cardNueva = document.createElement("li");
      cardNueva.innerHTML = `${raza}`;
      containerCard.append(cardNueva);
    }
  })
  .catch(function (error) {
    console.log(error);
  });

  