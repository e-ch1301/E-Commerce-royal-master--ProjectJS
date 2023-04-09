function signup() {
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    var firstNameCl = document.getElementById("firstName").value;
    verification("firstNameError", "Le prénom doit comporter au moins 3 caractères", firstNameCl.length < 3);
    var lastNameCl = document.getElementById("lastName").value;
    verification("lastNameError", "Le nom doit comporter au moins 3 caractères", lastNameCl.length < 3);
    var email = document.getElementById("email").value;
    verification("emailError", "Email existe", checkEmail(usersTab, email));
    var pwd = document.getElementById("pwd").value;
    verification("pwdError", "Le mot de passe doit être entre 6 et 12 caractères", pwd.length < 6 && pwd.length > 12);
    var tel = document.getElementById("tel").value;
    verification("telError", "Tel incorrect", tel.length > 8)
    if (
        firstNameCl.length >= 3 &&
        lastNameCl.length >= 3 &&
        pwd.length >= 6 &&
        pwd.length <= 12 &&
        tel.length == 8 &&
        !checkEmail(usersTab, email)
    ) {
        var userObj = {
            id: maxId(usersTab) + 1,
            firstName: firstNameCl,
            lastName: lastNameCl,
            email: email,
            pwd: pwd,
            tel: tel,
            role: "client"
        };
        usersTab.push(userObj);
        localStorage.setItem("users", JSON.stringify(usersTab));
        location.replace("index.html");
    }
}

function signupAdmin() {
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    var firstName = document.getElementById("firstNameAdminID").value;
    verification("firstNameError", "Le prénom doit comporter au moins 3 caractères", firstName.length < 3);
    var lastName = document.getElementById("lastNameAdminID").value;
    verification("lastNameError", "Le nom doit comporter au moins 3 caractères", lastName.length < 3);
    var email = document.getElementById("emailAdminID").value;
    verification("emailError", "Email existe", checkEmail(usersTab, email));
    var pwd = document.getElementById("pwdAdminID").value;
    verification("pwdError", "Le mot de passe doit être entre 6 et 12 caractères", pwd.length < 6 && pwd.length > 12);
    var tel = document.getElementById("telAdminID").value;
    verification("telError", "Tel incorrect", tel.length > 8)
    if (
        firstName.length >= 3 &&
        lastName.length >= 3 &&
        pwd.length >= 6 &&
        pwd.length <= 12 &&
        tel.length == 8 &&
        !checkEmail(usersTab, email)
    ) {
        var userObj = {
            id: maxId(usersTab) + 1,
            firstName: firstName,
            lastName: lastName,
            email: email,
            pwd: pwd,
            tel: tel,
            role: "admin"
        };
        usersTab.push(userObj);
        localStorage.setItem("users", JSON.stringify(usersTab));
        location.replace("index.html");
    }
}

function signupOwner() {
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    var firstName = document.getElementById("firstNameOwnerID").value;
    verification("firstNameError", "Le prénom doit comporter au moins 3 caractères", firstName.length < 3);
    var lastName = document.getElementById("lastNameOwnerID").value;
    verification("lastNameError", "Le nom doit comporter au moins 3 caractères", lastName.length < 3);
    var email = document.getElementById("emailOwnerID").value;
    verification("emailError", "Email existe", checkEmail(usersTab, email));
    var pwd = document.getElementById("pwdOwnerID").value;
    verification("pwdError", "Le mot de passe doit être entre 6 et 12 caractères", pwd.length < 6 && pwd.length > 12);
    var tel = document.getElementById("telOwnerID").value;
    verification("telError", "Tel incorrect", tel.length > 8)
    if (
        firstName.length >= 3 &&
        lastName.length >= 3 &&
        pwd.length >= 6 &&
        pwd.length <= 12 &&
        tel.length == 8 &&
        !checkEmail(usersTab, email)
    ) {
        var userObj = {
            id: maxId(usersTab) + 1,
            firstName: firstName,
            lastName: lastName,
            email: email,
            pwd: pwd,
            tel: tel,
            role: "owner"
        };
        usersTab.push(userObj);
        localStorage.setItem("users", JSON.stringify(usersTab));
        location.replace("index.html");
    }
}

function verification(spanId, msg, condition) {
    if (condition) {
        document.getElementById(spanId).innerHTML = msg;
        document.getElementById(spanId).style.color = "red";
    }
    else {
        document.getElementById(spanId).innerHTML = "";
    }
}

function checkEmail(T, ch) {
    var emailExist = false;
    for (let i = 0; i < T.length; i++) {
        if (T[i].email == ch) {
            emailExist = true;
            break;
        }
    }
    return emailExist;
}

function maxId(T) {
    var max;
    if (T.length == 0) {
        max = 0;
    } else {
        max = T[0].id;
        for (let i = 1; i < T.length; i++) {
            if (T[i].id > max) {
                max = T[i].id;
            }
        }
    }
    return max;
}

function getFromLS(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
}

function login() {
    var usersTab = getFromLS("users");
    var email = document.getElementById("userEmail").value;
    var pwd = document.getElementById("userPwd").value;
    var isLoggedIn = false;
    var role;
    for (let i = 0; i < usersTab.length; i++) {
        if (usersTab[i].email == email && usersTab[i].pwd == pwd) {
            localStorage.setItem("connectedUser", usersTab[i].id);
            isLoggedIn = true;
            role = usersTab[i].role;
            break;
        }
    }
    if (isLoggedIn) {
        if (role == "admin") {
            location.replace("index.html");
        } else if (role == "owner")
            location.replace("index.html")
        else {
            location.replace("index.html");
        }

    } else {
        document.getElementById("userError").innerHTML = "Email et/ou mot de passe incorrecte"
    }

}

function logout() {
    localStorage.removeItem("connectedUser");
    location.replace("index.html");

}

function addGuestHouse() {
    var guestHouseName = document.getElementById("guestHouseNameId").value;
    verification("guestNameError", "le nom doit comporter au moins 3 caractères", guestHouseName.length < 3);
    var price = document.getElementById("priceId").value;
    verification("priceError", "le prix doit être supérieur à 0", Number(price) <= 0);
    var adress = document.getElementById("adressId").value;
    verification("adressError", "l'adresse doit comporter au moins 10 caractères", adress.length<10);
    var tel = document.getElementById("telHouseId").value;
    verification("telError", "tel incorrecte", tel.length > 8);
    if (
        guestHouseName.length >= 3 && 
        Number(price) > 0 &&
        adress.length>=10 &&
        tel.length == 8 ) 
        {
        var guestTab = JSON.parse(localStorage.getItem("houses") || "[]");
        var connectedUser = localStorage.getItem("connectedUser");
        var house = {
            id: maxId(guestTab) + 1,
            idUser: connectedUser,
            guestHouseName: guestHouseName,
            price: price,
            adress : adress,
            tel: tel,
            statut: "non confirmé"
        }
    };
    guestTab.push(house);
    localStorage.setItem("houses", JSON.stringify(guestTab));
    location.replace("addRoom.html");
}

function showHouses() {
    var guestTab = getFromLS("houses");
    var result = "";
    for (let i = 0; i < guestTab.length; i++) {
        if (guestTab[i].statut == "confirmé") {
            result += `
        <div class="col-lg-6 col-sm-6">
                        <div class="accomodation_item text-center">
                            <div class="hotel_img">
                                <img src="image/img.jpg" alt="">
                                <a href="showRoom.html" class="btn theme_btn button_hover" onclick = "goToHouseInfo(${guestTab[i].id})">Consulter</a>
                            </div>
                             <h4 class="sec_h4">${guestTab[i].guestHouseName}</h4>
                             A partir de <h5>${guestTab[i].price}€<small>/nuitée</small></h5>
                        </div>
                    </div>`
        }
        
    }
    document.getElementById("housesBloc").innerHTML = result;   
    }
    

function goToHouseInfo(id) {
    localStorage.setItem("ghId", id);
    location.replace("");
}

function addRoom() {
    var roomName = document.getElementById("roomNameId").value;
    verification("roomNameError", "le nom doit comporter au moins 3 caractères", roomName.length < 3);
    var price = document.getElementById("priceId").value;
    verification("priceError", "le prix doit être supérieur à 0", Number(price) <= 0);
    if (roomName.length >= 3 && Number(price) > 0) {
        var roomsTab = JSON.parse(localStorage.getItem("rooms") || "[]");
        var connectedUser = localStorage.getItem("connectedUser");

        var room = {
            id: maxId(roomsTab) + 1,
            idUser: connectedUser,
            idGuest: idGuest,
            roomName: roomName,
            price: price,
        }
    };
    roomsTab.push(room);
    localStorage.setItem("rooms", JSON.stringify(roomsTab));
}

function showRooms() {
    var roomsTab = getFromLS("rooms");
    var result = "";
    for (let i = 0; i < roomsTab.length; i++) {
        result += `
        <div class="col-lg-3 col-sm-6">
          <div class="accomodation_item text-center">
            <div class="hotel_img">
                <img src="image/mg.jpg" alt="">
            </div>
            <h4 class="sec_h4">${roomsTab[i].roomName}</h4></a>
            <h5>${roomsTab[i].price}€<small>/nuité</small></h5>
          </div>
          <div>
          <button onclick = "goToRoomInfo(${roomsTab[i].id})" class ="btn btn-info">Voir Disponibilité</button><br><br>
          </div>
        </div>`
    }
    document.getElementById("roomsBloc").innerHTML = result;
}

function goToRoomInfo(id) {
    localStorage.setItem("rmId", id);
    location.replace("roomDetails.html");
}

function roomDetails() {
    var idR = localStorage.getItem("rmId");
    var roomsTab = getFromLS("rooms");
    var room = {};
    for (let i = 0; i < roomsTab.length; i++) {
        if (roomsTab[i].id == idR) {
            room = roomsTab[i];
            break;
        }
    }
    document.getElementById("rmName").innerHTML = room.roomName;
    document.getElementById("rmPrice").innerHTML = room.price;
}

function reserve() {
    // ID ROOM
    var idR = localStorage.getItem("rmId");
    var idG = localStorage.getItem("ghId");
    // ALL reservations
    var reservesTab = getFromLS("reserves");
    // DATE IN
    var dateIn = document.getElementById("dateInId").value;
    // DATE OUT
    var dateOut = document.getElementById("dateOutId").value;
    var connectedUser = localStorage.getItem("connectedUser");
    var isAvailable = true;
    for (let i = 0; i < reservesTab.length; i++) {
        if (reservesTab[i].idRoom == idR && reservesTab[i].dateIn == dateIn && reservesTab[i].dateOut == dateOut) {
            isAvailable = false;
            break;
        }
    }
    if (isAvailable) {
        var reserve = {
            id: maxId(reservesTab) + 1,
            idUser: connectedUser,
            idGuest: idG,
            idRoom: idR,
            dateIn: dateIn,
            dateOut: dateOut,
            statut: "en attente"
        }
        reservesTab.push(reserve);
        localStorage.setItem("reserves", JSON.stringify(reservesTab));
        location.replace("myReserves.html");
    } else {
        document.getElementById("rmDispo").innerHTML = "non disponible"
    }

}

function myReserves() {
    var reserves = getFromLS("reserves");
    var connectedUser = localStorage.getItem("connectedUser");
    var myReservesTab = [];
    for (let i = 0; i < reserves.length; i++) {
        if (reserves[i].idUser == connectedUser) {
            myReservesTab.push(reserves[i]);
        }
    }
    var result = "";

    for (let i = 0; i < myReservesTab.length; i++) {
        result += `
        <tr> 
        <td>${myReservesTab[i].id}</td>
        <td>${searchObjectById(myReservesTab[i].idGuest, "houses").guestHouseName}</td>
        <td>${searchObjectById(myReservesTab[i].id, "rooms").roomName}</td>
        <td>${myReservesTab[i].dateIn}</td>
        <td>${myReservesTab[i].dateOut}</td>
        <td>${myReservesTab[i].statut}</td>
       </tr>;`

    }
    document.getElementById("allReserves").innerHTML = result;
}

function searchObjectById(idObj, key) {
    var tab = getFromLS(key);
    var findedObject;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == idObj) {
            findedObject = tab[i];
            break;
        }

    }
    return findedObject;
}

function generateHeader() {
    var connectedUser = localStorage.getItem("connectedUser");
    var findedUser = searchObjectById(connectedUser, "users");
    var result = "";
    if (connectedUser) {
        if (
            findedUser.role == "client"
        ) {
            result = `
              <li class="nav-item"><a class="nav-link" href="index.html">Bienvenu(e) Mr/Mme ${findedUser.firstName} ${findedUser.lastName}</a></li>
              <li class="nav-item active"><a class="nav-link" href="index.html">Acceuil</a></li>
              <li class="nav-item"><a class="nav-link" href="hebergement.html">Hébérgements</a></li>
              <li class="nav-item"><a class="nav-link" href="myReserves.html">Mes Réservations</a></li>
              <li class="nav-item"><a class="nav-link" onclick ="logout()">Se déconnecter</a></li>
              `
        }
        else {
            if (
                findedUser.role == "owner"
            ) {
                result = `
                  <li class="nav-item"><a class="nav-link" href="index.html">Bienvenu(e) Mr/Mme ${findedUser.firstName} ${findedUser.lastName}</a></li>
                  <li class="nav-item"><a class="nav-link" href="clientReserves.html">Les Réservations Clients</a></li>
                  <li class="nav-item"><a class="nav-link" href="addHouses.html">Ajouter une MH</a></li>
                  <li class="nav-item"><a class="nav-link" href="addRoom.html">Ajouter une chambre</a></li>
                  <li class="nav-item"><a class="nav-link" onclick ="logout()">Se déconnecter</a></li>
                  `
            }
            else {
                if (
                    findedUser.role == "admin"
                )
                    result = `
                  <li class="nav-item"><a class="nav-link" href="index.html">Bienvenu(e) Mr/Mme ${findedUser.firstName} ${findedUser.lastName}</a></li>
                  <li class="nav-item"><a class="nav-link" href="mhList.html">Les Maisons d'hôtes</a></li>
                  <li class="nav-item"><a class="nav-link" href="clientList.html">Les Réservations Clients</a></li>
                  <li class="nav-item"><a class="nav-link" onclick ="logout()">Se déconnecter</a></li>
       `
            }
        }
    }
    else {
        result = `
        <li class="nav-item active"><a class="nav-link" href="index.html">Acceuil</a></li>
        <li class="nav-item"><a class="nav-link" href="hebergement.html">Hébérgements</a></li>
        <li class="nav-item"><a class="nav-link" href="gallery.html">Galerie</a></li>                
        <li class="nav-item"><a class="nav-link" href="about.html">A propos de nous</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
        <li class="nav-item submenu dropdown">
            <img src="img.png" class="navbar-brand logo_h"><a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button"></a>
            <ul class="dropdown-menu">
                <li class="nav-item"><a class="nav-link" href="login.html">Se connecter</a></li>
                <li class="nav-item"><a class="nav-link" href="signup.html">Créer un compte</a></li>
            </ul>
        </li> 
       `
    }

    document.getElementById("headerID").innerHTML = result;
}

function confirmeHouses(id){
    var housesTab = getFromLS ("houses");
    for (let i = 0; i < housesTab.length; i++) {
       if (housesTab[i].id == id) {
        housesTab[i].statut = "confirmé"
        break;
       }
    }
    localStorage.setItem("houses",JSON.stringify(housesTab));
    location.reload();
}

function generateUsers() {  
    var reservesTab = getFromLS("reserves");
    var result = "";
    for (let i = 0; i < reservesTab.length; i++) {
        result += `
        <tr> 
        <td>${searchObjectById(reservesTab[i].idUser, "users").id}</td>
        <td>${searchObjectById(reservesTab[i].idUser, "users").firstName} ${searchObjectById(reservesTab[i].idUser, "users").lastName}</td>
        <td>${searchObjectById(reservesTab[i].idUser, "users").email}</td>
        <td>${searchObjectById(reservesTab[i].idUser, "users").tel}</td>
        <td>${searchObjectById(reservesTab[i].idGuest, "houses").guestHouseName}</td>
        <td>${searchObjectById(reservesTab[i].idRoom, "rooms").roomName}</td>
       </tr>;`

    }

    document.getElementById("allUsers").innerHTML = result;
}


function generateGuestHouses() {
    var housesTab = getFromLS("houses");
    var result = "";
    for (let i = 0; i < housesTab.length; i++) {
        result = result +
            `<tr>
        <td>${housesTab[i].id}</td>
        <td>${housesTab[i].guestHouseName}</td>
        <td>${housesTab[i].adress}</td>
        <td>${housesTab[i].tel}</td>
        <td>
        <button class = "btn btn-success" onclick="confirmeHouses(${housesTab[i].id})">Confirmer</button>
        </td>
        
        </tr>;`
    }
    // <td>${searchObjectById(reservesTab[i].id, "rooms").roomName}</td>
    document.getElementById("allHouses").innerHTML = result;
}

function confirmeHouse(id) {
    var housesTab = getFromLS("houses");
    for (let i = 0; i < housesTab.length; i++) {
       if (housesTab[i].id == id) {
        housesTab[i].statut = "Confirmé";
        break;
       }
        
    }
    localStorage.setItem("houses", JSON.stringify(housesTab));
    location.reload();
}

function generateOwner() {
    var reservesTab = getFromLS("reserves");
    var result = "";
    for (let i = 0; i < reservesTab.length; i++) {
        result += `
        <tr> 
        <td>${reservesTab[i].id}</td>
        <td>${searchObjectById(reservesTab[i].idGuest, "houses").guestHouseName}</td>
        <td>${searchObjectById(reservesTab[i].idRoom, "rooms").roomName}</td>
        <td>${searchObjectById(reservesTab[i].idUser, "users").firstName} ${searchObjectById(reservesTab[i].idUser, "users").lastName}</td>
        <td>${reservesTab[i].dateIn}</td>
        <td>${reservesTab[i].dateOut}</td>
        <td>
        <button class = "btn btn-success" onclick="confirme(${reservesTab[i].id})">Confirmer</button>
        <button class="btn btn-warning">Annuler</button>
       </td>
       </tr>;`

    }

    document.getElementById("allRes").innerHTML = result;
}

function confirme(id) {
    var reservesTab = getFromLS("reserves");
    for (let i = 0; i < reservesTab.length; i++) {
       if (reservesTab[i].id == id) {
        reservesTab[i].statut = "Confirmé";
        break;
       }
        
    }
    localStorage.setItem("reserves", JSON.stringify(reservesTab));
    location.reload();
}







