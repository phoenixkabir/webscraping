# Web Scraping Project

This project demonstrates a simple web scraping application using JavaScript. It fetches a webpage, extracts text, images, and URLs, and saves them locally.

## Features

- Fetch webpage content using `axios`
- Parse HTML using `cheerio`
- Extract text, images, and URLs
- Save extracted content to local files

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/web-scraping-project.git
   cd web-scraping-project


2. Install dependencies:
```bash
npm install
```
3. Usage
   Update the URL to scrape in index.js:
```
const wikipediaUrl = 'https://en.wikipedia.org/wiki/Node.js';
```
4. Run the script:

```bash
node index.js
