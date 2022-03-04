// Получение всех отелей
async function GetTeacher() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/api/teacher", {
        method: "GET",
        headers: {"Accept": "application/json"}
    });
    // если запрос прошел нормально

    if (response.ok === true) {
        // получаем данные
        const teachers = await response.json();
        let rows = document.querySelector("tbody");
        teachers.forEach(teacher => {
            // добавляем полученные элементы в таблицу
            rows.append(row(teacher));
        });
    }
}

// Получение одного отеля
async function GetTeacherById(id) {
    const response = await fetch(`/api/teacher/${id}`, {
        method: "GET",
        headers: {"Accept": "application/json"}
    });
    if (response.ok === true) {
        const teacher = await response.json();
        const form = document.forms["teacherForm"];
        form.elements["TeacherID"].value = teacher.teacherID;
        form.elements["FullName"].value = teacher.fullName;
        form.elements["Age"].value = teacher.age;
        form.elements["YearsOfWork"].value = teacher.yearsOfWork;
        form.elements["Phone"].value = teacher.phone;
        form.elements["Email"].value = teacher.email;
    }
}

async function CreateTeacher(FullName, Age,
                           YearsOfWork, Phone, Email) {
    const response = await fetch("api/teacher", {
        method: "POST",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            fullName: FullName,
            age: parseInt(Age, 10),
            yearsOfWork: parseInt(YearsOfWork, 10),
            phone: parseInt(Phone, 10),
            email: Email
        })
    });
    if (response.ok === true) {
        const teacher = await response.json();
        reset();
        document.querySelector("tbody").append(row(teacher));
    }
}

async function EditTeacher(teacherID, FullName, Age,
                         YearsOfWork, Phone, Email) {
    const response = await fetch(`/api/teacher/${teacherID}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            teacherID: parseInt(teacherID, 10),
            fullName: FullName,
            age: parseInt(Age, 10),
            yearsOfWork: parseInt(YearsOfWork, 10),
            phone: parseInt(Phone, 10),
            email: Email
        })
    });
    if (response.ok === true) {
        const teacher = await response.json();

        reset();
        document.querySelector(`tr[data-rowid='${teacher.teacherID}']`).replaceWith(row(teacher));
    }
}

// Удаление пользователя
async function DeleteTeacher(TeacherID) {
    const response = await fetch(`/api/teacher/${TeacherID}`, {
        method: "DELETE",
        headers: {"Accept": "application/json"}
    });
    if (response.ok === true) {
        const teacher = await response.json();
        document.querySelector(`tr[data-rowid='${teacher.teacherID}']`).remove();
    }
}

// сброс формы
function reset() {
    const form = document.forms["teacherForm"];
    form.reset();
    form.elements["teacherID"].value = 0;
}

// создание строки для таблицы
function row(teacher) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", teacher.teacherID);
    const idTd = document.createElement("td");
    idTd.append(teacher.teacherID);

    tr.append(idTd);
    const FullNameTd = document.createElement("td");
    FullNameTd.append(teacher.fullName);
    tr.append(FullNameTd);
    const AgeTd = document.createElement("td");
    AgeTd.append(teacher.age);
    tr.append(AgeTd);
    const YearsOfWorkTd = document.createElement("td");
    YearsOfWorkTd.append(teacher.yearsOfWork);
    tr.append(YearsOfWorkTd);
    const PhoneTd = document.createElement("td");
    PhoneTd.append(teacher.phone);
    tr.append(PhoneTd);
    const EmailTd = document.createElement("td");
    EmailTd.append(teacher.email);
    tr.append(EmailTd);
    const linksTd = document.createElement("td");
    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", teacher.teacherID);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {
        e.preventDefault();
        GetTeacherById(teacher.teacherID);
    });
    linksTd.append(editLink);
    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", teacher.teacherID);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {
        e.preventDefault();
        DeleteTeacher(teacher.teacherID);
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
    document.forms["teacherForm"].addEventListener("submit", e => {
        e.preventDefault();
        const form = document.forms["teacherForm"];
        const TeacherID = form.elements["teacherID"].value;
        const FullName = form.elements["fullName"].value;
        const Age = form.elements["age"].value;
        const YearsOfWork = form.elements["yearsOfWork"].value;
        const Phone = form.elements["phone"].value;
        const Email = form.elements["email"].value;
        if (TeacherID == 0)
            CreateTeacher(FullName, Age, YearsOfWork, Phone, Email);
        else
            EditTeacher(TeacherID, FullName, Age, YearsOfWork, Phone, Email);
    });
    GetTeacher();
}