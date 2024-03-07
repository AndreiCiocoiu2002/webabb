<template>
    <div class="cart">
      <h2>Cart</h2>
      <ul>
        <li v-for="(item, index) in shoppingCart" :key="index">
          <div>
            <i :class="item.icon"></i>
          </div>
          <div>
            <h3>{{ item.title }}</h3>
            <h4>{{ item.price }} </h4>
          </div>
          <div>
            <i class="fa-solid fa-xmark" @click="$emit('remove-from-cart', index)"></i>
          </div>
        </li>
      </ul>
      <div>
        <input type="text" placeholder="Name" v-model="customerName" @input="$emit('validate-input')">
        <input type="text" placeholder="Phone number" v-model="customerPhone" @input="$emit('validate-input')">
      </div>
      <div class="checkClose">
        <button @click="$emit('checkout')" :disabled="!isCheckoutEnabled">Checkout</button>
        <button @click="$emit('close-cart')">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['shoppingCart', 'customerName', 'customerPhone', 'isCheckoutEnabled']
  };
  </script>
  
  <style scoped>
.cart {
  float: left;
  height: 100vh;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  padding: 20px;
  flex-direction: column;
  position: absolute;
}

.cart h2 {
  color: #FFFFFF;
  text-transform: uppercase;
}

.cart ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 300px;
  background-color: rgba(34, 31, 31, 0.787);
  overflow-y: auto;
}

.cart li {
  list-style: none;
  width: 100%;
  color: #F7F7F7;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.checkClose button {
  width: 50%;
  height: 30px;
}

/* Add other styles as needed */
</style>