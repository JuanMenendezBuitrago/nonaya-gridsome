<template>
  <div>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum odit fugit assumenda rem dolores inventore iste reprehenderit maxime! Iusto.</p>
    <div v-for="(item, i) in list" :key="i">{{ item.name }}
      <div v-for="(number, j) in item.numbers" :key="j"> {{ number }} </div>
    </div>
    <a @click="sortIt" href="">change</a>
  </div>
</template>

<script>
export default {

  metaInfo: {
    title: 'About us'
  },
  data() {
    return{

      sort: 1,
      list:[
      {
        name: "one",
        numbers: [1,2,3,0]
      },
      {
        name: "ana",
        numbers: [4,5,6]
      }
    ]
  }
},

  methods: {
    sortIt() {
      this.list.sort((a,b) =>  a.name.localeCompare(b.name) * this.sort)
      this.sort *= -1
    }
  }
}
</script>
