const LIST = [{
    Created: "Jul 31, 2019",
    invoice_number: "#3459",
    Merchant: "GreatFxpro",
    Name: "Jack Wilson",
    Sent: 5000, 
    Bank_fee: 0,
    Received: 5000,
    Bank: "BNP Poland (EUR) VTK",
    Available: 500,
    Payment_status: "Available"
},{
    Created: "Jul 31, 2019",
    invoice_number: "#3459",
    Merchant: "CMP",
    Name: "Jack Wilson",
    Sent: 5000, 
    Bank_fee: 0,
    Received: 5000,
    Bank: "BNP Poland (EUR) VTK",
    Available: 500,
    Payment_status: "Declined"
},{
    Created: "Jul 31, 2019",
    invoice_number: "#3459",
    Merchant: "CMP",
    Name: "Jack Wilson",
    Sent: 5000, 
    Bank_fee: 0,
    Received: 5000,
    Bank: "BNP Poland (EUR) VTK",
    Available: 500,
    Payment_status: "Received"
},{
    Created: "Jul 31, 2019",
    invoice_number: "#3459",
    Merchant: "CMP",
    Name: "Jack Wilson",
    Sent: 5000, 
    Bank_fee: 100,
    Received: 5000,
    Bank: "BNP Poland (EUR) VTK",
    Available: 500,
    Payment_status: "Requested"
}];

class invoiceList {
    constructor(){
        this.render();
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
                            <div>ID: <i class="far fa-times-circle"></i></div>
                            <div>Utility Bill: <i class="far fa-check-circle"></i></div>
                            <div>Payment proof: <i class="far fa-question-circle"></i></div>
                            <div>Declaration: <i class="far fa-question-circle"></i></div>
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
    }
};

const userList = new invoiceList();

