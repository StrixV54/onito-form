// import DataTable from "datatables.net-dt";
import BasicInfo from "./components/BasicInfo";
import { useState } from "react";
import AddressInfo from "./components/AddressInfo";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import TableFunction from "./components/TableFunction";
import { UserT } from "./utils/types";
import { addData } from "./redux/store";

const columns = [
  { data: "name", title: "Name" },
  { data: "age", title: "Age" },
  { data: "sex", title: "Sex" },
  { data: "mobile", title: "Mobile" },
  { data: "country", title: "Country" },
];

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const userList = useAppSelector((state) => state.list);
  const [user, setUser] = useState<UserT>({
    age: 0,
    mobile: "",
    name: "",
    sex: "",
    country: "",
  });

  // const addUser = (user: UserT) => {
  //   dispatch(addData(user));
  // };

  console.log(user);

  return (
    <div>
      {currentPage === 0 && (
        <BasicInfo setCurrentPage={setCurrentPage} setUser={setUser} />
      )}
      {currentPage === 1 && (
        <AddressInfo setCurrentPage={setCurrentPage} user={user} />
      )}
      {currentPage === 2 && <TableFunction data={userList} columns={columns} />}
      {/* <table id="table_id" className="display">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr key={item?.name}>
                {Object.values(item).map((each, i) => (
                  <td key={i}>{each}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table> */}
    </div>
  );
}

export default App;
