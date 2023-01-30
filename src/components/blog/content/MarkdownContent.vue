<template>
    <div class="content-view">
        <div class="markdown-content-view" v-html="markHTML" ref="content"/>
    
        <div class="blog-outline">
            <BlogCatalog v-if="content" :element="content"></BlogCatalog>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { marked } from 'marked'
import BlogCatalog from '@/components/blog/content/BlogCatalog';
// import { nextTick } from 'process';
export default {
    name: 'MarkdownContent',
    props: ['source'],
    components: {
        BlogCatalog, 
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
    border-left: solid 1px var(--border-color);
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    position: sticky;
    right: 0;
    height: 100%;
    top: 30%;
}
</style>