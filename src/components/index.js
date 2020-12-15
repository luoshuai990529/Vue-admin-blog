// 该文件负责所有的公共的组件的全局注册   Vue.use
// import PageTools from './PageTools'
// import UploadExcel from './UploadExcel'
// import ImageUpload from './ImageUpload'
// import ScreenFull from './ScreenFull'
// import ThemePicker from './ThemePicker'
// import LangSelect from './LangSelect'
import TagsView from './TagsView'

export default {
  install(Vue) {
    //  注册全局的通用栏组件对象
    // Vue.component('PageTools', PageTools)
    // Vue.component('UploadExcel', UploadExcel) // 注册一个excel导入的组件
    // Vue.component('ImageUpload', ImageUpload) // 注册图片上传组件
    // Vue.component('ScreenFull', ScreenFull) // 注册全屏组件
    // Vue.component('ThemePicker', ThemePicker) // 注册全屏组件
    // Vue.component('LangSelect', LangSelect) // 注册多语言组件
    Vue.component('TagsView', TagsView) // 注册多页签组件
  }
}
