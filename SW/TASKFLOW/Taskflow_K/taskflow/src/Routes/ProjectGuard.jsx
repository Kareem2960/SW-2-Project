import { Navigate,  useParams } from "react-router-dom";
import ManageProject from "../Pages/Manager/ManageProject";

const ProjectGuard = () => {
  const { projectId } = useParams();

    return projectId ? <ManageProject /> : <Navigate to="/manager/projects" />;
};

export default ProjectGuard;