<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Register Form</h3>
      </div>

      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="account"
          v-model="loginForm.account"
          placeholder="Account"
          name="account"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div class="captcha-wrap">
        <span class="captcha" @click="changeCaptcha" v-html="captchaContent" />
        <span class="input-wrap"><span class="text">验证码：</span><input v-model="captchaText" type="text" class="captcha-input"></span>
      </div>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">注册</el-button>

      <div class="tips">
        <span style="margin-right:20px;" />
        <span />
      </div>

    </el-form>
  </div>
</template>

<style lang="scss">
$bgq:#283443;
$light_grayq:#fff;
$cursorq: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursorq)) {
  .login-container .el-input input {
    color: $cursorq;
  }
}
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_grayq;
      height: 47px;
      caret-color: $cursorq;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bgq inset !important;
        -webkit-text-fill-color: $cursorq !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
