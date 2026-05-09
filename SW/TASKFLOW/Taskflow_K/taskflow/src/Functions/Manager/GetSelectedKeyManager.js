const GetSelectedKeyManager = (pathname) => {
  console.log(pathname);

  if (pathname === "/manager") return "1";
  if (pathname.includes("/manager/teams")) return "2";
  if (pathname.includes("/manager/projects/create-project")) return "4";
  if (pathname.includes("/manager/projects")) return "3";
  if (pathname.includes("/manager/projects/pending-projects")) return "5";

  return "1";
};

export default GetSelectedKeyManager;
