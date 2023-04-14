import { User,Key } from '@element-plus/icons-vue'
import {ref} from 'vue'
import { useRouter} from 'vue-router'

export default function useLogin() {
  const router = useRouter()
  const Username = ref('')
  const Password = ref('')
        
  function SubmitAccount() {
    router.push('/Main')
  }
  
  return {
    User,
    Key,
    Username,
    Password,
    SubmitAccount
  }
}
