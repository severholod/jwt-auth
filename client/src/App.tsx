import React, {FC, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";

const App: FC = () => {
  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const res = await UserService.fetchUsers()
      setUsers(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  if (store.isLoading) {
    return <h1>Загрузка...</h1>
  }
  if (!store.isAuth) {
    return <LoginForm />
  }
  return (
    <div className="App">
      <h1>Пользователь ${store.user.email}</h1>
      <h1>{store.user.isActivated ? 'Пользователь активирован' : 'Активируйте пользователя'}</h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <button onClick={getUsers}>Получить пользователей</button>
      <hr/>
      {
        users.map((user) =>
          <div key={user.email}>
            {user.email}
          </div>
        )
      }
    </div>
  );
}

export default observer(App);
