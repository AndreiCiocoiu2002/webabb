<template>
    <div v-if="mainPage">
      <div class="navigation">
        <!-- Navigation content -->
      </div>
      <div class="title">
        <h1 class="firstTitle">After School Activities</h1>
      </div>
      <div class="sorting-buttons">
        <!-- Sorting buttons -->
      </div>
      <div class="box" v-for="lesson in lessons" :key="lesson.title">
        <h1>{{ lesson.title }}</h1>
        <p>{{ lesson.location }}</p>
        <!-- Lesson details -->
        <button @click="addToBasket(lesson)" :disabled="lesson.stock === 0">Add to basket</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['lessons'],
    methods: {
      addToBasket(lesson) {
        this.$emit('add-to-cart', lesson);
      }
    }
  };
  </script>
  
  <style scoped>
  .box {
    width: 250px;
    height: 260px;
    border-radius: 20px;
    background-color: #FFFFFF;
    border: 1px solid #222222;
    color: #222222;
    display: inline-block;
    padding: 13px 23px;
    text-align: center;
    margin-bottom: 20px;
    margin-left: 20px;
  }
  
  .box:focus-visible {
    box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
    transition: box-shadow .2s;
  }
  
  </style>