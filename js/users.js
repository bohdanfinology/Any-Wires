const USERS = [{
    Name: "AW_Finance",
    Email: "n.soul@brokers.expert",
    Merchant: "Omer",
    Role: "New", 
    Last_login_date: "Jul 7, 2019"
},{
    Name: "Jack Wilson",
    Email: "jack.wilson@brokers.expert",
    Merchant: "",
    Role: "", 
    Last_login_date: "Apr 10, 2019"
},{
    Name: "Mark Novak",
    Email: "mark.n@cryptopmarket.com",
    Merchant: "Omer",
    Role: "Affiliate", 
    Last_login_date: "Apr 9, 2019"
},{
    Name: "Dan Aff",
    Email: "dan@bitsale.com",
    Merchant: "",
    Role: "Affiliate", 
    Last_login_date: "Jun 28, 2019"
},{
    Name: "Dan Aff",
    Email: "dan@bitsale.com",
    Merchant: "",
    Role: "Affiliate", 
    Last_login_date: "Jun 28, 2019"
},{
    Name: "Jack Wilson",
    Email: "jack.wilson@brokers.expert",
    Merchant: "",
    Role: "", 
    Last_login_date: "Apr 10, 2019"
},{
    Name: "Mark Novak",
    Email: "mark.n@cryptopmarket.com",
    Merchant: "Omer",
    Role: "Affiliate", 
    Last_login_date: "Apr 9, 2019"
},{
    Name: "Dan Aff",
    Email: "dan@bitsale.com",
    Merchant: "",
    Role: "Affiliate", 
    Last_login_date: "Jun 28, 2019"
},{
    Name: "Dan Aff",
    Email: "dan@bitsale.com",
    Merchant: "",
    Role: "Affiliate", 
    Last_login_date: "Jun 28, 2019"
}];

class UsersList {
    constructor(){
        this.buttonSearch = document.getElementById("search-button");
        this.createUser_btn = document.querySelector("#createUser-button");
        this.buttonPdf = document.querySelector("#dowloadPdf");
        this.render();
    }

    downloadPdf(){
        var doc = new jsPDF();
        doc.autoTable({html: '#table-user'});
        doc.save('table.pdf');
    }

    hideBlock(){
        jQuery(function($){
            $(document).mouseup(function (e){ // событие клика по веб-документу
                var div = $("#modal-createUser"); // тут указываем ID элемента
                if (!div.is(e.target) // если клик был не по нашему блоку
                    && div.has(e.target).length === 0) { // и не по его дочерним элементам
                    div.hide(); // скрываем его
                    $("#wrapper").removeClass("opacityWrapper");
                }
            });
        });
    }

    createUser(){
        this.wrapper = document.querySelector("#wrapper");
        this.wrapper.classList.add("opacityWrapper");

        this.modalWindow = document.querySelector("#modal-createUser");
        this.modalWindow.style.display = "flex";
        
        this.modalName = document.querySelector(".modal-InputName");
        this.modalEmail = document.querySelector(".modal-InputEmail");
        this.modalMer = document.querySelector(".modal-InputMer");
        this.modalRole = document.querySelector(".modal-InputRole");
        this.DATA = "Aug 10, 2019";

        this.btnAdd = document.querySelector("#saveUser-btn");
        this.btnAdd.addEventListener("click", () => {

            this.table = document.querySelector("#table-list");
            this.newUser = document.createElement("tr");
            this.newUser.innerHTML = `
            <td class="column1">${this.modalName.value}</td> 
            <td class="column2">${this.modalEmail.value}</td> 
            <td class="column3">${this.modalMer.value}</td> 
            <td class="column4">${this.modalRole.value}</td> 
            <td class="column5">${this.DATA}</td>
        `;
        this.table.appendChild(this.newUser);
            this.modalName.value = "";
            this.modalEmail.value = "";
            this.modalMer.value = "";
            this.modalRole.value = "";

            jQuery(function($){
                var div = $("#modal-createUser"); // тут указываем ID элемента
                    div.hide(); // скрываем его
                    $("#wrapper").removeClass("opacityWrapper");
            });
        },{once:true});
        
    }

    searchFunction(){
        var phrase = document.getElementById('search-input');
        var table = document.getElementById('table-user');
        var regPhrase = new RegExp(phrase.value, 'i');
        var flag = false;
        for (var i = 1; i < table.rows.length; i++) {
            flag = false;
            for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
                flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
                if (flag) break;
            }
            if (flag) {
                table.rows[i].style.display = "";
            } else {
                table.rows[i].style.display = "none";
            }
        }
    }

    loadUsers(){
        this.container = document.getElementById("table-list");
        USERS.forEach((item) => {
            item.Merchant === "" ? item.Merchant = "—" : item.Merchant;
            item.Name === "" ? item.Name = "—" : item.Name;
            item.Email === "" ? item.Email = "—" : item.Email;
            item.Role === "" ? item.Role = "—" : item.Role;
            item.Last_login_date === "" ? item.Last_login_date = "—" : item.Last_login_date;

            this.userList = document.createElement("tr");
            this.userList.innerHTML =  `
                    <td class="column1">${item.Name}</td> 
                    <td class="column2">${item.Email}</td> 
                    <td class="column3">${item.Merchant}</td> 
                    <td class="column4">${item.Role}</td> 
                    <td class="column5">${item.Last_login_date}</td>
               
            `;
        this.container.appendChild(this.userList);
        })
    }

    render(){
        this.loadUsers();
        this.hideBlock();
        this.buttonSearch.addEventListener("click", this.searchFunction);
        this.createUser_btn.addEventListener("click", this.createUser);
        this.buttonPdf.addEventListener("click", this.downloadPdf);
    }
};

const userList = new UsersList();








