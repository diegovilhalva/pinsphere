import "./AuthPage.css"
import Image from "../../components/Image/Image"
import { useState } from "react"
import apiRequest from "../../utils/api-request"
import { useNavigate } from "react-router"
const AuthPage = () => {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({});

    try {
      let endpoint = isRegister ? "/users/auth/register" : "/users/auth/login";
      let payload = isRegister
        ? formData
        : { identifier: formData.email, password: formData.password };

      const response = await apiRequest.post(endpoint, payload);

      if (response.data.success) {
        navigate("/")
      } else {
        setErrors(response.data.error || "Something went wrong");
        console.log(response)
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors.reduce((acc, error) => ({
          ...acc,
          [error.field]: error.message
        }), {});
        setErrors(errors);
      } else {
        setErrors({ general: err.response?.data?.error || "An error occurred. Please try again." });
      }
    }


  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Image path="/general/logo.png" alt="Logo" width={36} height={36} />
        <h1>{isRegister ? "Create an account" : "Login to your account"}</h1>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <InputField
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                error={errors.username}
              />
              <InputField
                label="Name"
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Name"
                error={errors.displayName}
              />
            </>
          )}

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            error={errors.identifier || errors.email}
          />

          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            error={errors.password}
          >
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </InputField>

          <button className="submit-btn" type="submit">{isRegister ? "Register" : "Login"}</button>
          <p onClick={() => setIsRegister(!isRegister)} className="toggler">
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </p>

          {errors.general && <p className="error">{errors.general}</p>}
        </form>
      </div>
    </div>
  )
}

const InputField = ({ label, type, name, value, onChange, placeholder, required, children, error }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <div className="input-wrapper">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={error ? 'input-error' : ''}
      />
      {children}
    </div>
    {error && <span className="field-error">{error}</span>}
  </div>
);

export default AuthPage
