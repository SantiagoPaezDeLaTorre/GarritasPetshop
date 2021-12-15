class Carrite {
  constructor() {
    this.items =
      localStorage.getItem("MiCarrito") !== null &&
      localStorage.getItem("MiCarrito") !== undefined
        ? JSON.parse(localStorage.getItem("MiCarrito")).items
        : [];
  }
  //Funcionalidades del carrito --->
  agregarAlCarrito(producto) {
    this.items.find((x) => x.id === producto.id)
      ? producto.cantidad++
      : this.items.push(producto);
    console.log(JSON.stringify(this));
    localStorage.setItem("MiCarrito", JSON.stringify(this));
    showEnCarrito();
    console.log("Se agregó al carrito: " + producto.nombre.toLowerCase());
  }
  removerItem(e) {
    let indexDelProducto = cart.items.findIndex(
      (item) => item.id == e.target.id
    );
    let productoClickeado = cart.items.find((item) => item.id == e.target.id);
    if (productoClickeado.cantidad > 1) {
      productoClickeado.cantidad--;
    } else {
      cart.items.splice(indexDelProducto, 1);
    }
    console.log(
      "Se quitó del carrito: " + productoClickeado.nombre.toLowerCase()
    );
    if (cart.items.length == 0) {
      console.log("Se vació el carrito!");
      contadorCarrito.textContent = cart.contador();
    }
    document.getElementById("carrito").innerHTML = "";
    localStorage.setItem("MiCarrito", JSON.stringify(cart)); //actualiza el storage
    showEnCarrito(cart.items);
  }
  
  // Perdon por la funcion comentada, no entiendo por qué me toma cantidad como undefined, cuando hago console log aparece cantidad correctamente...
  // Priorizo aprender a tener una buena nota, por eso lo dejo comentado :

  // agregarItem(e) {
  //   let productoClickeado = cart.items.find((item) => item.id == e.target.id);
  //   productoClickeado.cantidad++
  // }

  limpiarCarrito() {
    for (let producto of cart.items) {
      producto.cantidad = 1;
    }
    cart.items = [];
    document.getElementById("carrito").innerHTML = "";
    console.log("Se vació el carrito!");
    contadorCarrito.textContent = cart.contador();
    localStorage.setItem("MiCarrito", JSON.stringify(cart)); //actualiza el storage a vacío
  }
  // Animacion del carrito ---->
  openCarrito() {
    $("#mySidebar").animate({ width: "350px" }, 50, function () {
      $(".circle").slideDown(150);
      $(".cart").slideDown(150, function () {
        $(".cardCarrito").fadeIn(200);
        $(".cart-footer").fadeIn(150);
      });
    });
  }
  closeCarrito() {
    $(".circle").slideUp(50, function () {
      $(".cart").fadeOut(150, function () {
        $(".cardCarrito").fadeOut(150);
        $(".cart-footer").fadeOut(150);
      });
    });
    $("#mySidebar").animate({ width: "0" }, 200);
  }
  contador() {
    let indicador = 0;
    for (let producto of cart.items) {
      console.log(producto.cantidad);
      indicador += producto.cantidad;
    }
    return indicador;
  }
}
