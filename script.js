(function () {
    localStorage.clear();
})();

fetch('https://fakestoreapi.com/products?limit=10')
    .then(respuesta=>respuesta.json())
    .then(productos => {
        productos.forEach((producto, i) => { 
            obtenerProducto(producto.id, producto.image, producto.rating.rate, producto.rating.count, producto.title, producto.category, producto.description, producto.price, i); 
            localStorage.setItem(`producto${i + 1}`, JSON.stringify(producto));
        });
    })

function obtenerProducto(id, url, rating, count, title, category, description, price, i) {
    let tienda = document.querySelector("#contenedorTienda");
    let divProducto = document.createElement("div");
    divProducto.id = `producto${i + 1}`;
    divProducto.className = 'claseProducto';
    tienda.appendChild(divProducto);
    let numProducto = document.createElement('h2');
    numProducto.innerText = ('Producto: ' + id);
    divProducto.appendChild(numProducto); 
    let imagen = document.createElement('img');
    imagen.src = url;
    imagen.className = 'imgTienda';
    divProducto.appendChild(imagen);
    let divPequeño = document.createElement("div");
    divPequeño.className = 'clasePequeño';
    divProducto.appendChild(divPequeño);
    let ranking = document.createElement('p')
    ranking.innerText = ('Puntuacion: ' + rating);
    divPequeño.appendChild(ranking);
    let votantes = document.createElement('p');
    votantes.innerText = ('Votantes: ' + count);
    divPequeño.appendChild(votantes);
    let titulo = document.createElement('h3');
    titulo.innerText = title;
    divProducto.appendChild(titulo);
    let categoria = document.createElement('h4');
    categoria.innerHTML = category;
    categoria.className = 'categoria';
    divProducto.appendChild(categoria);
    let descripcion = document.createElement('p');
    descripcion.innerText = 'Descripcion: ' + description;
    divProducto.appendChild(descripcion);
    let divComprar = document.createElement("div");
    divComprar.id = `divComprar`;
    divComprar.className = 'classComprar';
    divProducto.appendChild(divComprar); 
    let precio = document.createElement('h3');
    precio.innerText = (`Precio: ${price} €.`);
    divComprar.appendChild(precio);
    let boton = document.createElement('button');
    boton.innerText = ('Comprar');
    boton.id = 'idBoton';
    boton.className = 'classBoton';
    boton.onclick = function() { 
        agregarCarrito(divProducto, i + 1);
    };
    divComprar.appendChild(boton);
}

function agregarCarrito(divProducto, index) {
    let producto = JSON.parse(localStorage.getItem(`producto${index}`)); 
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []; carrito.push(producto); 
    localStorage.setItem('carrito', JSON.stringify(carrito)); alert('Producto agregado al carrito');
    divProducto.style.backgroundColor = 'rgb(116 135 175)';
}

fetch('https://fakestoreapi.com/products/1')
    .then(respuesta=>respuesta.json())
    .then(producto => obtenerEjemplo(producto.id, producto.image, producto.rating.rate, producto.rating.count, producto.title, producto.category, producto.description, producto.price))

function obtenerEjemplo(id, url, rating, count, title, category, description, price) {
    let productoEj = document.querySelector("#ejCompra");
    let divEjemplo = document.createElement('div');
    divEjemplo.id = 'productoEjemplo';
    divEjemplo.className = 'clasedivEjemplo';
    productoEj.appendChild(divEjemplo);
    let nProducto = document.createElement('h2');
    nProducto.innerText = ('Producto: ' + id);
    divEjemplo.appendChild(nProducto); 
    console.log(nProducto);
    let imagen = document.createElement('img');
    imagen.src = url;
    divEjemplo.appendChild(imagen);
    let divPequeño = document.createElement("div");
    divPequeño.className = 'clasePequeño';
    divEjemplo.appendChild(divPequeño);
    let ranking = document.createElement('p')
    ranking.innerText = ('Puntuacion: ' + rating);
    divPequeño.appendChild(ranking);
    let votantes = document.createElement('p');
    votantes.innerText = ('Votantes: ' + count);
    divPequeño.appendChild(votantes);
    let titulo = document.createElement('h3');
    titulo.innerText = title;
    divEjemplo.appendChild(titulo);
    let categoria = document.createElement('h4');
    categoria.innerHTML = category;
    categoria.className = 'categoria';
    divEjemplo.appendChild(categoria);
    let descripcion = document.createElement('p');
    descripcion.innerText = 'Descripcion: ' + description;
    divEjemplo.appendChild(descripcion);
    let precio = document.createElement('h3');
    precio.innerText = (`Precio: ${price} €.`);
    divEjemplo.appendChild(precio);
}