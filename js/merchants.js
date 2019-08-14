const USERS = [{
    Name: "Interabrokers",
    Created_By: "Rayan Le Blank",
    Promo: "544",
    Aff: "Rotem", 
    In_Persent: "0.04",
    Turnover_month: "1 112"
},{
    Name: "Imperial",
    Created_By: "AW_Technical",
    Promo: "509",
    Aff: "or", 
    In_Persent: "0.08",
    Turnover_month: "2 325"
},{
    Name: "Ainvestments",
    Created_By: "William",
    Promo: "531",
    Aff: "Dan Bitsale", 
    In_Persent: "0.1",
    Turnover_month: "5 214"
},{
    Name: "Imperial",
    Created_By: "AW_Technical",
    Promo: "509",
    Aff: "or", 
    In_Persent: "0.08",
    Turnover_month: "2 325"
},{
    Name: "Ainvestments",
    Created_By: "William",
    Promo: "531",
    Aff: "Dan Bitsale", 
    In_Persent: "0.1",
    Turnover_month: "5 214"
},{
    Name: "Imperial",
    Created_By: "AW_Technical",
    Promo: "509",
    Aff: "or", 
    In_Persent: "0.08",
    Turnover_month: "2 325"
},{
    Name: "Ainvestments",
    Created_By: "William",
    Promo: "531",
    Aff: "Dan Bitsale", 
    In_Persent: "0.1",
    Turnover_month: "5 214"
},{
    Name: "Imperial",
    Created_By: "AW_Technical",
    Promo: "509",
    Aff: "or", 
    In_Persent: "0.08",
    Turnover_month: "2 325"
},{
    Name: "Ainvestments",
    Created_By: "William",
    Promo: "531",
    Aff: "Dan Bitsale", 
    In_Persent: "0.1",
    Turnover_month: "5 214"
}];

class UsersList {
    constructor(){
        this.buttonSearch = document.getElementById("search-button");
        this.buttonPdf = document.querySelector("#dowloadPdf");
        this.render();
    }

    downloadPdf(){
        // For hide not useless element jsPDF
        let col6 = document.querySelectorAll(".column6");
        for (let i = 0; i < col6.length; i++) {
            col6[i].style.display = "none";
        };

        setTimeout(() => {
            for (let i = 0; i < col6.length; i++) {
                col6[i].style.display = "table-cell";
             }
        },10);
        // For hide not useless element jsPDF
        
        var doc = new jsPDF();

        doc.autoTable({
            html: '#main-table', 
            theme: 'striped',  
            tableWidth: 208, 
            margin: {top: 1, left: 1, right: 1}, 
            columnStyles: {
                0: {halign: 'left', cellWidth: 30},
                5: {halign: 'center', cellWidth: 30}
            }
        });
        doc.save('table.pdf');
    }

    searchFunction(){
        var phrase = document.getElementById('search-input');
        var table = document.getElementById('main-table');
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
        var size = 10;
        this.container = document.getElementById("table-list");
        USERS.slice(0, size).forEach((item) => {
            item === "" ? item = "—" : "";
            this.userList = document.createElement("tr");
            this.userList.innerHTML =  `
                    <td class="column1">${item.Name}</td> 
                    <td class="column2">${item.Created_By}</td> 
                    <td class="column3">${item.Promo}</td> 
                    <td class="column4">${item.Aff}</td> 
                    <td class="column5">${item.In_Persent}</td>
                    <td class="column5">${item.Turnover_month}</td>
                    <td class="column6"> 
                        <div id="merchantButtons">
                            <button class="buttonView">View</button> 
                            <button class="buttonAddSettle">Add Settle</button>
                        </div>
                    </td>
               
            `;
            
        this.container.appendChild(this.userList);
        })
    }

    render(){
        this.loadUsers();
        this.buttonSearch.addEventListener("click", this.searchFunction);
        this.buttonPdf.addEventListener("click", this.downloadPdf);
    }
};

const userList = new UsersList();






class view {
    constructor(){
        this.render();
    }

    addMerchant(){
                    this.wrapper = document.querySelector("#wrapper");
                    this.wrapper.classList.add("opacityWrapper");

                    this.container = document.querySelector("#modal-view");
                    this.container.style.display = "flex";
                    this.container.classList.add("slide-top");


                    this.blockFirst = document.createElement("div");
                    this.container.appendChild(this.blockFirst);

                    this.labelName = document.createElement("p");
                    this.labelName.textContent = "Name:";
                    this.blockFirst.appendChild(this.labelName);
                    this.inputName = document.createElement("input");
                    this.inputName.classList.add("inputName");
                    this.inputName.placeholder = "Please enter your name";
                    this.blockFirst.appendChild(this.inputName);

                   
                    this.inputCreate = document.createElement("input");
                    this.inputCreate.value = "Admin";

                    this.labelPromo = document.createElement("p");
                    this.labelPromo.textContent = "Promo:";
                    this.blockFirst.appendChild(this.labelPromo);
                    this.inputPromo = document.createElement("input");
                    this.inputPromo.classList.add("inputName");
                    this.inputPromo.placeholder = "Promo";
                    this.blockFirst.appendChild(this.inputPromo);


                    this.blockSecond = document.createElement("div");
                    this.container.appendChild(this.blockSecond);

                    this.labelAff = document.createElement("p");
                    this.labelAff.textContent = "Affiliate:";
                    this.blockSecond.appendChild(this.labelAff);
                    this.inputAff = document.createElement("input");
                    this.inputAff.classList.add("inputName");
                    this.inputAff.placeholder = "Affiliate";
                    this.blockSecond.appendChild(this.inputAff);

                    this.labelIn = document.createElement("p");
                    this.labelIn.textContent = "In, %:";
                    this.blockSecond.appendChild(this.labelIn);
                    this.inputIn = document.createElement("input");
                    this.inputIn.classList.add("inputName");
                    this.inputIn.placeholder = "In, %";
                    this.blockSecond.appendChild(this.inputIn);

                    
                    this.inputTurn = document.createElement("input");
                    this.inputTurn.value = "0";


                    this.buttonSave = document.createElement("button");
                    this.buttonSave.textContent = "Save";
                    this.buttonSave.classList.add("buttonSave");
                    this.container.appendChild(this.buttonSave);

                    this.buttonSave.addEventListener("click", () => {
                        USERS.push({
                            Name: this.inputName.value,
                            Created_By: this.inputCreate.value,
                            Promo: this.inputPromo.value,
                            Aff: this.inputAff.value, 
                            In_Persent: this.inputIn.value,
                            Turnover_month: this.inputTurn.value
                        });
                        console.log(USERS);
                        this.tableMerch = document.querySelector("#table-list");
                        this.newTr = document.createElement("tr");
                        this.newTr.innerHTML = `
                        <td class="column1">${this.inputName.value}</td> 
                        <td class="column2">${this.inputCreate.value}</td> 
                        <td class="column3">${this.inputPromo.value}</td> 
                        <td class="column4">${this.inputAff.value}</td> 
                        <td class="column5">${this.inputIn.value}</td>
                        <td class="column5">${this.inputTurn.value}</td>
                        <td class="column6"> 
                            <div id="merchantButtons">
                                <button class="buttonView">View</button> 
                                <button class="buttonAddSettle">Add Settle</button>
                            </div>
                        </td>`;
                        this.tableMerch.appendChild(this.newTr);

                        jQuery(function($){
                                var div = $("#modal-view"); // тут указываем ID элемента
                                    div.hide(); // скрываем его
                                    $("#wrapper").removeClass("opacityWrapper");
                                    $("#modal-view").empty();
                        });
                    })
    }

    hideBlock(){
        jQuery(function($){
            $(document).mouseup(function (e){ // событие клика по веб-документу
                var div = $("#modal-view"); // тут указываем ID элемента
                if (!div.is(e.target) // если клик был не по нашему блоку
                    && div.has(e.target).length === 0) { // и не по его дочерним элементам
                    div.hide(); // скрываем его
                    $("#wrapper").removeClass("opacityWrapper");
                    $("#modal-view").empty();
                    
                }
            });
        });
    };

    viewMerchant(){
        this.buttonView = document.querySelectorAll(".buttonView");
            for(let i = 0; i < this.buttonView.length; i++){
                this.buttonView[i].addEventListener("click", () => {
                    this.wrapper = document.querySelector("#wrapper");
                    this.wrapper.classList.add("opacityWrapper");
                    var value = this.buttonView[i].closest("tr");


                    this.container = document.querySelector("#modal-view");
                    this.container.style.display = "flex";
                    this.container.classList.add("slide-top");


                    this.blockFirst = document.createElement("div");
                    this.container.appendChild(this.blockFirst);

                    this.labelName = document.createElement("p");
                    this.labelName.textContent = "Name:";
                    this.blockFirst.appendChild(this.labelName);
                    this.inputName = document.createElement("input");
                    this.inputName.classList.add("inputName");
                    this.inputName.value = value.children[0].textContent;
                    this.blockFirst.appendChild(this.inputName);

                    this.labelCreate = document.createElement("p");
                    this.labelCreate.textContent = "Create By:";
                    this.blockFirst.appendChild(this.labelCreate);
                    this.inputCreate = document.createElement("input");
                    this.inputCreate.classList.add("inputName");
                    this.inputCreate.value = value.children[1].textContent;
                    this.blockFirst.appendChild(this.inputCreate);

                    this.labelPromo = document.createElement("p");
                    this.labelPromo.textContent = "Promo:";
                    this.blockFirst.appendChild(this.labelPromo);
                    this.inputPromo = document.createElement("input");
                    this.inputPromo.classList.add("inputName");
                    this.inputPromo.value = value.children[2].textContent;
                    this.blockFirst.appendChild(this.inputPromo);


                    this.blockSecond = document.createElement("div");
                    this.container.appendChild(this.blockSecond);

                    this.labelAff = document.createElement("p");
                    this.labelAff.textContent = "Aff:";
                    this.blockSecond.appendChild(this.labelAff);
                    this.inputAff = document.createElement("input");
                    this.inputAff.classList.add("inputName");
                    this.inputAff.value = value.children[3].textContent;
                    this.blockSecond.appendChild(this.inputAff);

                    this.labelIn = document.createElement("p");
                    this.labelIn.textContent = "Aff:";
                    this.blockSecond.appendChild(this.labelIn);
                    this.inputIn = document.createElement("input");
                    this.inputIn.classList.add("inputName");
                    this.inputIn.value = value.children[4].textContent;
                    this.blockSecond.appendChild(this.inputIn);

                    this.labelTurn = document.createElement("p");
                    this.labelTurn.textContent = "Turnover, month:";
                    this.blockSecond.appendChild(this.labelTurn);
                    this.inputTurn = document.createElement("input");
                    this.inputTurn.classList.add("inputName");
                    this.inputTurn.value = value.children[5].textContent;
                    this.blockSecond.appendChild(this.inputTurn);


                    this.buttonSave = document.createElement("button");
                    this.buttonSave.textContent = "Save";
                    this.buttonSave.classList.add("buttonSave");
                    this.container.appendChild(this.buttonSave);

                    this.buttonSave.addEventListener("click", () => {
                        value.children[0].textContent = this.inputName.value;
                        value.children[1].textContent = this.inputCreate.value;
                        value.children[2].textContent = this.inputPromo.value;
                        value.children[3].textContent = this.inputAff.value;
                        value.children[4].textContent = this.inputIn.value;
                        value.children[5].textContent = this.inputTurn.value;

                        jQuery(function($){
                                var div = $("#modal-view"); // тут указываем ID элемента
                                    div.hide(); // скрываем его
                                    $("#wrapper").removeClass("opacityWrapper");
                                    $("#modal-view").empty();
                        });
                    })
                    
                })
            }
            
    }

    render(){
        this.viewMerchant();
        this.hideBlock();
        this.buutonCreateMerchant = document.querySelector("#create-button");
        this.buutonCreateMerchant.addEventListener("click", this.addMerchant);
    }
}

const View = new view();