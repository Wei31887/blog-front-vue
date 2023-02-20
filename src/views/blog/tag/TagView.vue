<template>
    <div class="tag-view">
        <h2>#Tags</h2>
        <div class="tag-list-container">
            
            <div 
            class="tag-card-view"
            v-for="(item, index) in AllTags"
            :key="index"
            :ref="setTagRef"
            @click="handleClick(index, item.id)"
            >
                <div class="tag-title">{{ item.tag_name }}</div>
                <div class="tag-info">{{ '('+item.count+')' }}</div>
            </div>
        </div>
        <div class="tag-search-list-container">
            <h2>Search results</h2>
            <TagSearch ref="TagSearchRef"></TagSearch>
        </div>
    </div>
</template>

<script>
import TagSearch from '@/components/blog/tag/TagSearchView'
import { BlogTagList } from '@/api/blog';
import { ElNotification } from 'element-plus';
import { onMounted, ref } from 'vue';

export default {
    name: 'TagView',
    components: {
        TagSearch,
    },
    setup() {
        const AllTags = ref()
        const TagSearchRef = ref()
        const tagsRef = []
        const setTagRef = el => {
            if (el) {
                tagsRef.push(el)
            }
        }
        const tempTags = []
        const QueryTags = []

        // methods
        function loadingTag() {
            BlogTagList().then(res => {
                if (res.status == 200) {
                    AllTags.value = res.data.data
                } else {
                    ElNotification({
                        title: 'Error',
                        type: 'error',
                        message: "Can't find tag list. " + res.data.msg
                    })
                }
            }).catch( e => { console.log(e) })
        }
        function handleClick(index, id) {
            if (!tempTags.includes(id)) {
                tempTags.push(id)
                QueryTags.push({"tag_id": id})
                tagsRef[index].classList.add("active")
            } else {
                tempTags.splice(tempTags.indexOf(id), 1)
                QueryTags.splice(tempTags.indexOf(id), 1)
                tagsRef[index].classList.remove("active")
            }
            TagSearchRef.value.searchBlogWithTag(QueryTags)

        }

        onMounted(() => {
            loadingTag()
        })

        return {
            setTagRef,
            TagSearchRef,
            AllTags,
            handleClick,
        }
    }
}
</script>

<style scoped> 
div.tag-view {
    display: flex;
    flex-direction: column;
    align-items: stretch;

}

div.tag-list-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

div.tag-card-view {
    border: 1px solid var(--border-color);
    /* background-color: white; */
    border-radius: 6px;
    display: flex;
    justify-content: space-around;
    margin: 0.5rem;
    padding: 0.5rem;
}

div.tag-card-view:hover {
    background-color: var(--hover-color);
    cursor: pointer;
}

.active {
    background-color: var(--hover-color);
}

</style>