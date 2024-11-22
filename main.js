fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((products) => {
    const productList = document.getElementById('product-list');
    products.forEach((product) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <img src="${product.image_url}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price}</p>
        <button>Add to Cart</button>
      `;
      productList.appendChild(productDiv);
    });
  });
