class UsersList {
    constructor(){
        this.ArrayLIst = [];
        this.createBankBtn = document.querySelector("#createBank-button");
        this.clearFilter = document.querySelector("#clearFilterBtn");
        this.btnShowFilter = document.querySelector("#showBtn");
        this.buttonSearch = document.getElementById("search-button");
        this.buttonExel = document.querySelector("#dowloadPdf");
        this.render();
    }

    createBank = () => {
        this.filter = document.querySelector(".filter");
        this.filter.style.display = "flex";

        this.filter.addEventListener("click", (event) => {
            event.target === this.filter ? this.filter.style.display = "none" : "";
        });

        this.modalCreateBtn = document.querySelector("#createBankModal-btn");
        this.modalCreateBtn.addEventListener("click", this.createBankInit);
    }

    createBankInit = () => {
        this.data = document.querySelectorAll(".allData");
            this.data[15].checked ? this.sepa = "yes" : this.sepa = "no";
            this.newBank = {
                Name: this.data[0].value,
                Beneficiary_name: this.data[1].value,
                Solution_name: this.data[2].value,
                Country: this.data[3].value,
                Currency: this.data[4].value,
                Beneficiary_address: this.data[5].value,
                Max_Wire: this.data[6].value,
                Min_Wire: this.data[7].value,
                IBAN_number: this.data[8].value,
                SWIFT_BIC: this.data[9].value,
                Bank_address: this.data[10].value,
                Incoming_fee: this.data[11].value,
                Bank_company_site: this.data[12].value,
                Stop_limit: this.data[13].value,
                Description: this.data[14].value,
                Sepa: this.sepa,
                Requested: 0,
                Sent: 0,
                Received: 0,
                Approved: 0,
                Available: 0,
                Enabled: "no"
            };
            
            // CheckEmpty start
            var dataArray = new Array;
            for(var o in this.newBank) {
                dataArray.push(this.newBank[o]);
            }
            this.resultCheck = dataArray.some((item) => item === "");
            // CheckEmpty end

            if(this.resultCheck === true) {
                alert("Please fill out all empty fields!");
            } else {
                alert("OK!");
                
                fetch("http://localhost:3000/api/banks", {
                        method: "POST",
                        body: JSON.stringify(this.newBank),
                        headers:{'Content-Type': 'application/json'}
                        })
                        .then(res => {
                            res.text();
                        }) 
                        .then(async () => {
                            this.container = document.getElementById("table-list");
                            this.container.innerHTML = "";
                            this.ArrayLIst = [];
                            await this.saveLocalBanks();

                            // Cleaning inputs start
                            this.data.forEach((item) => item.value = "");
                            // Cleaning inputs end

                            this.filter.style.display = "none";
                        })
                        .catch(err => {
                            console.log(err);
                        });
            }
    }

    clearFilters = () => {
        this.selets = document.querySelectorAll("select");
        this.selets.forEach(item => item.value = "");
        this.searchInput = document.querySelector("#search-input").value = "";
        this.container = document.getElementById("table-list");
        this.container.innerHTML = "";
        this.loadUsers(this.ArrayLIst);
    }

    showFilters = () => {
        this.filterArray = document.querySelectorAll(".filter");
        this.filterMin = document.querySelector("#filterMin").value;
        this.filterMax = document.querySelector("#filterMax").value;
        this.filterSepa = document.querySelector("#filterSepa").value;
        this.filterEnable = document.querySelector("#filterEnable").value;
        this.filterSolution = document.querySelector("#filterSolution").value;
        this.filterCurrency = document.querySelector("#filterCurrency").value;
        this.filterCountry = document.querySelector("#filterCountry").value;
        this.newArray = {};
        this.filterMin === "" ?  "" : this.newArray.Min_Wire = this.filterMin;
        this.filterMax === "" ? "" : this.newArray.Max_Wire = this.filterMax;
        this.filterSepa === "" ? "" : this.newArray.Sepa = this.filterSepa;
        this.filterEnable === "" ? "" : this.newArray.Enabled = this.filterEnable;
        this.filterSolution === "" ? "" : this.newArray.Solution = this.filterSolution;
        this.filterCurrency === "" ? "" : this.newArray.Currency = this.filterCurrency;
        this.filterCountry === "" ? "" : this.newArray.Country = this.filterCountry;
        this.result = this.ArrayLIst.filter(item => 
            Object.keys(this.newArray).every(key => 
                item[key] === this.newArray[key])
        );
        this.container = document.getElementById("table-list");
        this.container.innerHTML = "";
        this.loadUsers(this.result);
    }

    downloadExel = () => {
        var tbl = document.getElementById('table-banks');
        var wb = XLSX.utils.table_to_book(tbl, {
            sheet: "Banks table",
            display: true
        });

        var wbout = XLSX.write(wb, {bookType: "xlsx", bookSST: true, type: "binary"});
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        };
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'banks.xlsx');
    }

    searchFunction = () =>{
        var phrase = document.getElementById('search-input');
        var table = document.getElementById('table-banks');
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

    methodPutEnable = (id, status) => {
        fetch("http://localhost:3000/api/banks", {
                    method: "PUT",
                    body: JSON.stringify({
                        id: id, //Must be id!
                        Enabled: status //Data which you want to change
                    }),
                    headers:{'Content-Type': 'application/json'}
                    })
                    .then(res => {
                        res.text();
                    }) 
                    .catch(err => {
                        console.log(err);
                    });
    }

    disableEnableCheck = () => {
        let btnDisable = document.querySelectorAll(".btnDisable");
        btnDisable.forEach((btn) => {
            btn.addEventListener("click", () => {
                if(btn.textContent === "Disable"){
                    btn.textContent = "Enable";
                    btn.style.background = "#00C851";
                    btn.closest("tr").children[11].innerHTML = "<strong>no</strong>";
                    btn.closest("tr").children[11].style.color = "#FF4444";
                    this.id = btn.closest("tr").children[13].innerHTML;

                    this.methodPutEnable(this.id, "no");

                } else if(btn.textContent === "Enable") {
                    btn.textContent = "Disable";
                    btn.style.background = "#FF4444";
                    btn.closest("tr").children[11].innerHTML = "<strong>yes</strong>";
                    btn.closest("tr").children[11].style.color = "#00A542";
                    this.id = btn.closest("tr").children[13].innerHTML;
                    
                    this.methodPutEnable(this.id, "yes");
                }
            });
        });
    }

    checkSepa = () => {
        let itemsSepa = document.querySelectorAll(".statusCheck");
        for (let i = 0; i < itemsSepa.length; i++) {
            itemsSepa[i].textContent === "no" ? itemsSepa[i].style.color = "#FF4444" : itemsSepa[i].style.color = "#00A542";
        };
    };

    checkEnable = () => {
        const itemEnables = document.querySelectorAll(".enableCheck");
        itemEnables.forEach((item) => {
            if(item.textContent === "no") {
                item.style.color = "#FF4444";
                item.closest("tr").children[12].childNodes[1].innerHTML = "Enable";
                item.closest("tr").children[12].childNodes[1].style.backgroundColor = "#00C851";
            } else if(item.textContent === "yes"){
                item.style.color = "#00A542";
                item.closest("tr").children[12].childNodes[1].innerHTML = "Disable";
                item.closest("tr").children[12].childNodes[1].style.backgroundColor = "#FF4444";
            }
        });
    }

    getUsers = async () => {
        return  await fetch("http://localhost:3000/api/banks")
        .then(res => {
            return res.json();
        }) 
        .catch(err => {
            console.log(err);
        });
    }

    saveLocalBanks = async (array) => {
        array = await this.getUsers();
        array.forEach((item) => {
            this.ArrayLIst.push(item);
        });
        this.loadUsers(this.ArrayLIst);
    }

    loadUsers = (array) => {
        this.container = document.getElementById("table-list");
        array.forEach((item) => {
            this.userList = document.createElement("tr");
            this.userList.innerHTML =  `
                    <td class="column1">${item.Name}</td> 
                    <td class="column2">${item.Country}</td> 
                    <td class="column3">${item.Currency}</td> 
                    <td class="column4">${item.Requested}</td> 
                    <td class="column5">${item.Sent}</td>
                    <td class="column6">${item.Received}</td> 
                    <td class="column7">${item.Approved}</td> 
                    <td class="column8">${item.Available}</td> 
                    <td class="column9">${item.Min_Wire}</td> 
                    <td class="column10">${item.Max_Wire}</td> 
                    <td class="column11 statusCheck">${item.Sepa}</td> 
                    <td class="column12 enableCheck"><strong>${item.Enabled}</strong></td> 
                    <td class="column13">
                        <button class="btnDisable">Disable</button>
                    </td>
                    <td class="hide">${item._id}</td>
            `;
            this.container.appendChild(this.userList);
        });
        this.checkSepa();
        this.checkEnable();
        this.disableEnableCheck();
    }

    render(){
        this.saveLocalBanks();
        this.buttonSearch.addEventListener("click", this.searchFunction);
        this.buttonExel.addEventListener("click", this.downloadExel);
        this.btnShowFilter.addEventListener("click", this.showFilters);
        this.clearFilter.addEventListener("click", this.clearFilters);
        this.createBankBtn.addEventListener("click", this.createBank);
    }
};

const userList = new UsersList();

// db.Banks.insertOne({     
//     Name: "Bulgaria MTI",          
//     Country: "Bulgaria",         
//     Currency: "EUR",          
//     Requested: "87555",           
//     Sent: "-23000",          
//     Received: "18400",          
//     Approved: "-900",          
//     Available: "2350",          
//     Min_Wire: "500",          
//     Max_Wire: "10000",          
//     Sepa: "no",          
//     Enabled: "yes"  
// })