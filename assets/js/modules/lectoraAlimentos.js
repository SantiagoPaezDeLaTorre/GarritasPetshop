const miJson = "/assets/json/perros/alimentos.json";
const request = new XMLHttpRequest();
request.open("GET", miJson);
request.responseType = "json";
request.send();
request.onload = function () {
  let selectora = document.getElementById("selectora"); // usaré la selectora para filtrar el catalogo
  // Creo array y pusheo sus objetos Producto:
  let productos = [];

  //cargo al array productos la informacion del json
  productos = request.response;
  productos = reordenar(selectora.selectedIndex, productos).map(
    (prod) =>
      new Producto(prod.nombre, prod.precio, prod.id, prod.img, prod.stock)
  );
  generateTemplate(productos);

  //SELECTORA
  selectora.addEventListener("change", (e) => {
    productos = reordenar(selectora.selectedIndex, productos);
    generateTemplate(productos);
  });
};

const sortAZ = function (a, b) {
  if (a.nombre > b.nombre) {
    return 1;
  } else if (a.nombre < b.nombre) {
    return -1;
  } else {
    return 0;
  }
};

const sortZA = function (a, b) {
  if (a.nombre < b.nombre) {
    return 1;
  } else if (a.nombre > b.nombre) {
    return -1;
  } else {
    return 0;
  }
};
const sortLowFirst = function (precio1, precio2) {
  if (precio1.precio < precio2.precio) {
    return 1;
  } else if (precio1.precio > precio2.precio) {
    return -1;
  } else {
    return 0;
  }
};
const sortHighFirst = function (precio1, precio2) {
  if (precio1.precio > precio2.precio) {
    return 1;
  } else if (precio1.precio < precio2.precio) {
    return -1;
  } else {
    return 0;
  }
};
//funcion que reordena el catalogo y reemplaza al previo
function reordenar(indice, productos) {
  console.log("se eligió option value: " + indice);
  if (indice == 0) {
    productos.sort(sortAZ);
  } else if (indice == 1) {
    productos.sort(sortZA);
  } else if (indice == 2) {
    productos.sort(sortLowFirst);
  } else if (indice == 3) {
    productos.sort(sortHighFirst);
  }

  return productos;
}

const generateTemplate = (productos) => {
  let $cards = document.getElementById("cards");
  $cards.innerHTML = "";
  //asigno un card a cada producto y lo muestro en pantalla
  for (let producto of productos) {
    let cardNueva = document.createElement("div");
    cardNueva.classList.add("cardCreada", "card");
    cardNueva.innerHTML = ` 
              <img src= ${producto.img} />
              <p> ${producto.nombre}</p>
              <b> ${"$" + producto.precio}</b> 
              <button id="${
                producto.id
              }" class="btn addToCartBtn"> Agregar al carrito</button>
              `;
    cards.append(cardNueva);
  }

  //junto los botones de las cards para asignarles evento click -> add to cart
  let btn = document.querySelectorAll(".addToCartBtn");
  for (let i = 0; btn.length > i; i++) {
    btn[i].addEventListener("click", () => {
      cart.agregarAlCarrito(productos[i]);
    });
  }
};
