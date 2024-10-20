<template>
    <div class="search_wrapper">
        <header>

            <router-link :to="{
                name: 'searchmusic',
                query: {
                    keywords: route.query.keywords
                }
            }"><span>单曲</span></router-link>
            <router-link @click="jumpToSearchPlaylist" :to="{
                name: 'searchplaylist',
                query: {
                    keywords: route.query.keywords
                }

            }"><span>歌单</span></router-link><router-link :to="{
                name: 'searchsinger'
            }"><span>歌手</span></router-link><router-link
                :to="{ name: 'searchalbum' }"><span>专辑</span></router-link><router-link
                :to="{ name: 'searchuser' }"><span>用户</span></router-link>
        </header>
        <div class="search_content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { getSearchPlaylist } from '@/api/cloude';
import { useRoute } from 'vue-router';
import ErMusicList from './ErMusicList.vue';
import { useStore } from 'vuex';
import emitter from '@/utils/emitter';
import { onMounted } from 'vue';
const store = useStore()
const route = useRoute()
//获取header组件的关键字
let keywords = route.query.keywords;

//跳转到歌单模块
const jumpToSearchPlaylist = async () => {
    const { data: { result: { playlists } } } = await getSearchPlaylist(keywords)
    console.log(playlists)
    store.commit('GETSONGPLAYLIST', playlists)
}
onMounted(() => {
    console.log(keywords)
})
</script>

<style lang="less" scoped>
.search_wrapper {
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
            font-weight: 600;
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

    .search_content {
        height: 92%;
    }
}
</style>