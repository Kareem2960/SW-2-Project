import { Flex } from "antd";
import FileCard from "../../Cards/FileCard";

const ProjectFilesTab = () => {
  const files = [
    {
      id: 1,
      name: "project-requirements.pdf",
      size: "2.4 MB",
      uploadedBy: "Sarah Johnson",
      date: "Apr 5",
      type: "pdf",
    },
    {
      id: 2,
      name: "design-mockup.fig",
      size: "5.1 MB",
      uploadedBy: "Emma Wilson",
      date: "Apr 6",
      type: "fig",
    },
    {
      id: 3,
      name: "logo-variations.png",
      size: "1.8 MB",
      uploadedBy: "James Smith",
      date: "Apr 7",
      type: "image",
    },
  ];

  // Helper to get icon and color based on file type
  return (
    <Flex vertical gap="middle" style={{ padding: "4px" }}>
      {files.map((file, i) => {
        return (
          <div key={i}>
            <FileCard file={file} />
          </div>
        );
      })}
    </Flex>
  );
};

export default ProjectFilesTab;
