import { Formik, Field, Form } from 'formik';
import axios from "axios";
export const SignUp = () => {
    return (
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        onSubmit={async values => {
          const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users/signup`, {
            username: values.username,
            password: values.password
          })
        }}
      >
        <Form>
          <header>
            <p>Sign Up</p>
          </header>
          <label htmlFor="username">First Name</label>
          <Field id="username" name="username" placeholder="Username" />

          <label htmlFor="password">Last Name</label>
          <Field id="password" name="password" placeholder="Password" type="password" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    )
}