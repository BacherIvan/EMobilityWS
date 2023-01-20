<?php
    if(!isset($_COOKIE['uname']) || !isset($_COOKIE['pwd'])){
        die("Keine Berechtigung");
    }
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <title>Admin</title>
    <style>
        ul {
            list-style-type: none;
            margin: 0;
            padding: 0px;
            overflow: hidden;
            background-color: black;
        }

        li {
            float: left;
        }

        li a {
            display: block;
            color: blue;
            font-size:20px;
            text-align: center;
            padding: 10px 20px;
            text-decoration: none;
        }
        .active{
            background-color: gray;
            color: white;
        }
        li a:hover {
            background-color: green;
            color: white;
        }
    </style>
    <script>
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var rows = JSON.parse(xhttp.responseText);
                for (const item of rows) {
                    const span = document.getElementById('JS-eintrag');

                    var name = document.createTextNode(item['vorname'] + ' ' + item['nachname']);
                    span.appendChild(name);
                    var linebreak = document.createElement('br');
                    span.appendChild(linebreak);

                    var time = document.createTextNode(item['startzeit'] + ' - ' + item['entzeit']);
                    span.appendChild(time);
                    linebreak = document.createElement('br');
                    span.appendChild(linebreak);

                    var entry = document.createTextNode(item['eintrag']);
                    span.appendChild(entry);
                    linebreak = document.createElement('br');
                    span.appendChild(linebreak);
                }
            }
        };
        xhttp.open("GET", "/config/db/Tagebuch.php?datum=" + "2022-11-21");
        xhttp.send(null);
    </script>
    <script>
        class Person {
            constructor(IDP, vorname, nachname) {
                this.IDP = IDP;
                this.vorname = vorname;
                this.nachname = nachname;
            }
        }
        class PersonList {
            constructor() {
                this.list = [];
            }

            addPerson(person) {
                this.list.push(person);
            }

            getPerson(index) {
                return this.list[index];
            }

            getPersonList() {
                return this.list;
            }
        }

        let personList = new PersonList();
        var xhttpPersons = new XMLHttpRequest();
        xhttpPersons.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var rows = JSON.parse(xhttpPersons.responseText);

                for(const item of rows){
                    let person = new Person(item["IDP"], item["vorname"], item["nachname"]);
                    personList.addPerson(person);
                }
                console.log(personList.getPersonList());
            }
        };
        xhttpPersons.open("GET", "/config/db/Persons.php");
        xhttpPersons.send(null);
    </script>
    <link rel="icon" type="image/png" sizes="16x16" href="/Packages/Resources/Public/Images/logo/favicon.png">
</head>

<section id="EBIL-section--admin" class="EBIL-section" data-id="admin" data-hero-layout="full">
    <div class="EBIL-section__wrap">
        <ul>
            <li><a class="active" href="#home">Tagebuch</a></li>
            <li><a href="#auto">Auto</a></li>
        </ul>
        <div id="JS-eintrag"></div>
    </div>

</section>
</html>

