<template>
  <div class="shopping-cart-vue">
    <!-- Cart Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="font-weight-bold mb-0">
        <i class="bi bi-cart3 me-2"></i>
        Shopping Cart (Vue Island)
      </h3>
      <button 
        v-if="cartItems.length > 0"
        class="btn btn-outline-danger btn-sm"
        @click="clearCart"
      >
        <i class="bi bi-trash me-1"></i>
        Clear Cart
      </button>
    </div>

    <!-- Empty Cart State -->
    <div v-if="cartItems.length === 0" class="text-center py-5">
      <div class="mb-4">
        <i class="bi bi-cart-x text-muted" style="font-size: 4rem;"></i>
      </div>
      <h4 class="text-muted mb-3">Your cart is empty</h4>
      <p class="text-muted mb-4">Add some products to get started!</p>
      <a href="/products" class="btn btn-primary">
        <i class="bi bi-shop me-2"></i>
        Continue Shopping
      </a>
    </div>

    <!-- Cart Items -->
    <div v-else>
      <div class="row">
        <!-- Cart Items List -->
        <div class="col-lg-8">
          <div class="mb-4">
            <h5 class="mb-3">Cart Items ({{ cartItems.length }})</h5>
            <div 
              v-for="(item, index) in cartItems" 
              :key="item.id"
              class="cart-item border rounded p-3 mb-3"
            >
              <div class="row align-items-center">
                <!-- Product Image -->
                <div class="col-md-2 col-3">
                  <img 
                    :src="item.image" 
                    :alt="item.name"
                    class="img-fluid rounded"
                    style="max-height: 80px; object-fit: cover;"
                  />
                </div>
                
                <!-- Product Details -->
                <div class="col-md-4 col-9">
                  <h6 class="mb-1 font-weight-bold">{{ item.name }}</h6>
                  <p class="text-muted small mb-1">{{ item.category }}</p>
                  <div class="text-warning small">
                    <span v-for="star in 5" :key="star">
                      {{ star <= item.rating ? '★' : '☆' }}
                    </span>
                    <span class="text-muted ms-1">({{ item.rating }})</span>
                  </div>
                </div>
                
                <!-- Quantity Controls -->
                <div class="col-md-3 col-6 mt-2 mt-md-0">
                  <div class="d-flex align-items-center">
                    <button 
                      class="btn btn-outline-secondary btn-sm"
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      :disabled="item.quantity <= 1"
                    >
                      <i class="bi bi-dash"></i>
                    </button>
                    <span class="mx-3 font-weight-bold">{{ item.quantity }}</span>
                    <button 
                      class="btn btn-outline-secondary btn-sm"
                      @click="updateQuantity(item.id, item.quantity + 1)"
                    >
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
                
                <!-- Price and Remove -->
                <div class="col-md-2 col-6 mt-2 mt-md-0 text-end">
                  <div class="font-weight-bold text-primary mb-2">
                    ${{ (parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2) }}
                  </div>
                  <button 
                    class="btn btn-outline-danger btn-sm"
                    @click="removeFromCart(item.id)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="col-lg-4">
          <div class="card shadow-sm border-0 position-sticky" style="top: 2rem;">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">
                <i class="bi bi-receipt me-2"></i>
                Order Summary
              </h5>
            </div>
            <div class="card-body">
              <!-- Summary Details -->
              <div class="mb-3">
                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal ({{ totalItems }} items):</span>
                  <span class="font-weight-bold">${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span class="font-weight-bold">{{ shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2) }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span class="font-weight-bold">${{ tax.toFixed(2) }}</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between mb-3">
                  <span class="h5 font-weight-bold">Total:</span>
                  <span class="h5 font-weight-bold text-primary">${{ total.toFixed(2) }}</span>
                </div>
              </div>

              <!-- Promo Code -->
              <div class="mb-3">
                <div class="input-group">
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Promo code"
                    v-model="promoCode"
                  />
                  <button class="btn btn-outline-secondary" @click="applyPromoCode">
                    Apply
                  </button>
                </div>
                <small v-if="promoMessage" :class="promoMessageClass">
                  {{ promoMessage }}
                </small>
              </div>

              <!-- Checkout Button -->
              <button 
                class="btn btn-primary w-100 mb-3"
                @click="proceedToCheckout"
              >
                <i class="bi bi-credit-card me-2"></i>
                Proceed to Checkout
              </button>

              <!-- Continue Shopping -->
              <a href="/products" class="btn btn-outline-primary w-100">
                <i class="bi bi-arrow-left me-2"></i>
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vue Island Info -->
    <div class="mt-4 p-3 bg-light rounded">
      <small class="text-muted">
        <i class="bi bi-info-circle me-1"></i>
        <strong>Vue Island:</strong> This shopping cart uses Vue.js with reactive state management, 
        quantity controls, and real-time calculations. Uses client:load directive.
      </small>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'ShoppingCartVue',
  setup() {
    const cartItems = ref([]);
    const promoCode = ref('');
    const promoMessage = ref('');
    const promoMessageClass = ref('');
    const appliedDiscount = ref(0);

    const sampleCartItems = [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        category: 'Electronics',
        price: '$299.99',
        quantity: 1,
        rating: 5,
        image: '/images/product1.jpg'
      },
      {
        id: '2',
        name: 'Stylish Designer Watch',
        category: 'Accessories',
        price: '$199.99',
        quantity: 2,
        rating: 4,
        image: '/images/product2.jpg'
      },
      {
        id: '3',
        name: 'Professional Camera',
        category: 'Electronics',
        price: '$899.99',
        quantity: 1,
        rating: 5,
        image: '/images/product3.jpg'
      }
    ];

    const totalItems = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.quantity, 0);
    });

    const subtotal = computed(() => {
      return cartItems.value.reduce((total, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return total + (price * item.quantity);
      }, 0);
    });

    const shipping = computed(() => {
      return subtotal.value > 100 ? 0 : 15.99;
    });

    const tax = computed(() => {
      return subtotal.value * 0.08;
    });

    const total = computed(() => {
      return subtotal.value + shipping.value + tax.value - appliedDiscount.value;
    });

    const updateQuantity = (itemId, newQuantity) => {
      if (newQuantity < 1) return;
      
      const item = cartItems.value.find(item => item.id === itemId);
      if (item) {
        item.quantity = newQuantity;
      }
    };

    const removeFromCart = (itemId) => {
      cartItems.value = cartItems.value.filter(item => item.id !== itemId);
    };

    const clearCart = () => {
      cartItems.value = [];
      promoMessage.value = '';
      appliedDiscount.value = 0;
    };

    const applyPromoCode = () => {
      const code = promoCode.value.toUpperCase();
      
      if (code === 'SAVE10') {
        appliedDiscount.value = subtotal.value * 0.1;
        promoMessage.value = '10% discount applied!';
        promoMessageClass.value = 'text-success';
      } else if (code === 'FREESHIP') {
        promoMessage.value = 'Free shipping applied!';
        promoMessageClass.value = 'text-success';
      } else if (code === '') {
        promoMessage.value = 'Please enter a promo code';
        promoMessageClass.value = 'text-muted';
      } else {
        promoMessage.value = 'Invalid promo code';
        promoMessageClass.value = 'text-danger';
        appliedDiscount.value = 0;
      }
    };

    const proceedToCheckout = () => {
      alert(`Proceeding to checkout with ${totalItems.value} items totaling $${total.value.toFixed(2)}`);
    };

    onMounted(() => {
      cartItems.value = [...sampleCartItems];
    });

    return {
      cartItems,
      promoCode,
      promoMessage,
      promoMessageClass,
      totalItems,
      subtotal,
      shipping,
      tax,
      total,
      updateQuantity,
      removeFromCart,
      clearCart,
      applyPromoCode,
      proceedToCheckout
    };
  }
};
</script>

<style scoped>
.cart-item {
  transition: background-color 0.2s ease;
}

.cart-item:hover {
  background-color: #f8f9fa;
}

.btn:disabled {
  opacity: 0.6;
}

.input-group .form-control:focus {
  border-color: #80bdff;
  box-shadow: none;
}
</style>
