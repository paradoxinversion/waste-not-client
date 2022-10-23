import { Formik, Field, Form } from 'formik';
import axios from "axios";
export const LogIn = () => {
    return (
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        onSubmit={async values => {
          const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users/login`, {
            username: values.username,
            password: values.password
          })
          console.log(result)
        }}
      >
        <Form>
          <header>
            <p>Log In</p>
          </header>
          <label htmlFor="username">Username</label>
          <Field id="username" name="username" placeholder="Username" />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" placeholder="Password" type="password" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    )
}