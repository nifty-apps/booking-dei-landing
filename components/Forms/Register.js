import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useTranslation } from "next-i18next";
import routeLink from "~/public/text/link";
import { useText } from "~/theme/common";
import Checkbox from "./Checkbox";
import Title from "../Title/TitleSecondary";
import AuthFrame from "./AuthFrame";
import useStyles from "./form-style";
import { useRouter } from "next/router";

function Register() {
  const { classes, cx } = useStyles();
  const { classes: text } = useText();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { t, i18n } = useTranslation("common");
  const curLang = "/" + i18n.language;

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== values.password) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule("isTruthy", (value) => value);
  });

  const [check, setCheck] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheck = (event) => {
    setCheck(event.target.checked);
  };

  const resetForm = () => {
    setValues({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (values.password !== values.confirmPassword) {
    //   toast.error("Passwords do not match");
    //   return; // Stop the form submission
    // }

    // const toastId = toast.loading("Registering...");

    // try {
    //   const response = await fetch("/api/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values),
    //   });

    //   toast.dismiss(toastId);

    //   const data = await response.json();
    //   if (!response.ok) {
    //     toast.error(data.message);
    //     return;
    //   }

    //   toast.success("Registration successful!");
    //   resetForm();
    //   router.push("/login");
    //   // Redirect or update UI as needed
    // } catch (error) {
    //   toast.error(error.message || "Failed to register");
    // }
    toast("This feature is not available yet");
  };
  return (
    <AuthFrame title={t("register_title")} subtitle={t("register_subtitle")}>
      <div>
        <div className={classes.head}>
          <Title align={isMobile ? "center" : "left"}>{t("register")}</Title>
          <Button
            size="small"
            className={classes.buttonLink}
            href={curLang + routeLink.saas.login}
          >
            <Icon className={cx(classes.icon, classes.signArrow)}>
              arrow_forward
            </Icon>
            {t("register_already")}
          </Button>
        </div>
        <div className={classes.separator}>
          <Typography>{t("register_or")}</Typography>
        </div>
        <ValidatorForm
          onError={(errors) => console.log(errors)}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextValidator
                variant="filled"
                className={classes.input}
                label={t("register_name")}
                onChange={handleChange("name")}
                name="name"
                value={values.name}
                validators={["required"]}
                errorMessages={["This field is required"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="filled"
                className={classes.input}
                label={t("register_email")}
                onChange={handleChange("email")}
                name="email"
                value={values.email}
                validators={["required", "isEmail"]}
                errorMessages={["This field is required", "Email is not valid"]}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                variant="filled"
                type="password"
                className={classes.input}
                label={t("register_password")}
                validators={["required"]}
                onChange={handleChange("password")}
                errorMessages={["This field is required"]}
                name="password"
                value={values.password}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                variant="filled"
                type="password"
                className={classes.input}
                label={t("register_confirm")}
                validators={["isPasswordMatch", "required"]}
                errorMessages={["Password mismatch", "This field is required"]}
                onChange={handleChange("confirmPassword")}
                name="confirm"
                value={values.confirmPassword}
              />
            </Grid>
          </Grid>
          <div className={classes.btnArea}>
            <FormControlLabel
              control={
                <Checkbox
                  validators={["isTruthy"]}
                  errorMessages="This field is required"
                  checked={check}
                  value={check}
                  onChange={(e) => handleCheck(e)}
                  color="primary"
                />
              }
              label={
                <span className={text.caption}>
                  {t("form_terms")}
                  &nbsp;
                  <a href="#">{t("form_privacy")}</a>
                </span>
              }
            />
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              size="large"
            >
              {t("continue")}
            </Button>
          </div>
        </ValidatorForm>
      </div>
    </AuthFrame>
  );
}

export default Register;
