/*En esta funcion vamos hacer la lectura de los datos por medio del DOM y 
realizamos una validacion de los datos ingresados, en caso de no poseer los datos
completos el sistema no nos dejara avanzar, y en casi de si tener los datos
el sistema nos dejara crear la funcion de validacion y avanzar*/
function validarFormulario() {

    let producto = document.getElementById('inputProducto').value;
    let sku = document.getElementById('inputSku').value;
    let cantidad = document.getElementById('inputCantidad').value;
    let precio = document.getElementById('inputPrecio').value;


    if (producto == "") {
        window.alert("Por favor ingresar producto");
        return (false);
    }

    if (sku == "") {
        window.alert("Por favor ingresa el codigo SKU del producto");
        return false;
    }

    if (cantidad == "") {
        window.alert("Por favor ingresar cantidad de producto");
        return (false);
    }

    if (precio == "") {
        window.alert("Por favor ingresar precio de producto");
        return (false);
    }

    return true;
}

//Esta funcion es diseñada para la lectura de datos (READ)
function lecturaDatos() {

    let listaProductos;

    if (localStorage.getItem('listaProductos') == null) {
        listaProductos = [];
    }
    else {
        listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    }

    var html = "";

    listaProductos.forEach(function (elemento, index) {

        html += "<tr>";
        html += "<td>" + elemento.producto + "</td>";
        html += "<td>" + elemento.sku + "</td>";
        html += "<td>" + elemento.cantidad + "</td>";
        html += "<td>" + elemento.precio + "</td>";
        html += '<td><button onclick = "actualizarDatos (' + index + ')" class = "btn btn-warning">Actualizar</button> <button onclick = "eliminarDatos (' + index + ')" class = "btn btn-danger">Eliminar</button>';
        html += "</tr>";

    });

    document.querySelector('#tableData tbody').innerHTML = html;
}

//Crea el codigo
document.onload = lecturaDatos();

//Esta funcion es diseñada para anadir datos
function addData() {

    if (validarFormulario() == true) {
        let producto = document.getElementById('inputProducto').value;
        let sku = document.getElementById('inputSku').value;
        let cantidad = document.getElementById('inputCantidad').value;
        let precio = document.getElementById('inputPrecio').value;

        var listaProductos;

        if (localStorage.getItem('listaProductos') == null) {
            listaProductos = [];
        }
        else {
            listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
        }

        listaProductos.push({
            producto: producto,
            sku: sku,
            cantidad: cantidad,
            precio: precio,
        });

        localStorage.setItem('listaProductos', JSON.stringify(listaProductos));

        lecturaDatos();

        document.getElementById('inputProducto').value = "";
        document.getElementById('inputSku').value = "";
        document.getElementById('inputCantidad').value = "";
        document.getElementById('inputPrecio').value = "";

    }
}

function eliminarDatos(index) {

    var listaProductos;

    if (localStorage.getItem('listaProductos') == null) {
        listaProductos = [];
    }
    else {
        listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    }

    listaProductos.splice(index, 1);
    localStorage.setItem('listaProductos', JSON.stringify(listaProductos));

    lecturaDatos();
}


function actualizarDatos(index) {

    document.getElementById("btn_guardar").style.display = 'none';
    document.getElementById("btn_actualizar", btn_guardar).style.display = 'block';

    var listaProductos;

    if (localStorage.getItem('listaProductos') == null) {
        listaProductos = [];
    }
    else {
        listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    }

    document.getElementById('inputProducto').value = listaProductos[index].producto;
    document.getElementById('inputSku').value = listaProductos[index].sku;
    document.getElementById('inputCantidad').value = listaProductos[index].cantidad;
    document.getElementById('inputPrecio').value = listaProductos[index].precio;

    document.querySelector("#btn_actualizar").onclick = function () {

        if (validarFormulario() == true) {
            listaProductos[index].producto = document.getElementById('inputProducto').value;
            listaProductos[index].sku = document.getElementById('inputSku').value;
            listaProductos[index].cantidad = document.getElementById('inputCantidad').value;
            listaProductos[index].precio = document.getElementById('inputPrecio').value;

            localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
            lecturaDatos();

            document.getElementById('inputProducto').value = "";
            document.getElementById('inputSku').value = "";
            document.getElementById('inputCantidad').value = "";
            document.getElementById('inputPrecio').value = "";

            document.getElementById('btn_guardar').style.display = 'block';
            document.getElementById('btn_actualizar').style.display = 'none';

        }
    };

}