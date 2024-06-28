// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];
      
const shoppingCartProducts=[]
if(localStorage.getItem('cart')){
	const savedCartProducts=JSON.parse(localStorage.getItem('cart'))
	if(savedCartProducts){
		shoppingCartProducts.push(...savedCartProducts)
	}
}

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");



// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button onclick="addToCart(${product.id})" class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
	
}

// Render cart list
function renderCart() {
	cartList.innerHTML=shoppingCartProducts.map((product)=>{
		return `
			<li>${product.name} - $${product.price} <button onclick="removeFromCart(${product.id})" class="remove-from-cart-btn" data-id="${product.id}">Remove from Cart</button></li>
		`
	}).join(' ')

	localStorage.setItem('cart',JSON.stringify(shoppingCartProducts))
}
 
// Add item to cart
function addToCart(productId) {
	const existingProduct=products.find((product)=>product.id===productId)
	shoppingCartProducts.push(existingProduct)
	renderCart()
}

// Remove item from cart
function removeFromCart(productId) {
	const filteredProducts=shoppingCartProducts.filter((product)=>product.id!==productId)
	shoppingCartProducts.length=0
	shoppingCartProducts.push(...filteredProducts)
	renderCart()
}
   
 
// Clear cart
function clearCart() {
	shoppingCartProducts.length=0
	renderCart()
	localStorage.removeItem('cart')
}

clearCartBtn.addEventListener('click',clearCart)
// Initial render
renderProducts();
renderCart();
