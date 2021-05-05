import { Line, mixins } from 'vue-chartjs'
import 'chartjs-plugin-streaming'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options', 'chartData', 'senalRender'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    senalRender: function () {
      this.renderChart(this.chartData, this.options)
    }
  }
}
