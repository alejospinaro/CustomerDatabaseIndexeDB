let DB;

document.addEventListener('DOMContentLoaded', () => {
  crearDB();
});

//! CREAR BASE DE DATOS DE indexDB
function crearDB() {
  const crearDB = window.indexedDB.open('crm', 1);

  //* EN CASO DE ERROR
  crearDB.onerror = function () {
    console.log('Hubo un Error');
  };

  //* EN CASO DE SUCCESS
  crearDB.onsuccess = function () {
    DB = crearDB.result;
  };

  crearDB.onupgradeneeded = function (e) {
    const db = e.target.result;

    const objectStore = db.createObjectStore('crm', {
      keyPath: 'id',
      autoIncrement: true,
    });

    objectStore.createIndex('nombre', 'nombre', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });
    objectStore.createIndex('telefono', 'telefono', { unique: false });
    objectStore.createIndex('empresa', 'empresa', { unique: false });
    objectStore.createIndex('id', 'id', { unique: true });

    console.log('DB Lista y Creada');
  };
}
