import React, { useRef, useState } from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { googleProvider, facebookProvider } from "../firebase"

export default function LogIn() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { signin, signinWithProvider } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await signin(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }

  async function handleSubmitProvider(provider) {
    try {
      setError("")
      setLoading(true)
      await signinWithProvider(provider)
      history.push("/")
    } catch (e) {
      setError("Failed to log in with another method")
      console.log(e)
    }
    setLoading(false)
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Log In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Button disabled={loading} className="w-100" type="submit">
            Log In
          </Button>
          <Button
            disabled={loading}
            className="w-100 mt-3"
            variant="dark"
            onClick={() => {
              handleSubmitProvider(facebookProvider)
            }}
          >
            Log in with Facebook
          </Button>
          <Button
            disabled={loading}
            className="w-100 mt-3"
            variant="dark"
            onClick={() => {
              handleSubmitProvider(googleProvider)
            }}
          >
            Log in with Google
          </Button>
          <Link to="/phone-login">
            <Button disabled={loading} className="w-100 mt-3" variant="dark">
              Log in with phone number
            </Button>
          </Link>
        </Form>
        <div className="w-100 mt-4 d-flex justify-content-center">
          <Link to="/signup">Create new account</Link>
        </div>
      </Card.Body>
    </Card>
  )
}
