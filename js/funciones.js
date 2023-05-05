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
