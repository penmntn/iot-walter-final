<template>
    <div>
        <chartuu :Sensor1="Sensor1" :horas="Hora" :Sensor2="Sensor2" :Sensor3="Sensor3" :Sensor4="Sensor4" :Sensor5="Sensor5" :valMax="valMax" > </chartuu>
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
      Sensor1: [],
      Sensor2: [],
      Sensor3: [],
      Sensor4: [],
      Sensor5: [],
      valMax: [],
      Hora: []
    }
  },
  components: {
    chartuu
  },
  methods: {
    getDataTest: function () {
      const db = firebase.database()
      db.ref('iot6/' + this.fecha).get()
        .then((snapshot) => {
          snapshot.forEach(data => {
            console.log(data.val())
            this.Sensor1.push(data.val().Sensor1)
            this.Sensor2.push(data.val().Sensor2)
            this.Sensor3.push(data.val().Sensor3)
            this.Sensor4.push(data.val().Sensor4)
            this.Sensor5.push(data.val().Sensor5)
            this.valMax.push(data.val().valMax)
            this.Hora.push(data.val().Hora)
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    mounted () {
      this.getDataTest()
    }
  }
}

</script>
