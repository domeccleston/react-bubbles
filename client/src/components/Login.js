import React from "react";
import { useHistory } from 'react-router-dom';
import { Form, Field, withFormik } from 'formik';
import { axiosWithAuth } from '../axios/index';

const LoginForm = () => {
  const history = useHistory();
  return (
    <div className="form-container">
      <Form className="login-form">
        <Field type="text" name="username" placeholder="Username" />
        <Field type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

const FormikLoginForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },

  handleSubmit(values, history) {
    axiosWithAuth()
      .post("http://localhost:5000/api/login", values)
      .then(res => {
        console.log(res.data)
        localStorage.setItem("token", res.data.payload);
        history.props.history.push("/bubblepage");
      })
      .catch(err => {
        console.log(err); 
      });
  }
})(LoginForm);

export default FormikLoginForm;