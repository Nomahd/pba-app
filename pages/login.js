import { Box, TextField } from "@material-ui/core";

const Login = () => {
  return (
    <Box>
      <TextField label="ユーザー名" />

      <TextField label="パスワード" />
    </Box>
  );
};

export default Login;
