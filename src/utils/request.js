import axios from 'axios'
import store from '../store/index'
import globalConfig from '@/global.config'
axios.defaults.withCredentials = true
const Cookie =
  'MUSIC_U=008C27A69254FA2D860F6B65DBCC3D131CB669972C53AF83C4EC84506BDCB6F5C45723821B6236D8ED3C9AFA911516B65FA128A248E595E47CA25283F96247C4C2F7689A0BBCC573AD117703A2D963DFDFBDE322E4045ADD984C039BCB8BD756C8CDE89C6E0D55C4B7F6FC2F2180430E8815C9C19CA9E6F7826FA1BFE73B5114315C7607998292CB447B20A33005E44227ACC857CE92696C82683E879A101F2B565837B06A78A4E23CD0995F87920468B6696EAF04FD61497D403CCF1FF84E3452C6C264285B3564639EC80A8F58181A26CBAB9A31E2972665A56BD727C249E4B5BD12A0EBB1D9FC4ED6FADA3C3729742678002E66AF6DE44C018AC0F0DBA71BF95BA08A3B114251F59A3FA2759B0F49BEE1ABFEECAB10F3EC2A7D1BACA2377E97CA229DAF2AF955709E2FE265B95AE57612AD2D2B75ED2BFE3CA4BB924283FDCB60E6CC6CA945BB91E2319764CC53E312'
export const cloudeRequest = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  params: {
    cookie: encodeURIComponent(Cookie)
  }
})
cloudeRequest.interceptors.request.use(
  (config) => {
    if (globalConfig.needLoadingWeb.indexOf(config.url) != -1) {
      store.commit('CHANGELOADING')
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
cloudeRequest.interceptors.response.use(
  (res) => {
    if (globalConfig.needLoadingWeb.indexOf(res.config?.url) != -1) {
      store.commit('CHANGELOADING')
    }
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)
export const showLoadingRequest = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  params: {
    cookie: encodeURIComponent(Cookie)
  }
})
showLoadingRequest.interceptors.request.use(
  (config) => {
    store.commit('CHANGELOADING')

    return config
  },
  (err) => {
    alert('发送失败')
    return Promise.reject(err)
  }
)
showLoadingRequest.interceptors.response.use(
  (res) => {
    store.commit('CHANGELOADING')

    return res
  },
  (err) => {
    alert('接收数据失败')
    return Promise.reject(err)
  }
)
