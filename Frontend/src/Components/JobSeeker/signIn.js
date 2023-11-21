import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { connect } from "react-redux";
import { commonLoginFunc } from "../../redux/actions/loginActions";
import indeedLogo from "../../Images/signInLogo.png";

const SignIn = ({ commonLoginFunc }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [personaType, setPersonaType] = useState("js");
  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setPersonaType(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {};
    data.email = email;
    data.password = password;
    data.personaType = personaType;
    commonLoginFunc(data, setLoginError);
  };

  return (
    <div
      style={{
        backgroundColor: "#f3f2f1",
        width: "100%",
        height: "850px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <form onSubmit={onSubmit}>
        <Container
          component="main"
          maxWidth="xs"
          style={{
            marginTop: "30px",
            marginBottom: "100px",
            marginLeft: "420px",
          }}
        >
          <img alt={"logo"} width="55%" src={indeedLogo} />
          <Paper
            variant="outlined"
            style={{
              borderRadius: "0.5rem",
              border: "1px solid #d4d2d0",
              padding: "24px",
              width: "480px",
              height: loginError ? "575px" : "550px",
            }}
          >
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <h1
                style={{
                  fontSize: "26px",
                  margin: "0px 0px 8px",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Ready to take the next step?
              </h1>
              <div
                style={{
                  fontSize: "14px",
                  margin: "0px 0px 16px",
                  textAlign: "left",
                }}
              >
                Sign in.
              </div>
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  autoComplete="current-password"
                  required
                />
                <div style={{ textAlign: "left" }}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="row-radio-buttons-group"
                      value={personaType}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="js"
                        control={<Radio />}
                        label="Job Seeker"
                        selected
                      />
                      <FormControlLabel
                        value="e"
                        control={<Radio />}
                        label="Employer"
                      />
                      <FormControlLabel
                        value="a"
                        control={<Radio />}
                        label="Admin"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    textAlign: "left",
                    marginTop: "25px",
                  }}
                >
                  When you create an account or sign in, you agree to Indeed's{" "}
                  <a style={{ color: "blue", cursor: "pointer" }}>Terms</a>,{" "}
                  <a style={{ color: "blue", cursor: "pointer" }}>Cookie</a> and{" "}
                  <a style={{ color: "blue", cursor: "pointer" }}>Privacy</a>{" "}
                  policies. You consent to receiving marketing messages from
                  Indeed and may opt out from receiving such messages by
                  following the unsubscribe link in our messages, or as detailed
                  in our terms.
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ height: "44px" }}
                >
                  <span
                    style={{
                      cursor: "pointer",
                      lineHeight: "1.5",
                      fontSize: "1rem",
                      fontWeight: "700",
                    }}
                  >
                    Sign In
                  </span>
                </Button>
                {loginError ? (
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      marginTop: 0,
                    }}
                  >
                    {loginError}
                  </p>
                ) : null}
              </Box>
            </Box>
          </Paper>
        </Container>
      </form>
    </div>
  );
};

export default connect(null, { commonLoginFunc })(SignIn);
