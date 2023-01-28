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
import AsideNav from '@/components/aside/AsideNav.vue'
import HeaderView from '@/components/header/HeaderView.vue'
import FooterView from '@/components/footer/FooterView.vue'

export default {
  name: 'HomeView',
  components: {
    AsideNav,
    HeaderView,
    FooterView
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
  z-index: 4;
  position: relative;
  position: sticky;
  top: 0px;

}

footer.footer {
  z-index: 3;
  position: relative;
  bottom: 0px;
  width: 100%;
}

</style>
