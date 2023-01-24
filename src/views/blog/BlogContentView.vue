<template>
    <Page-Header></Page-Header>
    <div class="blog-content-view">
        <div class="blog-content">
            <div class="blog-content-info">
                <el-page-header :icon="null" @back="goback">
                    <template #content>
                        <span> 
                            <h2> {{ blog.title }} </h2> 
                        </span>
                    </template>
                    <div>
                    Your additional content can be added with default slot, You may put as
                    many content as you want here.
                    </div>
                </el-page-header>
            </div>
            <Markdown :source="blog.content" />
            <div class="blog-comment">
                
            </div>
        </div>
        <div class="blog-outline">
            <BlogOutline></BlogOutline>
        </div>
    </div>    
</template>

<script>
import { BlogContent } from '@/api/blog'
import { onMounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Markdown from 'vue3-markdown-it';
import BlogOutline from '@/components/blog/BlogOutline';
import PageHeader from '@/components/page_header/PageHeader';

export default {
    name: "BlogContentView",
    components: {
        Markdown,
        BlogOutline, 
        PageHeader,
    },
    setup() {
        const router = useRouter()
        const route = useRoute()
        const BlogState = reactive({
            requestMap: {},
            blog: {},
        })

        // methods 
        const loadingContent = (blogId) => {
            BlogContent({id: blogId}).then(res => {
                if (res.data.code === 0) {
                    BlogState.requestMap = res.data.data
                    BlogState.blog = BlogState.requestMap['blog']
                } 
            }).catch(e => {
                console.log(e)
            })
        }
        const goback = () => {
            router.push({name: 'HomePage', params: {type: route.params.type}})
        }

        // mounted
        onMounted(() => {
            let blogId = parseInt(route.params.id)
            loadingContent(blogId)
        })

        return {
            ...toRefs(BlogState),
            goback
        }
    }
}
</script>

<style> 
div.blog-content-view {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    min-height: 100vh;
}

div.blog-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

div.blog-outline {
    border-left: solid 1px rgb(211, 211, 211);
    margin: 1rem;
    padding: 1rem;
    position: sticky;
    right: 0;
}

</style>