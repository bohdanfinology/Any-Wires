
$(document).ready(function(){
    $('.merchPayBtn, .payFromAwWalletBtn').on('click', function(event){
      event.preventDefault();
      $('.MerchantPayWindow').fadeIn();
    });
    $('.MerchantPayWindow-close').on('click', function(event){
      event.preventDefault();
      $('.MerchantPayWindow').fadeOut();
    });
});

$(document).ready(function(){
    $('.createWalletBtn').on('click', function(event){
      event.preventDefault();
      $('.MerchantPayWindow').fadeOut();
      $('.createWalletWindow').fadeIn();
    });
    $('.createWalletWindow-close').on('click', function(event){
      event.preventDefault();
      $('.createWalletWindow').fadeOut();
      $('.MerchantPayWindow').fadeIn();
    });
});

// CREATE WALLET

$(document).ready(function(){
    $('.creatingWalletBtn').on('click', function(event){
      event.preventDefault();
      $('.createWalletWindow').fadeOut();
      $('.wallet').append(`<option>${$('.walletName').val()}</option>`);
      $('.MerchantPayWindow').fadeIn();
    });
});

// SETTLEMENTS LIST 

// Add appendAfter method
Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
  },false;

// Add action to buttons ShowAll and Filter
let showAllBtn = document.querySelector('.showAllBtn');
let filterlBtn = document.querySelector('.filterBtn');

showAllBtn.addEventListener('click', (e) => { 
    document.querySelector(".tableList").innerHTML = '';
    const settlementsList = new SettlementsList();});
filterlBtn.addEventListener('click', (e) => { 
    document.querySelector(".tableList").innerHTML = '';
    const filterList = new FilterList();});


const SETTLEMENTS = [{
    CreatedBy: 'CMP24',
    Date: "Apr 19, 2019",
    Amount: "€54 093",
    Type: 'Wire',
    Wallet: 'MisterTango LT', 
    Status: "Received"
},{
    CreatedBy: 'CMP24',
    Date: "Apr 26, 2019",
    Amount: "€64 841",
    Type: 'Wire',
    Wallet: 'MisterTango LT', 
    Status: "Received"
},{
    CreatedBy: 'CMP24',
    Date: "May 3, 2019",
    Amount: "€57 288",
    Type: 'Wire',
    Wallet: 'MisterTango LT', 
    Status: "Received"
},{
    CreatedBy: 'Omer',
    Date: "May 6, 2019",
    Amount: "€57 951",
    Type: '',
    Wallet: '', 
    Status: "Declined"
},{
    CreatedBy: 'Omer',
    Date: "May 6, 2019",
    Amount: "€9 306",
    Type: 'Wire',
    Wallet: 'Epayments Systems Limited', 
    Status: "Received"
},{
    CreatedBy: 'Omer',
    Date: "May 6, 2019",
    Amount: "€5 123",
    Type: 'Wire',
    Wallet: 'Win-Win Media d.o.o', 
    Status: "Received"
},{
    CreatedBy: 'Omer',
    Date: "May 6, 2019",
    Amount: "€10 199",
    Type: 'Wire',
    Wallet: 'Win-Win Media d.o.o', 
    Status: "Received"
},{
    CreatedBy: 'CFM Solutions',
    Date: " May 9, 2019",
    Amount: "€7 450",
    Type: 'Wire',
    Wallet: 'CFM Solutions EOOD', 
    Status: "Requested"
},{
    CreatedBy: 'CK',
    Date: "May 6, 2019",
    Amount: "€57 951",
    Type: '',
    Wallet: '', 
    Status: "Declined"
},{
    CreatedBy: 'CFM Solutions',
    Date: "May 6, 2019",
    Amount: "€57 951",
    Type: '',
    Wallet: '', 
    Status: "Declined"
},{
    CreatedBy: 'CK',
    Date: " May 9, 2019",
    Amount: "€7 450",
    Type: 'Wire',
    Wallet: 'CFM Solutions EOOD', 
    Status: "Requested"
},{
    CreatedBy: 'CFM Solutions',
    Date: " May 9, 2019",
    Amount: "€7 450",
    Type: 'Wire',
    Wallet: 'CFM Solutions EOOD', 
    Status: "Requested"
}
];

var newSettleList = [];

class SettlementsList {
    constructor(){
        this.render();
    }

    loadSettle(list) {
        this.container = document.querySelector(".tableList");
        list.slice(0, list.length).forEach((item, i) => {
            this.settleList = document.createElement("tr");
            this.settleList.className = `tr${i}`;
            if (item.Status !== 'Received') {
                this.settleList.innerHTML =  `
                <td class="col column0">${item.CreatedBy}</td> 
                <td class="col column1">${item.Date}</td> 
                <td class="col column2">${item.Amount}</td> 
                <td class="col column3">${item.Type}</td> 
                <td class="col column4">${item.Wallet}</td> 
                <td class="col column5">${item.Status}</td>
                <td class="column6"><button class="receivedBtn">Received</button></td>
            `;
            } else {
                this.settleList.innerHTML =  `
                <td class="col column0">${item.CreatedBy}</td> 
                <td class="col column1">${item.Date}</td> 
                <td class="col column2">${item.Amount}</td> 
                <td class="col column3">${item.Type}</td> 
                <td class="col column4">${item.Wallet}</td> 
                <td class="col column5">${item.Status}</td>
                <th class="column6"></th>
            `;
            }

        this.settleList.addEventListener('click', (e) => {
            e.preventDefault();
            $('.settlementDetails').fadeIn();

            // Settlement Details Window
            
            this.p = document.createElement('p');
            this.p.className = 'settleInfoText';
            this.span = document.createElement('span');
            this.span.className = 'settleStatusSpan';
            this.indexNumber = +e.target.parentElement.className.match(/\d+/);
            this.p.innerHTML = `Settlement to <strong>${SETTLEMENTS[this.indexNumber].Wallet}</strong> made on : 
                <strong>${SETTLEMENTS[this.indexNumber].Date}</strong> for <strong>${SETTLEMENTS[this.indexNumber].Amount}</strong>.`;
            this.p.appendAfter(document.querySelector('.settlementDetails-header'));
            this.span.innerHTML = `Status: <strong>${SETTLEMENTS[this.indexNumber].Status}</strong>.`;
            this.span.appendAfter(this.p);

            document.querySelector('.settlementDetails-close').addEventListener('click', (e) => {
                this.p.innerHTML = '';
                this.span.innerHTML = '';
                $('.settlementDetails').fadeOut();
            });
        });   
        this.container.appendChild(this.settleList);
        })
    }

    colorStatus() {
        let statusCells = document.querySelectorAll('.column5');
        
        statusCells.forEach( (i) => {
            switch (i.textContent + '') {
                case 'Received':
                    i.style.background = 'rgb(0, 200, 81)';
                    break;
                case 'Declined':
                    i.style.background = 'rgb(255, 119, 119)';
                    break;
                case 'Requested':
                    i.style.background = '#5cb9f3';
                    break;
                case 'Sent':
                    i.style.background = '#f48120';
                    break;
            }
        });
    }

    changeStatus() {
        let btns = document.querySelectorAll('.receivedBtn');

        btns.forEach( (i) => {
            i.addEventListener('click', (e) => {
                e.stopPropagation();
                let state = (e.target.parentElement).previousElementSibling;
                state.innerHTML = "Received";
                this.colorStatus();
                i.style.display = 'none';
                let rowId = +((e.target.parentElement).parentElement).className.match(/\d+/);
                SETTLEMENTS[rowId].Status = "Received";
            });
        });        
    }

    render(){
        this.loadSettle(SETTLEMENTS);
        this.changeStatus();
        this.colorStatus();
    }
};


// FILTER

class FilterList extends SettlementsList {
  
    filter() {
        let statusMenu = document.querySelector('.status');
        let merchantList = document.querySelector('.merchantList');
        let claim1 = statusMenu.options[statusMenu.selectedIndex].value;
        let claim2 = merchantList.options[merchantList.selectedIndex].value;

        if (claim1 && claim2) {
            newSettleList = SETTLEMENTS.filter( (i) => {
                return (i.Status == claim1) && (i.CreatedBy == claim2);
            } );
        } else {
            newSettleList = SETTLEMENTS.filter( (i) => {
                return claim1 ? (i.Status == claim1) : (i.CreatedBy == claim2);
            } );
        }
    }

    render() {
        this.filter()
        this.loadSettle(newSettleList);
        this.changeStatus();
        this.colorStatus();
    }
}


// UPLOAD FILE BUTTON

document.getElementById('buttonid').addEventListener('click', openDialog);

function openDialog() {
  document.getElementById('fileid').click();
}

// SETTLEMENT PREVIEW 

let prevSettleBtn = document.querySelector('.prevSettleBtn');

prevSettleBtn.addEventListener('click', (e) => {
    document.location.href='settlementPreview.html';

});

