<template>
    <div class="history_wrapper">
        <header>
            <router-link :to="{ name: 'historymusic' }"><span>歌曲</span></router-link><router-link
                @click="jumpToHistoryPlaylist"
                :to="{ name: 'historyplaylist' }"><span>歌单</span></router-link><router-link
                :to="{ name: 'historyalbum' }"><span>专辑</span></router-link>
        </header>
        <div class="history_content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { getHistoryPlaylist } from '@/api/cloude';
import { useStore } from 'vuex';
const store = useStore()
const jumpToHistoryPlaylist = async () => {
    let { data: { data: { list } } } = await getHistoryPlaylist()
    console.log(list)
    list = list.map(item => item.data)
    store.commit('GETSONGPLAYLIST', list);
}
</script>

<style lang="less" scoped>
.history_wrapper {
    width: 100%;
    height: 100%;

    header {
        margin: 0 auto;
        height: 8%;
        width: 98%;
        color: white;
        display: flex;

        align-items: center;
        border-bottom: 1px solid gray;
        padding: 0 1% 0 1%;

        a {
            width: 15%;
            height: 60%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        span {
            font-size: 14px;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1vh;
            cursor: pointer;

            &:hover {
                background-color: #606266;
            }
        }
    }

    .history_content {
        height: 92%;
    }
}
</style>