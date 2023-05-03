(function () {
  let DB;

  document.addEventListener('DOMContentLoaded', () => {
    crearDB();
  });

  //! CREAR BASE DE DATOS DE indexDB
  function crearDB() {
    //* CREAR BASE DE DATOS
    const crearDB = window.indexedDB.open('crm', 1); // ('nombre', version)

    //* EN CASO DE ERROR
    crearDB.onerror = function () {
      console.log('Hubo un Error');
    };

    //* EN CASO DE SUCCESS
    crearDB.onsuccess = function () {
      DB = crearDB.result;
    };

    //* CREAR CAMPOS Y PROPIEDADES BASE DE DATOS

    crearDB.onupgradeneeded = function (e) {
      const db = e.target.result;

      const objectStore = db.createObjectStore('crm', {
        keyPath: 'id', // 'Identificador'
        autoIncrement: true, // 'Autoincrementarse para agregar nuevos datos'
      });

      //* CREAR COLUMNAS DE LA BASE DE DATOS
      objectStore.createIndex('nombre', 'nombre', { unique: false });
      objectStore.createIndex('email', 'email', { unique: true });
      objectStore.createIndex('telefono', 'telefono', { unique: false });
      objectStore.createIndex('empresa', 'empresa', { unique: false });
      objectStore.createIndex('id', 'id', { unique: true });
    };
  }
})();
