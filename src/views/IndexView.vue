<template>
  <div class="container">
    <!-- header -->
    <header class="header has-aside" ref="header">
      <header-view></header-view>
    </header>
    <div class="page-container has-sidebar">
      <aside class="aside sidebar">
        <aside-nav></aside-nav>
      </aside>
      <main class="main-container"> 
        <div class="page-content">
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
    </div>
    <!-- footer -->
    <footer class="footer">
      <footer-view></footer-view>
    </footer>
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
  name: 'IndexView',
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

header.header{
  z-index: 5;
  /* padding-bottom: 1rem; */
}

@media screen and (min-width: 960px) {
  header.header {
      position: sticky;
      top: 0px;
  }
  aside.sidebar {
    top: var(--header-height);
    transform: translate(0);
  }
  .page-container.has-sidebar {
    /* padding-left: calc(var(--sidebar-width)); */
    width: 100%;
  } 
}

div.page-container{
  width: var(--main-container-width);
  display: flex;
  /* justify-content: space-around; */
  position: relative;
  overflow: scroll;
}

div.page-content {
  padding: 2rem;
}

aside.aside {
  z-index: 2;
  height: 100%;
  width: var(--sidebar-width);
  /* position: fixed; */
  top: 0;
  position: relative;
  /* left: 0; */
  /* bottom: 0; */
}


main.main-container {
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* height: 100%; */
  /* padding: 2rem; */
  width: 100%;
  position: relative;
  background-color: var(--background-color);
}



div.page-header {
  z-index: 4;
  width: 100%;
}

footer.footer {
  z-index: 3;
  position: relative;
  bottom: 0px;
  width: 100%;
}

</style>
