<template>
    <div class="aside-view">
        <div class="aside-header">
            <div class="profile-image">
                <el-avatar :size="100" :src="profileImage" />
            </div>
            <div class="profile-sign">
                <h3>{{ bloggerName }}</h3>
            </div>
        </div>
        <div class="aisde-content-view">
            <div class="sign">
                <!-- <p>{{ sign }}</p> -->
            </div>
            <div class="category">
                <el-scrollbar height="400px">
                    <ul class="menu-link">
                        <li><router-link class="menu-link" :to="{name: 'HomePage'}" >Home</router-link></li>
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
import { GetBlogger } from '@/api/blogger';
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
            GetBlogger().then(res => {
                if (res.data.code === 0) {
                    blogger.profileImage = BASE_API + res.data.data.img
                    blogger.nickName = res.data.data.nickname
                    blogger.sign = res.data.data.sign
                    blogger.bloggerName = blogger.nickName + "'s blog" 
                } else {
                    ElNotification({
                        title: 'Error',
                        type: 'error',
                        message: res.data.msg
                    })
                }
            }).catch(e => {
                console.log(e)
            })
        }
        const loadingBlogType = () => {
            store.dispatch('loadingBlogType').then( res => {
                if (res.data.code === 0) {
                    BlogTypeList.value = store.getters.getBlogTypes
                } else {
                    ElNotification({
                        title: 'Error',
                        type: 'error',
                        message: res.data.msg
                    })
                }
            }).catch( e => {
                console.log(e)
            })
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
    margin: 1rem;
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
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    margin: 0 0 0.4rem 0;
    padding: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: rgb(94, 94, 94);
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

</style>