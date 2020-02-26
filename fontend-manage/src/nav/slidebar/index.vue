<template>
  <div
    id="sidebar"
    :class="{'col-nowrap':true,'stretch':sidebar.opened,'compress':!sidebar.opened}"
  >
    <!-- 一级菜单 -->
    <div class="flex-1 menus">
      <!-- 2、首页 -->
      <div
        class="home"
        @click="$routeTo('/home')"
        @mouseenter="(()=>hoverhome=true)"
        @mouseleave="(()=>{hoverhome=false})"
      >
        <div class="hover-left" />
        <i class="el-icon-s-home" />
        <span v-if="sidebar.opened">首页</span>
        <div v-if="!sidebar.opened&&hoverhome===true">首页</div>
      </div>
      <!-- 一级菜单 -->
      <menu-dir v-for="o in menuDirs" :key="o.id" :item="o" @click.native="hidebox(o.url)"/>
    </div>

    <!-- 收起菜单栏 -->
    <div class="side-toggle" @click="toggleSideBar">
      <span>
        <i
          :class="{'el-icon-d-arrow-left':sidebar.opened,'el-icon-d-arrow-right':!sidebar.opened}"
        />
        <span v-show="sidebar.opened">收起</span>
      </span>
    </div>
  </div>
</template>

<script>
import MenuDir from "./menu-dir.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    MenuDir
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  data () {
    return {
      search: false,
      hoverhome: false,
      menuDirs: [
        {
          id: 0,
          icon: 'el-icon-menu',
          name: '首页轮播',
          url: '/pub/lunbo'
        },
        {
          id: 1,
          icon: 'el-icon-menu',
          name: '首页学科竞赛信息',
          url:  '/pub/info'
        },
        {
          id: 2,
          icon: 'el-icon-menu',
          name: '首页新闻',
          url: '/pub/news'
        },
        {
          id: 3,
          icon: 'el-icon-menu',
          name: '首页成果展示',
          url: '/pub/suc'
        },
        {
          id: 4,
          icon: 'el-icon-menu',
          name: '首页竞赛培训',
          url: '/pub/train'
        },
        {
          id: 5,
          icon: 'el-icon-menu',
          name: '二级新闻',
          url: '/pub/newstwo'
        },
        {
          id: 6,
          icon: 'el-icon-menu',
          name: '二级公告',
          url: '/pub/notice'
        },
        {
          id: 7,
          icon: 'el-icon-menu',
          name: '竞赛历程',
          url: '/pub/line'
        },
        {
          id: 8,
          icon: 'el-icon-menu',
          name: '竞赛报名',
          url: '/pub/sign'
        },
        {
          id: 9,
          icon: 'el-icon-menu',
          name: '二级成果展示',
          url: '/pub/suctwo'
        },
        {
          id: 10,
          icon: 'el-icon-menu',
          name: '团队建设',
          url: '/pub/team'
        },
        {
          id: 11,
          icon: 'el-icon-menu',
          name: '资料下载',
          url: '/pub/down'
        },
        {
          id: 12,
          icon: 'el-icon-menu',
          name: '菜单',
          url: '/pub/menu'
        },
        {
          id: 13,
          icon: 'el-icon-menu',
          name: '用户管理',
          url: '/pub/user'
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["sidebar", "themeColor"])
  },
  methods: {
    hidebox (url) {
      this.$routeTo(url)
    },
    ...mapActions("app/", ["toggleSideBar", "openSideBar", "closeSideBar"])
  }
};
</script>

<style lang="scss">
@import '~@/styles/mixin.scss';
$hei: 41px;
#sidebar {
  height: 100%;
  // height: 85vh;
  background-color: #fff;
  margin: 0 0 0 0.3rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  color: rgb(104, 104, 104);
  // font-family:微软雅黑;
  font-size: 13px;
  .menus {
    // overflow-y: scroll;
    background: #fff;
    overflow-x: hidden;
    @include scrollBar(2px);
  }

  .side-toggle {
    &:hover {
      background-color: #e7e7e7;
    }
    color: #707070;
    font-size: 0.8rem;
    line-height: 2rem;
    height: 3rem;
    text-align: center;
    cursor: pointer;
  }
  .search {
    width: 100%;
    height: 41px;
    padding: 0 0 0 1rem;
    line-height: 41px;
    border-bottom: 1px solid #f3f3f3;
    cursor: pointer;
  }
  .search input {
    width: 70%;
    // height: 100%;
    border: 0;
    outline: 0;
  }
  .search div.searchbox-strech {
    position: absolute;
    left: 0.4rem;
    width: 13.5rem;
    background: white;
    box-shadow: 0 0 20px 0 rgb(155, 154, 154);
    line-height: 2.5rem;
    padding: 0 0 0 0.6rem;
    color: gray;
    ul {
      margin: 0;
      padding: 0 0 0 1.6rem;
      list-style: none;
      li {
        cursor: pointer;
      }
    }
  }
}
.hover-left {
  width: 4px;
  height: $hei;
  background: transparent;
  position: absolute;
  left: 0px;
}
.home {
  @extend.search;
  i {
    color: gray !important;
  }
  span {
    margin-left: 0.3rem;
  }
  &:hover {
    .hover-left {
      background: rgb(219, 68, 13);
    }
    i,
    span {
      color: black !important;
    }
  }
  div:last-child {
    position: absolute;
    left: 3.8rem;
    z-index: 1000;
    top: 5.5rem;
    width: 10rem;
    height: $hei;
    background: #f3f3f3;
    box-shadow: 2px 0 5px 0 gray;
    padding: 0 0 0 1.5rem;
  }
}
.sidebar-compress {
  position: absolute;
  width: 10rem !important;
  height: $hei !important;
  top: 5.5rem;
  left: 0.4rem;
  box-shadow: 0 0 5px 0 gray;
  padding: 0 0 0 1rem;
  z-index: 1000;
}
.searchbox-compress {
  position: absolute;
  width: 10rem;
  top: 8rem;
  left: 0.4rem;
  background: white;
  box-shadow: 0 5px 5px 0 gray;
  line-height: 2.5rem;
  padding: 0 0 0 0.6rem;
  color: gray;
  border-top: 1px solid #e2e2e2;
  z-index: 2000;
  ul {
    margin: 0;
    padding: 0 0 0 0.4rem;
    list-style: none;
    li {
      cursor: pointer;
    }
  }
}
//展开
.stretch {
  width: 13.5rem;
  transition: width 0.3s;
}

//收缩
.compress {
  transition: width 0.3s;
  overflow: hidden;
  width: 55px;
}
.item-ischecked {
  color: black;
  background: #dddddd;
}
</style>
