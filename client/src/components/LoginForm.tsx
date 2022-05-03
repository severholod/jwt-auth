import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const LoginForm:FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const {store} = useContext(Context)
  return (
    <div>
      <input
        type="text"
        value={email}
        placeholder="Email"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}/>
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}/>
      <button onClick={() => store.login(email, password)}>LogIn</button>
      <button onClick={() => store.registration(email, password)}>SingIn</button>
    </div>
  );
};

export default observer(LoginForm);