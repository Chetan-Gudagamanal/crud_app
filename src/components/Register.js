import "./LoginPage.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Container from '@mui/material/Container';
import Card from '@mui/material/Container';

export default function LoginPage({ setStatus }) {
  const navigate = useNavigate();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    userEmail: Yup.string().required().email(),
    password: Yup.string().required()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data) => {
    setLoadingStatus(true);
    console.log(data);
    const loginUser=async()=>{
      const url="http://localhost:3001/register"
      const rawData=await fetch(url,{
          method:"POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
      })
      if(rawData.status==200){
          let jsonData=await rawData.json()
          .then(res=>{
              // setStatus("Login Successful")
            //   console.log(res)
              localStorage.setItem("x-auth-token", res)
              setLoadingStatus(false)
              navigate("/homepage")
          })
      }else{
          let jsonData=await rawData.json()
          console.log(jsonData)
          setLoadingStatus(false)
          alert("Some Error Accourred, Please Try Again Later")
      }
    }
    loginUser()
    // navigate("/login")
    setLoadingStatus(false);
  };

  return (
    <Container maxWidth="md" style={{textAlign:"center"}}>
      <div>
        {/* <p>Click on create Account to register as new user</p> */}

        <p className="login_page_title">REGISTER</p>
        <div className="loginFormContainer">
          <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="LoginForm">
            <br />
              <input
                {...register("firstName")}
                placeholder="Enter your Name"
              />
              {errors.firstName && (
                <span style={{ color: "crimson" }}>
                  {" "}
                  {errors.firstName.message}{" "}
                </span>
              )}
              <br />
              <input
                {...register("lastName")}
                placeholder="Enter your Last Name"
              />
              {errors.firstName && (
                <span style={{ color: "crimson" }}>
                  {" "}
                  {errors.lastName.message}{" "}
                </span>
              )}
              <br />
              <input
                {...register("userEmail")}
                placeholder="Enter your email id"
              />
              {errors.userEmail && (
                <span style={{ color: "crimson" }}>
                  {" "}
                  {errors.userEmail.message}{" "}
                </span>
              )}
              <br />
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span style={{ color: "crimson" }}>
                  {" "}
                  {errors.password.message}{" "}
                </span>
              )}
              <br />

              {!loadingStatus ? (
                <input type="submit" value="REGISTER" />
              ) : (
                <CircularProgress disableShrink />
              )}
              <br />
              

              <div className="text-center">
                <button
                  className="secondaryFormbutton"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Already have an Account! LOGIN
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </Container>
  );
}