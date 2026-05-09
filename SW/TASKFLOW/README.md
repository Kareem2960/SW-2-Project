# TaskFlow - Spring Boot Microservices

This is the Spring Boot migration of the TaskFlow project management system.

## Architecture

The system consists of 5 microservices:

| Service | Port | Description |
|---------|------|-------------|
| API Gateway | 8080 | Entry point for all requests |
| Auth Service | 8081 | Authentication & Authorization |
| Project Service | 8082 | Project & Member Management |
| Task Service | 8083 | Task, Comment & Attachment Management |
| Notification Service | 8084 | Notifications & Kafka Consumer |

## Technology Stack

- **Framework**: Spring Boot 3.3.0
- **Language**: Java 17
- **Database**: MySQL 8.0
- **Messaging**: Apache Kafka
- **Security**: JWT Authentication
- **Documentation**: OpenAPI 3 (Swagger)

## Getting Started

### Prerequisites

- Java 17
- Maven 3.8+
- Docker & Docker Compose
- MySQL 8.0 (or use Docker)

### Build & Run

1. **Build all services:**
   ```bash
   mvn clean install
   ```

2. **Start infrastructure with Docker Compose:**
   ```bash
   docker-compose up -d mysql zookeeper kafka
   ```

3. **Run services locally:**
   ```bash
   cd auth-service && mvn spring-boot:run
   cd project-service && mvn spring-boot:run
   cd task-service && mvn spring-boot:run
   cd notification-service && mvn spring-boot:run
   ```

   Or run all with Docker Compose:
   ```bash
   docker-compose up --build
   ```

### API Documentation

- Gateway Swagger UI: http://localhost:8080/swagger-ui.html
- Auth Service: http://localhost:8081/swagger-ui.html
- Project Service: http://localhost:8082/swagger-ui.html
- Task Service: http://localhost:8083/swagger-ui.html
- Notification Service: http://localhost:8084/swagger-ui.html

### Default Credentials

- **Admin User**: `admin` / `admin123`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Admin (requires Admin role)
- `GET /api/admin/pending-users` - List pending users
- `POST /api/admin/approve/{userId}` - Approve user
- `POST /api/admin/users/{userId}/roles` - Assign role
- `DELETE /api/admin/users/{userId}/roles/{roleName}` - Remove role
- `POST /api/admin/roles/{roleName}/permissions` - Add permission

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `GET /api/projects/{id}` - Get project by ID
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project
- `POST /api/projects/{id}/members` - Add member
- `DELETE /api/projects/{id}/members/{userId}` - Remove member

### Tasks
- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/{id}` - Get task by ID
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `POST /api/tasks/{id}/assign` - Assign task
- `PATCH /api/tasks/{id}/status` - Update task status
- `GET /api/tasks/{id}/comments` - Get task comments
- `POST /api/tasks/{id}/comments` - Add comment
- `GET /api/tasks/{id}/attachments` - Get attachments
- `POST /api/tasks/{id}/attachments` - Upload attachment

### Notifications
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/unread` - Get unread notifications
- `PATCH /api/notifications/{id}/read` - Mark as read
- `PATCH /api/notifications/read-all` - Mark all as read

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://localhost:3306/...` | Database connection URL |
| `SPRING_KAFKA_BOOTSTRAP_SERVERS` | `localhost:9092` | Kafka broker addresses |
| `JWT_SECRET` | `mySecretKey12345678901234567890123456789012` | JWT signing key |

## Migration Notes

### .NET to Spring Boot Mapping

| .NET Concept | Spring Boot Equivalent |
|-------------|------------------------|
| Entity Framework Core | Spring Data JPA |
| ASP.NET Controllers | Spring REST Controllers |
| JWT Bearer Auth | Spring Security + JWT |
| IService/Service | Service Interface + Impl |
| Program.cs | @SpringBootApplication |
| appsettings.json | application.yml |
| Confluent.Kafka | Spring Kafka |
| Swashbuckle | SpringDoc OpenAPI |

### Database Changes

- SQL Server → MySQL
- DbContext → JPA Entities + Repositories
- EF Migrations → `ddl-auto: update`

## License

MIT
