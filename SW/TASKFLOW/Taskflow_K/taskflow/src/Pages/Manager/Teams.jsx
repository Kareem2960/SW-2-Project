import { lazy } from "react";
const TeamTable = lazy(
  () => import("../../Components/Table/Manager/TeamTable"),
);

const Teams = () => {
  return (
    <div data-aos="flip-up">
      <TeamTable />
    </div>
  );
};

export default Teams;
