<template>
  <div class="category">
    <ul class="menu-link">
      <el-scrollbar height="300px">
        <li class="menu-link">
          <router-link class="menu-link" :to="{ name: 'TagPage' }">
            Tags
          </router-link>
        </li>
        <li class="menu-link-home">
          <router-link
            class="menu-link"
            :to="{ name: 'HomePage', params: { type: 'home' } }"
          >
            Home<el-icon><House /></el-icon>
          </router-link>
        </li>
        <li
          class="menu-link"
          tabindex="1"
          v-for="(value, key) in props.typelist"
          :key="value"
        >
          <router-link
            class="menu-link"
            :to="{ name: 'HomePage', params: { type: key } }"
          >
            {{ key }} <el-icon><ArrowRightBold /></el-icon>
          </router-link>
        </li>
      </el-scrollbar>
    </ul>
  </div>
</template>

<script>
// import { ref, nextTick } from "vue";
export default {
  name: "AsideType",
  props: ["typelist"],
  setup(props) {
    return { 
        props
    };
  },
};
</script>

<style scoped>
ul.menu-link {
  list-style: none;
  padding: 0.5rem;
}

a.menu-link {
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  margin: 0 0rem 0.5rem 0rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  font-size: 1rem;
  /* font-weight: bold; */
  color: rgb(72, 72, 72);
  line-height: 1.25;
  border-radius: 3px;
}

a.menu-link:hover {
  background-color: var(--hover-color);
}

a.menu-link:active {
  background-color: var(--hover-color);
  color: rgb(125, 125, 125);
  font-weight: bold;
}
a.menu-link:focus {
  background-color: var(--hover-color);
  color: rgb(125, 125, 125);
  font-weight: bold;
}

li.menu-link-home {
  text-align: center;
}
</style>
