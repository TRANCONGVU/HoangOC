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
            category = category.data;
            for (var i = 0; i < category.length; i++) {
                var option = '<option value=' + category[i].id + '>' + category[i].name + '</option>'
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
            debugger
            category = category.data;
            $("#edit_category").empty();
            for (var i = 0; i < category.length; i++) {
                var option = '<option value=' + category[i].id + '>' + category[i].name + '</option>'
                $("#edit_category").append(option);
            }
        });
}

function postData(product) {
    // axios({
    //     method: 'post',
    //     url: 'http://localhost:3000/products',
    //     data: product
    // });
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
    // axios({
    //     method: 'post',
    //     url: 'http://localhost:3000/products/' + idProduct,
    //     data: product
    // });
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