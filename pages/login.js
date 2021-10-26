import { Box, Button, TextField, Typography } from "@material-ui/core";
import { signIn } from "next-auth/client";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  return (
    <Box display="flex" justifyContent="center" height={1}>
      <Box
        display="flex"
        flexDirection="column"
        width="10rem"
        height="10rem"
        alignSelf="center"
      >
        {error && <Typography>無効な資格情報</Typography>}
        <TextField
          error={error}
          label="ユーザー名"
          onChange={(e) => {
            setUserNameInput(e.target.value);
          }}
        />

        <TextField
          error={error}
          label="パスワード"
          type="password"
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
        />
        <Button
          onClick={() =>
            signIn("credentials", {
              redirect: false,
              username: userNameInput,
              password: passwordInput,
            }).then((res) => {
              if (res.ok) {
                router.replace("/");
              } else {
                setError(true);
              }
            })
          }
        >
          ログイン
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
