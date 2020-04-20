function getDataProduct() {
    axios.get('http://localhost:3000/products')
        .then(function (response) {
            showProduct(response.data);
            // handle success

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

    axios.get('http://localhost:3000/categorys')
        .then(function (category) {
            debugger
            category = category.data;
            for (var i = 0; i < category.length; i++) {
                var option = '<option value=' + category[i].id + '>' + category[i].category.name + '</option>'
                $("#category").append(option);
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

    axios.get('http://localhost:3000/categorys')
        .then(function (category) {
            
            category = category.data;
            $("#edit_category").empty();
            for (var i = 0; i < category.length; i++) {
                var option = '<option value=' + category[i].id + '>' + category[i].category.name + '</option>'
                $("#edit_category").append(option);
            }
        });
}

function getNewProduct(){
    axios.get('http://localhost:3000/products')
        .then(function (response) {
            showNewProduct(response.data);
            // handle success

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

function postData(product) {
    axios.post('http://localhost:3000/products/', {
            product
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(err);
        });
}

function getDelete(id) {
    axios.delete('http://localhost:3000/products/' + id)
        .then(res => {
            // showProduct(res.data);
            getDataProduct();
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
}

function editProductData(product, idProduct) {    
    axios.put('http://localhost:3000/products/' + idProduct, {
            product            
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(err);
        });
}