import { green, primaryColor } from "../../Constants/Colors";

const getUserColor = (type) => {
    return type === "manager" ? primaryColor : green;
  };




  export default getUserColor;