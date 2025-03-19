import "./AuthPage.css"
import Image from "../../components/Image/Image"
import { useState } from "react"

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    displayname: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    console.log("Dados enviados:", formData)
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
              />
              <InputField
                label="Name"
                type="text"
                name="displayname"
                value={formData.displayname}
                onChange={handleChange}
                placeholder="Name"
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
          />

          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
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
          <p onClick={() => setIsRegister(!isRegister)}>
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </p>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  )
}

const InputField = ({ label, type, name, value, onChange, placeholder, required, children }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <div className="input-wrapper">
      <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} />
      {children}
    </div>
  </div>
)

export default AuthPage
