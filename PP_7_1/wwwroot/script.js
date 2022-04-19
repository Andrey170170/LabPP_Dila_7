// Получение всех отелей
async function GetZoo() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/api/Animal", {
        method: "GET",
        headers: {"Accept": "application/json"}
    });
    // если запрос прошел нормально

    if (response.ok === true) {
        // получаем данные
        const animals = await response.json();
        let rows = document.querySelector("tbody");
        animals.forEach(animal => {
            // добавляем полученные элементы в таблицу
            rows.append(row(animal));
        });
    }
}

// Получение одного отеля
async function GetZooById(id) {
    const response = await fetch(`/api/Animal/${id}`, {
        method: "GET",
        headers: {"Accept": "application/json"}
    });
    if (response.ok === true) {
        const animal = await response.json();
        const form = document.forms["ZooForm"];
        form.elements["Id"].value = animal.id;
        form.elements["Name"].value = animal.name;
        form.elements["View"].value = animal.view;
        form.elements["Age"].value = animal.age;
        form.elements["Gender"].value = animal.gender;
    }
}

async function CreateZoo(Name, View,
                         Age, Gender) {
    const response = await fetch("/api/Animal", {
        method: "POST",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            name: Name,
            view: View,
            age: parseInt(Age, 10),
            gender: Gender
        })
    });
    if (response.ok === true) {
        const animal = await response.json();
        reset();
        document.querySelector("tbody").append(row(animal));
    }
}

async function EditZoo(Id, Name, View,
                       Age, Gender) {
    const response = await fetch(`/api/Animal/${Id}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            id: parseInt(Id, 10),
            name: Name,
            view: View,
            age: parseInt(Age, 10),
            phone: Gender
        })
    });
    if (response.ok === true) {
        const animal = await response.json();

        reset();
        document.querySelector(`tr[data-rowid='${animal.id}']`).replaceWith(row(animal));
    }
}

// Удаление пользователя
async function DeleteTeacher(Id) {
    const response = await fetch(`/api/Animal/${Id}`, {
        method: "DELETE",
        headers: {"Accept": "application/json"}
    });
    if (response.ok === true) {
        const animal = await response.json();
        document.querySelector(`tr[data-rowid='${animal.id}']`).remove();
    }
}

// сброс формы
function reset() {
    const form = document.forms["ZooForm"];
    form.reset();
    form.elements["Id"].value = 0;
}

// создание строки для таблицы
function row(animal) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", animal.id);
    const idTd = document.createElement("td");
    idTd.append(animal.id);

    tr.append(idTd);
    const NameTd = document.createElement("td");
    NameTd.append(animal.name);
    tr.append(NameTd);
    const ViewTd = document.createElement("td");
    ViewTd.append(animal.view);
    tr.append(ViewTd);
    const AgeTd = document.createElement("td");
    AgeTd.append(animal.age);
    tr.append(AgeTd);
    const GenderTd = document.createElement("td");
    GenderTd.append(animal.gender);
    tr.append(GenderTd);
    const linksTd = document.createElement("td");
    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", animal.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {
        e.preventDefault();
        GetZooById(animal.id);
    });
    linksTd.append(editLink);
    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", animal.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {
        e.preventDefault();
        DeleteTeacher(animal.id);
    });
    linksTd.append(removeLink);
    tr.appendChild(linksTd);
    return tr;
}

function InitialFunction() {
    // сброс значений формы
    document.getElementById("reset").click(function (e) {
        e.preventDefault();
        reset();
    })
    // отправка формы
    document.forms["ZooForm"].addEventListener("submit", e => {
        e.preventDefault();
        const form = document.forms["ZooForm"];
        const Id = form.elements["Id"].value;
        const Name = form.elements["Name"].value;
        const View = form.elements["View"].value;
        const Age = form.elements["Age"].value;
        const Gender = form.elements["Gender"].value;
        if (Id === 0)
            CreateZoo(Name, View, Age, Gender);
        else
            EditZoo(Id, Name, View, Age, Gender);
    });
    GetZoo();
}