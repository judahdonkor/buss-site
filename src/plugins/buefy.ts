import moment from 'moment'
import Vue from 'vue'
import Buefy from 'buefy'

Vue.use(Buefy, {
    css: false,
    materialDesignIcons: false,
    defaultIconPack: 'fas',
    defaultDateFormatter: (val: Date) => moment(val).format('ll')
})