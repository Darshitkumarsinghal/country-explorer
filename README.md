# 🌍 Country Explorer

A full-stack web application to explore countries, their details, and filter/search them by name or continent.  
The app fetches data from [REST Countries API](https://restcountries.com/), stores it in **MongoDB (via Docker)**, and serves it via a **Node.js/Express backend**.  
The frontend is built with **Next.js (React)**, ensuring a responsive, optimized UI.

---

## ✨ Features

- 📡 Fetch and persist country data from external API → MongoDB
- 🔍 Search bar with:
  - Debounced queries
  - Fuzzy search (tolerates spelling mistakes)
  - Optional continent filter
- 🗂️ Search results page:
  - Paginated country cards
  - Sort by name, capital, or currency
- 🏳️ Country details page:
  - Dedicated page with detailed info
- ⚙️ Configurable data source (API vs DB) via `.env` flag
- 💻 Clean, modular architecture (separation of concerns)

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/country-explorer.git
cd country-explorer

```

2. Setup Environment Variables
Create a .env file in the root:

```
 
MONGO_URI=mongodb://localhost:27017/country_explorer
PORT=5000
USE_API=false   # true = fetch directly from REST API, false = use DB

```
3. Run MongoDB in Docker
```
 
docker run --name country-mongo -d -p 27017:27017 mongo
```
4. Install Dependencies
   
Backend
```
 
cd backend
npm install
```
Frontend
```
 
cd ../frontend
npm install
```
5. Start Servers
   
Backend
```
 
cd backend
npm run dev
```
Frontend
```
 
cd ../frontend
npm run dev
```

Visit 👉 http://localhost:3000

## 🏛 Architecture Decisions

- **Monorepo**  
  Both backend and frontend are kept in a single repository for easier submission and centralized version control.

- **Backend (Node.js + Express)**  
  - Responsible for syncing data from REST Countries API → MongoDB  
  - Provides search, sort, and pagination APIs  
  - Fuzzy search implemented using MongoDB’s `$regex` + fuzzy indexing  

- **Frontend (Next.js)**  
  - Server-side rendering (SSR) for SEO & performance  
  - Reusable components (`SearchBar`, `CountryCard`)  
  - Pagination and sorting handled client-side with API requests  

- **Data Source Abstraction**  
  - A single service layer decides whether to fetch from API or DB  
  - Controlled by `.env` flag `USE_API`  

- **Separation of Concerns**  
  - Presentation → React components  
  - Business logic → Services & Controllers  
  - Data layer → MongoDB & API fetcher  


📝 Assumptions
- Country data rarely changes → one-time sync on backend startup (can be refreshed manually).

- Fuzzy search limited to country name (not applied to currency/capital).

- Sorting & pagination handled server-side for scalability.

- Minimal styling (Tailwind) used for responsive design.

- Resilient UI → shows fallback placeholders if some data is missing.

⚖️ Trade-offs & Decisions
- Used MongoDB for local caching instead of an in-memory DB → persistent data across restarts.

- Chose Next.js over CRA for SSR benefits.

- Debounced search implemented in frontend (useDebounce) to reduce API calls.

- Opted for REST API + Express instead of GraphQL for simplicity.

📂 Folder Structure
```
 
country-explorer/
├─ docker-compose.yml
├─ README.md
├─ server/
│  ├─ package.json
│  ├─ index.js
│  └─ src/
│     ├─ server.js
│     ├─ config.js
│     ├─ lib/
│     │  ├─ mongo.js
│     │  └─ levenshtein.js
│     ├─ models/
│     │  └─ Country.js
│     ├─ data/
│     │  ├─ restCountriesClient.js
│     │  ├─ repo.js
│     │  └─ datasource.js
│     ├─ routes/
│     │  ├─ health.js
│     │  ├─ seed.js
│     │  ├─ suggest.js
│     │  ├─ countries.js
│     │  └─ countryByCode.js
│     └─ utils/
│        └─ sanitize.js
└─ web/
   ├─ package.json
   └─ app/
      ├─ globals.css
      ├─ layout.jsx
      ├─ page.jsx
      ├─ search/
      │  └─ page.jsx
      ├─ country/
      │  └─ [code]/
      │     └─ page.jsx
      ├─ components/
      │  ├─ SearchBar.jsx
      │  ├─ CountryCard.jsx
      │  ├─ Pagination.jsx
      │  └─ SortSelect.jsx
      └─ lib/
         ├─ api.js
         └─ useDebounce.js

```


Design Diagram
```
flowchart TD
  User -->|Search Query| NextFrontend[Next.js Frontend]
  NextFrontend -->|API Request| ExpressBackend[Express Backend]
  ExpressBackend -->|Query| MongoDB[(MongoDB)]
  MongoDB --> ExpressBackend
  ExpressBackend --> NextFrontend
  NextFrontend -->|UI Rendering| User
```



🛠️ Tech Stack
- Frontend: Next.js (React), Tailwind CSS

- Backend: Node.js, Express.js

- Database: MongoDB (via Docker)

- API: restcountries.com

👨‍💻 Author
Darshit Singhal
