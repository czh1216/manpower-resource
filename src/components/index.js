import PageTools from './PageTools'
import UploadExcel from './UploadExcel'

const components = [PageTools, UploadExcel]
export default {
    install(Vue){
        // Vue.component('PageTools', PageTools)
        components.forEach((component) => {
            Vue.component(component.name, component)
        })
    }
}