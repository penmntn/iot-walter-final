<template>
  <div class="home">
    <line-val/>
    <real-time/>
  </div>
</template>

<script>
import RealTime from '../components/RealTime.vue'
import lineVal from '../components/chart1.vue'
export default {
  name: 'Home',
  components: {
    RealTime,
    lineVal
  }
}
</script>
