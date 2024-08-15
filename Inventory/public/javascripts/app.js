let offset = 12; // Initial offset
const limit = 12; // Number of items to fetch per request

// Function to load more firearms
// loadMore()
async function loadMore() {
  try {
    console.log('Sending request to:', `/firearm?limit=${limit}&offset=${offset}`);
    
    const response = await fetch(`/firearm?limit=${limit}&offset=${offset}`, {
      method: 'GET',
    });
    console.log(response)
    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const firearms = await response.json()
    console.log('Fetched firearms:', firearms);

    // Check if there are firearms to display
    if (firearms.length === 0) {
      console.log('No more firearms to load.');
      document.getElementById('load-more-btn').disabled = true;
      document.getElementById('load-more-btn').textContent = 'No more items';
      return;
    }

    // Append firearms to the list
    const list = document.getElementById('firearm-list');
    firearms.forEach(firearm => {
      const item = document.createElement('div');
      item.style.width = '300px';
      item.innerHTML = `
        <h2>${firearm.name}</h2>
        <img src="${firearm.image_link}" alt="${firearm.name}" width="100px" height="100px">
        <p><b>Category: </b>${firearm.category}</p>
        <p><b>Caliber: </b>${firearm.caliber}</p>
        <p><b>Description: </b>${firearm.description}</p>
        <p><b>Weight: </b>${firearm.weight}</p>
        <p><b>Length: </b>${firearm.length}</p>
      `;
      list.appendChild(item);
    });

    // Update offset for the next request
    offset += limit;

  } catch (error) {
    console.error('Error loading more firearms:', error);
  }
}

// Event listener for the "Load More" button
document.getElementById('load-more-btn').addEventListener('click', loadMore);

// Optional: Load initial data when the page loads
// loadMore();

  