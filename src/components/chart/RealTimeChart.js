import { Line, mixins } from 'vue-chartjs'
import 'chartjs-plugin-streaming'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options', 'chartData'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    chartData: {
      handler () {
        this.renderChart(this.chartData, this.options)
      },
      deep: true
    }
  }
}
