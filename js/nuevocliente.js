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

  function imprimirAlerta(mensaje, tipo) {
    //* CREAR ALERTA

    const alertmessage = document.createElement('DIV');

    const alerta = document.querySelector('.alertMessage');

    if (!alerta) {
      //* AGREGAR ESTILOS
      alertmessage.classList.add(
        'px-4',
        'py-3',
        'rounded',
        'max-w-lg',
        'mx-auto',
        'mt-6',
        'text-center',
        'alertMessage'
      );
      if (tipo === 'error') {
        alertmessage.classList.add(
          'bg-red-100',
          'border-red-400',
          'text-red-700'
        );
      } else {
        alertmessage.classList.add(
          'bg-green-100',
          'border-green-400',
          'text-green-700'
        );
      }

      //* AGREGAR MENSAJE
      alertmessage.textContent = mensaje;

      //* AGREGAR AL HTML
      formulario.appendChild(alertmessage);

      //* ELIMINAR MENSAJE LUEGO DE 3 SEGUNDOS

      setTimeout(() => {
        alertmessage.remove();
      }, 3000);
    }
  }
})();
