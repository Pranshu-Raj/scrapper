// frontend code
fetch('/.netlify/functions/scrapeData')
  .then(response => response.json())
  .then(data => {
    console.log("Scraped Data:", data);
    // Handle scraped data
  })
  .catch(error => {
    console.error('Error:', error);
  });
