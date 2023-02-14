<template>
    <div class="aside-view">
        <div class="aside-header">
            <div class="profile-image">
                <el-avatar 
                :size="100" 
                :src="profileImage" />
            </div>
            <div class="profile-sign">
                <h3>{{ bloggerName }}</h3>
            </div>
            <div class="sign">
                <!-- <p>{{ sign }}</p>
                 -->
                <img id="link-icon" src="https://img.icons8.com/ios-glyphs/60/null/linkedin-circled--v1.png"/>
                <img id="link-icon" src="https://img.icons8.com/material-rounded/48/null/github.png"/>
            </div>
        </div>
        <div class="aside-content-view">
            <div class="choose-option">
                <h3>分類</h3>
                <h3>目錄</h3>
            </div>
            <div class="category">
                <ul class="menu-link">
                    <el-scrollbar height="300px">
                        <li class="menu-link">
                            <router-link class="menu-link" :to="{name: 'TagPage'}">
                                Tags
                            </router-link>
                        </li>
                        <li class="menu-link-home">
                            <router-link class="menu-link" :to="{name: 'HomePage', params: {type: 'home'}}">
                                Home<el-icon><House/></el-icon> 
                            </router-link>
                        </li>
                        <li class="menu-link" tabindex="1" v-for="(value, key) in BlogTypeList" :key="value">
                            <router-link class="menu-link" :to="{name: 'HomePage', params: {type: key}}" >
                                {{ key }} <el-icon><ArrowRightBold /></el-icon>
                            </router-link>
                        </li>    
                    </el-scrollbar>
                </ul>
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
                    BlogTypeList.value = store.getters.getTypeIdMap
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
    /* padding: 1rem; */
    margin: 1.5rem 0 0 1.5rem ;
    /* background-color: var(--aside-color); */
    /* /* box-shadow: 2px 0px 2px 0px rgba(150, 150, 150, 0.2), 2px 0px 2px 0px rgba(150, 150, 150, 0.1); */
    height: 100%;
    
}

#link-icon {
    width: 30px;
    height: 30px;
}
div.aside-header {
    /* margin-left: 1rem;
    margin-right: 1rem; */
    margin-bottom: 1rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* border-bottom: 1px solid var(--border-color);
    border: 1px solid var(--border-color); */
    border-radius: 6px;
    background-color: white;
    box-shadow: 0 2px 6px rgba(26,31,28,.08);
    
}
div.aside-content-view {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    /* border: 1px solid var(--border-color); */
    border-radius: 6px;
    background-color: white;
    box-shadow: 0 2px 6px rgba(26,31,28,.08);
}
div.choose-option {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    margin: 0 1rem 0 1rem;
}

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
    background-color: var( --hover-color);
}

a.menu-link:active {
    background-color: var( --hover-color);
    color:rgb(125, 125, 125);
    font-weight: bold;
}
a.menu-link:focus {
    background-color: var( --hover-color);
    color:rgb(125, 125, 125);
    font-weight: bold;
}

li.menu-link-home {
    text-align: center;
}

</style>