  



// Fetch the JSON data from a file or URL (replace with your data source)
fetch('product-all.json')
  .then(response => response.json())
  .then(data => {
    const productList = document.querySelector('.product-list');

    // Loop through each product in the JSON data
    data.forEach(product => {
      // Create the product element
      const productItem = createProductItem(product);
      productList.appendChild(productItem);
    });
  })
  .catch(error => console.error(error));

// Function to create a product item element
function createProductItem(product) {
  const item = document.createElement('li');
  item.classList.add('product-item');

  const img = document.createElement('img');
  img.src = product.image;
  img.alt = product.title;
  item.appendChild(img);

  const title = document.createElement('h3');
  title.textContent = product.title;
  title.href = "product1.html"
  item.appendChild(title);

  const price = document.createElement('p');
  price.classList.add('price');
  price.textContent = `₹ ${product.price}`;
  item.appendChild(price);

  const description = document.createElement('p');
  description.classList.add('description');
  description.textContent = product.description;
  item.appendChild(description);

  const dimensions = document.createElement('p');
  dimensions.classList.add('dimensions');
  dimensions.textContent = `Dimensions: ${product.dimensions}`;
  item.appendChild(dimensions);

  const enquireBtn = document.createElement('a');
  enquireBtn.href = product.enquireLink;
  enquireBtn.classList.add('glow-on-hover');
  enquireBtn.textContent = 'Enquire Now';
  item.appendChild(enquireBtn);

  return item;
}




  // const data = [
  //   { key: "Minimum Order", value: "1 kg" },
  //   { key: "Color", value: "Single Color" },
  //   { key: "Packaing Size", value: "tube" },

  //   // ... other product specifications
  // ];

  // const table = document.getElementById('productSpecs');
  // data.forEach(item => {
  //   const row = document.createElement('tr');
  //   const keyCell = document.createElement('th');
  //   const valueCell = document.createElement('td');
  //   keyCell.textContent = item.key;
  //   valueCell.textContent = item.value;
  //   row.appendChild(keyCell);
  //   row.appendChild(valueCell);
  //   table.appendChild(row);
  // });
