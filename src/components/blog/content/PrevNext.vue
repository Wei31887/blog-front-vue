<template>
    <div class="prev-next-view">
        <div class="blog-prev-next blog-prev-next-left blog-prev-next-hover" id="prev" @click="goPrev">
            <div>
                <span class="prev-next-detail">Previous one</span>
            </div>
            <div class="prev-next-main">
                <div>
                    <el-icon><DArrowLeft /></el-icon>
                </div>
                <div>
                    <span class="prev-next-title" v-if="props.prevnext.prevBlog">
                        <h3>
                        {{ props.prevnext.prevBlog.title }}
                        </h3>
                    </span>
                    <span class="prev-next-title" v-else>There's no blog.</span>
                </div>
            </div>
        </div>
        <div class="blog-prev-next blog-prev-next-right blog-prev-next-hover" id="next" @click="goNext">
            <div>
                
                <span class="prev-next-detail">Next one</span>
            </div>
            <div class="prev-next-main">
                <div>
                    <span class="prev-next-title" v-if="props.prevnext.nextBlog">
                        <h3>{{ props.prevnext.nextBlog.title }}
                        </h3> 
                    </span>
                    <span class="prev-next-title" v-else>
                        <h3>There's no blog.</h3>
                    </span>
                </div>
                <div>
                    <el-icon><DArrowRight /></el-icon>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import store from '@/store'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
export default {
    name: 'PrevNext',
    props: ['prevnext'],
    setup(props) {
        const router = useRouter()

        const goPrev = () => {
            if (props.prevnext.prevBlog) {
                router.push({
                    name: 'BlogContent', 
                    params: {
                        type: Object.keys(store.getters.getBlogTypes).find(key => store.getters.getBlogTypes[key] === props.prevnext.prevBlog.typeId), 
                        id: props.prevnext.prevBlog.id
                    }
                })
            }
        }
        const goNext = () => {
            if (props.prevnext.nextBlog) {
                router.push({
                    name: 'BlogContent', 
                    params: {
                        type: Object.keys(store.getters.getBlogTypes).find(key => store.getters.getBlogTypes[key] === props.prevnext.nextBlog.typeId), 
                        id: props.prevnext.nextBlog.id
                    }
                })
            }
        }
        watch([() => props.prevnext.prevBlog, () => props.prevnext.nextBlog], (newValue) => {
            const watchDom = (watchItem, idx) => {
                let elementId = idx == 0 ? 'prev': 'next'
                let element = document.getElementById(elementId)
                if (!watchItem){
                    element.classList.add('active')
                    element.classList.remove('blog-prev-next-hover')
                } else {
                    element.classList.remove('active')
                    element.classList.add('blog-prev-next-hover')
                }
            }
            for (let idx in newValue) {
                watchDom(newValue[idx], idx)
            }
        })
        return {
            props,
            goPrev,
            goNext
        }
    }
}
</script>

<style scoped>
div.prev-next-view {
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    width: 70%;
}

div.blog-prev-next {
    border: solid 1px rgb(220, 220, 220);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    padding: 0.5rem;
    width: 50%;
    margin: 0.5rem;
}

div.prev-next-main {
    display: flex;
    justify-content: center;
    align-items: baseline;
}

div.blog-prev-next-hover:hover {
    border: solid 1px rgb(156, 156, 156);
    background-color: rgb(178, 207, 231);
    cursor: pointer;
    transition-duration: 200ms;
}

.active {
    background-color: rgba(223, 223, 223, 0.7);
    background-color: rgb(178, 207, 231);
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
</style>