import React, { useRef, useState, useEffect } from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import firebase from "firebase/app"

export default function LogIn() {
  const numberRef = useRef()
  const codeRef = useRef()
  const { signinWithPhone } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(true)
  const [confirm, setConfirm] = useState(null)
  // const [verifier, setVerifier] = useState(null)
  const history = useHistory()

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      }
    )
  }, [])

  async function sendCode() {
    try {
      setError("")
      setLoading(true)
      setVisible(true)
      console.log("try error")
      const confirmation = await signinWithPhone(
        numberRef.current.value,
        window.RecaptchaVerifier
      )
      console.log(confirmation)
      setConfirm(confirmation)
    } catch {
      console.log("catch error")
      setError("Failed to send code")
    }
    setLoading(false)
  }

  async function confirmSubmit() {
    try {
      setError("")
      setLoading(true)
      await confirm.confirm(codeRef.current.value)
      history.push("/")
    } catch {
      setError("Invalid code")
    }
    setLoading(false)
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Log In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={sendCode}>
          <Form.Group id="phone-number">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="tel"
              ref={numberRef}
              required
              placeholder="+996*********"
            />
          </Form.Group>
          <Button
            id="sign-in-button"
            disabled={loading}
            className="w-100"
            type="submit"
          >
            Send code
          </Button>
        </Form>
        {!visible ? (
          ""
        ) : (
          <Form onSubmit={confirmSubmit} className="mt-4">
            <Form.Group id="verifyCode">
              <Form.Label>Verify code</Form.Label>
              <Form.Control type="tel" ref={codeRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Verify
            </Button>
          </Form>
        )}
        <div className="w-100 mt-4 d-flex justify-content-center">
          Already have an account?
          <Link to="/login" className="ml-1">
            Log In
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}
