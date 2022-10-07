import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [flip, setFlip] = useState(false);
  return (
    <>
      <section class="material-half-bg">
        <div class="cover"></div>
      </section>
      <section class="login-content">
        <div class="logo">
          <h1>Vali Admin React</h1>
        </div>
        <div class={`login-box ${flip ? "flipped" : null}`}>
          <form class="login-form" action="index.html">
            <h3 class="login-head">
              <i class="fa fa-lg fa-fw fa-user"></i>SIGN IN
            </h3>
            <div class="form-group">
              <label class="control-label">USERNAME</label>
              <input class="form-control" type="text" placeholder="Email" autofocus />
            </div>
            <div class="form-group">
              <label class="control-label">PASSWORD</label>
              <input class="form-control" type="password" placeholder="Password" />
            </div>
            <div class="form-group">
              <div class="utility">
                <div class="animated-checkbox">
                  <label>
                    <input type="checkbox" />
                    <span class="label-text">Stay Signed in</span>
                  </label>
                </div>
                <p class="semibold-text mb-2">
                  <span onClick={() => setFlip(true)} className="cp" data-toggle="flip">
                    Forgot Password ?
                  </span>
                </p>
              </div>
            </div>
            <div class="form-group btn-container">
              <button class="btn btn-primary btn-block" type="button" onClick={() => navigate("/")}>
                <i class="fa fa-sign-in fa-lg fa-fw"></i>SIGN IN
              </button>
            </div>
          </form>
          <form class="forget-form" action="index.html">
            <h3 class="login-head">
              <i class="fa fa-lg fa-fw fa-lock"></i>Forgot Password ?
            </h3>
            <div class="form-group">
              <label class="control-label">EMAIL</label>
              <input class="form-control" type="text" placeholder="Email" />
            </div>
            <div class="form-group btn-container">
              <button class="btn btn-primary btn-block" type="button">
                <i class="fa fa-unlock fa-lg fa-fw"></i>RESET
              </button>
            </div>
            <div class="form-group mt-3">
              <p class="semibold-text mb-0">
                <span onClick={() => setFlip(false)} className="cp" data-toggle="flip">
                  <i class="fa fa-angle-left fa-fw"></i> Back to Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
