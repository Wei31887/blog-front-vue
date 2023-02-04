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
                            <div class="blog-info-detail">
                                <span class="info-detail">
                                    <el-icon><CollectionTag /></el-icon> Catagory: {{ item.type_name }}
                                </span>
                                <span class="info-detail">
                                    <el-icon><View /></el-icon> Click: {{ item.click_hit }}
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

div.homepage-view {
    padding: 1rem;
}
div.blog-list-view{
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 1rem;

}

div.page-nav{
    padding: 2%;
    position: relative;
    bottom: 0;
    display: flex;
    justify-content: center;
}

div.blog-card {
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border-color);
    background-color: var(--blog-card-color);
    box-shadow: 0 0 2px 2px var(--border-shadow-color-1), 0 0 4px 7px var(--border-shadow-color-2);
}
div.blog-card:hover {
    cursor: pointer;
    border: 1px solid var(--border-color);
    background-color: var(--blog-card-hover-color);
    transition: 300ms;
}

div.blog-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

div.blog-info-detail {
    display: flex;
}

span.info-detail {
    padding: 0.5rem 1rem 0.5rem 0;
    display: flex;
    align-items: center;
}

</style>