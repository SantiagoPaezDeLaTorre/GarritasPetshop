// Toma de datos y creacion de sus variables:
let abridor = document.querySelectorAll(".abridor");
var cerrador = document.querySelector(".closebtn");
let btnLimpiarCarrito = document.getElementById("clear"); //Boton para Elminar los productos del carrito
let contadorCarrito = document.getElementById("lblCartCounter");
let cart = new Carrite();

// Preparo a los elementos para recibir eventos y que sean capturados:
for (let opener of abridor) {
  opener.addEventListener("click", cart.openCarrito);
}
cerrador.addEventListener("click", cart.closeCarrito);
btnLimpiarCarrito.addEventListener("click", cart.limpiarCarrito);

// Declaro las funciones
function showEnCarrito() {
  $("#carrito").html("");
  let carritoEnStorage = JSON.parse(localStorage.getItem("MiCarrito"))
    ? JSON.parse(localStorage.getItem("MiCarrito")).items
    : [];
  for (let item of carritoEnStorage) {
    let carritoContainer = document.createElement("div");
    carritoContainer.innerHTML = `
          <div class="cardCarrito"><h3>
            <img src= ${item.img} />
            <div class="cardInfo">
              <p>${item.nombre}</p>
              <div class="cardSubInfo">
                <b> $ ${item.precio}</b>
                <b class="cantidad"> Cantidad: ${item.cantidad}</b>
              </div>
              <button id="${item.id}" class="btn-remover">Remover</button>
              <button class="sumarCantProducto"> Agregar </button>
            </div>
          </div>
          `;
    document.getElementById("carrito").append(carritoContainer);
    let removedor = carritoContainer.querySelectorAll(".btn-remover");
    for (let i = 0; removedor.length > i; i++) {
      removedor[i].addEventListener("click", cart.removerItem); ///Añade el evento Click a cada uno de los botones
    }
    let agregador = carritoContainer.querySelectorAll(".sumarCantProducto");
    for (let i = 0; agregador.length > i; i++) {
      agregador[i].addEventListener("click", cart.agregarItem); ///Añade el evento Click a cada uno de los botones
    }
  }
  contadorCarrito.textContent = cart.contador();
}
showEnCarrito();

