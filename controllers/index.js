import Product from "../models/Product.js"; 
let arrProduct = [];
console.log(axios);
function getAllProducts(){
    var promise = axios({
     method : 'GET',
     url : 'https://shop.cyberlearn.vn/api/Product',
    });
    promise
    .then(function(rs){
     //nơi xử lí đưa dữ liệu lên giao diện
     //gọi vòng lặp để xử lí render ra giao diện
        arrProduct = rs.data.content;
        renderProduct(arrProduct);
    })
    .catch(function(er){
     console.log(er)
    });
}
getAllProducts();

function renderProduct (arrProduct) {
  let content = ``;
  for (let i = 0 ; i < 12 ; i ++ ){
    let product = new Product();
    product = {...arrProduct[i]};
    console.log('>>>Product: ', product);
    content += `
    <div class="item text-center" onclick=getDetail(${product.id})>
      <img src="${product.image}" alt="">
      <h3 class="text-center">${product.name}</h3>
      <h4><del class="text-secondary">${product.price*1.2}$<i class="fa-solid fa-tag"></i></del> <span class="fw-bold text-danger">${product.price}$ <i class="fa-solid fa-tag"></i></span></p>
      <button id="btn_buyNow"><i class="fa-solid fa-cart-plus"></i>Buy Now</button>
    </div>
    `;
  }
  document.getElementById('divProductContent').innerHTML = content;
};
window.getDetail = (id) => {
  // console.log(id)
  window.location.href = `./views/detail.html?productId=${id}`;
}