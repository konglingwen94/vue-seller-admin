<template>
  <div class="basic-layout">
    <!-- 外链 -->
    <div class="external-link">
      <a
        href="https://github.com/konglingwen94/vue-elm-admin"
        target="_blank"
        aria-label="View source on Github"
        class="github-corner github-corner"
        ><svg
          data-v-09fe1acc=""
          width="80"
          height="80"
          viewBox="0 0 250 250"
          aria-hidden="true"
          style="fill: rgb(64, 201, 198); color: rgb(255, 255, 255);"
        >
          <path data-v-09fe1acc="" d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path
            data-v-09fe1acc=""
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            class="octo-arm"
            style="transform-origin: 130px 106px 0px;"
          ></path>
          <path
            data-v-09fe1acc=""
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            class="octo-body"
          ></path></svg
      ></a>
    </div>
    <el-container>
      <el-aside width="auto">
        <admin-menubar></admin-menubar>
      </el-aside>
      <el-container>
        <el-header>
          <admin-header></admin-header>
        </el-header>
        <div class="tag-container">
          <tab-tag
            :title="tag.name"
            @click="toggleTag(tag)"
            @close="closeTag(tag, index)"
            v-for="(tag, index) in tags"
            :key="index"
            :closable="!tag.isHome"
            :active="$route.path === tag.path"
            :style="{ width: `${100 / maxTags}%` }"
          >
            {{ tag.name }}
          </tab-tag>
        </div>

        <el-main>
          <keep-alive> <router-view :max="maxTags" :key="$route.path"></router-view></keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AdminMenubar from "@/components/admin-menubar";
import AdminHeader from "@/components/admin-header";
export default {
  components: {
    AdminMenubar,
    AdminHeader,
  },
  data() {
    return {
      maxTags: 7,
      tags: [{ name: "首页", path: "/seller/dashboard", isHome: true }],
    };
  },
  watch: {
    $route(newRoute) {
      const index = this.tags.findIndex((item) => item.path === newRoute.path);
      if (index === -1) {
        if (this.tags.length >= this.maxTags) {
          this.tags.splice(1, 1);
        }
        this.tags.push({
          name: newRoute.meta.breadcrumbMenus[newRoute.meta.breadcrumbMenus.length - 1],
          path: newRoute.path,
        });
      }
    },
  },
  methods: {
    closeTag(tag, index) {
      this.tags.splice(index, 1);
      const isActive = this.$route.path === tag.path;

      if (isActive && !tag.isHome) {
        this.$router.push(this.tags[this.tags.length - 1].path);
      }
    },
    toggleTag(tag, index) {
      if (tag.path === this.$route.path) {
        return;
      }
      this.$router.push(tag.path);
    },
  },
  provide() {
    try {
      var account = JSON.parse(localStorage.getItem("adminInfo"));
    } catch (error) {
      return;
    }

    return {
      account,
    };
  },
};
</script>

<style lang="less">
.tag-container {
  padding: 7px;
  padding-bottom: 5px;
  border-bottom: 1px solid;
  border-top: 1px solid;
  border-color: #eee;
  white-space: nowrap;
  width: 100%;
  padding-right: 100px;
  
}
.external-link {
  position: absolute;
  right: 0;

  top: 60px;
  z-index: 100;
}
.el-header,
.el-footer {
  // background-color: #b3c0d1;
  color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
