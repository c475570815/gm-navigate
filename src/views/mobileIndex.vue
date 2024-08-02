<template>
  <el-container>
    <el-main :style="rootDivStyle">
      <div class="root-search">
        <el-form ref="form" size="medium" :model="searchForm" @keyup.enter.native="search">
          <el-input placeholder="请输入内容" ref="queryInput" :style="`width: ${queryInputWith}`"
                    v-model="searchForm.keyWord">
            <el-select v-model="searchForm.yqUrl" slot="prepend" placeholder="请选择">
              <el-option v-for="(item,index) in yqItems" :key="index" :label="item.label"
                         :value="item.queryUrl"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-form>
        <el-row class="show-text">
          {{ showText }}
        </el-row>
        <el-row v-for="(links,index ) in currentLinks" :key="index" class="link-bt-div" justify="space-between">
          <el-col>
            <el-button type="info" v-for="(link ) in links" :key="link.label" @click="goTo(link.url)" plain>
              {{ link.label }}
            </el-button>
          </el-col>
        </el-row>
      </div>
      <el-button type="info" class="dropdown-menu" icon="el-icon-s-operation" @click="()=>{drawerShow=true}"
                 circle></el-button>
      <el-drawer
          title="设置"
          :visible.sync="drawerShow"
          :with-header="true">
        <homeSetting ref="homeSetting" :current-link-type="currentLinkType" @reloadLink="reloadLinks"/>
      </el-drawer>
    </el-main>
  </el-container>
</template>
<script>
import {getYyWord} from "@/api/api";
import {getRandomInt} from "@/global/common";
import homeSetting from "@/views/homeSetting.vue";
import linkConfig from "@/global/linkConfig";

export default {
  name: 'HomeView',
  components: {homeSetting},
  data() {
    return {
      queryInputWith: '85vw',
      currentLinkType: 'default',
      currentLinks: linkConfig[0].links,
      searchForm: {
        keyWord: '',
        yqUrl: 'https://cn.bing.com/search?q=',
      },
      yqItems: this.$store.state.yqItems,
      backgroundUrlArr: [],
      rootDivStyle: {
        'width': '100%',
        'height': '100vh',
        'background-image': '',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'background-attachment': 'fixed',
        'background-size': 'cover',
        '-webkit-background-size': 'cover',
        '-moz-background-size': 'cover',
        '-o-background-size': 'cover'
      },
      iPicStyle: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        'background-image': '',
        'background-position': 'center center',
      },
      showText: '',
      drawerShow: false
    }
  },
  methods: {
    goTo(url) {
      window.location.href = url
    },
    search() {
      if (!this._.isEmpty(this.searchForm.keyWord)) {
        this.goTo(this.searchForm.yqUrl + this.searchForm.keyWord)
      }
    },
    init() {
      // 获取一言数据
      getYyWord().then(function (res) {
        return res.json();
      }).then(({hitokoto, creator}) => {
        this.showText = `${hitokoto}----《${creator}》`
      }).catch((err) => {
        console.error(err);
      })
      this.reloadLinks();
    },
    reloadLinks() {
      let set_type = localStorage.getItem('gm-navigate-type')
      let links = this.currentLinks
      let linkType = this.currentLinkType
      if (set_type !== null && set_type.trim() !== '' && this.currentLinkType !== set_type) {
        for (let item of linkConfig) {
          if (item.type === set_type) {
            linkType = set_type
            links = item.links;
            this.drawerShow = false
          }
        }
      }
      this.currentLinkType = linkType;
      this.currentLinks = links;
    },
    loadBackgroundUrlArr() {
      let files = require.context("@/assets/pic/search", true, /\.webp$/).keys();
      if (files.length > 0) {
        this.backgroundUrlArr = []
        for (let filePath of files) {
          this.backgroundUrlArr.push(require(`@/assets/pic/search/${filePath.slice(2)}`))
        }
      }
    }
  },
  mounted() {
    this.rootDivStyle["background-image"] = `url('${this.backgroundUrlArr[getRandomInt(0, this.backgroundUrlArr.length - 1)]}')`
    this.init()
  },
  created() {
    // if (!this.$store.state.isMobile) {
    //   //跳转pc页
    //   this.$router.push({
    //     path: "/"
    //   })
    // }
    //加载本地图片
    this.loadBackgroundUrlArr();

  }
}
</script>


<style lang="less" scoped>
.dropdown-menu {
  font-size: 20px;
  top: 1%;
  right: 1%;
  color: aliceblue;
  position: absolute;
}

.root-search {
  display: flex;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  position: absolute;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-around;
  align-items: center;

  :deep(input) {
    height: 3vh;
  }

  .el-form {
    :deep(.el-select) {
      width: 80px
    }


  }
}

.show-text {
  font-family: cursive;
  margin-top: 30px;
  text-align: center;
  font-size: 20px;
  background: white;
  -webkit-background-clip: text;
  color: transparent;
}

.link-bt-div {
  margin-top: 3vh;
}
</style>
