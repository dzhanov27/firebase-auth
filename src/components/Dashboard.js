import React, { useState } from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function LogIn() {
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [error, setError] = useState("")

  async function handleLogout() {
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <Card>
      <Card.Body>
        <h3 className="text-center mb-4">
          Hello{" "}
          {currentUser.phoneNumber !== null
            ? currentUser.phoneNumber
            : currentUser.displayname}
        </h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Link to="login">
            <Button
              className="w-100"
              variant="secondary"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </Link>
        </Form>
      </Card.Body>
      {
        <div className="w-100 mt-4 d-flex justify-content-center">
          Need an account?
          <Link to="/signup" className="ml-1">
            Sign Up
          </Link>
        </div>
      }
    </Card>
  )
}
