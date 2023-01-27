<template>
    <div class="content-view">
        <div class="markdown-content-view" v-html="markHTML" ref="content"/>
    
        <div class="blog-outline">
            <BlogOutline v-if="content" :element="content"></BlogOutline>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { marked } from 'marked'
import BlogOutline from '@/components/blog/BlogOutline';
// import { nextTick } from 'process';
export default {
    name: 'MarkdownContent',
    props: ['source'],
    components: {
        BlogOutline, 
    },
    setup(props) {
        const content = ref()
        const markHTML = computed(() => {
            return marked(props.source)
        })
 
        return {
            markHTML,
            content
        }
    } 
}
</script>

<style scoped>

div.markdown-content-view{
    position: relative;
    min-width: 85%;
}
div.content-view{
    position: relative;
    display: flex;
    
}

div.blog-outline {
    border-left: solid 1px rgb(211, 211, 211);
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    position: sticky;
    right: 0;
    /* top: 0; */
}
</style>