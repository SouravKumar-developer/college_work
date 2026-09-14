let admins = JSON.parse(localStorage.getItem("admins")) || [
    {
        admin_id: "admin01",
        password: "admin123"
    },
    {
        admin_id: "admin02",
        password: "admin456"
    }
];

let students = JSON.parse(localStorage.getItem("students")) || [
    {
        name: "Rahul Kumar",
        roll: "CSE001",
        dept: "CSE",
        password: "12345"
    },

    {
        name: "Priya Das",
        roll: "CSE002",
        dept: "CSE",
        password: "12345"
    },

    {
        name: "Amit Roy",
        roll: "ECE001",
        dept: "ECE",
        password: "12345"
    }
];


let marks = JSON.parse(localStorage.getItem("marks")) || [

    {
        roll: "CSE001",
        subject: "Data Structures",
        marks: 85
    },

    {
        roll: "CSE001",
        subject: "Database Management",
        marks: 78
    },

    {
        roll: "CSE002",
        subject: "Data Structures",
        marks: 91
    },

    {
        roll: "ECE001",
        subject: "Digital Electronics",
        marks: 82
    }

];


function saveData() {

    localStorage.setItem(
        "admins",
        JSON.stringify(admins)
    );

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    localStorage.setItem(
        "marks",
        JSON.stringify(marks)
    );
}


const adminLoginForm =
    document.getElementById("adminLoginForm");

if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const adminId =
                document.getElementById("adminId").value.trim();

            const password =
                document.getElementById("adminPassword").value;

            /*
                Direct comparison with Admin array.
            */

            const admin = admins.find(function (item) {

                return (
                    item.admin_id === adminId &&
                    item.password === password
                );

            });

            const message =
                document.getElementById("adminLoginMessage");

            if (admin) {

                localStorage.setItem(
                    "loggedInAdmin",
                    admin.admin_id
                );

                message.textContent =
                    "Login successful!";

                message.className =
                    "message success";

                setTimeout(function () {

                    window.location.href =
                        "admin-dashboard.html";

                }, 500);

            } else {

                message.textContent =
                    "Invalid Admin ID or password.";

                message.className =
                    "message error";
            }

        }
    );
}

const studentLoginForm =
    document.getElementById("studentLoginForm");

if (studentLoginForm) {

    studentLoginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const roll =
                document.getElementById("studentId")
                    .value
                    .trim();

            const password =
                document.getElementById("studentPassword")
                    .value;

            const student = students.find(function (item) {

                return (
                    item.roll === roll &&
                    item.password === password
                );

            });

            const message =
                document.getElementById(
                    "studentLoginMessage"
                );

            if (student) {
                localStorage.setItem(
                    "loggedInStudent",
                    student.roll
                );

                message.textContent =
                    "Login successful!";

                message.className =
                    "message success";

                setTimeout(function () {

                    window.location.href =
                        "student-dashboard.html";

                }, 500);

            } else {

                message.textContent =
                    "Invalid Student ID or password.";

                message.className =
                    "message error";
            }

        }
    );
}


const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById(
                    "studentName"
                ).value.trim();

            const roll =
                document.getElementById(
                    "studentRoll"
                ).value.trim();

            const dept =
                document.getElementById(
                    "studentDept"
                ).value;

            const password =
                document.getElementById(
                    "registerPassword"
                ).value;

            const message =
                document.getElementById(
                    "registerMessage"
                );

            const existingStudent =
                students.find(function (student) {

                    return student.roll === roll;

                });


            if (existingStudent) {

                message.textContent =
                    "Student ID already exists.";

                message.className =
                    "message error";

                return;
            }

            const newStudent = {

                name: name,

                roll: roll,

                dept: dept,

                password: password

            };

            students.push(newStudent);

            saveData();


            message.textContent =
                "Registration successful! Redirecting to login...";

            message.className =
                "message success";


            setTimeout(function () {

                window.location.href =
                    "user-login.html";

            }, 1000);

        }
    );
}

if (
    window.location.pathname.includes(
        "admin-dashboard.html"
    )
) {

    const loggedInAdmin =
        localStorage.getItem("loggedInAdmin");

    if (!loggedInAdmin) {

        window.location.href =
            "admin-login.html";

    } else {

        displayStudents();

        displayAllMarks();

    }
}


function displayStudents() {

    const studentList =
        document.getElementById("studentList");

    if (!studentList) {
        return;
    }

    studentList.innerHTML = "";


    if (students.length === 0) {

        studentList.innerHTML =
            "<p>No students registered.</p>";

        return;
    }


    students.forEach(function (student) {

        const div =
            document.createElement("div");

        div.className =
            "student-item";

        div.innerHTML = `

            <strong>
                ${student.name}
            </strong>

            <span>
                Roll: ${student.roll}
            </span>

            <span>
                Department: ${student.dept}
            </span>

        `;

        studentList.appendChild(div);

    });
}



const marksForm =
    document.getElementById("marksForm");

if (marksForm) {
    marksForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const roll =
                document.getElementById(
                    "marksRoll"
                ).value.trim();


            const subject =
                document.getElementById(
                    "subject"
                ).value.trim();


            const totalMarks =
                Number(
                    document.getElementById(
                        "totalMarks"
                    ).value
                );


            const message =
                document.getElementById(
                    "marksMessage"
                );


            /*
                Check whether student exists.
            */

            const student =
                students.find(function (item) {

                    return item.roll === roll;

                });


            if (!student) {

                message.textContent =
                    "Student ID does not exist.";

                message.className =
                    "message error";

                return;
            }


            /*
                Validate marks.
            */

            if (
                totalMarks < 0 ||
                totalMarks > 100
            ) {

                message.textContent =
                    "Marks must be between 0 and 100.";

                message.className =
                    "message error";

                return;
            }


            /*
                Create marks object.
            */

            const newMarks = {

                roll: roll,

                subject: subject,

                marks: totalMarks

            };


            /*
                Add marks object to marks array.
            */

            marks.push(newMarks);


            /*
                Save data.
            */

            saveData();


            message.textContent =
                "Marks added successfully.";

            message.className =
                "message success";
        }
    )
}

//You are the frontend developer, your task is to design a webpage using html, css and js. The project flow is like that - A home page (index.html) navbar options for Admin, User, login if user is not exist then redirect to resigster page for Admin login it need Admin_id and password and for user user_id and password register field contains name, roll and dept of student and for student roll is the student_id, Admin can add marks to the students and access each student marks and student can access the marks obtains from the portal after login. The project totally depends on the frontend no connectivity with the backend, In Js create Array for Admin in which JS objects store Admin_id, password and student Array in which student name, roll and dept are there and also password field to login with direct comparision with the Arrays Object and Also a marks array object is there in which a Admin add marks of a student with the roll, subject and total marks obtain.