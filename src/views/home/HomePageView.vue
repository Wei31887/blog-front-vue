<template>
    <Page-Header></Page-Header>
    <div class="blog-list-view" v-for="(item, index) in blogs" 
        :key="index" @click="handleClick(item)">
        <el-card class="blogs" shadow="always" :body-style="{ padding: '0px' }" >
            <div class="pic">
            </div>
            <div class="blog-info">
                <div class="blog-title">
                    <h1>{{ item.title }}</h1>
                </div>
                <span>click: {{ item.click_hit }}</span>
                <span>create time: {{ item.add_time }}</span>
            </div>
        </el-card>
    </div>
    <div class="page-nav">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            layout="prev, pager, next"
            :total="currentTotal"
            @current-change="handleCurrentChange"/>
    </div>
</template>

<script>
import { BlogList } from '@/api/blog';
import { ref, toRefs, reactive, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import store from '@/store';
import PageHeader from '@/components/page_header/PageHeader'

export default {
    name: 'HomePage',   
    components: {PageHeader},
    setup() {
        const router = useRouter()
        const route = useRoute()
        const total = ref(50)
        const PageState = reactive({
            pageSize: 10,
            currentPage: 1,
        })

        const currentTotal = computed(() => {
            return total.value
        })

        const blogList = reactive({
            blogs: [],
            typeId: 0,
        })

        // watch
        watch(route, (to) => {
            let toId = parseInt(store.getters.getBlogTypes[to.params.type])
            if (toId != blogList.typeId) {
                blogList.typeId = toId
                loadingBlog()   
            }
        })

        // methods
        const loadingBlog = () => {
            BlogList({
                page: PageState.currentPage,
                size: PageState.pageSize,
                type_id: blogList.typeId
            }).then( res => {
                if (res.data.code === 0) {
                    blogList.blogs = res.data.data
                    total.value = res.data.count
                } else {
                    ElMessage({
                        type: 'error',
                        message: res.data.msg
                    })
                }
            })
        }

        const handleCurrentChange = (newPage) => {
            PageState.currentPage = newPage
            loadingBlog()
        }

        const handleClick = (item) => {
            router.push({
                name: 'BlogContent', 
                params: { 
                    type: item.type_name,
                    id: item.id
                }
            })
        }

        //mounted
        onMounted(() => {
            blogList.typeId = route.params.type === undefined || NaN ? 0 : parseInt(route.params.type)
            // console.log('onMount:', blogList.typeId)
            loadingBlog()
        })

        return {
            ...toRefs(PageState),
            ...toRefs(blogList),
            currentTotal,
            loadingBlog,
            handleCurrentChange,
            handleClick,
            
        }
    }
}
</script>

<style scoped>
div.blog-list-view{
    padding-left: 3%;
    padding-right: 3%;
    padding-top: 2%;
}

div.page-nav{
    padding: 2%;
    position: relative;
    bottom: 0;
    display: flex;
    justify-content: center;
}

.el-card.blogs {
    border-radius: 10px;
    display: flex;
    flex-direction: column;

}

.el-card.blogs:hover {
    cursor: pointer;
}

div.blog-info {
    display: flex;
    flex-direction: column;
    /* justify-content: flex-end; */
    align-items: flex-start;
    font-size: smaller;
    padding: 1rem;
}

</style>