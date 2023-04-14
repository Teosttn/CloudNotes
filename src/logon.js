import { User, Key } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default function useLogin() {
  const router = useRouter()

  const Username = ref('')
  const Password1 = ref('')
  const Password2 = ref('')

  function finishRegister() {
    router.push('/')
  }

  return {
    User,
    Key,
    Username,
    Password1,
    Password2,
    finishRegister,
  }
}
