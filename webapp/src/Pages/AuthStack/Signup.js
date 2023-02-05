import React from "react";
import { redirect } from "react-router-dom";
import Form from "../../components/Form";
import { apiendpoint } from "../../constants/constans";
const Signup = () => {
  const userInfo = (user) => {
    console.log(user);
  };

  const handleSignUp = async (user) => {
    console.log(user.userName);
    await fetch(`${apiendpoint}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify({
        phone_no: user.userName,
        password: user.password,
        confirm_password: user.password,
        first_name: "",
        last_name: "",
        role: "ADMIN",
      }),
    })
      .then((res) => {
        console.log(res.status);
        if (res.ok) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json) => {
        console.log(JSON.stringify(json, null, 2));
        const saveData = async () => {
          await localStorage.setItem("@jwtauth", json.auth.access_token);
          await localStorage.setItem("@role", json.user.role);
        };
        saveData();
        if (json.user.role == "RIDER") console.log("Rider");
        else if (json.user.role == "ADMIN") {
          redirect("/overview");
        }
      })
      .catch(console.log);
  };
  return (
    <div>
      <Form handleSignUp={handleSignUp} userInfo={userInfo} />
    </div>
  );
};

export default Signup;
