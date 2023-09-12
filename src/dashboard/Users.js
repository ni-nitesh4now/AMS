import SideNav from "./SideNav";
import TableData from "./components/subscription-data/TableData";
import Total from "./components/total-count/Total";

function Users() {
  return (
    <div className="main-div" style={{ backgroundColor: "#eff3f4" }}>
      <SideNav xyz={"users"} />
      <Total />
      <TableData />
    </div>
  );
}

export default Users;
