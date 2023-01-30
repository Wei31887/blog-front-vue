<template>
    <div class="page-header-view">
        <el-breadcrumb separator="/">
            <!-- <el-breadcrumb-item :to="{name: 'HomePage'}">
            Home
            </el-breadcrumb-item> -->
            <template v-for="(item, index) in breadList" :key="index">
            <el-breadcrumb-item v-if="item" :to="{name: 'HomePage', params: {type: item}}">
                {{ item }}
            </el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
  </template>
  

<script>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'PageHeader',
    setup() {
        const route = useRoute()
        const breadList = ref([])

        // methods 
        const getRoute = () => {
            let temp = []
            let crumb = ''
            let url = route.fullPath
            for (let i = 1; i < url.length; i++) {
                if (url[i] !== '/') {
                    crumb += url[i] 
                } 
                if (i == url.length-1 || url[i] === '/') {
                    temp.push(crumb)
                    crumb = ''   
                }
            }
            breadList.value = temp
        }

        // mounted
        onMounted(()=> {
            getRoute()
        })

        // watch route
        watch(route, () => {
            getRoute()
        })

        return {breadList}
    }
}
</script>

<style>
.el-breadcrumb {
    padding: 1.5rem;
}

div.page-header-view {
    border-bottom: 1px solid var(--border-color);
    background-color: var(--background-color);
    margin: 0 1rem 0 1.5rem;
}

</style>
