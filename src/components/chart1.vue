<template>
    <div>
      <div>
        <b-nav  style="margin: 0px 25px 15px 25px;  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
          <b-nav-item ><b-form-datepicker id="example-datepicker" v-model="fechaTemp" class="mb-2" :date-format-options="{ day: '2-digit', month: '2-digit', year: 'numeric'}" locale="es" ></b-form-datepicker></b-nav-item>
        </b-nav>
      </div>
        <div>
          <b-card style="max-width: 100%; height : 60%;  margin: 0px 25px 0px 25px;  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);" class="mb-2" v-if="flag">
             <chartuu :chartData="datos_conjunto" :options="options"> </chartuu>
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
      fechaTemp: '',
      intervalo: 1,
      flag: false,
      datos_conjunto: {},
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  components: {
    chartuu
  },
  computed: {
    fecha () {
      if (this.fechaTemp) {
        const temporal = new Date(this.fechaTemp)
        const day = (temporal.getDate() + 1) < 10 ? '0' + (temporal.getDate() + 1) : temporal.getDate() + 1
        let month = (temporal.getMonth() + 1)
        month = month < 10 ? '0' + month : month
        return day + '-' + month + '-' + temporal.getFullYear()
      } else {
        const temporal = new Date(Date.now())
        const day = temporal.getDate() < 10 ? '0' + temporal.getDate() : temporal.getDate()
        let month = (temporal.getMonth() + 1)
        month = month < 10 ? '0' + month : month
        return day + '-' + month + '-' + temporal.getFullYear()
      }
    }
  },
  watch: {
    fecha: async function () {
      this.flag = false
      const db = firebase.database()
      const query = db.ref('iot6/' + this.fecha)
      const result = await query.get()
      const data = result.val()
      const hora = []
      const sensor1 = []
      const sensor2 = []
      const sensor3 = []
      const sensor4 = []
      const sensor5 = []
      const valMAX = []
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(data)) {
        hora.push(value.Hora)
        sensor1.push(value.Sensor1)
        sensor2.push(value.Sensor2)
        sensor3.push(value.Sensor3)
        sensor4.push(value.Sensor4)
        sensor5.push(value.Sensor5)
        valMAX.push(value.ValMax)
      }
      const variable = hora.length > 25 ? hora.length : 25
      this.intervalo = parseInt(variable / 25)
      this.datos_conjunto = this.format(this.reduce(sensor1, this.intervalo), this.reduce(sensor2, this.intervalo), this.reduce(sensor3, this.intervalo), this.reduce(sensor4, this.intervalo), this.reduce(sensor5, this.intervalo), this.reduce(valMAX, this.intervalo), this.reduceLabels(hora, this.intervalo))
      this.flag = true
    }
  },
  methods: {
    format: function (s1, s2, s3, s4, s5, valmax, labels) {
      return {
        labels: labels,
        datasets: [
          {
            label: 'sensor1',
            borderColor: 'red',
            data: s1

          },
          {
            label: 'sensor2',
            borderColor: 'blue',
            data: s2

          },
          {
            label: 'sensor3',
            borderColor: 'green',
            data: s3

          },

          {
            label: 'sensor4',
            borderColor: 'orange',
            data: s4

          },
          {
            label: 'sensor5',
            borderColor: 'black',
            data: s5

          },
          {
            label: 'Mayor',
            borderColor: 'purple',
            data: valmax
          }
        ]
      }
    },
    reduce: function (array, cont) {
      const result = []
      let contador = 1
      let acomulador = 0
      for (let i = 0; i < array.length; i++) {
        if (cont === 1) {
          result.push(array[i])
        } else {
          if (contador === cont) {
            const pushable = acomulador / cont
            result.push(pushable)
            contador = 1
            acomulador = 0
          } else {
            acomulador = acomulador + array[i]
            contador++
          }
        }
      }
      return result
    },
    reduceLabels: function (array, cont) {
      const result = []
      let contador = 1
      let acomulador = 0
      for (let i = 0; i < array.length; i++) {
        if (contador === cont) {
          const index = parseInt(cont / 2)
          result.push(array[i - index].slice(0, -3))
          contador = 1
          acomulador = 0
        } else {
          acomulador = acomulador + array[i]
          contador++
        }
      }
      return result
    }
  },
  async mounted () {
    const db = firebase.database()
    const query = db.ref('iot6/' + this.fecha)
    const result = await query.get()
    const data = result.val()
    const hora = []
    const sensor1 = []
    const sensor2 = []
    const sensor3 = []
    const sensor4 = []
    const sensor5 = []
    const valMAX = []
    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of Object.entries(data)) {
      hora.push(value.Hora)
      sensor1.push(value.Sensor1)
      sensor2.push(value.Sensor2)
      sensor3.push(value.Sensor3)
      sensor4.push(value.Sensor4)
      sensor5.push(value.Sensor5)
      valMAX.push(value.ValMax)
    }
    const variable = hora.length > 25 ? hora.length : 25
    this.intervalo = parseInt(variable / 25)
    this.datos_conjunto = this.format(this.reduce(sensor1, this.intervalo), this.reduce(sensor2, this.intervalo), this.reduce(sensor3, this.intervalo), this.reduce(sensor4, this.intervalo), this.reduce(sensor5, this.intervalo), this.reduce(valMAX, this.intervalo), this.reduceLabels(hora, this.intervalo))
    this.flag = true
  }
}
</script>
