<template>
    <el-table @row-dblclick="playThisMusic" :data="playList"
        style="width: 100% ;height: 100%;background-color: transparent;border: 0;" max-height="680" :fit="false"
        :row-style="{ backgroundColor: 'transparent', border: '0', height: '60px', width: '100%' }"
        :cell-style="{ border: '0', color: 'white', fontSize: '14px', userSelect: 'none', width: '100%' }"
        :header-cell-style="{ backgroundColor: 'transparent', border: '0', color: 'white', fontWeight: '600', fontSize: '15px' }"
        :header-row-style="{ backgroundColor: 'transparent', userSelect: 'none' }">
        <el-table-column label="播放列表" width="180">
            <template #default="{ $index }">
                <div id="songInfo">
                    <h5 id="songName">{{ playList[$index].name }}</h5>
                    <p id="songAuthor">{{ getSingers($index, store.state.playList) }}</p>
                </div>
            </template>
        </el-table-column>
        <el-table-column width="45">
            <template #default="{ $index }">
                <div v-if="$index == store.state.currentPlay" id="currentPlayAnimation">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </template>
        </el-table-column>
        <el-table-column width="50">
            <template #default="{ $index }">
                <div class="icon">
                    <svg id="delete_icon" @click.stop="removeMusic($index)" xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </div>
            </template>
            <template #header>
                <p id="clear" @click="store.commit('CLEARPALYLIST')">清空</p>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import getSingers from '@/hooks/useGetSingers';
const store = useStore();
//读取播放列表
let playList = computed(() => {
    return store.state.playList
})
//列表播放选择的音乐
const playThisMusic = (thisSong, col) => {
    console.log(thisSong, col)
    playList.value.findIndex(song => song.id == thisSong.id)
    store.commit('UPDATECURRENTPLAY', playList.value.findIndex(song => song.id == thisSong.id));
}
//删除播放列表的选择音乐
const removeMusic = (index) => {
    store.commit('REMOVEMUSIC', index);
    store.dispatch('updateCurrentMusicUrl');
}
//清空播放列表音乐
const clear = () => {

}
</script>

<style lang="less" scoped>
#songInfo {
    position: relative;

    #songName {
        font-size: 14px;
        font-weight: 400;
    }

    #songAuthor {
        font-size: 12px;
        font-weight: 200;
    }


}

#currentPlayAnimation {
    width: 80%;
    height: 4.3vh;
    position: absolute;
    bottom: 0;
    right: 10%;
    display: flex;
    justify-content: space-between;
    transform: rotate(180deg);
    margin-bottom: 1vh;

    div:nth-child(1) {
        width: 30%;
        height: 100%;
        background-color: rgba(144, 147, 153, 0.7);
        animation: playinganimation3 0.5s linear infinite;
    }

    div:nth-child(2) {
        width: 30%;
        height: 33%;
        background-color: rgba(144, 147, 153, 0.7);
        animation: playinganimation2 0.5s linear infinite;
    }

    div:nth-child(3) {
        width: 30%;
        height: 0%;
        background-color: rgba(144, 147, 153, 0.7);
        animation: playinganimation1 0.5s linear infinite;
    }
}

@keyframes playinganimation1 {
    from {
        height: 0%;
    }

    33% {
        height: 33%;
    }

    66% {
        height: 66%;
    }

    to {
        height: 100%;
    }
}

@keyframes playinganimation2 {
    from {
        height: 33%;
    }

    33% {
        height: 66%;
    }

    66% {
        height: 100%;
    }

    to {
        height: 0%;
    }
}


@keyframes playinganimation3 {
    from {
        height: 66%;
    }

    33% {
        height: 100%;
    }

    66% {
        height: 10%;
    }

    to {
        height: 33%;
    }
}

#clear {
    font-size: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.el-table__row {
    #delete_icon {
        color: white;
        visibility: hidden;
        cursor: pointer;

        &:active {
            transition: all 0.1s;
            transform: scale(0.95);
        }
    }

    &:hover {
        #delete_icon {
            visibility: visible;
        }
    }

}
</style>