<template>
    <Page-Header></Page-Header>
    <div class="blog-content-view">
        <div class="blog-content">
            <div class="blog-content-info">
                <el-page-header :icon="null" @back="goback">
                    <template #content>
                        <span> 
                            <h2> {{ Title }} </h2> 
                        </span>
                    </template>
                    <div class="blog-content-info-detail">
                        <ul>
                            <li>Create time: {{ AddTime }}</li>
                            <li>Latest update time: {{ UpdateTime }}</li>
                            <li>Click: {{ Click }}</li>
                        </ul>
                    </div>
                </el-page-header>
                <el-divider />
            </div>
            <div class="blog-content-context">
                <Markdown :source="Content" />
            </div>
            <div class="blog-prev-next">
                <div class="blog-prev-next-view blog-prev-next-view-hover" id="prev" @click="goPrev">
                    <span class="prev-next-detail">Previous one</span>
                    <span class="prev-next-title" v-if="prevBlog">
                        <!-- <el-icon><DArrowLeft /></el-icon> -->
                        {{ prevBlog.title }}
                    </span>
                    <span class="prev-next-title" v-else>There's no blog.</span>
                </div>
                <div class="blog-prev-next-view blog-prev-next-view-hover" id="next" @click="goNext">
                    <span class="prev-next-detail">Next one</span>
                    <span class="prev-next-title" v-if="nextBlog">
                        {{ nextBlog.title }}
                        <!-- <el-icon><DArrowRight /></el-icon> -->
                    </span>
                    <span class="prev-next-title" v-else>There's no blog.</span>
                </div>
            </div>
            <div class="blog-comment">
                <Comment></Comment>
            </div>
        </div>
        <div class="blog-outline">
            <BlogOutline></BlogOutline>
        </div>
    </div>    
</template>

<script>
import { BlogContent } from '@/api/blog'
import { onMounted, reactive, toRefs, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Markdown from 'vue3-markdown-it';
import BlogOutline from '@/components/blog/BlogOutline';
import PageHeader from '@/components/page_header/PageHeader';
import Comment from '@/components/blog/Comment';
import store from '@/store';

export default {
    name: "BlogContentView",
    components: {
        Markdown,
        BlogOutline, 
        PageHeader,
        Comment,
    },

    setup() {
        const router = useRouter()
        const route = useRoute()

        const PrevNextBlog = reactive({
            nextBlog: {},
            prevBlog: {}
        })

        const BlogState = reactive({
            Title: '',
            Id: 0,
            Content: '',
            AddTime: '',
            UpdateTime: '',
            Click: 0,
            SeriesBlogTypeId: 0
        })

        // methods 
        const loadingContent = (blogId, typeId) => {
            BlogContent({
                id: blogId,
                type_id: typeId
            }).then(res => {
                if (res.data.code === 0) {
                    let temp = res.data.data['blog']
                    BlogState.Title = temp.title
                    BlogState.Id = temp.id
                    BlogState.Content = temp.content
                    BlogState.AddTime = temp.add_time
                    BlogState.UpdateTime = temp.update_time
                    BlogState.Click = temp.click_hit
                    PrevNextBlog.nextBlog = res.data.data['next']
                    PrevNextBlog.prevBlog = res.data.data['prev']
                } 
            }).catch(e => {
                console.log(e)
            })
        }
        const goback = () => {
            router.push({name: 'HomePage', params: {type: route.params.type}})
        }

        const goPrev = () => {
            router.push({
                name: 'BlogContent', 
                params: {
                    type: route.params.type, 
                    id: PrevNextBlog.prevBlog.id
                }
            })
        }

        const goNext = () => {
            if (PrevNextBlog.nextBlog) {
                router.push({
                    name: 'BlogContent', 
                    params: {
                        type: route.params.type, id: PrevNextBlog.nextBlog.id
                    }
                })
            }
        }
        
        // watch
        watch(route, (to) => {
            let toId = parseInt(to.params.id)
            if (toId != BlogState.Id) {
                BlogState.Id = toId
                loadingContent(BlogState.Id, BlogState.SeriesBlogTypeId)   
            }
        })

        watch([() => PrevNextBlog.prevBlog, () => PrevNextBlog.nextBlog], (newValue) => {
            const watchDom = (watchItem, idx) => {
                let elementId = idx == 0 ? 'prev': 'next'
                let element = document.getElementById(elementId)
                if (!watchItem){
                    element.classList.add('active')
                    element.classList.remove('blog-prev-next-view-hover')
                } else {
                    element.classList.remove('active')
                    element.classList.add('blog-prev-next-view-hover')
                }
            }
            for (let idx in newValue) {
                watchDom(newValue[idx], idx)
            }
        })

        // mounted
        onMounted(() => {
            let blogId = parseInt(route.params.id)
            BlogState.SeriesBlogTypeId = parseInt(store.getters.getBlogTypes[route.params.type])
            loadingContent(blogId, BlogState.SeriesBlogTypeId)
        })

        return {
            ...toRefs(BlogState),
            ...toRefs(PrevNextBlog),
            goback,
            goPrev,
            goNext
        }
    }
}
</script>

<style scoped> 
div.blog-content-view {
    display: flex;
    justify-content: space-between;
    min-height: 100vh;
}

div.blog-content {
    margin: 0 auto;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 1.5rem;
    flex-grow: 1;
}

div.blog-content-info-detail {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

div.blog-prev-next {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
}

div.blog-prev-next-view {
    border: solid 1px rgb(220, 220, 220);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* padding: 0.5rem; */
    width: 12rem;
    height: 5rem;
    margin: 1rem;
}

div.blog-prev-next-view-hover:hover {
    border: solid 1px rgb(156, 156, 156);
    cursor: pointer;
    transition-duration: 200ms;
}

.active {
    background-color: rgba(223, 223, 223, 0.7);
    color: white;
}

.prev-next-detail{
    font-style: oblique;
    font-size: small;
    padding: 0.3rem;
}


.prev-next-title {
    font-weight: bold;
    color: rgb(75, 75, 75);
}

div.blog-comment {
    position: relative;
    bottom: 0;
}

div.blog-outline {
    border-left: solid 1px rgb(211, 211, 211);
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    position: sticky;
    right: 0;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    font-size: small;
    color: rgb(107, 107, 107);
}

</style>