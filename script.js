// Handle 'Get Product by ID' Button Click
document.getElementById('productByIdBtn').addEventListener('click', function() {
    const productId = prompt('Enter the product ID (1-35):');
    if (productId) {
      fetch(`http://localhost:3000/products/${productId}`)
        .then(response => response.json())
        .then(data => {
          // Clear previous results
          clearProductBlocks();
  
          // Check if the product is found
          if (data.error) {
            document.getElementById('result').innerHTML = `<p>${data.error}</p>`;
          } else {
            // Show the product details
            const productHTML = `
              <li>
                <strong>Name:</strong> ${data.name} <br>
                <strong>Category:</strong> ${data.category} <br>
                <strong>Price:</strong> $${data.price}
              </li>
            `;
  
            // Depending on the category, append it to the correct block
            if (data.category.toLowerCase() === 'electronics') {
              document.getElementById('electronicsList').innerHTML += productHTML;
            } else if (data.category.toLowerCase() === 'stationary') {
              document.getElementById('stationaryList').innerHTML += productHTML;
            } else if (data.category.toLowerCase() === 'clothes') {
              document.getElementById('clothesList').innerHTML += productHTML;
            } else if (data.category.toLowerCase() === 'food') {
              document.getElementById('foodList').innerHTML += productHTML;
            } else {
              document.getElementById('result').innerHTML = '<p>Unknown category</p>';
            }
          }
        })
        .catch(err => {
          console.error('Error fetching product:', err);
          document.getElementById('result').innerHTML = '<p>Error fetching product</p>';
        });
    }
  });
  
  // Function to clear previous results from all blocks
  function clearProductBlocks() {
    document.getElementById('electronicsList').innerHTML = '';
    document.getElementById('stationaryList').innerHTML = '';
    document.getElementById('clothesList').innerHTML = '';
    document.getElementById('foodList').innerHTML = '';
  }
  
  // Handle 'Filter Products by Category' Button Click
  document.getElementById('filterByCategoryBtn').addEventListener('click', function() {
    const category = prompt('Enter category (electronics, stationary, clothes, food):');
    if (category) {
      fetch(`http://localhost:3000/products?category=${category}`)
        .then(response => response.json())
        .then(data => {
          // Clear previous results
          clearProductBlocks();
  
          // Display filtered products in corresponding category block
          if (data.length === 0) {
            document.getElementById('result').innerHTML = `<p>No products found in the ${category} category.</p>`;
          } else {
            data.forEach(product => {
              const productHTML = `
                <li>
                  <strong>Name:</strong> ${product.name} <br>
                  <strong>Price:</strong> $${product.price}
                </li>
              `;
              if (product.category.toLowerCase() === 'electronics') {
                document.getElementById('electronicsList').innerHTML += productHTML;
              } else if (product.category.toLowerCase() === 'stationary') {
                document.getElementById('stationaryList').innerHTML += productHTML;
              } else if (product.category.toLowerCase() === 'clothes') {
                document.getElementById('clothesList').innerHTML += productHTML;
              } else if (product.category.toLowerCase() === 'food') {
                document.getElementById('foodList').innerHTML += productHTML;
              }
            });
          }
        })
        .catch(err => {
          console.error('Error filtering products:', err);
          document.getElementById('result').innerHTML = '<p>Error fetching products</p>';
        });
    }
  });
  