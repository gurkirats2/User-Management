import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import InputField from "../utils/inputField";
import TextArea from "antd/es/input/TextArea";
import { DatePicker, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/addUser.slice";
import { defaultStore } from "../store/store";
import { useEffect, useState } from "react";
import { User } from "../model/user.model";
import { useNavigate } from "react-router-dom";
import { setEditUserInfo } from "../store/slices/editUserInfo.slice";

export const PatchValue = (props: { editData: User }) => {
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    Object.keys(props.editData).forEach((key) => {
      setFieldValue(key, props.editData[key as keyof User]);
    });
  }, [props.editData]);
  return null;
};

const AddUser = () => {
  const user = useSelector((state: defaultStore) => state.userInfo.data);
  const editInfo = useSelector(
    (state: defaultStore) => state.editUserInfo.data
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [intitialValues] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    degree: "",
    startYear: "",
    college: "",
    endYear: "",
    companyName: "",
    startMonthAndYear: "",
    endMonthAndYear: "",
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <div
        className="text-center pb-3 text-base"
        style={{ paddingBottom: "1rem", paddingTop: "1rem", fontWeight: "600" }}
      >
        {editInfo ? "Update" : "Add"} User
      </div>
      <Formik
        initialValues={intitialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        validateOnMount={true}
        onSubmit={(values) => {
          console.log("formikValues", values);
          const formValue = { ...values };
          formValue.id = Math.random().toString(16);
            const updatedUser = user
              ?.filter((d) => d.id !== editInfo?.id)
              ;
          if (updatedUser && updatedUser?.length) {
            const newUser = [...updatedUser, formValue];
            dispatch(setUser(newUser));
          } else {
            dispatch(setUser([formValue]));
          }
          if(editInfo) dispatch(setEditUserInfo(null))
          navigate("/");
        }}
      >
        {(formik) => (
          <Form>
            {editInfo && <PatchValue editData={editInfo} />}
            <div
              className="flex flex-col p-10 !gap-4"
              style={{ gap: "1rem", padding: "2rem" }}
            >
              <InputField
                fieldName="firstName"
                formik={formik}
                placeholder="Please enter first name"
              />
              <InputField
                fieldName="lastName"
                formik={formik}
                placeholder="Please enter last name"
              />
              <InputField
                fieldName="email"
                formik={formik}
                placeholder="Please enter email address"
              />
              <InputField
                fieldName="phone"
                formik={formik}
                placeholder="Please enter phone number"
              />
              <DatePicker
              placeholder="Date of Birth"
                onChange={(date, dateString) => {
                  formik.setFieldValue("dob", dateString);
                }}
              />
              <TextArea
                placeholder="Please enter address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                name="address"
              ></TextArea>
              <div>Education</div>
              <Select
                onChange={(value) => {
                  formik.setFieldValue("degree", value);
                }}
                placeholder={"Select degree"}
                options={[
                  { value: "btech", label: "Btech" },
                  { value: "bca", label: "Bca" },
                  { value: "Mtech", label: "Mtech" },
                  { value: "Mca", label: "Mca" },
                ]}
              ></Select>
              <InputField
                fieldName="college"
                formik={formik}
                placeholder="Please enter college name"
              />
              <DatePicker
                placeholder="Start Year"
                onChange={(date, dateString) => {
                  formik.setFieldValue("startYear", dateString);
                }}
              />
              <DatePicker
                placeholder="End Year"
                onChange={(date, dateString) => {
                  formik.setFieldValue("endYear", dateString);
                }}
              />
              {/* experince */}
              <div>Experience</div>
              <Select
                onChange={(value) => {
                  formik.setFieldValue("companyName", value);
                }}
                placeholder={"Select Company name"}
                options={[
                  { value: "bcoder", label: "bcoder" },
                  { value: "apple", label: "apple" },
                  { value: "facebook", label: "facebook" },
                ]}
              ></Select>
              <DatePicker
                picker="month"
                placeholder="Start Month & Year"
                onChange={(date, dateString) => {
                  formik.setFieldValue("startMonthAndYear", dateString);
                }}
              />
              <DatePicker
                picker="month"
                placeholder="End Month & Year"
                onChange={(date, dateString) => {
                  formik.setFieldValue("endMonthAndYear", dateString);
                }}
              />
              <button type="submit">{editInfo ? "Update" : "Submit"}</button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddUser;

const validationSchema = Yup.object({
  firstName: Yup.string().required("required"),
  email: Yup.string().email("invalid email").required("required"),
});

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
