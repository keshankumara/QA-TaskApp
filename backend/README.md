# QA-TaskApp Backend

Spring Boot backend for **QA-TaskApp**. Provides a simple Task API backed by an in-memory **H2** database.

## Tech Stack
- Java 17
- Spring Boot (Web, Data JPA)
- H2 Database (in-memory)
- Testing: JUnit 5, Mockito, Cucumber (BDD)

## Project Structure (key parts)
- `src/main/java/com/example/taskapp/TaskAppApplication.java` — application entry point
- `src/main/java/com/example/taskapp/controller/TaskController.java` — REST endpoints
- `src/main/java/com/example/taskapp/model/Task.java` — JPA entity
- `src/main/java/com/example/taskapp/repository/TaskRepository.java` — Spring Data repository
- `src/main/java/com/example/taskapp/service/TaskService.java` — service layer
- `src/test/java/...` and `src/test/resources/...` — unit + BDD tests

## Run Locally

### Prerequisites
- Java 17+
- Maven 3.9+ (or use the Maven wrapper if you add one)

### Start the backend
From the repository root:

```bash
cd backend
mvn spring-boot:run
