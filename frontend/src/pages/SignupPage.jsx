import { useState} from "react";
import FormField from "../components/FormField";
import "../styles/signup.css";
import { validateSignup} from "../utils/validateSignup";
import { createUser, mapValidationErrors } from "../api/users";

const initialForm = {
  fullname: "", username: "", email: "", phone: "",
  password: "", confirm_password: "", dob: "", country: "",
  social_link_1: "", social_link_2: "", social_link_3: "",
};

 export default function SignupPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: undefined}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validateSignup(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    const payload = { ...form};
    for (const n of ["social_link_1", "social_link_2", "social_link_3"]) {
      if (!payload[n]) payload[n] = null;
    }
    setSubmitting(true);
    setStatus(null);
    const res = await createUser(payload);
    setSubmitting(false);

    if (res.ok) {
      setForm(initialForm);
      setErrors({});
      setStatus({
        type: "success",
        message: "Account created!"
      });
    } else if (res.status === 422 && Array.isArray(res.data?.detail)) {
      const mapped = mapValidationErrors(res.data.detail);
      setErrors(mapped);
      setStatus({ type: "error", message: "Please complete the form."});
      document.getElementById(Object.keys(mapped)[0])?.focus();
    } else if (res.status === 0) {
      setStatus({
        type: "error",
        message: "Can't reach the server. Please try again."
      });
    } else {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again."
      });
    }
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
        {status && (
            <p className={`banner ${status.type}`} role="status">{status.message}</p>
          )
        }
        <button type="submit" disabled={submitting}>
          {submitting ? "Creating account..." : "Create account"}
        </button>
      </form>
    </main>
  );
}