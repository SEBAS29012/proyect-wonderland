// Elementos del DOM
const d = document;
const $form = d.querySelector(".form");
const $name = d.getElementById("name");
const $lastname = d.getElementById("lastname");
const $email = d.getElementById("email");
const $phone = d.getElementById("phone");
const $city = d.getElementById("city");
const $age = d.getElementById("age");
const $btnRegister = d.getElementById("register");
const $btnEdit = d.getElementById("edit");
const $btnCancel = d.getElementById("cancel");
const $tbody = d.querySelector("tbody");

// Variables del localStorage
let nameLocalStorage = "dataWonderland";
let data = [];
let lastId = 0;

// Se captura el inicio de la pagina
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem(nameLocalStorage) !== null) {
    data = JSON.parse(localStorage.getItem(nameLocalStorage));
    lastId = data.length > 0 ? data[data.length - 1].id : 0;
    MostrarData();
  }
});

// Captura del evento submit para crear el nuevo usuario
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  CrearData();
  document.querySelector(".form").reset();
});

// Función crear data
function CrearData() {
  lastId++;
  data.push({
    id: lastId,
    name: $name.value,
    lastname: $lastname.value,
    email: $email.value,
    phone: $phone.value,
    city: $city.value,
    age: $age.value,
  });
  localStorage.setItem(nameLocalStorage, JSON.stringify(data));
  MostrarData();
}

function MostrarData() {
  $tbody.innerHTML = "";

  data.forEach((e) => {
    $tbody.innerHTML += `
      <tr>
        <td class="p-3">${e.name}</td>
        <td class="p-3">${e.lastname}</td>
        <td class="p-3">${e.email}</td>
        <td class="p-3">${e.phone}</td>
        <td class="p-3">${e.city}</td>
        <td class="p-3">${e.age}</td>
        <td class="d-flex justify-content-around">
          <button class="btn btn-warning fw-bold">
            <i class="d-none fas fa-edit"></i> Editar
          </button>
          <button class="btn btn-danger text-dark fw-bold">
            <i class="d-none fas fa-trash-alt text-dark"></i> Eliminar
          </button>
        </td>
      </tr>
    `;
  });
}
