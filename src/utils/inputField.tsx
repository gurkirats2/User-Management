import { Input } from "antd";
interface inputField {
  fieldName: string;
  formik: any;
  placeholder: string;
}

const InputField = (props: inputField) => {
  const { fieldName, formik, placeholder } = props;
  return (
    <>
    <Input
        placeholder={placeholder}
        name={fieldName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[fieldName]}
      />

      {formik.touched[fieldName] && formik.errors[fieldName] && (
        <>
          <div style={{color:'red'}}>{formik.errors[fieldName]}</div>
        </>
      )}
    </>
  );
};

export default InputField;
