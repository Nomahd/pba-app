import { Box, Button, TextField } from "@material-ui/core";
import { signIn } from "next-auth/client";
import { useState } from "react";

const Login = () => {
  const [userNameInput, setUserNameInput] = useState(null);
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="10rem"
      height="10rem"
      alignContent="center"
      justifyContent="center"
    >
      <TextField
        label="ユーザー名"
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />

      <TextField
        label="パスワード"
        onChange={(e) => {
          console.log(e);
        }}
      />
      <Button
        onClick={() =>
          signIn("credentials", { callbackUrl: "/" }, { username: "" })
        }
      >
        ログイン
      </Button>
    </Box>
  );
};

export default Login;
