import { useState} from "react";
import FormField from "../components/FormField";
import "../styles/signup.css";

const initialForm = {
  fullname: "", username: "", email: "", phone: "",
  password: "", confirm_password: "", dob: "", country: "",
  social_link_1: "", social_link_2: "", social_link_3: "",
};

 export default function SignupPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const field = (name, label, extra = {}) => (
    <FormField 
      name={name}
      label={label}
      value={form[name]}
      onChange={handleChange}
      error={errors[name]}
      {...extra}
    />
  );

  return (
    <main className="signup">
      <form onSubmit={handleSubmit} noValidate>
        <h1>PageSpire</h1>
        {field("fullname", "Full name")}
        {field("username", "Username")}
        {field("email", "Email", { type: "email" })}
        {field("phone", "Phone", { type: "tel", placeholder: "10 digits" })}
        {field("password", "Password", { type: "password" })}
        {field("confirm_password", "Re-enter password", { type: "password" })}
        {field("dob", "Date of birth", { type: "date" })}
        {field("country", "Country")}
        {field("social_link_1", "Social link 1", { type: "url", placeholder: "https://" })}
        {field("social_link_2", "Social link 2", { type: "url", placeholder: "https://" })}
        {field("social_link_3", "Social link 3", { type: "url", placeholder: "https://" })}
        <button type="submit">Create account</button>
      </form>
    </main>
  );
}