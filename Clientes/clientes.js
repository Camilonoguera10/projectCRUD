function validarFormulario() {
    let nombre = document.getElementById('inputNombre').value;
    let email = document.getElementById('inputEmail').value;
    let telefono = document.getElementById('inputTelefono').value;


    if (nombre == "") {
        window.alert("Por favor ingresar nombre completo");
        return (false);
    }

    if (email == "") {
        window.alert("Por favor ingresa tu correo electronico");
        return false;
    }

    else if (!email.includes('@')) {
        window.alert("Correo electronico invalido");
        return (false);
    }

    if (telefono == "") {
        window.alert("Por favor ingresar numero de telefono");
        return (false);
    }

    return true;
}

function lecturaDatos() {

    let listaCliente;

    if (localStorage.getItem('listaCliente') == null) {
        listaCliente = [];
    }
    else {
        listaCliente = JSON.parse(localStorage.getItem("listaCliente"));
    }

    var html = "";

    listaCliente.forEach(function (elemento, index) {

        html += "<tr>";
        html += "<td>" + elemento.nombre + "</td>";
        html += "<td>" + elemento.email + "</td>";
        html += "<td>" + elemento.telefono + "</td>";
        html += '<td><button onclick = "actualizarDatos (' + index + ')" class = "btn btn-warning">Actualizar</button> <button onclick = "eliminarDatos (' + index + ')" class = "btn btn-danger">Eliminar</button>';
        html += "</tr>";

    });

    document.querySelector('#tableData').innerHTML = html;
}

document.onload = lecturaDatos();

function addData() {

    if (validarFormulario() == true) {
        let nombre = document.getElementById('inputNombre').value;
        let email = document.getElementById('inputEmail').value;
        let telefono = document.getElementById('inputTelefono').value;

        let listaCliente;

        if (localStorage.getItem('listaCliente') == null) {

            listaCliente = [];

        }
        else {
            listaCliente = JSON.parse(localStorage.getItem("listaCliente"));
        }

        listaCliente.push({
            nombre: nombre,
            email: email,
            telefono: telefono,
        });

        localStorage.setItem('listaCliente', JSON.stringify(listaCliente));

        lecturaDatos();

        document.getElementById('inputNombre').value = "";
        document.getElementById('inputEmail').value = "";
        document.getElementById('inputTelefono').value = "";

    }
}

function eliminarDatos(index) {

    let listaCliente;

    if (localStorage.getItem('listaCliente') == null) {
        listaCliente = [];
    }
    else {
        listaCliente = JSON.parse(localStorage.getItem("listaCliente"));
    }

    listaCliente.splice(index, 1);
    localStorage.setItem('listaCliente', JSON.stringify(listaCliente));

    lecturaDatos();
}


function actualizarDatos(index) {

    document.getElementById('btn_guardar').style.display = 'none';
    document.getElementById('btn_actualizar').style.display = 'block';

    let listaCliente;

    if (localStorage.getItem('listaCliente') == null) {
        listaCliente = [];
    }
    else {
        listaCliente = JSON.parse(localStorage.getItem("listaCliente"));
    }

    document.getElementById('inputNombre').value = listaCliente[index].nombre;
    document.getElementById('inputEmail').value = listaCliente[index].email;
    document.getElementById('inputTelefono').value = listaCliente[index].telefono;

    document.querySelector('#btn_actualizar').onclick = function () {

        if (validarFormulario == true) {
            listaCliente[index].nombre = document.getElementById('inputNombre').value;
            listaCliente[index].email = document.getElementById('inputEmail').value;
            listaCliente[index].telefono = document.getElementById('inputTelefono').value;

            localStorage.setItem('listaCliente', JSON.stringify(listaCliente));
            lecturaDatos();

            document.getElementById('inputNombre').value = "";
            document.getElementById('inputEmail').value = "";
            document.getElementById('inputTelefono').value = "";

            document.getElementById('btn_guardar').style.display = 'block';
            document.getElementById('btn_actualizar').style.display = 'none';

        }
    };

}