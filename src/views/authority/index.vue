<template>
  <div class="authority-container">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-user-solid" /> 用户管理</span>
        <UserManager />
      </el-tab-pane>
      <!-- 角色权限管理 -->
      <el-tab-pane label="角色权限管理">
        <span slot="label"><i class="el-icon-s-tools" /> 角色权限管理</span>
        <RoleManager />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>

