<template>
  <Bar />
  <div class="vote_box">
    <ul class="title">
      <li>Every one has 1 vote</li>
      <li style="margin-top: 5px">
        Please click "vote" at the bottom to submit your votes
      </li>
    </ul>
    <div class="user_list">
      <div class="user_item" v-for="(user, index) in users" :key="index">
        <img class="crown" src="@/images/crown.png" />
        <img
          class="user_photo"
          :src="`https://infinitymcn.com/citi/citi-vote-next/user/${user.url}.JPG`"
        />
        <p class="user_name">
          <van-checkbox-group
            v-model="checked_user"
            direction="horizontal"
            :max="1"
            :disabled="checkboxDisabled"
          >
            <van-checkbox icon-size="13px" :name="index" shape="square">
              {{ user.name }}
            </van-checkbox>
          </van-checkbox-group>
        </p>
      </div>
    </div>

    <p class="change_btn">
      <tyh-button
        type="primary"
        class="btn_VOTE"
        :disabled="voteLoading"
        @click="onVOTEClick"
      >
        VOTE
      </tyh-button>
    </p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Bar from '@/components/Bar.vue'
import { ref } from 'vue'
import { onChangeVote } from '@/api/user'
import { Dialog, Toast } from 'vant'
import { toDates } from '@/utils/changeTime'
import { useStore } from 'vuex'
import qs from 'qs'
import users from '@/utils/user'
const router = useRouter() // 路由
const store = useStore() // vuex
const checked_user = ref([]) // 选择的编号
const voteLoading = ref(false) // 投票按钮禁用状态
const checkboxDisabled = ref(false) // 是否禁用

// 点击投票按钮
async function onVOTEClick () {
  // 如果用户没有选择投票则提示信息
  if (checked_user.value.length !== 1) {
    Toast('You need complete three votes')
    return
  }
  voteLoading.value = true

  const { data } = await onChangeVote(qs.stringify(
    {
      SOEID: store.state.SOEID, // 投票者的 SOEID
      choice_name_a: users[checked_user.value[0]].name, // 选择投票的用户
      // choice_name_b: users[checked_user.value[1]].name, // 选择投票的用户
      // choice_name_c: users[checked_user.value[2]].name, // 选择投票的用户
      time: toDates(Date.parse(new Date())) // 投票时间
    }
  ))

  // 成功
  if (data.code === 201) {
    voteLoading.value = false
    Dialog.alert({
      message: '点击【完成】按钮查实时投票情況',
      confirmButtonText: '完成',
    }).then(() => {
      router.push('/list')
    })
    return
  }

  // 打印错误信息
  Toast(data.msg)
  voteLoading.value = false
}
</script>

<style scoped>
.vote_box {
  width: 86vw;
  margin: auto;
}
.vote_box .title {
  font-size: 13px;
  color: rgb(0, 81, 157);
  margin-left: 20px;
  margin-top: 20px;
  list-style: disc;
}
.vote_box .user_list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.vote_box .user_list .user_item {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: relative;
  z-index: 40;
}
.vote_box .user_list .user_item .crown {
  position: absolute;
  z-index: 20;
  width: 50%;
  top: -30px;
  right: 0px;
}
.vote_box .user_list .user_item .user_photo {
  width: 52%;
  border: 2px solid rgb(224, 159, 29);
  border-radius: 5px;
}
.vote_box .user_list .user_item .user_name {
  font-size: 9px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.change_btn {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 50px;
}
/* .change_btn {
  width: 85vw;
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 50px;
} */
.change_btn button {
  width: 35%;
  height: 30px;
  font-size: 13px;
}
.change_btn .btn_VOTE {
  background: rgb(3, 142, 209);
  border: none;
  outline: none;
  color: #fff;
  border-radius: 5px;
  margin-top: 25px;
}
.change_btn .btn_MORE {
  background: #fff;
  border: none;
  outline: none;
  border: 1px solid rgb(3, 142, 209);
  color: rgb(3, 142, 209);
  border-radius: 5px;
  margin-top: 25px;
}
</style>

<style>
.van-radio__label {
  color: rgb(0, 81, 157) !important;
}
</style>
