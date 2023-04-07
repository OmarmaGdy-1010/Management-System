let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let Escap = document.getElementById("ESC");



function gettotal() {
    if (price.value != "" && taxes.value != '' && ads.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#4caf50";
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "red";
    }
}



let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}


submit.onclick = function () {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };
    

    if(title.value == '' ) {
        title.focus()
        
    } else if (price.value == '') {
        price.focus()
    } else if (count.value == '') {
        count.focus()
    }
    else if (category.value == '') {
        category.focus()
    } else if(title.value != '' && price.value != '' && category.value != ''){
                    if (newPro.count > 1 && count.value <=100) {
        for (let i = 0; i < count.value; i++) {
            dataPro.push(newPro);
                }
                clearinput();
    }
    }


    localStorage.setItem("product", JSON.stringify(dataPro));
    showData();
    
};

function clearinput() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}


function showData() {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        table += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[ i ].title}</td>
                            <td>${dataPro[ i ].price}</td>
                            <td>${dataPro[ i ].taxes}</td>
                            <td>${dataPro[ i ].ads}</td>
                            <td>${dataPro[ i ].discount}</td>
                            <td>${dataPro[ i ].total}</td>
                            <td>${dataPro[ i ].category}</td>
                            <td><button onclick="updateData(${i})"  id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
                        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAll = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        deleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    } else {
        deleteAll.innerHTML = '';
    }

}
showData();


function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(dataPro));
    showData();
}

function deleteAll() {
    var txt;
    if (confirm("Are you Sure To Clear All ???")) {
        localStorage.clear();
        dataPro = [];
        showData();
    }
    

}

function updateData(i) {
    let table = `
                        <tr>
                            <td>${i}</td>
                            <td><input id="newtitle"/></td>
                            <td><input id="newprice"/></td>
                            <td><input id="newtaxes"/></td>
                            <td><input id="newads"/></td>
                            <td><input id="newdiscount"/></td>
                            <td><input id="newtotal"/></td>
                            <td><input id="newcategory"/></td>
                            <td><button onclick="updateDone(${i})" id="Done">Done</button></td>
                            <td><button onclick="ESC(${i})" id="ESC">ESC</button></td>
                        </tr>
        `;
    let newtbody = document.getElementById('tbody').children;
    newtbody[ i ].innerHTML = table;

    setId();
}
function setId() {
    let newParent = document.getElementById("Done").parentNode.parentNode;
    newParent.setAttribute("id", "newParent");
}

function updateDone(i) {
    setId();
    let newtitle = document.getElementById("newtitle");
    let newprice = document.getElementById("newprice");
    let newtaxes = document.getElementById("newtaxes");
    let newads = document.getElementById("newads");
    let newdiscount = document.getElementById("newdiscount");
    let newtotal = document.getElementById("newtotal");
    let newcategory = document.getElementById("newcategory");

    // HTML كدا انت كتبتها في 
    newParent.innerHTML = `                    
                        <tr>
                            <td>${i}</td>
                            <td>${newtitle.value}</td>
                            <td>${newprice.value}</td>
                            <td>${newtaxes.value}</td>
                            <td>${newads.value}</td>
                            <td>${newdiscount.value}</td>
                            <td>${newtotal.value}</td>
                            <td>${newcategory.value}</td>
                            <td><button onclick="updateData(${i})"  id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
                        </tr>
        `;

    dataPro[ i ].title = newtitle.value;
    dataPro[ i ].price = newprice.value;
    dataPro[ i ].taxes = newtaxes.value;
    dataPro[ i ].ads = newads.value;
    dataPro[ i ].discount = newdiscount.value;
    dataPro[ i ].total = newtotal.value;
    dataPro[ i ].category = newcategory.value;
    localStorage.setItem("product", JSON.stringify(dataPro));
    showData();

}




function ESC(i) {
    newParent.innerHTML = `
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[ i ].title}</td>
                            <td>${dataPro[ i ].price}</td>
                            <td>${dataPro[ i ].taxes}</td>
                            <td>${dataPro[ i ].ads}</td>
                            <td>${dataPro[ i ].discount}</td>
                            <td>${dataPro[ i ].total}</td>
                            <td>${dataPro[ i ].category}</td>
                            <td><button onclick="updateData(${i})"  id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
                        </tr>
        `;
    localStorage.setItem("product", JSON.stringify(dataPro));
    showData();
}




let searchMoodDefulte = "title";

function searchMood(id) {
    let searchINP = document.getElementById('search');
    if (id == "searchTitle") {
        searchMoodDefulte = "title";
        searchINP.placeholder = 'Search By Title';

    } else {
        searchMoodDefulte = "category";
        searchINP.placeholder = 'Search By Category';

    }
    searchINP.focus();
    console.log(searchMoodDefulte);

}




function searchData(value) {
    let table = '';
    if (searchMoodDefulte == "title") {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[ i ].title.includes(value)) {
                table += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[ i ].title}</td>
                            <td>${dataPro[ i ].price}</td>
                            <td>${dataPro[ i ].taxes}</td>
                            <td>${dataPro[ i ].ads}</td>
                            <td>${dataPro[ i ].discount}</td>
                            <td>${dataPro[ i ].total}</td>
                            <td>${dataPro[ i ].category}</td>
                            <td><button onclick="updateData(${i})"  id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
                        </tr>
        `;
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[ i ].category.includes(value)) {
                table += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[ i ].title}</td>
                            <td>${dataPro[ i ].price}</td>
                            <td>${dataPro[ i ].taxes}</td>
                            <td>${dataPro[ i ].ads}</td>
                            <td>${dataPro[ i ].discount}</td>
                            <td>${dataPro[ i ].total}</td>
                            <td>${dataPro[ i ].category}</td>
                            <td><button onclick="updateData(${i})"  id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="Delete">Delete</button></td>
                        </tr>
        `;
            }
        }
    }

    document.getElementById('tbody').innerHTML = table;

}














