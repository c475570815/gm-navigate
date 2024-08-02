import Vue from 'vue'
import Vuex from 'vuex'
import myInfo from "@/views/resume/myInfo";
import {isMobile} from "@/global/common";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        myinfo: myInfo,
        isMobile: isMobile(),
        yqItems: [
            {
                label: '百度',
                queryUrl: 'https://www.baidu.com/s?wd='
            },
            {
                label: '必应',
                queryUrl: 'https://cn.bing.com/search?q='
            }
        ]
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
})
