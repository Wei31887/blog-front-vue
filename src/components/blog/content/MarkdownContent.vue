<template>
    <div class="content-view">
        <div class="markdown-content-view" v-html="markHTML" ref="markedContent"/>
    </div>
</template>

<script>
import { ref, computed, } from 'vue'
import { marked } from 'marked'

// import { nextTick } from 'process';
export default {
    name: 'MarkdownContent',
    props: ['source'],
    components: {
    },
    setup(props) {
        const markedContent = ref()
        const markHTML = computed(() => {
            return marked(props.source)
        })

        return {
            markHTML,
            markedContent
        }
    } 
}
</script>

<style scoped>
div.content-view{
    position: relative;
    display: flex;
    width: 100%;   
}

div.markdown-content-view{
    position: relative;
    min-width: 80%;
    font-size: medium;
}
</style>