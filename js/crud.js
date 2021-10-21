// Elementos del DOM
const d = document;
const $form = d.querySelector(".form");
const $id = d.getElementById("id");
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
  $form.reset();
  swal({
    title: "Excelente!",
    text: "Te has registrado de manera satisfactoria!",
    type: "error",
    confirmButtonText: "Cool",
  });
  swal("Excelente!", "Te has registrado de manera satisfactoria!", "success");
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

//Función para mostrar la información en el formulario
function EditarData(id) {
  $btnRegister.classList.add("d-none");
  $btnEdit.classList.remove("d-none");
  $btnCancel.classList.remove("d-none");

  data = JSON.parse(localStorage.getItem(nameLocalStorage));
  // Obtenemos el objeto a editar
  let userEdit = data.find((e) => e.id === id);

  // Se muestra la información del usuario en el form
  $id.value = userEdit.id;
  $name.value = userEdit.name;
  $lastname.value = userEdit.lastname;
  $email.value = userEdit.email;
  $phone.value = userEdit.phone;
  $city.value = userEdit.city;
  $age.value = userEdit.age;

  // Recorremos el arreglo y bloquemos los demas usuarios
  $tbody.innerHTML = "";
  data.forEach((e) => {
    if (e.id === userEdit.id) {
      $tbody.innerHTML += `
        <tr>
          <td class="p-lg-3">${e.name}</td>
          <td class="p-lg-3">${e.lastname}</td>
          <td class="p-lg-3">${e.email}</td>
          <td class="p-lg-3">${e.phone}</td>
          <td class="p-lg-3">${e.city}</td>
          <td class="p-lg-3">${e.age}</td>
          <td class="d-flex justify-content-around">
            <button class="d-none d-lg-block btn btn-warning fw-bold" onclick="EditarData(${e.id})">
              <i class="d-none fas fa-edit"></i> Editar
            </button>
            <button class="d-none d-lg-block btn btn-danger text-dark fw-bold" onclick="BorrarData(${e.id})">
              <i class="d-none fas fa-trash-alt text-dark"></i> Eliminar
            </button>
            <span class="d-block d-lg-none spanEdit" onclick="EditarData(${e.id})">
              <i class="fas fa-edit"></i>
            </span>
            <span class="d-block d-lg-none spanDelete" onclick="BorrarData(${e.id})">
              <i class="fas fa-trash-alt text-dark"></i>
            </span>
          </td>
        </tr>
      `;
    } else {
      $tbody.innerHTML += `
        <tr>
          <td class="p-lg-3">${e.name}</td>
          <td class="p-lg-3">${e.lastname}</td>
          <td class="p-lg-3">${e.email}</td>
          <td class="p-lg-3">${e.phone}</td>
          <td class="p-lg-3">${e.city}</td>
          <td class="p-lg-3">${e.age}</td>
          <td class="d-flex justify-content-around">
            <button class="d-none d-lg-block btn btn-warning fw-bold" onclick="EditarData(${e.id})" disabled>
              <i class="d-none fas fa-edit"></i> Editar
            </button>
            <button class="d-none d-lg-block btn btn-danger text-dark fw-bold" onclick="BorrarData(${e.id})" disabled>
              <i class="d-none fas fa-trash-alt text-dark"></i> Eliminar
            </button>
            <span class="d-block d-lg-none spanEdit" onclick="EditarData(${e.id})" disabled>
              <i class="fas fa-edit"></i>
            </span>
            <span class="d-block d-lg-none spanDelete" onclick="BorrarData(${e.id})" disabled>
              <i class="fas fa-trash-alt text-dark"></i>
            </span>
          </td>
        </tr>
      `;
    }
  });

  $btnCancel.addEventListener("click", () => {
    $btnRegister.classList.remove("d-none");
    $btnEdit.classList.add("d-none");
    $btnCancel.classList.add("d-none");

    $form.reset();
    MostrarData();
  });
}

function ActualizarData() {
  const $id = parseInt(d.getElementById("id").value);
  data = JSON.parse(localStorage.getItem(nameLocalStorage));

  data.forEach((e) => {
    if (e.id === $id) {
      (e.id = $id),
        (e.name = $name.value),
        (e.lastname = $lastname.value),
        (e.email = $email.value),
        (e.phone = $phone.value),
        (e.city = $city.value),
        (e.age = $age.value);
    }
  });

  $btnRegister.classList.remove("d-none");
  $btnEdit.classList.add("d-none");
  $btnCancel.classList.add("d-none");
  localStorage.setItem(nameLocalStorage, JSON.stringify(data));

  $form.reset();
  MostrarData();
}

function BorrarData(id) {
  // swal(
  //   {
  //     title: "Are you sure?",
  //     text: "You will not be able to recover this imaginary file!",
  //     type: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#DD6B55",
  //     confirmButtonText: "Yes, delete it!",
  //     closeOnConfirm: false,
  //   },
  //   function () {
  //     swal("Deleted!", "Your imaginary file has been deleted.", "success");
  //   }
  // );
  data = data.filter((e) => e.id !== id);
  localStorage.setItem(nameLocalStorage, JSON.stringify(data));
  MostrarData();
}

function MostrarData() {
  $tbody.innerHTML = "";

  data.forEach((e) => {
    $tbody.innerHTML += `
      <tr>
        <td class="p-lg-3">${e.name}</td>
        <td class="p-lg-3">${e.lastname}</td>
        <td class="p-lg-3">${e.email}</td>
        <td class="p-lg-3">${e.phone}</td>
        <td class="p-lg-3">${e.city}</td>
        <td class="p-lg-3">${e.age}</td>
        <td class="d-flex justify-content-around">
          <button class="d-none d-lg-block btn btn-warning fw-bold" onclick="EditarData(${e.id})">
            <i class="d-none fas fa-edit"></i> Editar
          </button>
          <button class="d-none d-lg-block btn btn-danger text-dark fw-bold" onclick="BorrarData(${e.id})">
            <i class="d-none fas fa-trash-alt text-dark"></i> Eliminar
          </button>
          <span class="d-block d-lg-none spanEdit" onclick="EditarData(${e.id})">
            <i class="fas fa-edit"></i>
          </span>
          <span class="d-block d-lg-none spanDelete" onclick="BorrarData(${e.id})">
            <i class="fas fa-trash-alt text-dark"></i>
          </span>
        </td>
      </tr>
    `;
  });
}
