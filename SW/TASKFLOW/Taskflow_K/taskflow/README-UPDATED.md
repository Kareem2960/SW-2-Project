# TaskFlow Frontend (Updated for New Ports)

## 🚀 Important Update

This frontend has been updated to work with the new port configuration to avoid conflicts with other projects.

## 📋 Port Configuration Updates

### Backend Services (Updated)
- **API Gateway**: `http://localhost:18080` (was 8080)
- **Auth Service**: `http://localhost:18081` (was 8081)
- **Project Service**: `http://localhost:18082` (was 8082)
- **Task Service**: `http://localhost:18083` (was 8083)
- **Notification Service**: `http://localhost:18084` (was 8084)

### Frontend Configuration
- **Development Server**: `http://localhost:5173` (Vite default)
- **API Proxy**: Routes to `http://localhost:18080`
- **SignalR Hub**: Connects to `http://localhost:18080/notifications`

## 🔧 Files Updated

1. **`.env.development`** - Updated VITE_API_URL
2. **`vite.config.js`** - Updated proxy configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Backend services running on new ports

### Installation & Running

```bash
# Navigate to frontend directory
cd "e:\SW Project\SW Project\SW\TASKFLOW\Taskflow_K\taskflow"

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

## 🎯 Features

This frontend includes:

### 🏗️ **Architecture**
- **React 19** with modern hooks
- **Vite** for fast development
- **Ant Design** for professional UI components
- **Tailwind CSS** for custom styling
- **SignalR** for real-time notifications
- **React Query** for data management

### 📱 **Pages & Components**
- **Authentication**: Login & Registration
- **Admin Dashboard**: User management, approvals, analytics
- **Manager Dashboard**: Project management, team analytics
- **Employee Dashboard**: Task management, personal analytics
- **Project Management**: CRUD operations, member management
- **Task Management**: Create, assign, track tasks
- **Real-time Notifications**: Live updates via SignalR
- **Analytics**: Performance charts and statistics

### 🔐 **Authentication & Authorization**
- JWT-based authentication
- Role-based access control (Admin, Manager, Employee)
- Protected routes
- Session management

### 📊 **Analytics & Reporting**
- User performance metrics
- Project progress tracking
- Task completion analytics
- Team productivity reports

### 🎨 **UI/UX Features**
- Dark mode support
- Responsive design
- Modern Ant Design components
- Smooth animations with Framer Motion
- Interactive charts with Recharts

## 📁 Project Structure

```
src/
├── Components/          # Reusable components
│   ├── Admin/          # Admin-specific components
│   ├── Analytics/       # Analytics charts
│   ├── Auth/           # Authentication forms
│   ├── Buttons/        # Custom buttons
│   ├── Cards/          # Card components
│   ├── Form/           # Form components
│   └── Layout/         # Layout components
├── Constants/          # App constants
├── Functions/          # Utility functions
├── hooks/              # Custom hooks
├── services/           # API & SignalR services
├── config/             # Configuration files
└── App.jsx             # Main app component
```

## 🔌 API Integration

The frontend connects to the Spring Cloud Gateway at `http://localhost:18080` and includes:

- **Authentication endpoints**
- **Project management APIs**
- **Task management APIs**
- **Notification APIs**
- **Admin management APIs**

## 📱 Real-time Features

SignalR integration provides:
- Live notifications
- Task status updates
- Project changes
- User activity updates

## 🎯 Default Credentials

- **Admin**: `admin` / `admin123`

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Ensure backend services are running on new ports
   - Check if API Gateway is accessible at `http://localhost:18080`

2. **SignalR Connection Issues**
   - Verify SignalR hub is running
   - Check JWT token is valid

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version (16+ required)

### Development Tips

- Use browser dev tools to monitor API calls
- Check Network tab for failed requests
- Console will show SignalR connection status
- Use React DevTools for component debugging

## 🚀 Production Deployment

For production deployment:

1. Update environment variables
2. Build the project: `npm run build`
3. Deploy the `dist` folder to your web server
4. Configure reverse proxy for API routes

## 📞 Support

This frontend is fully configured to work with the updated TaskFlow backend services. All API endpoints and real-time features are ready to use with the new port configuration.
