<template>
    <Giscus 
        :repo="repo"
        :repoId="repoId"
        :category="category"
        :categoryId="categoryId"
        :mapping="mapping"
        :reactionsEnabled="reactionsEnabled"
        :emitMetadata="emitMetadata"
        :inputPosition="inputPosition"
    >
    </Giscus>
</template>

<script>
import Giscus from '@giscus/vue';
import { giscusConfigs } from '@/config/giscussConfig';
import { reactive, toRefs } from 'vue';

export default {
    name: 'GiscusComment',
    components: {
        Giscus
    },
    setup () {
        const giscusSetting = reactive({
            repo: giscusConfigs.repo,
            repoId: giscusConfigs.repoId,
            category: giscusConfigs.category,
            categoryId: giscusConfigs.categoryId,
            mapping: "pathname",
            reactionsEnabled: "1",
            emitMetadata: "0",
            inputPosition: "top",
        })
        return {
            ...toRefs(giscusSetting)
        }
    }
}
</script>