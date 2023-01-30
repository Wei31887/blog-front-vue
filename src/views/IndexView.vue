<template>
  <div class="container">
    <el-row>
      <el-col :span="5">
        <!-- aside -->
        <aside class="aside">
          <aside-nav></aside-nav>
        </aside>
      </el-col>
      <el-col :span="19"> 
        <!-- header -->
        <main class="main-container">
          <header class="header" ref="header">
            <header-view></header-view>
          </header>
          <div class="main-content-container">
            <!-- page header -->
            <div class="page-header" ref="pageheader">
              <Page-Header></Page-Header>
            </div>
            <!-- content -->
            <div class="content">
                <router-view></router-view>
            </div>
          </div>
        </main>
        <!-- footer -->
        <footer class="footer">
          <footer-view></footer-view>
        </footer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, nextTick } from'vue'
import AsideNav from '@/components/aside/AsideNav.vue'
import HeaderView from '@/components/header/HeaderView.vue'
import FooterView from '@/components/footer/FooterView.vue'
import PageHeader from '@/components/page_header/PageHeader.vue'

export default {
  name: 'HomeView',
  components: {
    AsideNav,
    PageHeader,
    HeaderView,
    FooterView
  },
  setup() {
    const pageheader = ref()
    const header = ref()
    nextTick(() => {
      // let headerHeight = header.value
      // console.log(headerHeight)
    })
    return {
      pageheader,
      header
    }
  }
}
</script>

<style>
div.container {
  position: relative;
  background-color: var(--background-color);
}

aside.aside {
  z-index: 2;
  height: 100vh;
  position: sticky;
  top: 0px;
}

main.main-container {
  z-index: 1;
  min-height: 100vh;
  position: relative;
  background-color: var(--div-color);
  /* padding-bottom: 3rem; */
}

header.header{
  z-index: 5;
  position: sticky;
  top: 0px;
}

div.main-content-container{
  position: relative;
}

div.page-header {
  z-index: 4;
  position: sticky;
  top: 3rem;
  width: 100%;
}

footer.footer {
  z-index: 3;
  position: relative;
  bottom: 0px;
  width: 100%;
}

</style>
