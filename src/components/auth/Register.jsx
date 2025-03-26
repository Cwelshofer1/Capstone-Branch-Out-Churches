import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail, createUser } from "../services/userService"
import { getAllChurches } from "../services/ChurchService"

export const Register = (props) => {
  const  [church, setAllChurches ] = useState([])
  const [customer, setCustomer] = useState({
    email: "",
    name: "",
    
  })
  let navigate = useNavigate()

  useEffect(() => {
      getAllChurches().then((churchesArray) => {
          setAllChurches(churchesArray)
      })
      
  }, [])

  const registerNewUser = () => {
    createUser(customer).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "church_user",
          JSON.stringify({
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            password: createdUser.password,
            churchId: createdUser.churchId
          })
          
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(customer.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateCustomer = (evt) => {
    const copy = { ...customer }
    copy[evt.target.id] = evt.target.value
    setCustomer(copy)
  }

  const updateChurchId = (evt) => {
    const copy = { ...customer }
    copy[evt.target.id] = parseInt(evt.target.value)
    setCustomer(copy)
  }


  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1 className="header">Register Form</h1>
        
        <fieldset>
          <div className="register-box">
            <input
              onChange={updateCustomer}
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
              onChange={updateCustomer}
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
              onChange={updateCustomer}
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
                
                <option value="" required>Select a church...</option> 
                {church.map(churchesObject => (
                    
                    <option key={churchesObject.id} value={churchesObject.id} > 
                    {churchesObject.name}
                    </option>
                     ))}
                </select>
        </fieldset>
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
