import toast from 'wscn-toast'

export default async function (e) {
  if (e.code && e.message) {
    toast(e.message, 'error')
  } else {
    toast('发生了一点错误，请稍后再试 .·´¯`(>▂<)´¯`·.', 'error')
  }
}
