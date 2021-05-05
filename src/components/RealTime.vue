<template>
    <div>
         <b-card style="max-width: 100%; height : 60%;  margin: 0px 25px 0px 25px;  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);" class="mb-2" >
             <real-time-chart :chartData="chartData" :options="chartOptions" :senalRender="reRender"/>
        </b-card>
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
    var hoy = new Date()
    var dd = String(hoy.getDate()).padStart(2, '0')
    var mm = String(hoy.getMonth() + 1).padStart(2, '0')
    var yyyy = hoy.getFullYear()
    return {
      buffer: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      today: dd + '-' + mm + '-' + yyyy,
      data: {
        sensores0: [],
        sensores1: [],
        sensores2: [],
        sensores3: [],
        sensores4: [],
        valmax: [],
        hora: []
      },
      chartData: {},
      labels: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5', 'Max Val'],
      colores: ['red', 'orange', 'yellow', 'green', 'orange', 'blue'],
      selectOptions: [
        { value: 'a', text: 'Tiempo' }
      ],
      selectValue: null,
      isFirstTime: false,
      reRender: true
    }
  },
  beforeMount: function () {
    this.getDataTest().then(() => {
      this.preprocerData()
    })
  },
  methods: {
    getDataTest: async function () {
      const db = firebase.database()
      await db.ref('iot6/' + this.today).limitToLast(10).get()
        .then((snapshot) => {
          snapshot.forEach(data => {
            const temp = data.val()
            this.data.sensores0.push(temp.Sensor1)
            this.data.sensores1.push(temp.Sensor2)
            this.data.sensores2.push(temp.Sensor3)
            this.data.sensores3.push(temp.Sensor4)
            this.data.sensores4.push(temp.Sensor5)
            this.data.valmax.push(temp.ValMax)
            this.data.hora.push(temp.Hora)
          })
        })
        .catch((error) => {
          console.log(error)
        })
      console.log('the basic data was brought')
    },
    preprocerData: async function () {
      this.chartData = {
        labels: this.data.hora,
        datasets: []
      }
      console.log(this.data)
      for (const x of Array(5).keys()) {
        this.chartData.datasets.push({
          label: this.labels[x],
          data: this.data[`sensores${x}`],
          borderColor: this.colores[x]
        })
        console.log(this.data[`sensores${x}`])
      }
      const dbrealtime = firebase.database().ref('iot6/' + this.today).limitToLast(1)
      await dbrealtime.on('value', (snapshot) => {
        console.log('this bullshit was called', snapshot.val())
        snapshot.forEach(data => {
          this.buffer = data.val()
        })
      })
    }
  },
  watch: {
    buffer: function () {
      if (this.isFirstTime) {
        console.log('buffer', this.buffer)
        this.data.hora.push(this.buffer.Hora)
        this.data.sensores0.push(this.buffer.Sensor1)
        this.data.sensores1.push(this.buffer.Sensor2)
        this.data.sensores2.push(this.buffer.Sensor3)
        this.data.sensores3.push(this.buffer.Sensor4)
        this.data.sensores4.push(this.buffer.Sensor5)
        this.data.valmax.push(this.buffer.ValMax)
        this.reRender = !this.reRender
      }
      this.isFirstTime = true
    }
  }
}
</script>
