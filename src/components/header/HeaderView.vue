<template>
    <div class="header-view">
        <div class="logo">
            <router-link :to="{name: 'HomePage'}">
                <!-- <img src="@/assets/logo.jpeg" alt="logo" id="logo">
                 -->
                 <h3>
                    WeiTim
                 </h3>
            </router-link>
            
        </div>
        <!-- <div class="header-kbar">

        </div> -->
        <div class="content">
            <router-link 
                :class="{ active: activeIdx == 0}" 
                :to="{name: 'HomePage'}" 
                ref="blogLink">
                Blog
            </router-link>
            <router-link 
                :class="{ active: activeIdx == 1}" 
                :to="{name: 'ProjectPage'}" 
                ref="projectLink">
                Project
            </router-link>
            <router-link 
                :class="{ active: activeIdx == 2}"  
                :to="{name: 'AboutPage'}" 
                ref="aboutLink">
                About
            </router-link>
            <el-switch />
        </div>
    </div>
</template>
  

<script>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
export default{
    name: "HeaderView",
    components: {

    },
    setup() {
        const activeIdx = ref(0)
        const route = useRoute()

        onMounted(() => {
            if (route.name == 'HomePage') {
                activeIdx.value = 0
            } else if (route.name == 'ProjectPage') {
                activeIdx.value = 1
            } else if (route.name == 'AboutPage') {
                activeIdx.value = 2
            }
        })
        
        watch(() => route.name, () => {
            if (route.name == 'HomePage') {
                activeIdx.value = 0
            } else if (route.name == 'ProjectPage') {
                activeIdx.value = 1
            } else if (route.name == 'AboutPage') {
                activeIdx.value = 2
            }
        })
        return {
            activeIdx
        }
    }
}
</script>

<style scoped>
div.header-view {
    height: var(--header-height);
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: space-around;
    background-color:   rgb(255, 255, 255);
    box-shadow: 0 1px 1px 0 var(--border-shadow-color), 0 2px 2px 0 var(--border-shadow-color);
    border-bottom: 1px solid var(--border-color);
}
div.logo {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

div.content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    width: 100%;
}

#logo {
    height: 2rem;
    padding: 0.6rem;
}

a {
    padding-left: 1rem;
    padding-right: 1rem;
    text-decoration: none;
    height: 100%;
    display: flex;
    align-items: center;
}

/* a.nav-link:hover {
    color: var(--font-hover-color);
    transition-duration: 200ms;
}

a.nav-link:active {
    color: var(--font-hover-color);
    border-bottom: 3px solid var(--font-hover-color);
}
a.nav-link:focus {
    color: var(--font-hover-color);
    border-bottom: 3px solid var(--font-hover-color);
} */
.active {
    color: var(--font-hover-color);
    border-bottom: 3px solid var(--font-hover-color);
}

</style>