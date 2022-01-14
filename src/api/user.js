import require from '@/utils/require'

/**
 * 登录
 * @param {*} data 
 * @returns 
 */
export const onLogin = data => {
  return require({
    method: 'POST',
    url: '/index/Votethird/onLogin',
    data
  })
}

/**
 * 投票
 * @param {*} data 
 * @returns 
 */
export const onChangeVote = data => {
  return require({
    method: 'POST',
    url: '/index/Votethird/onVote',
    data
  })
}

/**
 * 获取投票结果
 * @returns 
 */
export const getVoteResults = () => {
  return require({
    method: 'GET',
    url: '/index/Votethird/getVoteRes'
  })
}