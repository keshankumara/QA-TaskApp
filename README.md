# QA Task App

A simple full-stack **Task Management** application with a **frontend UI** and a **Spring Boot backend API**. It allows users to create tasks and view the list of existing tasks.

## Repository Structure

```text
QA-TaskApp/
├── frontend/   # UI application
└── backend/    # Spring Boot REST API
```

## Components

### Frontend
- Provides the user interface to manage tasks.
- Communicates with the backend via HTTP API.

**Local dev (typical):**
- Install deps: `npm install`
- Run: `npm start`
- App URL: `http://localhost:3000`

**Environment variable:**
- `REACT_APP_API_URL` — Base URL for the backend API.

### Backend
- Spring Boot REST API (Java 17)
- Stores tasks using an in-memory database (H2)

**Local dev:**
- Run: `mvn spring-boot:run`
- API URL: `http://localhost:8080`

**API endpoints:**
- `POST /tasks` — create a task
- `GET /tasks` — list all tasks

**CORS note:** backend allows `http://localhost:5173` currently (update if your frontend runs on another port).

## Quick Start (Run both)

1. **Clone**
   ```bash
   git clone https://github.com/keshankumara/QA-TaskApp.git
   cd QA-TaskApp
   ```

2. **Start backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Start frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Testing

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

## More Documentation
- Frontend details: `frontend/README.md`
- Backend details: `backend/README.md`

## Contributing
Contributions are welcome — please open an issue or submit a pull request.

## License
MIT
