<template>
    <div>
        <real-time-chart :chart-data="chartData" />
    </div>
</template>

<script>
import RealTimeChart from '../components/chart/RealTimeChart.js'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'

export default {
  components: {
    RealTimeChart
  },
  data () {
    return {
      data: {
        sensores: new Array(6).fill([]), // el sensor 5 es el valor maximo
        hora: []
      },
      chartData: {},
      labels: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5', 'Max Val'],
      colores: ['red', 'orange', 'yellow', 'green', 'orange', 'blue']
    }
  },
  beforeMount: function () {
    console.log(this.data)
    this.getDataTest().then(() => {
      this.preprocerData()
    })
  },
  methods: {
    getDataTest: async function () {
      const db = await firebase.database()
      await db.ref('iot6/').get()
        .then((snapshot) => {
          snapshot.forEach(data => {
            console.log(data.val())
            const temp = data.val()
            for (const item in temp) {
              this.data.sensores[0].push(temp[item].Sensor1)
              this.data.sensores[1].push(temp[item].Sensor2)
              this.data.sensores[2].push(temp[item].Sensor3)
              this.data.sensores[3].push(temp[item].Sensor4)
              this.data.sensores[4].push(temp[item].Sensor5)
              this.data.sensores[5].push(temp[item].ValMax)
              this.data.hora.push(temp[item].Hora)
            }
          })
        })
        .catch((error) => {
          console.log(error)
        })
      console.log('se ejecuto')
      console.log(this.data)
    },
    preprocerData: function () {
      this.chartData = {
        labels: this.data.hora,
        datasets: []
      }
      for (const ind in this.data.sensores) {
        this.chartData.datasets.push({
          label: this.labels[ind],
          data: this.data.sensores[ind],
          borderColor: this.colores[ind]
        })
      }
      console.log(this.chartData)
    }
  }
}
</script>
