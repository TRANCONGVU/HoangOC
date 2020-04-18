function productDto(name, price, qty, category) {
    this.name = name;
    this.price = price;
    this.qty = qty;
    this.category = category;
}

function showProduct(data) {
    debugger
    table = document.getElementById("list-product");

    $("#list-product").empty();
    for (let i = 0; i < data.length; i++) {
        var btnDel = '<button class="btn btn-del"  data-toggle="modal" data-target="#exampleModal" id="product_' + data[i].id + '" onclick="deleteProduct(event)">Xóa</button>';
        var btnEdit = '<button class="btn btn-edit"  data-toggle="modal" data-target="#exampleModal" id="edit_' + data[i].id + '" onclick="openEditWindow(event)">Sửa</button>';

        var text = '<tr> <th>' + i + '</th> <td>' + data[i].product.name + '</td> <td>' + data[i].product.price +
            '</td> <td>' + data[i].product.qty + '</td> <td>' + data[i].product.category +
            '</td><td>' + btnDel + btnEdit + '</td></tr>'
        table.innerHTML += text;
    }
}

function addNewProduct() {
    var name = document.getElementById("name");
    var price = document.getElementById("price");
    var qty = document.getElementById("qty");

    var product = new productDto();
    product.name = name.value;
    product.price = price.value;
    product.qty = qty.value;
    product.category = $("#category").find(":selected").text();


    postData(product)

    setTimeout(() => {
        name.value = "";
        price.value = "";
        qty.value = "";
    }, 0)

}

function deleteProduct(event) {
    var product_id = parseInt(event.currentTarget.id.replace("product_", ""));
    getDelete(product_id);
}

function openEditWindow(event) {
    var product_id = parseInt(event.currentTarget.id.replace("edit_", ""));
    var rowData = document.getElementById('product_table');    

    edit_name = document.getElementById("edit_name");
    edit_price = document.getElementById("edit_price");
    edit_qty = document.getElementById("edit_qty");
    edit_category = document.getElementById("edit_category");

    edit_name.value = rowData.rows.item(product_id).cells[1].textContent;
    edit_price.value = rowData.rows.item(product_id).cells[2].textContent;
    edit_qty.value = rowData.rows.item(product_id).cells[3].textContent;

    $("#edit_category option").each(function (index) {
        if (rowData.rows.item(product_id).cells[4].textContent == $(this).text()) {
            edit_category.selectedIndex = index;
        }
    });

    $("#btn-save-edit").empty();
    $("#btn-save-edit").append(
        '<button type="button" id="product_' + product_id 
        + '" onclick="editProduct(event)" class="btn btn-primary">Save</button>'
    )
}

function editProduct(event){
    debugger
    var idProduct = parseInt(event.currentTarget.id.replace("product_",""));
    var product = new productDto();
    product.name = edit_name.value;
    product.price = edit_price.value;
    product.qty = edit_qty.value;
    product.category = $("#edit_category").find(":selected").text();
    
    editProductData( product ,idProduct);

}

getDataProduct();
