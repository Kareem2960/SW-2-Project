import { Table } from "antd";
import { useState, useEffect } from "react";
import ProjectsColumns from "../Columns/ProjectsColumns";
import { fetchAdminProjectsTableRows } from "../../../utils/adminProjects";

const AllProjectsTable = ({
  handleViewProjectDetails,
  handleViewManagerDetails,
}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const rows = await fetchAdminProjectsTableRows();
        if (!cancelled) setProjects(rows);
      } catch (error) {
        console.error("Error fetching projects:", error);
        if (!cancelled) setProjects([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Table
      columns={ProjectsColumns(
        handleViewProjectDetails,
        handleViewManagerDetails,
      )}
      dataSource={projects}
      rowKey="id"
      loading={loading}
      pagination={false}
      locale={{ emptyText: "No projects found" }}
      scroll={{ x: 800 }}
    />
  );
};

export default AllProjectsTable;
