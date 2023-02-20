<template>
        <div class="homepage-view">
            <div class="blog-list-view" 
                v-for="(item, index) in blogs" 
                :key="index"
                @click="handleClick(item)"
            >
                    <div class="blog-card">
                        <div class="pic">
                        </div>
                        <div class="blog-info">
                            <div class="blog-title">
                                <h1>{{ item.title }}</h1>
                            </div>
                            <div class="blog-summary">
                                blablabla
                            </div>
                            <div class="blog-info-detail">
                                <span class="info-detail">
                                    <el-icon><CollectionTag /></el-icon> 文章分類： {{ item.type_name }}
                                </span>
                                <span class="info-detail">
                                    <el-icon><View /></el-icon> 閱覽次數： {{ item.click_hit }}
                                </span>
                                <span class="info-detail">
                                    <el-icon><Clock /></el-icon> {{ item.add_time }}
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
        </div>

    <div class="page-nav">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            layout="prev, pager, next"
            :total="currentTotal"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
import { BlogList } from '@/api/blog';
import { ref, toRefs, reactive, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import store from '@/store';

export default {
    name: 'HomePage',   
    setup() {
        const router = useRouter()
        const route = useRoute()
        const total = ref(50)
        const PageState = reactive({
            pageSize: 8,
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
            let toId = parseInt(store.getters.getTypeIdMap[to.params.type])
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
                if (res.status == 200) {
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
            console.log(router)
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
            if (route.params.type === 'home') {
                blogList.typeId = 0
            } else {
                blogList.typeId = parseInt(store.getters.getTypeIdMap[route.params.type])
            }
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

<style>

div.blog-list-view{
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 1rem;

}

div.blog-summary {
    color: rgb(139, 139, 152);
}

div.page-nav{
    padding: 1rem;
    position: relative;
    bottom: 0;
    display: flex;
    justify-content: center;
}

div.blog-card {
    border-radius: 6px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    /* border: 1px solid var(--border-color); */
    background-color: var(--blog-card-color);
    box-shadow: 0 3px 6px rgba(29, 30, 29, 0.08);
   
}
div.blog-card:hover {
    cursor: pointer;
    /* box-shadow: 0 0 1px 1px var(--border-shadow-color-1), 0 0 4px 6px var(--border-shadow-color-2); */
    transition: 150ms;
    transform: translate3d(-1px,-3px,-2px);
    /* box-shadow: 0 5px 15px 0 rgba(0,0,0,0.08); */
    box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.08);
}

div.blog-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

div.blog-info-detail {
    display: flex;
    width: 100%;
    padding: 1rem 0 0rem 0;
}

span.info-detail {
    padding: 0.5rem 1rem 0rem 0;
    display: flex;
    align-items: center;
}

</style>