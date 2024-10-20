<template>
    <header>
        <div class="search">
            <button @click="getSeachInfo">
                <i-ep-Search style="width: 100%; height: 50%; margin-right: 8px; color: whitesmoke;" />
            </button>
            <div>
                <input @keydown.enter="getSeachInfo" type="text" v-model="searchContent" ref='search' class="a"
                    :placeholder="`热门: ${hot}`">
            </div>
        </div>
        <div class="user-content">
            <div class="user-info">
                <img :src="accountInfo?.profile?.avatarUrl" alt="">
                <p>{{ accountInfo?.profile?.nickname }}</p>
            </div>
            <div class="user-msg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                    class="bi bi-envelope" viewBox="0 0 16 16">
                    <path
                        d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                </svg>
            </div>
        </div>
    </header>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, onBeforeMount, nextTick, reactive, computed } from 'vue'
import { cloudeRequest, showLoadingRequest } from '@/utils/request';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import emitter from '@/utils/emitter';
const store = useStore();
const router = useRouter()
const onVnodeBeforeMountRef_ = ref(null)//取消警告
//渲染热搜词
const search = ref(null)
const searchContent = ref('')
let hotSearchData = reactive({})
let hot = ref('')
//获取热搜词
const getHotSearch = async () => {
    const { data } = await cloudeRequest.get('/search/hot/detail')
    hotSearchData = Object.assign(hotSearchData, data)
    hot.value = hotSearchData.data[Math.floor(Math.random() * (hotSearchData.data.length + 1))].searchWord;


}
//获取账号信息
let accountInfo = computed(() => {
    return store.state.accountInfo
})
onMounted(() => {
    getHotSearch()
})
//获取搜索结果
const getSeachInfo = async () => {
    let keywords = searchContent.value || hot.value
    let { data: { result } } = await cloudeRequest.get('/cloudsearch', {
        params: {
            keywords,
            limit: 100
        }
    })
    emitter.emit('postKeyWords', keywords)
    store.commit('GETMUSICLIST', result.songs);
    //存放搜索结果到vuex中并跳转路由
    router.push({
        name: 'searchmusic',
        query: {
            keywords
        }
    })

}
</script>

<style lang="less" scoped>
header {

    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-content {

        width: 40%;
        height: 100%;
        display: flex;

        .user-msg {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            svg {
                color: white;
            }
        }

        .user-info {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;

            p {
                font-size: 12px;
                padding-left: 4%;
            }

            img {
                border-radius: 50%;
                width: 14%;
            }
        }
    }

    .search {
        width: 250px;
        height: 35px;
        display: flex;

        border-radius: 5px;
        overflow: hidden;

        button {
            width: 40px;
            background: rgba(6, 6, 6, 0.5);
            border: 0;
            transition: all 0.1s;

            &:hover {
                cursor: pointer;
                background-color: rgba(6, 6, 6, 0.7);
            }

            &:active {
                transform: scale(0.9);
                border-radius: 5px;
            }
        }

        input {
            height: 100%;
            width: 210px;
            background: rgba(6, 6, 6, 0.3);
            border: 0;
            outline: none;
            padding: 8px;
            text-indent: 4px;
            font-size: 14px;
            color: rgba(245, 245, 245, 0.807)
        }
    }

}

.logo {
    width: 176px;
    height: 69px;
    background: url(../assets/image/topbar.png) no-repeat;

    a {
        display: block;
        width: 176px;
        height: 100%;
    }
}
</style>