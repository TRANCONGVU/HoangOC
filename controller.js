var errMsg = "";
var errInput = "";
var cardData;
var deleteLocalCart = [];


function showProduct(data) {

    table = document.getElementById("list-product");

    $("#list-product").empty();
    for (let i = 0; i < data.length; i++) {
        var btnDel = '<button class="btn btn-del"  data-toggle="modal" data-target="#exampleModal" id="product_' +
            data[i].id + '" onclick="deleteProduct(event)">Xóa</button>';

        var btnEdit = '<button class="btn btn-edit" name="edit" data-toggle="modal" data-target="#exampleModal" id="edit_' + data[i].id +
            '" onclick="openEditWindow(event)">Sửa</button>';

        var btnDetail = '<button class="btn btn-detai" name="detail" data-toggle="modal" data-target="#exampleModal" id="edit_' + data[i].id +
            '" onclick="openEditWindow(event)">Detail</button>';


        var text = '<tr> <th>' + i + '</th> <td>' + data[i].product.name + '</td> <td>' + data[i].product.price +
            '</td> <td>' + data[i].product.qty + '</td> <td>' + data[i].product.category +
            '</td><td>' + data[i].product.sell + "%" +
            '</td><td>' + data[i].product.time + '</td><td>' + btnDel + btnEdit + btnDetail + '</td></tr>'
        table.innerHTML += text;
    };

}

function addNewProduct() {
    var name = document.getElementById("name");
    var price = document.getElementById("price");
    var qty = document.getElementById("qty");
    var sell = document.getElementById("sell");


    var product = new productDto();
    product.name = name.value;
    product.price = price.value;
    product.qty = qty.value;
    if (sell.value != "") {
        product.sell = parseInt(sell.value);
    }
    product.time = getToday();
    product.category = $("#category").find(":selected").text();

    if (checkInputData(product)) {
        postData(product);
        setTimeout(() => {
            name.value = "";
            price.value = "";
            qty.value = "";
            sell.value = "";
        }, 0)
    } else {
        if (errMsg != "") {

            alert(errMsg);
            // $(errInput).focus();
            // $(errInput).select();
        }
    }

}

function getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return today = mm + '/' + dd + '/' + yyyy;
}

function deleteProduct(event) {
    var product_id = parseInt(event.currentTarget.id.replace("product_", ""));
    getDelete(product_id);
}

function openEditWindow(event) {
    var name = event.currentTarget.name;
    var product_id = parseInt(event.currentTarget.id.replace("edit_", ""));
    var rowData = document.getElementById('product_table');

    edit_name = document.getElementById("edit_name");
    edit_price = document.getElementById("edit_price");
    edit_qty = document.getElementById("edit_qty");
    edit_category = document.getElementById("edit_category");
    edit_sell = document.getElementById("edit_sell");


    edit_name.value = rowData.rows.item(product_id).cells[1].textContent;
    edit_price.value = rowData.rows.item(product_id).cells[2].textContent;
    edit_qty.value = rowData.rows.item(product_id).cells[3].textContent;
    edit_sell.value = (rowData.rows.item(product_id).cells[5].textContent).replace("%", '')

    $("#edit_category option").each(function (index) {
        if (rowData.rows.item(product_id).cells[4].textContent == $(this).text()) {
            edit_category.selectedIndex = index;
        }
    });

    $("#btn-save-edit").empty();

    if (name == "edit") {
        $("#label-modal").text("Sửa sản phâm");

        $("#edit_name").prop("disabled", false);
        $("#edit_price").prop("disabled", false);
        $("#edit_qty").prop("disabled", false);
        $("#edit_category").prop("disabled", false);

        $("#edit_name").removeClass("disabled-input");
        $("#edit_price").removeClass("disabled-input");
        $("#edit_qty").removeClass("disabled-input");
        $("#edit_category").removeClass("disabled-input");

        $("#btn-save-edit").append(
            '<button type="button" id="product_' + product_id +
            '" onclick="editProduct(event)" class="btn btn-primary">Save</button>'
        );
    } else if (name == "detail") {
        $("#label-modal").text("Xem chi tiết sản phẩm");

        $("#edit_name").prop("disabled", true);
        $("#edit_price").prop("disabled", true);
        $("#edit_qty").prop("disabled", true);
        $("#edit_category").prop("disabled", true);

        $("#edit_name").addClass("disabled-input");
        $("#edit_price").addClass("disabled-input");
        $("#edit_qty").addClass("disabled-input");
        $("#edit_category").addClass("disabled-input");
    }

    // $("#edit_modal").show();
    // $("#detail_modal").hide();
}

// function openDetailWindow(){
//     $("#edit_modal").hide();
//     $("#detail_modal").show();
//     $("#label-modal").text("Chi tiết sản phẩm");
// }


function editProduct(event) {

    var idProduct = parseInt(event.currentTarget.id.replace("product_", ""));
    var product = new productDto();
    product.name = edit_name.value;
    product.price = edit_price.value;
    product.qty = edit_qty.value;
    product.sell = edit_sell.value;
    product.category = $("#edit_category").find(":selected").text();

    editProductData(product, idProduct);

}

function checkInputData(data) {
    if (data.name == "") {
        errMsg = "please input name of product!!!";
        errInput = "#name";
        return false;
    }

    if (data.price == "") {
        errMsg = "please input price of product!!!";
        errInput = "#price";
        return false;
    }

    if (data.qty == "") {
        errMsg = "please input quantity of product!!!";
        errInput = "#qty";
        return false;
    }
    errMsg = "";
    return true;
}

function showNewProduct(data) {
    $("#main-product").empty();
    for (var i = 0; i < data.length; i++) {
        var sellPrice = data[i].product.price - data[i].product.price * data[i].product.sell / 100;
        var text = `<div class="col-lg-3 col-md-6 mb-4">
        <div class="card h-100">
            <img class="card-img-top" src="http://placehold.it/500x325" alt="">
            <div class="card-body">
                <h4 class="name-title">` + data[i].product.name + `</h4>
                <h6 class="price-title old-price">` + data[i].product.price + `</h6>
                <h6 class="price-title new-price">` + sellPrice + `</h6>
                <div class="percent">` + data[i].product.sell + "%" + `</div>                
            </div>
            <div class="card-footer">
                <a id=add_` + data[i].id + ` onclick="addToCard(event)" class="btn btn-primary">Thêm vào giỏ hàng</a>
                <a id=detail_`+ data[i].id + ` onclick="detailProduct(event)" class="btn btn-danger">Chi tiết</a>
            </div>
        </div>
        </div>`
        $("#main-product").append(text);
    }

    if (localStorage.getItem("card") != null) {
        var storedCard = JSON.parse(localStorage.getItem("card"));
        $("#card-text").val(storedCard.length);
    } else {
        $("#card-text").val(0);
    }
}

function addToCard(event) {
    debugger
    var productID
    if (localStorage.getItem("card") == null) {
        var cardData = [];
    } else {
        var cardData = JSON.parse(localStorage.getItem("card"));
    }
    if(event.currentTarget.name == "detail"){
        productID = parseInt(event.currentTarget.id.replace("detaiProduct_", ""));
    }else{
        productID = parseInt(event.currentTarget.id.replace("add_", ""));
    }
   
    axios.get('http://localhost:3000/products/' + productID)
        .then(function (response) {
            cardData.push(response.data);

            var filterData = Array.from(new Set(cardData.map(JSON.stringify))).map(JSON.parse);

            localStorage.setItem("card", JSON.stringify(filterData));
            var storedCard = JSON.parse(localStorage.getItem("card"));
            $("#card-text").val(storedCard.length);

            alert("thêm hàng thành công");
        });
}



function onpenCartWindow() {
    var total = 0;
    var storedCards = JSON.parse(localStorage.getItem("card"));
    var table = document.getElementById("list-card");

    $("#list-card").empty();
    for (var i = 0; i < storedCards.length; i++) {
        var priceUnit = storedCards[i].product.price - (storedCards[i].product.price * storedCards[i].product.sell / 100)

        priceUnit = Math.ceil(priceUnit);
        var priceText = '<span class="old-price">' + storedCards[i].product.price + '</span>';
        var buttonDel = '<button onclick="deleteCart(event)" type="button" id="btnDelCart_' + i + '" class="btn btn-danger">Xóa</button>'

        var plus = 'plus_' + i + '';
        var minus = 'plus_' + i + '';
        var buttonPlus = '<button onclick="plusUnit(event)" type="button" id=' + plus + ' class="btn btn-info">+</button>';
        var buttonMinus = '<button onclick="minusUnit(event)" type="button" id=' + minus + ' class="btn btn-info">-</button>'
        var price_sell = Math.ceil(storedCards[i].product.price * storedCards[i].product.sell / 100);
        var money = storedCards[i].product.price - price_sell;

        var text = '<tr id="table_card_row_' + i + '"> <th>' + i + '</th> <td>' + storedCards[i].product.name + '</td> <td>' +
            "<input class='unit-pay' disabled id='price_real_" + i + "' value=" + money + ">" + "</br>" + priceText + '</td> <td>' +
            buttonMinus + '<input class="unit-pay" id="unit-pay_' + i + '" disabled value="' +
            storedCards[i].product.cartQty + '">' + buttonPlus + '</td><td><input class="unit-pay" id="moneyRow_' +
            i + '" disabled value="' + money + '"></td><td>' + buttonDel + '</td></tr>'

        table.innerHTML += text;
        total += money;
    }
    $("#total").text(total);
}

function detailProduct(event){
    
    var id = event.currentTarget.id.replace("detail_" , "");
    id = parseInt(id);

    axios.get('http://localhost:3000/products/' + id)
        .then(function (response) {                        
            showDetailProduct(response.data);
        })
}

function changeDisplay(event){
    if(event.currentTarget.name == "main"){
        $("#detail").hide();
        $("#main").show();
    }
}
function showDetailProduct(params){
    $("#detail").show();
    $("#main").hide();
    var id = params.id;
    params = params.product;
    var priceUnit = params.price - (params.price * params.sell / 100);
    priceUnit = Math.ceil(priceUnit);
    var priceText = priceUnit.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    var sell = params.price * params.sell / 100
    $("#product-title").text(params.name);
    $("#qty_detail").text(params.qty);
    $("#price_detail").text(Math.ceil(sell));
    $("#detai_sell").text(params.sell + "%");
    $("#price_detail_sell").text(priceText + " Đồng");
    $("#detail_add").empty();
    $("#detail_add").append(
        `<a class="add-to-cart btn btn-default" id="detaiProduct_`+id+`" name="detail" onclick="addToCard(event)" type="button">add to cart</a>`
    )
}

function deleteCart(event) {
    var total = 0;
    var rowID = parseInt(event.currentTarget.id.replace("btnDelCart_", ""));
    $("#table_card_row_" + rowID + "").remove();
    deleteLocalCart.push(rowID);
    console.log(deleteLocalCart);

    var table = document.getElementById("card_table");
    for (var i = 0; i < table.rows.length; i++) {
        if ($("#moneyRow_" + i + "").val() != undefined) {
            total += parseInt($("#moneyRow_" + i + "").val());
        }
    }
    $("#total").text(total);


    var storedCard = JSON.parse(localStorage.getItem("card"));
    storedCard.splice(rowID, 1);
    $("#card-text").val(storedCard.length);

    localStorage.setItem("card", JSON.stringify(storedCard));
}

function plusUnit(event) {
    var table = document.getElementById("card_table");
    var total = 0;

    var rowID = parseInt(event.currentTarget.id.replace("plus_", ""));
    var qty_unit = parseInt($("#unit-pay_" + rowID + "").val()) + 1;
    var price_unit = parseInt($("#price_real_" + rowID + "").val());

    $("#unit-pay_" + rowID + "").val(qty_unit);
    $("#moneyRow_" + rowID + "").val(qty_unit * price_unit);

    for (var i = 0; i < table.rows.length - 1; i++) {
        // total += parseInt($("#moneyRow_"+i+"").val());
        if ($("#moneyRow_" + i + "").val() != undefined) {
            total += parseInt($("#moneyRow_" + i + "").val());
        }
    }
    $("#total").text(total);
}

function minusUnit(event) {
    var total = 0;
    var table = document.getElementById("card_table");
    var qty_unit = 1;
    var rowID = parseInt(event.currentTarget.id.replace("plus_", ""));
    if (parseInt($("#unit-pay_" + rowID + "").val()) > 1) {
        qty_unit = parseInt($("#unit-pay_" + rowID + "").val()) - 1;
    }
    var price_unit = parseInt($("#price_real_" + rowID + "").val());
    $("#unit-pay_" + rowID + "").val(qty_unit);
    $("#moneyRow_" + rowID + "").val(qty_unit * price_unit);

    for (var i = 0; i < table.rows.length - 1; i++) {
        // total += parseInt($("#moneyRow_"+i+"").val());
        if ($("#moneyRow_" + i + "").val() != undefined) {
            total += parseInt($("#moneyRow_" + i + "").val());
        }
    }
    $("#total").text(total);
}

function payForm() {
    var table = document.getElementById("card_table");
    var cart = [];
    var total = {};
    total.total_Pay = $("#total").text()
    cart.push(total);
    for (var i = 0; i < table.rows.length - 1; i++) {
        if ($("#unit-pay_" + i + "").val() != undefined) {
            var product = {};
            product.name = table.rows[i].cells[1].textContent;
            product.qty = $("#unit-pay_" + i + "").val();
            product.totalUnit = $("#moneyRow_" + i + "").val();
            cart.push(product);
        }
    }

    $(".form-payment").show();
    $("#main-product").hide();

    localStorage.setItem("order", JSON.stringify(cart));
}

function submitOrder() {
    debugger
    var order = new orderIfor();
    if (checkOrderForm()) {
        order.name = $("#name_order").val();
        order.adress = $("#address").val();
        order.phone = $("#phone").val();
        order.email = $("#email").val();
        order.product = JSON.parse(localStorage.order);
        order.status = 0;
        order.price = JSON.parse(localStorage.order)[0].total_Pay;
        axios.post('http://localhost:3000/orders', {
                order
            })
            .then(response => {
                console.log(response);
                localStorage.clear();
                $("#card-text").val(0);
            })
            .catch(error => {
                console.log(err);
            });
    } else {
        alert(errMsg);
        return;
    }

}

function checkOrderForm() {
    if ($("#name_order").val() == "") {
        errMsg = "Nhap ten";
        return false;
    }
    if ($("#address").val() == "") {
        errMsg = "Nhap dia chi";
        return false;
    }
    if ($("#phone").val() == "") {
        errMsg = "Nhap so dien thoai";
        return false;
    }
    if ($("#email").val() == "") {
        errMsg = "Nhap email";
        return false;
    }
    return true;
}

function addNewCategory() {
    var category = {};
    if( $("#name_category").val() == ""){
        errMsg = "Nhập tên danh mục!";
        alert(errMsg);
        return;
    }
    category.name = $("#name_category").val();
    axios.post('http://localhost:3000/categorys', {
                category
            })
            .then(response => {
                console.log(response);                
            })
            .catch(error => {
                console.log(err);
            });
}

function inputNumber(event) {
    event.value = event.value.replace(/[^0-9]/g, "");
}