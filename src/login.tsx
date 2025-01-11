import {
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Section,
  Separator,
  Text,
} from "@radix-ui/themes";
import { TextInput } from "./components";
import { useForm } from "react-hook-form";
import { PersonIcon } from "@radix-ui/react-icons";
import GoogleIcon from "./assets/google.svg";
import LinkedinIcon from "./assets/linkedin.svg";
import ObviousLogo from "./assets/logo.svg";
import { useNavigate } from "react-router";

interface SignInFields {
  email: string;
  password: string;
}

const lightText = "#535862";

export const Login = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignInFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const onLogin = (data: SignInFields) => {
    if (data.email === "obvious@obviously.ai" && data.password === "obvious") {
      navigate("/library");
      localStorage.setItem("isLoggedIn", "true");
    } else {
      alert(
        "Your credentials are not obvious. Please read my email to get the credentials."
      );
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        padding: "16px 16px",
      }}
    >
      <header>
        <ObviousLogo />
      </header>
      <Section style={loginStyles.loginContainer}>
        <Flex direction={"column"} gap={"4"}>
          <PersonIcon height={25} width={25} style={{ alignSelf: "center" }} />
          <Heading align={"center"}>Sign In</Heading>
          <Text
            align={"center"}
            size={"3"}
            style={{ color: lightText, marginBottom: "16px" }}
          >
            Welcome back! Let's get started with AI
          </Text>
          <Container style={loginStyles.loginForm}>
            <TextInput
              inputProps={register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              type="email"
              label="Email"
              placeholder="Enter your email"
              style={{ marginBottom: "16px" }}
              errorMessage={errors.email?.message}
            />

            <TextInput
              inputProps={register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
              type="password"
              label="Password"
              placeholder="Enter your password"
              style={{ marginBottom: "16px" }}
              errorMessage={errors.password?.message}
            />

            <Button
              size={"3"}
              style={{
                width: "100%",
                marginTop: "8px",
                backgroundColor: "#3882FF",
                fontWeight: 600,
              }}
              onClick={handleSubmit(onLogin)}
            >
              Sign In
            </Button>

            <Flex align="center" gap="4" style={{ marginTop: "24px" }}>
              <Separator size={"4"} orientation="horizontal" />
              <Text weight={"bold"} style={{ color: "#B9B9B9" }}>
                OR
              </Text>
              <Separator size={"4"} orientation="horizontal" />
            </Flex>

            <Button
              variant="outline"
              size={"3"}
              style={{
                width: "100%",
                marginTop: "24px",
                color: "#414651",
                boxShadow: "inset 0 0 0 1px #D5D7DA",
              }}
            >
              <GoogleIcon />
              Sign up with Google
            </Button>

            <Button
              variant="outline"
              size={"3"}
              style={{
                width: "100%",
                marginTop: "16px",
                color: "#414651",
                boxShadow: "inset 0 0 0 1px #D5D7DA",
              }}
            >
              <LinkedinIcon />
              Sign up with LinkedIn
            </Button>
          </Container>
          <Text align={"center"} style={{ color: lightText }}>
            Don't have an account?{" "}
            <Link style={{ color: "#3882FF" }}> Sign up</Link>
          </Text>
        </Flex>
      </Section>
      <footer style={{ marginTop: "auto" }}>
        <Text size={"1"} style={{ color: lightText }}>
          &copy; Copyrights 2025 by Obviously AI, Inc. All rights reserved.
        </Text>
      </footer>
    </div>
  );
};

const loginStyles = {
  loginContainer: {
    maxWidth: "460px",
    margin: "0px auto",
    padding: "0px",
  },
  loginForm: {
    border: "1px solid #E4E7EC",
    borderRadius: "12px",
    padding: "32px 40px",
    boxShadow: "0px 4px 6px -1px #0A0D121A",
  },
};
