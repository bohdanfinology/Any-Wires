const LIST = [{
    Created: "Jul 31, 2019",
    invoice_number: "#3459",
    Merchant: "GreatFxpro",
    Name: "Margita Winther",
    Sent: "€5000", 
    Bank_fee: "€0",
    Received: "€5000",
    Bank: "BNP Poland (EUR) VTK",
    Available: "€500",
    Payment_status: "Available",
    ID: "true",
    Utility_Bill: "false",
    Payment_proof: "true",
    Declaration: "undefined"
},{
    Created: "Jul 31, 2019",
    invoice_number: "#3459",
    Merchant: "BU",
    Name: "Jette Odderskov",
    Sent: "€5000", 
    Bank_fee: "€0",
    Received: "€5000",
    Bank: "DE Transferwise FinEdu EUR",
    Available: "€500",
    Payment_status: "Declined",
    ID: "",
    Utility_Bill: "",
    Payment_proof: "",
    Declaration: "",
    Document: "Without documents"
},{
    Created: "Jul 31, 2019",
    invoice_number: "#3459",
    Merchant: "CPM24",
    Name: "Mariella Bonnier",
    Sent: "€5000", 
    Bank_fee: "€0",
    Received: "€5000",
    Bank: "BNP Poland (EUR) VTK",
    Available: "€500",
    Payment_status: "Received",
    ID: "false",
    Utility_Bill: "",
    Payment_proof: "false",
    Declaration: "false",
    Document: "Pending verification"
},{
    Created: "Jul 31, 2019",
    invoice_number: "#3459",
    Merchant: "FinixCapital",
    Name: "JJette Odderskov",
    Sent: "€5000", 
    Bank_fee: "€100",
    Received: "€5000",
    Bank: "BNP Poland (EUR) VTK",
    Available: "€500",
    Payment_status: "Requested",
    ID: "true",
    Utility_Bill: "true",
    Payment_proof: "true",
    Declaration: "true",
    Document: "All verified"
},{
    Created: "Jul 31, 2019",
    invoice_number: "#3459",
    Merchant: "CMP",
    Name: "Yastrebtsova Natalia",
    Sent: "€5000", 
    Bank_fee: "€0",
    Received: "€5000",
    Bank: "DE Transferwise FinEdu EUR",
    Available: "€500",
    Payment_status: "Declined",
    ID: "",
    Utility_Bill: "",
    Payment_proof: "",
    Declaration: "",
    Document: "Without documents"
},{
    Created: "Jul 31, 2019",
    invoice_number: "#3459",
    Merchant: "CMP",
    Name: "Jack Wilson",
    Sent: "€5000", 
    Bank_fee: "€0",
    Received: "€5000",
    Bank: "BNP Poland (EUR) VTK",
    Available: "€500",
    Payment_status: "Received",
    ID: "false",
    Utility_Bill: "",
    Payment_proof: "false",
    Declaration: "false",
    Document: "Pending verification"
},{
    Created: "Jul 31, 2019",
    invoice_number: "#3459",
    Merchant: "CK",
    Name: "Rudi Laukas",
    Sent: "€5000", 
    Bank_fee: "€100",
    Received: "€5000",
    Bank: "BNP Poland (EUR) VTK",
    Available: "€500",
    Payment_status: "Requested",
    ID: "true",
    Utility_Bill: "true",
    Payment_proof: "true",
    Declaration: "true",
    Document: "All verified"
}];

class invoiceList {
    constructor(){
        this.clearFilterBtn = document.querySelector("#clearFilterBtn");
        this.showFilterBtn = document.querySelector("#showBtn");
        this.render();
    }

    clearFilter = () => {
        this.selets = document.querySelectorAll("select");
        this.selets.forEach(item => item.value = "");
        this.container = document.getElementById("table-list");
        this.container.innerHTML = "";
        this.loadUsers(LIST);
    }

    filterList = () => {
        this.status = document.querySelector("#filterStatus").value;
        this.bank = document.querySelector("#filterBank").value;
        this.merchant = document.querySelector("#filterMerchant").value;
        this.documents = document.querySelector("#filterDocuments").value;
        
        this.newArray = {};

        this.bank === "" ?  "" : this.newArray.Bank = this.bank;
        this.merchant === "" ?  "" : this.newArray.Merchant = this.merchant;
        this.status === "" ?  "" : this.newArray.Payment_status = this.status;
        this.documents === "" ? "" : this.newArray.Document = this.documents;

        this.result = LIST.filter(item => 
            Object.keys(this.newArray).every(key => 
                item[key] === this.newArray[key])
        );

        this.container = document.getElementById("table-list");
        this.container.innerHTML = "";

        this.loadUsers(this.result);
    }

    checkDocuments = (doc) => {
        if(doc === "true"){
            return doc = `<i class="far fa-check-circle"></i>`;
        } else if(doc === "false"){
            return doc = `<i class="far fa-times-circle"></i>`;
        } else if(doc === "undefined"){
            return doc = `<i class="far fa-question-circle"></i>`;
        } else {
            return doc = `<img src="img/img_3975.png" alt="empty" width="20px" height="10px">`;
        }
    }

    loadUsers(arr){
        this.container = document.getElementById("table-list");
        arr.forEach((item) => {
            var color = "";
            item.Payment_status === "Available" ? color = "green" : "";
            item.Payment_status === "Declined" ? color = "red" : "";
            item.Payment_status === "Received" ? color = "blue" : "";

            this.userList = document.createElement("tr");
            this.userList.innerHTML =  `
                    <td class="column1">
                        <div class="createdTd">
                            <p class="green"><b>${item.invoice_number}</b></p>
                            <p class="smallBoldText">${item.Created}</p>
                            <p>2:47 pm</p>
                        </div>
                    </td> 
                    <td class="column2">${item.Merchant}</td> 
                    <td class="column3">${item.Name}</td> 
                    <td class="column4">
                        <div class="sentTd">
                            <p>${item.Sent}</p>
                            <p class="yellow smallBoldText">Aug 19, 2019</p>
                        </div>
                    </td> 
                    <td class="column5">${item.Bank_fee}</td>
                    <td class="column6">
                        <div>
                            <p>${item.Received}</p>
                            <p class="blue smallBoldText">Aug 19, 2019</p>
                        </div>
                    </td>
                    <td class="column7">${item.Bank}</td>
                    <td class="column8">
                        <p>${item.Available}</p>
                        <p class="fiolet smallBoldText">Aug 19, 2019</p>
                    </td>
                    <td class="column9 ${color}">${item.Payment_status}</td>

                    <td class="column10">
                        <div class="documentsIcon">
                            <div>ID: ${this.checkDocuments(item.ID)}</div>
                            <div>Utility Bill: ${this.checkDocuments(item.Utility_Bill)}</div>
                            <div>Payment proof: ${this.checkDocuments(item.Payment_proof)}</div>
                            <div>Declaration: ${this.checkDocuments(item.Declaration)}</div>
                        </div>
                    </td>

                    <td class="column11">
                        <div class="previewIcons">
                            <i class="fas fa-file-alt"></i>
                            <i class="fas fa-file-signature"></i>
                            <i class="fas fa-file-invoice-dollar"></i>
                        </div>
                    </td>
                    
                    <td class="column12">
                        <button id="previewBtn">Preview</button>
                    </td>
            `;
        this.container.appendChild(this.userList);
        })
    }

    render(){
        this.loadUsers(LIST);
        this.showFilterBtn.addEventListener("click", this.filterList);
        this.clearFilterBtn.addEventListener("click", this.clearFilter);
    }
};

const userList = new invoiceList();

