import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import ProtectedRoute, { PublicRoute } from "./Routes/ProtectedRoute";
import ProjectGuard from "./Routes/ProjectGuard";
import AOS from "aos";
import "aos/dist/aos.css";
import Tasks from "./Pages/Task/Tasks";
import TaskManagementPage from "./Pages/Tasks/TaskManagementPage";
import ProjectTasksPage from "./Pages/Tasks/ProjectTasksPage";
import { DarkModeProvider } from "./Context/DarkModeProvider";

// Public Pages
const Home = lazy(() => import("./Pages/Home/Home"));
const Login = lazy(() => import("./Pages/Auth/Login/Login"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp/SignUp"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Notifications = lazy(() => import("./Pages/Notifications"));
const Settings = lazy(() => import("./Pages/Settings"));
const LoadingPage = lazy(() => import("./Pages/LoadingPage/LoadingPage"));

// Layouts
const AdminLayout = lazy(() => import("./Layouts/AdminLayout"));
const ManagerLayout = lazy(() => import("./Layouts/ManagerLayout"));
const MemberLayout = lazy(() => import("./Layouts/MemberLayout"));
const MemberProjectsLayout = lazy(() => import("./Layouts/MemberProjectsLayout"));

// Admin Pages
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
const RequestsManagement = lazy(
  () => import("./Pages/Admin/RequestsManagement"),
);
const UsersProjectsManagement = lazy(
  () => import("./Pages/Admin/UsersProjectsManagement"),
);
// const ProjectDetails = lazy(() => import("./Pages/Admin/ProjectDetails"));

// Manager Pages
const ManagerDashboard = lazy(() => import("./Pages/Manager/ManagerDashboard"));
const CreateProject = lazy(() => import("./Pages/Manager/CreateProject"));
const ManagerProjects = lazy(() => import("./Pages/Manager/ManagerProjects"));
const ManageProject = lazy(() => import("./Pages/Manager/ManageProject"));
const TaskDetails = lazy(() => import("./Pages/Task/TaskDetails"));
const Teams = lazy(() => import("./Pages/Manager/Teams"));
import PendingProjects from "./Pages/Manager/PendingProjects";

// Member Pages
const MemberDashboard = lazy(() => import("./Pages/Member/MemberDashboard"));
const ViewRequests = lazy(() => import("./Pages/Member/ViewRequests"));
// const MemberSettings = lazy(() => import("./Pages/Member/MemberSettings"));
const MemberProjects = lazy(() => import("./Pages/Member/MemberProjects"));
const NewUser = lazy(() => import("./Pages/NewUser/NewUser"));

// ==================== Ant Design ====================

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const user = {
    name: "Malak",
    role: "admin",
  };

  return (
    <DarkModeProvider>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          {/* ==================== Admin Routes ==================== */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />

              {/* Users & Projects Management */}
              <Route path="users" element={<UsersProjectsManagement />} />
              <Route
                path="projects-list"
                element={<UsersProjectsManagement />}
              />

              {/* Requests Management (Managers + Projects) */}
              <Route path="requests" element={<RequestsManagement />} />
              <Route path="managers" element={<RequestsManagement />} />
              <Route path="project-requests" element={<RequestsManagement />} />

              {/* Manage All Projects with Details */}
              <Route path="projects">
                <Route index element={<UsersProjectsManagement />} />
                <Route path=":projectId">
                  <Route index element={<ManageProject />} />
                  <Route path="tasks">
                    <Route index element={<Tasks />} />
                    <Route path=":taskId" element={<TaskDetails />} />
                  </Route>
                </Route>
              </Route>

              {/* Task Management */}
              <Route path="tasks" element={<TaskManagementPage />} />

              {/* Settings & Notifications */}
              <Route path="notifications" element={<Notifications />} />
            </Route>
          </Route>

          {/* ==================== Project Manager Routes ==================== */}
          <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
            <Route path="/manager" element={<ManagerLayout />}>
              <Route index element={<ManagerDashboard />} />
              <Route path="teams" element={<Teams />} />
              {/* Manage My Projects */}

              {/* Manage My Projects - Table View */}
              <Route path="projects">
                <Route index element={<ManagerProjects />} />
                {/* Create New Project  */}
                <Route path="create-project" element={<CreateProject />} />

                <Route path="pending-projects" element={<PendingProjects />} />

                <Route path=":projectId">
                  <Route index element={<ManageProject />} />
                  <Route path="tasks">
                    <Route index element={<Tasks />} />
                    <Route path=":taskId" element={<TaskDetails />} />
                  </Route>
                </Route>
              </Route>

              {/* Task Management */}
              <Route path="tasks" element={<TaskManagementPage />} />

              {/* Settings & Notifications */}
              <Route path="notifications" element={<Notifications />} />
            </Route>
          </Route>

          {/* ==================== Team Member Routes ==================== */}
          <Route element={<ProtectedRoute allowedRoles={["member"]} />}>
            <Route path="/member" element={<MemberLayout />}>
              <Route index element={<MemberDashboard />} />

              {/* View Requests from Project Manager */}
              <Route path="requests" element={<ViewRequests />} />

              {/* My Projects */}
              <Route path="projects" element={<MemberProjectsLayout />}>
                <Route index element={<MemberProjects />} />
                <Route path=":projectId">
                  <Route index element={<ManageProject />} />
                  <Route path="tasks">
                    <Route index element={<Tasks />} />
                    <Route path=":taskId" element={<TaskDetails />} />
                  </Route>
                </Route>
              </Route>

              {/* Task Management */}
              <Route path="tasks" element={<TaskManagementPage />} />

              {/* Settings & Notifications */}
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Default Redirect */}

          <Route
            path="/"
            element={
              user ? (
                user.role === "admin" ? (
                  <Navigate to="/admin" />
                ) : user.role === "manager" ? (
                  <Navigate to="/manager" />
                ) : (
                  <Navigate to="/member" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </DarkModeProvider>
  );
}

export default App;
