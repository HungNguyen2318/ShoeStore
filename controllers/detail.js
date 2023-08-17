import Product from "../models/Product.js";

window.onload = () => {
  const urlParam = new URLSearchParams(window.location.search);
  const myParam = urlParam.get('productId');
  console.log(`>>> Product ID: `, myParam);
  getDetailProduct(myParam);
}
  

  function getDetailProduct(id){
    var promise = axios({
        method : 'GET',
        url : `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
       });
       promise
       .then(function(rs){
        // console.log(rs);
        //nơi xử lí đưa dữ liệu lên giao diện
        //gọi vòng lặp để xử lí render ra giao diện
        let product = new Product();
        product = rs.data.content;
        // //    renderProduct(arrProduct);
        // console.log(product);
        renderProductDetail(product);
        loadAllRelatedProduct(product);
       })
       .catch(function(er){
        console.log(er)
       });
  }

  let renderProductDetail = (product) => {
    // console.log(product)
    if(product){
      //render address
      document.getElementById('address').innerHTML = `
        <a href='./../index.html'>Home</a> > ${product.name}
      `;
      //render hình ảnh sản phẩm
      document.getElementById('product_img').src = product.image;
      //render Tên sản phẩm
      document.getElementById('product_name').innerHTML = product.name;
      //render giá sản phẩm
      document.getElementById('product_price').innerHTML = `
        <del class="text-secondary">${product.price*1.2}$<i class="fa-solid fa-tag"></i></del> <span class="fw-bold text-danger">${product.price}$ <i class="fa-solid fa-tag"></i></span>
      `
      //render desc
      document.getElementById('product_description').innerHTML = `
        <h4><b>Description</b></h4>
        <p>${product.shortDescription}</p>
        <p>${product.description}</p>
      `;
      //render số lượng tồn
      document.getElementById('product_quantity').innerHTML = `<b>Stock :</b> ${product.quantity} `;
      // render size
      let contentSize = '<div class="btn-group" role="group" aria-label="Basic outlined example">';     
      for (let size of product.size){
        contentSize += `<button type="button" class="btn btn-outline-primary">${size}</button>`
      }    
      contentSize += `</div>`
      document.getElementById('product_size').innerHTML = contentSize;
    }else{
      // window.location.href = "./../views/index.html";
    }
    
  }

  let getRelatedProduct = (id) => {
    // console.log(id)
    var promise = axios({
        method : 'GET',
        url : `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
       });
       promise
       .then(function(rs){
        let product = new Product();
        product = rs.data.content;
        console.log(product);
        renderRelatedProduct(product);
       })
       .catch(function(er){
        console.log(er)
       });
  }

let loadAllRelatedProduct = (product) => {
  console.log('>>>Load ALl relate product:', product);
  let arrId = product.relatedProducts;
  for (let index in arrId ){
    console.log('index:',arrId[index]);
    getRelatedProduct(arrId[index].id);
  }
}

let renderRelatedProduct = (product) => {
  console.log('>>>render related')
  let content = document.getElementById('relation_product').innerHTML;
  content += `
  <div class="item text-center " onclick=getDetail(${product.id})>
    <img src="${product.image}" alt="">
    <h3 class="text-center">${product.name}</h3>
    <h4><del class="text-secondary">${product.price*1.2}$<i class="fa-solid fa-tag"></i></del> <span class="fw-bold text-danger">${product.price}$ <i class="fa-solid fa-tag"></i></span></p>
    <button id="btn_buyNow"><i class="fa-solid fa-cart-plus"></i>Buy Now</button>
  </div>
  `;
  console.log(">>>Content: ",content);
  document.getElementById('relation_product').innerHTML = content;
}

window.getDetail = (id) => {
  // console.log(id)
  window.location.href = `./../views/detail.html?productId=${id}`;
}