(function () {
  let DB;
  const formulario = document.querySelector('#formulario');

  document.addEventListener('DOMContentLoaded', () => {
    conectarDB();

    //! EVENTLISTENERS

    formulario.addEventListener('submit', validarCliente);
  });

  //! FUNCIONES

  function conectarDB() {
    //* CONECTARSE A BASE DE DATOS
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onerror = function () {
      console.log('error');
    };

    abrirConexion.onsuccess = function () {
      DB = abrirConexion.result;
    };
  }

  function validarCliente(e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    if (nombre === '' || email === '' || telefono === '' || empresa === '') {
      imprimirAlerta('Todos los campos son obligatorios', 'error');

      return;
    }

    //* CREAR OBJETO DE LA INFORMACION

    const cliente = {
      nombre,
      email,
      telefono,
      empresa,
      id: Date.now(),
    };

    crearNuevoCliente(cliente);
  }

  function crearNuevoCliente(cliente) {
    const transaction = DB.transaction(['crm'], 'readwrite');

    const objectStore = transaction.objectStore('crm');

    objectStore.add(cliente);

    transaction.onerror = function () {
      imprimirAlerta('Error al Agregar Cliente', 'error');
    };

    transaction.oncomplete = function () {
      imprimirAlerta('Cliente Agregado Exitosamente', 'success');
    };

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 3000);
  }
})();
