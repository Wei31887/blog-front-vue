<template>
    <div class="aside-view">
        <div class="aside-header">
            <div class="profile-image">
                <el-avatar 
                style="box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7); " 
                :size="100" 
                :src="profileImage" />
            </div>
            <div class="profile-sign">
                <h3>{{ bloggerName }}</h3>
            </div>
            <div class="sign">
                <p>{{ sign }}</p>
            </div>
        </div>
        <div class="aisde-content-view">
            <div class="category">
                <el-scrollbar height="400px">
                    <ul class="menu-link">
                        <li class="menu-link-home">
                            <router-link class="menu-link" :to="{name: 'HomePage'}">
                                Home
                            </router-link>
                        </li>
                        <li class="menu-link" tabindex="1" v-for="(value, key) in BlogTypeList" :key="value">
                            <router-link class="menu-link" :to="{name: 'HomePage', params: {type: key}}" >
                                {{ key }} <el-icon><ArrowRightBold /></el-icon>
                            </router-link>
                        </li>
                    </ul>
                </el-scrollbar> 
            </div>
        </div>
    </div>
</template>

<script>
import { BASE_API } from '@/config/config';
import { ElNotification } from 'element-plus';
import { onMounted, reactive, toRefs, ref } from 'vue';
import { useRoute } from 'vue-router';
import store from '@/store'


export default{
    name: "AsideNav",
    setup() {
        const route = useRoute()
        const BlogTypeList = ref()
        const blogger = reactive({
            profileImage: '',
            nickName: '',
            sign: '',
            bloggerName: ''
        })

        // methods
        const loadingBlogger = () => {
            store.dispatch('loadingBlogger').then(res => {
                if (res.data.code === 0) {
                    blogger.profileImage = BASE_API + store.getters.getBlogger.img
                    blogger.sign = store.getters.getBlogger.sign
                    blogger.bloggerName = store.getters.getBlogger.nickname + "'s blog" 
                } else {
                    ElNotification({
                        title: 'Error',
                        type: 'error',
                        message: "Can't find blogger. " + res.data.msg
                    }) 
                }
            }).catch(e => {console.log(e)})
        }

        const loadingBlogType = () => {
            store.dispatch('loadingBlogType').then(res => {
                if (res.data.code === 0) {
                    BlogTypeList.value = store.getters.getBlogTypes
                } else {
                    ElNotification({
                        title: 'Error',
                        type: 'error',
                        message: "Can't find blog list. " + res.data.msg
                    })
                }
            }).catch(e => {console.log(e)})    
        }

        // mounted
        onMounted(() => {
            loadingBlogger()  
            loadingBlogType()
        })

        return {
            ...toRefs(blogger),
            BlogTypeList,
            route
        }
    }
}
</script>

<style scoped>

div.aside-view {
    padding: 1rem;
    background-color: rgb(233, 237, 242);
    /* box-shadow: 2px 0px 2px 0px rgba(150, 150, 150, 0.2), 2px 0px 2px 0px rgba(150, 150, 150, 0.1); */
    
}

div.aside-header {
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px rgb(193, 197, 203);
}
div.aside-content-view {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

ul.menu-link {
    list-style: none;
    padding: 0.5rem;
}


a.menu-link {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    margin: 0 0 0.4rem 0;
    padding: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: rgb(72, 72, 72);
    line-height: 1.25;
    border-radius: 6px;
}

a.menu-link:hover {
    background-color: rgb(220, 220, 220);
}

a.menu-link:active {
    background-color:rgb(220, 220, 220);
    color:rgb(125, 125, 125);
    font-weight: bold;
}
a.menu-link:focus {
    background-color:rgb(220, 220, 220);
    color:rgb(125, 125, 125);
    font-weight: bold;
}

li.menu-link-home {
    text-align: center;
}

</style>