<template>
    <div>
        <div>
          <b-card style="max-width: 100%; height : 60%;" class="mb-2">
             <chartuu :chartData="dataset" :options="options"> </chartuu>
          </b-card>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/database'
import chartuu from './chart/Line.vue'

export default {
  data () {
    return {
      fecha: '20-04-2021',
      dataset: [],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    data_formater: function (label, S1, S2, S3, s4, s5, max) {
      return {
        labels: label
      }
    }
  },
  components: {
    chartuu
  },
  async mounted () {
    const db = firebase.database()
    const query = db.ref('iot6/' + this.fecha)
    const result = await query.get()
    const data = result.val()
    data.forEach((data))
  }
}

</script>
