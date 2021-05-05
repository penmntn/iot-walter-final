<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: { type: Object },
    options: { type: Object }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    chartData: function () {
      this.renderChart(this.chartData, this.options)
    }
  }
}
</script>
