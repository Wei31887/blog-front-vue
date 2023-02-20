<template>
    <div class="comment-view">
        <div class="comment-title">
            <h3>Write your comment!</h3>
        </div>
        <div class="create-comment comment-view-style">
            <el-card shadow="never">
                <el-form
                ref="commentRef"
                :model="commentForm"
                :rules="rules">
                    <el-form-item label="Nick name" prop="nickName">
                        <el-input
                            v-model="commentForm.nickName"
                            type="text"
                            placeholder="Nick name"
                        />
                    </el-form-item>
                    <el-form-item label="Comment" prop="comment">
                        <div style="margin: 20px 0" />
                        <el-input
                            v-model="commentForm.comment"
                            :autosize="{ minRows: 2, maxRows: 4 }"
                            type="textarea"
                            placeholder="Please input your comment"
                        />
                    </el-form-item>
                    <el-button type="primary" @click="createComment">Submit</el-button>
                </el-form>
            </el-card>
        </div>
        <div class="comment-main comment-view-style">
            <el-timeline>
                <el-timeline-item
                    v-for="(item, index) in comments" 
                    :key="index"
                    :timestamp="item.add_time"
                    type="primary"
                    :icon="MoreFilled"
                    placement="top"
                >
                <el-card shadow="never">
                    <template #header>
                        <div class="comment-user">
                            <el-avatar :icon="UserFilled" /> 
                            <span class="user-nick-name">
                                {{item.nick_name}}
                            </span>
                        </div>
                    </template>
                    <div class="comment-context">
                        {{item.content}}
                    </div>
                </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
import { BlogComment } from '@/api/blog'
import { UserFilled } from '@element-plus/icons-vue'
import { toRefs, reactive, ref, inject } from 'vue';
import { MoreFilled } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';

export default {
    name: 'VueComment',
    props: ['comments'],
    setup () {
        // inject
        const reloading = inject('loadingContent')
        const route = useRoute()
        const commentRef = ref()
        const rules = {
            nickName: [
                { required: true, message: 'Please input', trigger: 'blur' },
            ],
            comment: [
                { required: true, message: 'Please input', trigger: 'blur' },
            ]
        }
        const state = reactive({
            commentForm: {
                nickName: '',
                comment: '',
            }
        })
        
        // methods
        const createComment = () => {
            BlogComment({
                blog_id: parseInt(route.params.id),
                nick_name: state.commentForm.nickName,
                content: state.commentForm.comment,
            }).then(res => {
                if (res.status == 200) {
                    ElNotification({
                        title: 'Success',
                        type: 'success',
                        message: 'Successfully commented!' 
                    })
                    state.commentForm.nickName = ''
                    state.commentForm.comment = ''
                    
                    reloading(parseInt(route.params.id))
                } else {
                    ElNotification({
                        title: 'Error',
                        type: 'error',
                        message: res.data.msg
                    })
                }
            }).catch( err => {
                console.log(err)
            })
        }
        return {
            ...toRefs(state),
            rules,
            commentRef,
            createComment,
            UserFilled,
            MoreFilled
        }
    }
}
</script>

<style scoped>
div.comment-view{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    padding: 1rem;
}

div.comment-user {
    display: flex;
    /* justify-content: start; */
    align-items: center;
}

div.comment-view-style {
    padding: 0.5rem;
}

.user-nick-name {
    padding-left: 1rem;
}

</style>