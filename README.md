# Amazon Scraper

This project is a simple web application that scrapes Amazon product listings from the first page of search results for a given keyword.

## Backend

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/luanrramos/backend-challenge-internship.git
   cd backend-challenge-internship
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

The server will run on `http://localhost:3000`.

## Frontend

Open the `index.html` file in your web browser. Enter a keyword and click the "Search" button to initiate the scraping process and display the results.

## Tecnologies

- Node
- Express
- Axios
- JSDOM

## Considerations

Both the backend and frontend handle errors gracefully. The backend responds with an error message if the keyword is not provided or if there is an error during the scraping process. The frontend displays an alert if the keyword is not entered and logs errors to the console if the AJAX call fails.
