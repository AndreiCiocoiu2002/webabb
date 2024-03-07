<template>
  <div id="app">
    <!-- Cart toggle button -->
    <button @click="toggleCart">
      Cart ({{ shoppingCart.length }})
    </button>

    <!-- Dynamic component: shows LessonComponent or CheckoutComponent based on the cart state -->
    <component :is="cart ? 'CheckoutComponent' : 'LessonComponent'"
               :lessons="lessons"
               :shopping-cart="shoppingCart"
               :customer-name="customerName"
               :customer-phone="customerPhone"
               :is-checkout-enabled="isCheckoutEnabled"
               @add-to-cart="addToBasket"
               @remove-from-cart="removeFromCart"
               @validate-input="validateInput"
               @checkout="checkout"
               @close-cart="toggleCart" />
  </div>
</template>
  
  <script>
  import LessonComponent from './LessonComponent.vue';
  import CheckoutComponent from './CheckoutComponent.vue';
  import { fetchAllLessons, createOrder, updateLessonSpace } from './api.js';
  
  export default {
    components: {
      LessonComponent,
      CheckoutComponent
    },
    data() {
      return {
        lessons: [],
        cart: false,
        shoppingCart: [],
        customerName: '',
        customerPhone: '',
        isCheckoutEnabled: false,
      };
    },
    methods: {
      toggleCart() {
        this.cart = !this.cart;
      },
      addToBasket(lesson) {
        if (lesson.stock > 0) {
          updateLessonSpace(lesson._id, 1).then(response => {
            if (response.ok) {
              lesson.stock--;
              this.shoppingCart.push({...lesson});
            } else {
              console.error('Failed to update lesson stock on the server.');
              alert('Unable to add lesson to the cart.');
            }
          }).catch(error => {
            console.error('Error updating lesson stock:', error);
            alert('An error occurred while adding the lesson to the cart.');
          });
        }
      },
      removeFromCart(index) {
        const item = this.shoppingCart[index];
        updateLessonSpace(item._id, -1).then(response => {
          if (response.ok) {
            item.stock++;
            this.shoppingCart.splice(index, 1);
          } else {
            console.error('Failed to update lesson stock on the server.');
            alert('Unable to remove lesson from the cart.');
          }
        }).catch(error => {
          console.error('Error updating lesson stock:', error);
          alert('An error occurred while removing the lesson from the cart.');
        });
      },
      validateInput() {
        const namePattern = /^[a-zA-Z\s]+$/;
        const phonePattern = /^\d+$/;
        const isNameValid = namePattern.test(this.customerName.trim());
        const isPhoneValid = phonePattern.test(this.customerPhone.trim());
        this.isCheckoutEnabled = isNameValid && isPhoneValid;
      },
      checkout() {
        if (this.isCheckoutEnabled) {
          const orderData = {
            name: this.customerName,
            phoneNumber: this.customerPhone,
            lessonIDs: this.shoppingCart.map(item => item._id),
            numberOfSpace: this.shoppingCart.length
          };
          createOrder(orderData).then(() => {
            alert('Order placed successfully!');
            this.shoppingCart = [];
          }).catch(error => {
            console.error('Error placing order:', error);
            alert('An error occurred while placing the order.');
          });
        } else {
          alert('Please provide a valid Name and Phone number before checking out.');
        }
      }
    },
    mounted() {
      fetchAllLessons().then(data => {
        this.lessons = data;
      });
    }
  };
  </script>
  
  <style scoped>
  #app {
    width: 100vw;
    height: 100vh;
  }
  
  .navigation {
    height: 35px;
    width: 100%;
    margin-top: 20px;
    position: relative;
    z-index: 2;
  }
  
  .title {
    text-align: center;
    color: #FFFFFF;
    font-size: 35px;
  }
  
  /* Additional styles specific to ParentComponent layout */
  </style>