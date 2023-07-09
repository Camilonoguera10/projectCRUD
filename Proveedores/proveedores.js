/*En esta funcion vamos hacer la lectura de los datos por medio del DOM y 
realizamos una validacion de los datos ingresados, en caso de no poseer los datos
completos el sistema no nos dejara avanzar, y en casi de si tener los datos
el sistema nos dejara crear la funcion de validacion y avanzar*/
function validarFormulario() {
    let proveedor = document.getElementById('inputProveedor').value;
    let direccion = document.getElementById('inputDireccion').value;
    let telefono = document.getElementById('inputTelefono').value;


    if (proveedor == "") {
        window.alert("Por favor ingresar nombre de su proveedor");
        return (false);
    }

    if (direccion == "") {
        window.alert("Por favor ingresa la direccion del proveedor");
        return false;
    }

    if (telefono == "") {
        window.alert("Por favor ingresar numero de telefono");
        return (false);
    }

    return true;
}

//Esta funcion es diseñada para la lectura de datos (READ)
function lecturaDatos() {

    let listaProveedor;

    if (localStorage.getItem('listaProveedor') == null) {
        listaProveedor = [];
    }
    else {
        listaProveedor = JSON.parse(localStorage.getItem("listaProveedor"));
    }

    var html = "";

    listaProveedor.forEach(function (elemento, index) {

        html += "<tr>";
        html += "<td>" + elemento.proveedor + "</td>";
        html += "<td>" + elemento.direccion + "</td>";
        html += "<td>" + elemento.telefono + "</td>";
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
        let proveedor = document.getElementById('inputProveedor').value;
        let direccion = document.getElementById('inputDireccion').value;
        let telefono = document.getElementById('inputTelefono').value;

        var listaProveedor;

        if (localStorage.getItem('listaProveedor') == null) {
            listaProveedor = [];
        }
        else {
            listaProveedor = JSON.parse(localStorage.getItem("listaProveedor"));
        }

        listaProveedor.push({
            proveedor: proveedor,
            direccion: direccion,
            telefono: telefono,
        });

        localStorage.setItem('listaProveedor', JSON.stringify(listaProveedor));

        lecturaDatos();

        document.getElementById('inputProveedor').value = "";
        document.getElementById('inputDireccion').value = "";
        document.getElementById('inputTelefono').value = "";

    }
}

function eliminarDatos(index) {

    var listaProveedor;

    if (localStorage.getItem('listaProveedor') == null) {
        listaProveedor = [];
    }
    else {
        listaProveedor = JSON.parse(localStorage.getItem("listaProveedor"));
    }

    listaProveedor.splice(index, 1);
    localStorage.setItem('listaProveedor', JSON.stringify(listaProveedor));

    lecturaDatos();
}


function actualizarDatos(index) {

    document.getElementById("btn_guardar").style.display = 'none';
    document.getElementById("btn_actualizar", btn_guardar).style.display = 'block';

    var listaProveedor;

    if (localStorage.getItem('listaProveedor') == null) {
        listaProveedor = [];
    }
    else {
        listaProveedor = JSON.parse(localStorage.getItem("listaProveedor"));
    }

    document.getElementById('inputProveedor').value = listaProveedor[index].proveedor;
    document.getElementById('inputDireccion').value = listaProveedor[index].direccion;
    document.getElementById('inputTelefono').value = listaProveedor[index].telefono;

    document.querySelector("#btn_actualizar").onclick = function () {

        if (validarFormulario() == true) {
            listaProveedor[index].proveedor = document.getElementById('inputProveedor').value;
            listaProveedor[index].direccion = document.getElementById('inputDireccion').value;
            listaProveedor[index].telefono = document.getElementById('inputTelefono').value;

            localStorage.setItem('listaProveedor', JSON.stringify(listaProveedor));
            lecturaDatos();

            document.getElementById('inputProveedor').value = "";
            document.getElementById('inputDireccion').value = "";
            document.getElementById('inputTelefono').value = "";

            document.getElementById('btn_guardar').style.display = 'block';
            document.getElementById('btn_actualizar').style.display = 'none';

        }
    };

}