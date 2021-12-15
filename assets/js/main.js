// Las correcciones que me hizo que aún no implementé sus cambios:
//---------------->
// -> Este es sobre HTML, y es que te recomiendo no abusar de los divs y usar otras etiquetas más representativas, acuerdate que tienes las etiquetas main y footer: https://dev.to/kenbellows/stop-using-so-many-divs-an-intro-to-semantic-html-3i9i
// -> Las funciones openCarrito y closeCarrito podrían ser métodos (ligados al DOM) de la clase Carrite
// -> Desde cart llamas al método agregarAlCarrito() que es propio de cart no?
//    Entonces dentro del método podriamos decir que estamos dentro del objeto, ya estamos referenciados en el.
//    Así que dentro del método nos referimos a que estamos en este carrito --> entonces --> this.items.push() no cart.items.push()

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

// Esto es del HTML

// Para que ponerle el id header al header? Es decir, para tomarlo del dom o por css directamente mejor usar el selector  SACARSELO A GARRITAS PETHSOP (todos los htmls)

// Por que ponerle el id abridos al boton si tiene una clase openbtn
// Por lo de arriba, son detalles tontos, pero a la larga redundantes, y escribirlos lleva tiempo (si sumas todas estas cosas --> suma bastante tiempo), por ello siempre es mejor reducir al minimo la cantidad de id's y clases aaaaa menos que uses un framework, pero aprovecha las clases e id's del mismo!
// Fijate que así de id's y clases que son casi iguales tienes varias etiquetas.

// En las declaraciones de variables intenta llevar un orden separando las del DOM con las de las clases y arrays.

// Recuerda que puedes pushear multiples elementos como array.push(elem1,elem2,elem3, etc)

// Los elementos tomados por el dom abridor y opener son en sí lo mismo, primero por que en html están encimados, y segundo por que tienen el mismo evento, no te conviene trabajar solo con uno de ellos?

// El agregado de los eventos a los botones de agregar al carrito podrías meterlos en el for de la línea 174, ya que ambos for iteran la misma cantidad de veces, entonces aprovechas un solo bucle para hacer todo! (en tiempo es insignificante para tan pocas iteraciones, pero para grandes cantidades se optimiza!)
// Y sobre esto, intenta usar nombres de variables un poco más significantes, como pisarCatalogo, abridor, cerrador y opener. Generalmente para hacer una muestra por html (cambiar el DOM) se usa la palabra "show"
// Y ojo que no se está respetando el stock
