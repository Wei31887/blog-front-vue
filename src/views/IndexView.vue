<template>
  <div class="home-container">
    <el-row>
      <el-col :span="5">
        <!-- aside -->
        <aside class="aside">
          <aside-nav></aside-nav>
        </aside>
      </el-col>
      <el-col :span="19"> 
        <main class="main-container">
          <!-- header -->
          <header class="header">
            <header-view></header-view>
          </header>
          <!-- content -->
          <div class="content">
              <router-view></router-view>
          </div>
        </main>
      </el-col>
      <!-- footer -->
      <footer class="footer">
        <footer-view></footer-view>
      </footer>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import AsideNav from '@/components/aside/AsideNav.vue'
import HeaderView from '@/components/header/HeaderView.vue'
import FooterView from '@/components/footer/FooterView.vue'

export default {
  name: 'HomeView',
  components: {
    AsideNav,
    HeaderView,
    FooterView
  },
}
</script>

<style>
/* div.home-container {
  position: relative;
} */

aside.aside {
  z-index: 2;
  background-color: white;
  height: 100vh;
  position: sticky;
  top: 0px;
}

main.main-container {
  z-index: 1;
  background-color: rgb(246, 246, 246);
  min-height: 100vh;
  position: relative;
  /* padding-bottom: 3rem; */
}

header.header{
  z-index: 4;
  position: relative;
  background-color: rgb(255, 255, 255);
  position: sticky;
  top: 0px;

}

footer.footer {
  z-index: 3;
  position: relative;
  bottom: 0px;
  width: 100%;
}

div.content {
  padding: 1rem;
}
</style>
