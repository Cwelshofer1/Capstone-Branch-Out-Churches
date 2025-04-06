import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail, createUser } from "../services/userService"
import { getAllChurches } from "../services/ChurchService"

export const Register = (props) => {

  const ADMIN_ACCESS_CODE = "new_admin!" 
  const [adminCodeError, setAdminCodeError] = useState("")
  const  [church, setAllChurches ] = useState([])
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    churchId: "",
    isAdmin: false,
    adminCode: "" 
  })
  let navigate = useNavigate()

  useEffect(() => {
      getAllChurches().then((churchesArray) => {
          setAllChurches(churchesArray)
      })
      
  }, [])

  

  const registerNewUser = () => {
    if (user.isAdmin && user.adminCode !== ADMIN_ACCESS_CODE) {
      setAdminCodeError("Invalid admin code. Please try again or register as a regular user.")
      return
    }


    const userToSave = {...user}
    delete userToSave.adminCode

    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "church_user",
          JSON.stringify({
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            password: createdUser.password,
            churchId: createdUser.churchId,
            isAdmin: createdUser.isAdmin
          })
          
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateChurchUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  const updateChurchId = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = parseInt(evt.target.value)
    setUser(copy)
  }



  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1 className="header">Register Form</h1>
        
        <fieldset>
          <div className="register-box">
            <input
              onChange={updateChurchUser}
              type="text"
              id="name"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="register-box">
            <input
              onChange={updateChurchUser}
              type="email"
              id="email"
              
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="register-box">
            <input
              onChange={updateChurchUser}
              type="password"
              id="password"
              
              placeholder="Please enter your password"
              required
            />
          </div>
        </fieldset>
        <fieldset>
        <select required
                onChange={updateChurchId}
                type="churchId"
                id="churchId"
                className="register-box-church">
                
                <option value={"None"} >Select a church...</option> 
                {church.map(churchesObject => (
                    
                    <option key={churchesObject.id} value={churchesObject.id} > 
                    {churchesObject.name}
                    </option>
                     ))}
                </select>
        </fieldset>
        <fieldset>
          <div className="form-group">
              <div className="admin-checkbox-div">
              I Am an Admin
              </div>
              <input
                onChange={(evt) => {
                  const copy = { ...user }
                  copy.isAdmin = evt.target.checked
                  setUser(copy)
                }}
                type="checkbox"
                id="isAdmin"
                className="admin-checkbox"
              />
          </div>
        </fieldset>
        {user.isAdmin && (
          <fieldset>
            <div className="register-box">
              <input
              onChange={updateChurchUser}
              type="password"
              id="adminCode"
              placeholder="Enter admin verification code"
              value={user.adminCode}
              required={user.isAdmin}
            /> 
            {adminCodeError && (
              <div className="admin-code-error">
                {adminCodeError}
                </div>
            )}
            </div>
        
          </fieldset>
        )}

        <fieldset>
          <div className="form-group">
            <button className="register-button" type="submit">
              Register
            </button>
          </div>
        </fieldset>
        
      </form>
    </main>
  )
}
