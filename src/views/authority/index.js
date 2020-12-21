import UserManager from './component/UserManager.vue'
import RoleManager from './component/RoleManager.vue'
import { getRoleList } from '@/api/auth'
export default {
  data() {
    return {
      rolesList: []
    }
  },
  components: {
    UserManager,
    RoleManager
  },
  mounted() {
    this.initRolesData()
  },
  methods: {
    async handleClick(tab, event) {
      if (tab.index === '0') {
        this.initRolesData()
      }
    },
    async initRolesData() {
      const result = await getRoleList()
      this.rolesList = result.data
    }
  }
}
