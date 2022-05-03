import axios from 'axios'
import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_IRL} from "../http";

export default class Store {
  user = {} as IUser
  isAuth = false
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }
  setAuth(isAuth: boolean) {
    this.isAuth = isAuth
  }
  setUser(user: IUser) {
    this.user = user
  }
  setLoading(bool: boolean) {
    this.isLoading = bool
  }
  async login(email: string, password: string) {
    try {
      const res = await AuthService.login(email, password)
      localStorage.setItem('token', res.data.accessToken)
      this.setAuth(true)
      this.setUser(res.data.user)
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }
  async registration(email: string, password: string) {
    try {
      const res = await AuthService.registration(email, password)
      localStorage.setItem('token', res.data.accessToken)
      this.setAuth(true)
      this.setUser(res.data.user)
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }

  async logout() {
    try {
      await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (e: any) {
      console.error(e.response?.data?.message)
    }
  }
  async checkAuth() {
    this.setLoading(true)
    try {
      const res = await axios.get<AuthResponse>(`${API_IRL}/refresh`, {withCredentials: true})
      localStorage.setItem('token', res.data.accessToken)
      this.setAuth(true)
      this.setUser(res.data.user)
    } catch (e: any) {
      console.error(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
}