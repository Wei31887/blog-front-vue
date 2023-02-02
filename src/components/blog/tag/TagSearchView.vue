<template>
    <div class="Tag-search-view">
        <div class="blog-list-view" 
            v-for="(item, index) in blogs" 
            :key="index"
            @click="handleClick(item)"
        >
            <div class="blog-card">
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

<!-- <div class="page-nav">
    <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        layout="prev, pager, next"
        :total="currentTotal"
        @current-change="handleCurrentChange"
    /> -->
<!-- </div> -->
</template>

<script>
import { BlogListWithTag } from '@/api/blog';
import { ref, toRefs, reactive, computed, } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

export default {
name: 'TagSearch', 
setup() {
    const router = useRouter()
    const total = ref(50)
    const PageState = reactive({
        pageSize: 5,
        currentPage: 1,
    })

    const currentTotal = computed(() => {
        return total.value
    })

    const blogList = reactive({
        blogs: [],
    })

    // methods
    function searchBlogWithTag(tagList) {
        if (tagList.length) {
            BlogListWithTag({
                tags: tagList,
                page: PageState.currentPage,
                size: PageState.pageSize,
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
        } else {
            blogList.blogs = []
        }
    }

    function handleCurrentChange(newPage) {
        PageState.currentPage = newPage
        // loading()
    }

    function handleClick(item) {
        router.push({
            name: 'BlogContent', 
            params: { 
                type: item.type_name,
                id: item.id
            }
        })
    }

    return {
        ...toRefs(PageState),
        ...toRefs(blogList),
        currentTotal,
        searchBlogWithTag,
        handleCurrentChange,
        handleClick,
        
    }
}
}
</script>

<style scoped>

div.Tag-search-view {
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


</style>