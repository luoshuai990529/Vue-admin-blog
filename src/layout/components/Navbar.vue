<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!--<breadcrumb class="breadcrumb-container" />面包屑-->
    <div class="app-breadcrumb">
      博客后台管理系统
      <span class="breadBtn">Lewis Luo</span>
    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <div v-if="staffPhoto" class="avatar-img">
            <img :src="staffPhoto + '?imageView2/1/w/80/h/80'" class="user-avatar">
          </div>
          <div v-if="!staffPhoto && name" class="avatar-text">{{ name[0] }}</div>
          <!-- <span class="name">{{ name }}</span> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <!-- <a
            target="_blank"
            href="https://github.com/PanJiaChen/vue-admin-template/"
          >
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a> -->
          <router-link
            to="/edituser/index"
          >
            <el-dropdown-item>编辑资料</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="lgout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(['sidebar', 'staffPhoto', 'name'])
  },
  methods: {
    ...mapActions(['logout']), // 引入子模块的登出方法
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async lgout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/login') // 回到登录页
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  // background: #fff;
  background-image: -webkit-linear-gradient(left,#304156,#d8d8d8);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #ffffff;
    cursor: text;
    .breadBtn {
      background: #294256;
      font-size: 14px;
      padding: 0 10px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      margin-left: 15px;
    }
  }
   .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .name {
          position: absolute;
          top: -5px;
          right: 50px;
          color: rgb(0, 0, 0);
          vertical-align: middle;
          margin-left:5px;
        }
        .avatar-text{
          cursor: pointer;
          width: 40px;
          line-height: 40px;
          text-align: center;
          border-radius: 50%;
          color: #fff;
          background: greenyellow;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -13px;
          top: 27px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
