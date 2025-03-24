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
        <h1>Branch Out Churches!</h1>
        <h2>Please Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="password"
              id="password"
              className="form-control"
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
                className="form-control">
                
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
            <button className="login-btn btn-info" type="submit">
              Register
            </button>
          </div>
        </fieldset>
        
      </form>
    </main>
  )
}
