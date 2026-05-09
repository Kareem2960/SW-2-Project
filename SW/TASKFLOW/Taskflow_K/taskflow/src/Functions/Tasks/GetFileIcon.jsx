 import {
  FilePdfOutlined,
  FileImageOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

 const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return { icon: <FilePdfOutlined />, color: "#1677ff", bg: "#e6f4ff" };
      case "image":
        return { icon: <FileImageOutlined />, color: "#722ed1", bg: "#f9f0ff" };
      default:
        return { icon: <FileTextOutlined />, color: "#595959", bg: "#f5f5f5" };
    }
  };


  export default getFileIcon;