<template>
    <div class="wrap">
        <div class="container">
            <div class="login-wrapper">
                <div class="header">Login</div>
                <div class="form-wrapper" :class="{}">
                    <div class="put" :class="{ changeToCaptcha: isCaptcha }">
                        <div class="account">
                            <input type="text" v-model="formLogin.phonenumber" placeholder="手机号码" class="input-item">
                            <input type="password" v-model="formLogin.password" placeholder="密码" class="input-item">
                        </div>
                        <div class="phone">
                            <input type="text" v-model="formLogin.phonenumber" placeholder="手机号码" class="input-item">
                            <input type="password" v-model="formLogin.Captcha" placeholder="验证码" class="input-item">
                            <button @click="sendCaptcha">发送</button>
                        </div>
                    </div>
                    <div class="btn" @click="login">登录</div>
                    <a href="#" @click="passwordToCaptcha">{{ loginmsg }}</a>
                </div>
                <div class="msg">
                    Don't have account?
                    <a href="#">Sign up</a>
                </div>
            </div>
            <div class="mask" v-if="isShow">
            </div>
            <div class="errowin" :class="{ errowShow: isShow }">
                <h4>{{ errowmessage }}</h4>
                <el-button type="primary" @click="closeErr" round>关闭</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { cloudeRequest } from '@/utils/request';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios';
import Cookies from 'js-cookie';
const loginmsg = ref('验证码登录')
const errowmessage = ref('')
const formLogin = reactive({
    account: '',
    password: '',
    phonenumber: '',
    Captcha: ''
});
const isShow = ref(false)
const isCaptcha = ref(false);
const passwordToCaptcha = () => {
    isCaptcha.value = !isCaptcha.value;
    if (isCaptcha.value) {
        loginmsg.value = '密码登录'
    }
    else {
        loginmsg.value = '验证码登录'
    }
}
const router = useRouter()
//发送验证码
const sendCaptcha = async () => {
    axios.get('http://localhost:3000/captcha/sent', {
        params: {
            phone: formLogin.phonenumber
        }
    })
}
//登录操作
const login = async () => {
    cloudeRequest.get('/user/account')
    if (isCaptcha.value) {
        try {
            let { data } = await axios.get('http://localhost:3000/captcha/verify', {
                params: {
                    phone: formLogin.phonenumber,
                    captcha: formLogin.Captcha
                }
            })
            console.log(data)
            // router.push({
            //     name: 'home'
            // })
        } catch (err) {
            isShow.value = true
            errowmessage.value = "验证码错误"
        }
    }
    else {
        try {
            let { data } = await axios.get('http://localhost:3000/login/cellphone', {
                params: {
                    phone: formLogin.phonenumber,
                    password: formLogin.password
                }
            })
            console.log(data)
            //router.push({
            //    name: 'home'
            //})
        } catch (err) {
            isShow.value = true
            errowmessage.value = "手机号或密码错误"
        }
    }
}

// const login = async () => {
//     let { data } = await axios.get('/api/getLogin');
//     if (data.account == formLogin.account && data.password == formLogin.password) {
//         router.push({
//             name: 'begin'
//         })
//         Cookies.set('token', data.token, { expires: 7 });
//     }
//     else {
//         isShow.value = 'visible'
//     }
// }
const closeErr = () => {
    isShow.value = false
}
</script>
<style lang="less" scoped>
.container {
    position: relative;
    height: 100%;

}

.wrap {
    height: 100%;
    width: 100%;
}

.login-wrapper {
    background-color: rgba(6, 6, 6, 0.4);
    width: 358px;
    height: 588px;
    border-radius: 15px;
    padding: 0 50px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 5px;
    backdrop-filter: blur(3px);
}

.header {
    font-size: 38px;
    font-weight: bold;
    text-align: center;
    line-height: 200px;
}

.input-item {

    display: block;
    width: 100%;
    margin-bottom: 20px;
    border: 0;
    padding: 10px;
    border-bottom: 1px solid rgb(128, 125, 125);
    font-size: 15px;
    outline: none;
    background-color: rgba(6, 6, 6, 0.3);
    display: flex;
    color: #a6c1ee;

    &:hover {
        background-color: #5b5858;
    }
}

.input-item::placeholder {
    text-transform: uppercase;
}

.btn {
    text-align: center;
    padding: 10px;
    width: 70px;
    margin: 0 auto;
    border-radius: 6px;
    margin-top: 40px;
    background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
    color: #fff;
    transition: all 0.1s;


    &:hover {
        cursor: pointer;
    }

    &:active {
        transform: scale(0.98);
    }
}

.msg {
    text-align: center;
    line-height: 88px;
}

a {
    text-decoration-line: none;
    color: #abc1ee;
}

.mask {
    position: absolute;
    top: 0;

    width: 100%;
    height: 100%;
    background-color: #666;
    opacity: 0.3;
}

.errowin {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    z-index: 100;
    width: 400px;
    height: 200px;
    background-color: white;
    border-radius: 7px;
    top: -200px;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.2s linear;

    h4 {
        margin-top: 20px;
    }

}

.form-wrapper {
    position: relative;
    overflow: hidden;

    a {
        width: 80px;
        position: absolute;
        left: 70%;
        top: 83%;
        font-size: 13px;
    }

    .put {
        width: 200%;

        display: flex;
        transition: all 0.3s linear;

        .account {
            width: 50%;
        }

        .phone {
            width: 50%;
            position: relative;

            button {
                width: 50px;
                height: 34px;
                position: absolute;
                border-radius: 3px;
                right: 0px;
                top: 1px;
                outline: none;
                border: 0;
                background-color: rgba(6, 6, 6, 0.3);
                z-index: 4;
                color: black;

                &:hover {
                    cursor: pointer;
                    background-color: #5b5858;
                }
            }
        }
    }
}

.changeToCaptcha {
    transform: translateX(-50%);
}

.errowShow {
    transition: all 0.9s solid;
    top: 30%;
}
</style>