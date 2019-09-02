const USERS = [{
    Name: "AW_Finance",
    Email: "n.soul@brokers.expert",
    Merchant: "Omer",
    Role: "CRM Admin", 
    Last_login_date: "Jul 7, 2019"
},{
    Name: "Jack Wilson",
    Email: "france@brokers.expert",
    Merchant: "Or",
    Role: "Invoice Manager", 
    Last_login_date: "Apr 10, 2019"
},{
    Name: "Mark Novak",
    Email: "mark.n@cryptopmarket.com",
    Merchant: "Omer",
    Role: "CRM Invoice Manager", 
    Last_login_date: "Apr 9, 2019"
},{
    Name: "Darina Smith",
    Email: "dan@bitsale.com",
    Merchant: "Or",
    Role: "Affiliate", 
    Last_login_date: "Jun 28, 2019"
},{
    Name: "Alexa Bauman",
    Email: "eagl@bitsale.com",
    Merchant: "CM",
    Role: "CRM Finance Manager", 
    Last_login_date: "Jun 28, 2019"
},{
    Name: "Clime Michael",
    Email: "jack.wilson@brokers.expert",
    Merchant: "CMP24",
    Role: "Merchant Manager", 
    Last_login_date: "Apr 10, 2019"
},{
    Name: "Zayan Le Blank",
    Email: "arra.n@cryptopmarket.com",
    Merchant: "Omer",
    Role: "Solution Manager", 
    Last_login_date: "Apr 9, 2019"
},{
    Name: "Alice Blair",
    Email: "bruce@bitsale.com",
    Merchant: "CM",
    Role: "CRM Admin", 
    Last_login_date: "Jun 28, 2019"
},{
    Name: "Bruce Willis",
    Email: "corc@bitsale.com",
    Merchant: "Lions",
    Role: "Affiliate", 
    Last_login_date: "Jun 28, 2019"
}];

MERCHANTS = ["Or", "CK", "CMP24", "GigaFX", "Omer", "Lions", "BU", "Tesla", "CFM Solution", "English", "TurboF"];

class UsersList {
    constructor(){
        this.clearFilterBtn = document.querySelector("#clearFilterBtn");
        this.showFilterBtn = document.querySelector("#showBtn");
        this.buttonSearch = document.getElementById("search-button");
        this.sortNameBtnUp = document.querySelectorAll(".sortUp");
        this.sortNameBtnDown = document.querySelectorAll(".sortDown");
        this.buttonSearch = document.getElementById("search-button");
        this.createUser_btn = document.querySelector("#createUser-button");
        this.buttonXls = document.querySelector("#dowloadPdf");
        this.render();
    }

    clearFilter = () => {
        this.searchInput = document.querySelector("#search-input").value = "";
        this.selets = document.querySelectorAll("select");
        this.selets.forEach(item => item.value = "");
        this.container = document.getElementById("table-list");
        this.container.innerHTML = "";
        this.loadUsers(USERS);
    }

    filterUsers = () => {
        this.merchant = document.querySelector("#filterMerchant").value;
        this.role = document.querySelector("#filterRole").value;

        this.newArray = {};

        this.merchant === "" ?  "" : this.newArray.Merchant = this.merchant;
        this.role === "" ?  "" : this.newArray.Role = this.role;

        this.result = USERS.filter(item => 
            Object.keys(this.newArray).every(key => 
                item[key] === this.newArray[key])
        );

        this.container = document.getElementById("table-list");
        this.container.innerHTML = "";

        this.loadUsers(this.result);
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

    marchantsForSelect = () => {
        this.container = document.querySelector("#filterMerchant");
        MERCHANTS.forEach((item) => {
            this.option = document.createElement("option");
            this.option.textContent = item;
            this.option.value = item;
            this.container.appendChild(this.option);
        })
    }

    sortArrDown = (arr, key) => {
        this.sortByValue = arr.slice(0);
        this.key = key;
        this.sortByValue.sort((a,b) => {
            var x = a[this.key].toLowerCase();
            var y = b[this.key].toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });

        this.container = document.querySelector("#table-list");
        this.container.innerHTML = "";

        this.loadUsers(this.sortByValue);
    }

    sortArrUp = (arr, key) => {
        this.sortByValue = arr.slice(0);
        this.key = key;
        this.sortByValue.sort((a,b) => {
            var x = a[this.key].toLowerCase();
            var y = b[this.key].toLowerCase();
            return x < y ? 1 : x > y ? -1 : 0;
        });

        this.container = document.querySelector("#table-list");
        this.container.innerHTML = "";

        this.loadUsers(this.sortByValue);
    }

    downloadXls(){
        var tbl = document.getElementById('table-user');
        var wb = XLSX.utils.table_to_book(tbl, {
            sheet: "Invoice list table",
            display: true
        });

        var wbout = XLSX.write(wb, {bookType: "xlsx", bookSST: true, type: "binary"});
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        };
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'invoice_list.xlsx');
    }

    hideBlock(){
        jQuery(function($){
            $(document).mouseup(function (e){ // событие клика по веб-документу
                var div = $("#modal-createUser"); // тут указываем ID элемента
                if (!div.is(e.target) // если клик был не по нашему блоку
                    && div.has(e.target).length === 0) { // и не по его дочерним элементам
                    div.hide(); // скрываем его
                    $("#wrapper").removeClass("opacityWrapper");
                    $(".inputsView").each((i, el) => el.value = "");
                }
            });
        });
    }

    createUser = () => {
        this.wrapper = document.querySelector("#wrapper");
        this.wrapper.classList.add("opacityWrapper");

        this.modalWindow = document.querySelector("#modal-createUser");
        this.modalWindow.style.display = "flex";
        
        

        this.btnAdd = document.querySelector("#saveUser-btn");
        this.btnAdd.addEventListener("click", () => {
            this.modalName = document.querySelector(".modal-InputName");
            this.modalEmail = document.querySelector(".modal-InputEmail");
            this.modalMer = document.querySelector(".modal-InputMer");
            this.modalRole = document.querySelector(".modal-InputRole");
            this.DATA = "Aug 10, 2019";
            this.inputsAdd = document.querySelectorAll(".inputsView");
            this.container = document.getElementById("table-list");
            if (this.modalName.value&&this.modalEmail.value&&this.modalMer.value&&this.modalRole.value) {
                USERS.push({
                    Name: this.modalName.value,
                    Email: this.modalEmail.value,
                    Merchant: this.modalMer.value,
                    Role: this.modalRole.value, 
                    Last_login_date: "Jun 28, 2019"
                });

                this.container.innerHTML = "";
                this.loadUsers(USERS);

                this.inputsAdd.forEach(item => {
                    item.value = " ";
                    item.style.boxShadow = "none";
                });

                this.modalWindow.style.display = "none";
                this.wrapper.classList.remove("opacityWrapper");

            } else {
                this.inputsAdd.forEach((item) => {
                    !item.value ? item.style.boxShadow="0px 0px 2px 2px #FF0000" : item.style.boxShadow="0px 0px 1px 1px #4BA100";
                });
            }
        });
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

    loadUsers = (arr) => {
        this.container = document.getElementById("table-list");
        arr.forEach((item) => {
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
        this.loadUsers(USERS);
        this.hideBlock();
        this.createUser_btn.addEventListener("click", this.createUser);
        this.buttonXls.addEventListener("click", this.downloadXls);

        this.sortNameBtnDown.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.value = btn.closest("th").innerText.trim();
                this.sortArrDown(USERS, this.value);

                this.toggleBtn = btn.closest('th').children[0];
                this.toggleBtn.style.display = "inline-block";
                btn.style.display = "none";
            });
        });

        this.sortNameBtnUp.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.value = btn.closest("th").innerText.trim();
                this.sortArrUp(USERS, this.value );

                this.toggleBtn = btn.closest('th').children[1];
                this.toggleBtn.style.display = "inline-block";
                btn.style.display = "none";
            });
        })

        this.marchantsForSelect();
        this.buttonSearch.addEventListener("click", this.searchFunction);
        this.showFilterBtn.addEventListener("click", this.filterUsers);
        this.clearFilterBtn.addEventListener("click", this.clearFilter);
    }
};

const userList = new UsersList();








