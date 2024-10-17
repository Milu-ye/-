<template>
    <section class="aside-container">
        <div class="list function">12</div>
        <div class="list user">12</div>
        <div class="list myList">
            <p class="smallTitle">我的</p>
            <div @click="jumpToMylove" class="content">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" fill="currentColor"
                    class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </svg>
                <span>喜欢的音乐</span>
            </div>
            <div @click="jumpToHistory" class="content">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" fill="currentColor"
                    class="bi bi-clock-fill" viewBox="0 0 16 16">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                </svg>
                <span>最近播放</span>
            </div>
        </div>
        <div class="list collectList">12</div>
    </section>
</template>

<script setup>
import { cloudeRequest, showLoadingRequest } from '@/utils/request';
import axios from 'axios';
import { useStore } from 'vuex';
// import getSongInfo from '@/hooks/useIdGetSongInfo';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import emitter from '@/utils/emitter';
const router = useRouter()
const store = useStore()
//#region
//喜欢音乐功能模块
let LikeMusicList = reactive([]);
emitter.on('loadlikeMusicList', (over) => {

})
let isFirst;
const requestList = reactive([])
//喜欢音乐请求列表
const formLikeRequestList = (ids) => {
    requestList.push(cloudeRequest.get('/song/detail', {
        params: {
            ids
        }
    }))
}
//加载喜欢列表
const oldOver = ref(0)
const upLoadLikeList = (newOver) => {
    store.state.likeList_ids.slice(oldOver.value, newOver || store.state.initSongNum).forEach(id => {
        formLikeRequestList(id);
    })
    if (isFirst) {
        store.commit('CHANGELOADING')
    }
    oldOver.value = newOver;
    axios.all(requestList).then(res => {
        if (isFirst) {
            store.commit('CHANGELOADING')
            isFirst = false
            router.push({
                name: 'likelist'
            })
        }
        res = res.map(item => item.data?.songs?.[0])
        // LikeMusicList = Object.assign(LikeMusicList, res)
        LikeMusicList.push(...res);
        emitter.emit('loadOk');
        store.commit('GETMUSICLIST', LikeMusicList)
        requestList.splice(0, requestList.length)
    })
}
const jumpToMylove = () => {
    isFirst = true;
    upLoadLikeList();
}
//#endregion
//#region
//最近播放模块
//得到最近播放-歌曲列表插入musiclist
const formHistory = async () => {
    const { data: { data: { list } } } = await showLoadingRequest('/record/recent/song', {
        params: {
            limit: 600
        }
    })
    const musiclist = list.map(item => item.data)
    store.commit('GETMUSICLIST', musiclist)
}
const jumpToHistory = () => {
    formHistory();
    router.push({ name: 'historymusic' });
}
//#endregion
onMounted(() => {
    emitter.on('upLoadLikeList', upLoadLikeList);
})
</script>

<style lang="less" scoped>
.aside-container {
    display: flex;
    flex-direction: column;

    color: white;
    height: 100%;
    width: 80%;
    overflow: auto;

    .content {
        width: 100%;
        height: 2.5vh;
        border-radius: 1vh;
        padding-left: 5%;
        display: flex;
        align-items: center;
        font-size: 12px;
        cursor: pointer;

        span {
            margin-left: 0.6vw;
        }

        &:hover {
            background-color: #606266;
        }

    }

    .list {
        width: 100%;
        border-bottom: 1px solid #c0c4ccad;
        padding: 0 0.2vw 1vh 0.2vw;

        &:nth-last-child(1) {
            border-bottom: 0;
        }
    }


}

.smallTitle {
    color: #909399;
    font-size: 12px;
    font-weight: 600;
    margin-top: 1.2vh;
    margin-bottom: 1.2vh;
}
</style>