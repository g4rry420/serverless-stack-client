import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";

import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { useAppContext } from "../../libs/contextLib";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import "./Login.css";

export default function Login() {
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  const [newFields, handleNewFieldChange] = useFormFields({
    code: "",
    newPassword: "",
    confirmNewPassword: ""
  })
  const [forgotPassword, setForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
        await Auth.signIn(fields.email, fields.password);
        userHasAuthenticated(true);
    } catch (e) {
        console.log(e)
        onError(e);
        setIsLoading(false);
    }
  }

  const handleForgotPassword = () => {



    const handleNewCode = () => {

      const handleNewPasswordSubmit = (e) => {
        e.preventDefault();
        const { code, newPassword, confirmNewPassword } = newFields;

        if(newPassword !== confirmNewPassword){
          alert("Password Fields should match each other.")
        }

        Auth.forgotPasswordSubmit(fields.email, code, newPassword)
          .then(data => console.log(data))
          .catch(err => console.log(err))
      }

      const { code, newPassword, confirmNewPassword } = newFields
      return (
        <div className="Login">
          <Form onSubmit={handleNewPasswordSubmit}>
            <Form.Group size="lg">
              <Form.Label>Enter Code</Form.Label>
              <Form.Control autoFocus type="text" id="code" value={code} onChange={handleNewFieldChange} />
            </Form.Group>
            <Form.Group size="lg">
              <Form.Label>New Password</Form.Label>
              <Form.Control autoFocus type="password" id="newPassword" value={newPassword} onChange={handleNewFieldChange} />
            </Form.Group>
            <Form.Group size="lg">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control autoFocus type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={handleNewFieldChange} />
            </Form.Group>
            <LoaderButton block size="lg" type="submit" isLoading={isLoading} >
              Submit
            </LoaderButton>
          </Form>
        </div>
      )
    }

    const validateFormForForgotPassword = () => {
      return fields.email.length > 0;
    }

    const handleForgotPasswordSubmit = (e) => {
      e.preventDefault();
      const { email } = fields
      Auth.forgotPassword(email)
        .then(data => {
          if(data){
            setNewPassword(true)
          }
        })
        .catch(err => console.log(err))
    }

    return(
      <div>
      {
        newPassword ? handleNewCode(): (
          <div className="Login">
          <Form onSubmit={handleForgotPasswordSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control autoFocus type="email" value={fields.email} onChange={handleFieldChange} />
            </Form.Group>
            <LoaderButton block size="lg" type="submit" isLoading={isLoading} disabled={!validateFormForForgotPassword()}>
              Submit
            </LoaderButton>
          </Form>
        </div>
        )
      }
      </div>
    )
  }

  return (
    <div>
    {
      forgotPassword ? handleForgotPassword() : (
        <div className="Login">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control autoFocus type="email" value={fields.email} onChange={handleFieldChange} />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={fields.password} onChange={handleFieldChange}/>
            </Form.Group>
            <LoaderButton block size="lg" type="submit" isLoading={isLoading} disabled={!validateForm()}>
              Login
            </LoaderButton>
            <span style={{cursor: "pointer", fontSize: "0.8rem"}} onClick={() => {
            setForgotPassword(true);
            handleForgotPassword();
            }}>Forgot Password ?</span>
          </Form>

          <div>
            <h3>Test Credentials</h3>
            <h5>user@example.com</h5>
            <h5>Passw0rd123!</h5>
          </div>
        </div>
      )
    }
  </div>
  );
}