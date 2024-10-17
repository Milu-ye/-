import Mock from 'mockjs'
import loginData from './Data/loginData'
Mock.mock('/api/getLogin', loginData)
