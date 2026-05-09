# TaskFlow Project Setup Guide

## Project Overview

TaskFlow is a complete Spring Boot microservices project management system with React frontend. This project fulfills all the requirements:

✅ **Spring Boot Backend Framework** - Implemented with Spring Boot 3.3.0  
✅ **REST APIs** - All services expose RESTful APIs  
✅ **Frontend Technology** - Modern React with Tailwind CSS  
✅ **Four+ Functional Modules** - Auth, Projects, Tasks, Notifications  
✅ **User Roles & Authorization** - Admin, Manager, User roles with JWT  
✅ **Aspect-Oriented Programming (AOP)** - Logging and performance aspects  
✅ **Dockerized** - Complete Docker Compose setup  
✅ **Microservices & Spring Cloud** - 5 microservices with API Gateway  
✅ **Database** - MySQL 8.0 with proper schema  
✅ **User Registration & Authentication** - Complete auth flow  

## Port Configuration (Updated for No Conflicts)

I've updated all ports to avoid conflicts with your other projects:

| Service | Original Port | New Port |
|---------|---------------|-----------|
| API Gateway | 8080 | **18080** |
| Auth Service | 8081 | **18081** |
| Project Service | 8082 | **18082** |
| Task Service | 8083 | **18083** |
| Notification Service | 8084 | **18084** |
| MySQL | 3306 | **13306** |
| Kafka | 9092 | **19092** |

## Prerequisites

1. **Java 17+**
2. **Maven 3.8+**
3. **Docker & Docker Compose**
4. **Node.js 16+** (for frontend)

## Quick Start

### 1. Backend Setup

```bash
# Navigate to project directory
cd "e:\SW Project\SW Project\SW\TASKFLOW"

# Build all microservices
mvn clean install -DskipTests

# Start infrastructure (MySQL, Kafka, Zookeeper)
docker-compose -f docker-compose-ports-updated.yml up -d mysql zookeeper kafka

# Start all services
docker-compose -f docker-compose-ports-updated.yml up --build
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd "e:\SW Project\SW Project\SW\TASKFLOW\frontend"

# Install dependencies
npm install

# Start development server
npm start
```

## Access Points

### Backend Services
- **API Gateway**: http://localhost:18080
- **Auth Service**: http://localhost:18081
- **Project Service**: http://localhost:18082
- **Task Service**: http://localhost:18083
- **Notification Service**: http://localhost:18084

### API Documentation (Swagger)
- **Gateway Swagger**: http://localhost:18080/swagger-ui.html
- **Auth Service**: http://localhost:18081/swagger-ui.html
- **Project Service**: http://localhost:18082/swagger-ui.html
- **Task Service**: http://localhost:18083/swagger-ui.html
- **Notification Service**: http://localhost:18084/swagger-ui.html

### Frontend
- **React App**: http://localhost:3000

### Database
- **MySQL**: localhost:13306
- **Username**: root
- **Password**: password

## Default Credentials

- **Admin User**: `admin` / `admin123`

## AOP Implementation

I've added comprehensive AOP functionality to all microservices:

### Logging Aspects
- Method entry/exit logging
- Exception logging
- Parameter logging

### Performance Aspects
- Execution time monitoring
- Slow query detection (>1000ms)
- API call performance tracking

### Files Added:
- `auth-service/src/main/java/com/taskflow/auth/aspect/LoggingAspect.java`
- `auth-service/src/main/java/com/taskflow/auth/aspect/PerformanceAspect.java`
- Similar files in project-service, task-service, notification-service

## Frontend Features

The React frontend includes:

### Core Features
- **Authentication**: Login, registration, JWT handling
- **Dashboard**: Statistics and overview
- **Project Management**: CRUD operations, member management
- **Task Management**: Task tracking, assignment, status updates
- **Notifications**: Real-time notifications, mark as read
- **Admin Panel**: User approval, role management
- **Profile**: User information display

### Technology Stack
- React 18 with hooks
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- React Hook Form for forms
- Context API for state management
- Lucide React for icons

## Testing the System

### 1. Test Backend APIs
```bash
# Test health endpoints
curl http://localhost:18080/api/auth/me
curl http://localhost:18080/api/projects
```

### 2. Test Authentication Flow
1. Register new user via frontend or API
2. Admin approves user via Admin Panel
3. User logs in
4. Test role-based access

### 3. Test Full Workflow
1. Create project
2. Add tasks to project
3. Assign tasks to users
4. Update task status
5. Verify notifications

## Database Schema

The system uses MySQL with the following databases:
- `taskflow_auth` - Users, roles, permissions
- `taskflow_project` - Projects and members
- `taskflow_task` - Tasks, comments, attachments
- `taskflow_notification` - Notifications

## Microservices Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   React App     │    │  API Gateway    │
│   (Port 3000)   │◄──►│   (Port 18080)  │
└─────────────────┘    └─────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────▼──────┐ ┌─────▼─────┐ ┌─────▼─────┐
        │ Auth Service │ │Project Svc│ │Task Service│
        │ (Port 18081) │ │(18082)    │ │(18083)    │
        └──────────────┘ └───────────┘ └───────────┘
                                │
                        ┌───────▼────────┐
                        │ Notification   │
                        │ Service (18084)│
                        └────────────────┘
```

## Troubleshooting

### Port Conflicts
If you still have port conflicts, modify the `docker-compose-ports-updated.yml` file.

### Database Connection Issues
Ensure MySQL container is running and accessible on port 13306.

### Frontend API Connection
Update `REACT_APP_API_URL` in frontend `.env` file if needed.

### Build Issues
- Ensure Java 17+ is installed
- Check Maven version (3.8+)
- Verify Docker is running

## Production Deployment

For production deployment:
1. Update environment variables
2. Configure production database
3. Set up proper SSL certificates
4. Configure reverse proxy (nginx)
5. Set up monitoring and logging

## Project Structure Summary

```
TASKFLOW/
├── auth-service/          # Authentication microservice
├── project-service/       # Project management
├── task-service/          # Task management
├── notification-service/   # Notification system
├── api-gateway/          # API Gateway
├── frontend/              # React frontend
├── docker-compose-ports-updated.yml  # Updated Docker config
└── README.md             # This file
```

This project is now complete and ready to run! All requirements have been implemented with modern best practices.
