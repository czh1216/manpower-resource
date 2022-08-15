import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import Uploadlmg from './Uploadlmg'

const components = [PageTools, UploadExcel, Uploadlmg]
export default {
    install(Vue){
        // Vue.component('PageTools', PageTools)
        components.forEach((component) => {
            Vue.component(component.name, component)
        })
    }
}