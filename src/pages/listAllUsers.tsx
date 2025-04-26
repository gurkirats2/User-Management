import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { defaultStore } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../model/user.model";
import { useEffect, useState } from "react";
import { setEditUserInfo } from "../store/slices/editUserInfo.slice";
import React from "react";
import { setUser } from "../store/slices/addUser.slice";

const ListAllUsers = () => {
  const user = useSelector((state: defaultStore) => state.userInfo.data);
  const naviate = useNavigate();
  const [userList, setUsers] = useState<User[]>([]);
  console.log(user);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    const updatedUser = userList?.filter((item: User) => item.id !== id);
    setUsers(updatedUser);
    dispatch(setUser(updatedUser))
  };

  useEffect(() => {
    if (user) {
      setUsers(user);
    }
  }, [user]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="font-semibold">User Management</div>
        <Button
          onClick={() => {
            naviate("/addUser");
          }}
        >
          Add User
        </Button>
      </div>
      {/* user list */}
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Address</th>
            <th>DOB</th>
            <th>Education</th>
            <th>College name</th>
            <th>Start year</th>
            <th>End year</th>
            <th>Company Name</th>
            <th>Start Month</th>
            <th>End month</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((item: User, index) => {
            return (
              <tr key={index}>
                <td>{item?.firstName}</td>
                <td>{item?.lastName || '--'}</td>
                <td>{item?.email ||'--'}</td>
                <td>{item?.address || '--'}</td>
                <td>{item?.dob || '--'}</td>
                <td>{item?.degree || '--'}</td>
                <td>{item?.college || '--'}</td>
                <td>{item?.startYear || '--'}</td>
                <td>{item?.endYear || '--'}</td>
                <td>{item?.companyName || '--'}</td>
                <td>{item?.startMonthAndYear || '--'}</td>
                <td>{item?.endMonthAndYear || '--'}</td>
                <td>
                  <div className="flex items-center" style={{gap:'0.5rem'}}>
                    <span
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      delete
                    </span>
                    <span
                      onClick={() => {
                        naviate("/addUser");
                        dispatch(setEditUserInfo(item));
                      }}
                    >
                      edit
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!user?.length && (
        <div className="text-center mt-3" style={{ marginTop: "1rem" }}>
          No data found!
        </div>
      )}
    </>
  );
};

export default React.memo(ListAllUsers);

// Create a CRUD with a LinkedIn-type form for user data management

// 1. List all users
// 2. Add a new User
// 3. Edit User
// 4. Delete User

// User form fields are:

// First Name
// Last Name
// Email
// Phone
// DOB (Date picker)
// Address (Text Area)
// Education (dynamic subform to open in modal)
// Degree(dropdown)
// College(Input)
// Start Year (Year Picker)
// End Year (Year Picker)
// Experience (dynamic subform to open in modal)
// Company Name(dropdown)
// Start Month & Year (Month and Year Picker)
// End Month & Year (Month and Year Picker)

// We should be able to add as many educational/experiences as we want. So there should be Add more and remove button against every education and experience row.

// For state management you should use Redux.
