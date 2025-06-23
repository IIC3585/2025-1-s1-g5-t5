<template>
  <div class="product-filters">
    <h5 class="font-weight-bold mb-3">{{ title }}</h5>
    
    <!-- Category Filter -->
    <div class="mb-4">
      <h6 class="text-muted mb-2">Category</h6>
      <div class="form-check" v-for="category in categories" :key="category">
        <input 
          class="form-check-input" 
          type="checkbox" 
          :id="`category-${category}`"
          :value="category"
          v-model="selectedCategories"
          @change="filterProducts"
        />
        <label class="form-check-label" :for="`category-${category}`">
          {{ category }}
          <span class="text-muted small">({{ getCategoryCount(category) }})</span>
        </label>
      </div>
    </div>

    <!-- Price Range Filter -->
    <div class="mb-4">
      <h6 class="text-muted mb-2">Price Range</h6>
      <div class="row g-2">
        <div class="col-6">
          <input 
            type="number" 
            class="form-control form-control-sm" 
            placeholder="Min" 
            v-model.number="priceRange.min"
            @input="filterProducts"
          />
        </div>
        <div class="col-6">
          <input 
            type="number" 
            class="form-control form-control-sm" 
            placeholder="Max"
            v-model.number="priceRange.max"
            @input="filterProducts"
          />
        </div>
      </div>
      <small class="text-muted">Range: ${{ minPrice }} - ${{ maxPrice }}</small>
    </div>

    <!-- Rating Filter -->
    <div class="mb-4">
      <h6 class="text-muted mb-2">Rating</h6>
      <div class="form-check" v-for="rating in [5, 4, 3, 2, 1]" :key="rating">
        <input 
          class="form-check-input" 
          type="radio" 
          :id="`rating-${rating}`"
          :value="rating"
          v-model="selectedRating"
          @change="filterProducts"
        />
        <label class="form-check-label" :for="`rating-${rating}`">
          <span v-for="star in 5" :key="star" class="text-warning">
            {{ star <= rating ? '★' : '☆' }}
          </span>
          <span class="text-muted small ms-1">& up</span>
        </label>
      </div>
    </div>

    <!-- Clear Filters -->
    <div class="mb-3">
      <button 
        class="btn btn-outline-secondary btn-sm w-100" 
        @click="clearFilters"
        v-if="hasActiveFilters"
      >
        <i class="bi bi-arrow-clockwise me-1"></i>
        Clear Filters
      </button>
    </div>

    <!-- Results Count -->
    <div class="mt-3 pt-3 border-top">
      <small class="text-muted">
        <i class="bi bi-funnel me-1"></i>
        Vue Filter Island: {{ filteredCount }} of {{ totalProducts }} products
      </small>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'ProductFiltersVue',
  props: {
    title: {
      type: String,
      default: 'Filters'
    },
    products: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const selectedCategories = ref([]);
    const selectedRating = ref(null);
    const priceRange = ref({
      min: null,
      max: null
    });
    const filteredCount = ref(0);

    const categories = computed(() => {
      return props.categories || [...new Set(props.products.map(p => p.category))].sort();
    });

    const minPrice = computed(() => {
      return Math.min(...props.products.map(p => {
        const price = typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0;
        return price;
      }));
    });

    const maxPrice = computed(() => {
      return Math.max(...props.products.map(p => {
        const price = typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0;
        return price;
      }));
    });

    const totalProducts = computed(() => {
      return props.products.length;
    });

    const hasActiveFilters = computed(() => {
      return selectedCategories.value.length > 0 || 
             selectedRating.value || 
             priceRange.value.min || 
             priceRange.value.max;
    });

    const getCategoryCount = (category) => {
      return props.products.filter(p => p.category === category).length;
    };

    const filterProducts = () => {
      let filtered = props.products;

      if (selectedCategories.value.length > 0) {
        filtered = filtered.filter(p => selectedCategories.value.includes(p.category));
      }

      if (priceRange.value.min || priceRange.value.max) {
        filtered = filtered.filter(p => {
          const price = typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0;
          const min = priceRange.value.min || 0;
          const max = priceRange.value.max || Infinity;
          return price >= min && price <= max;
        });
      }

      if (selectedRating.value) {
        filtered = filtered.filter(p => p.rating >= selectedRating.value);
      }

      filteredCount.value = filtered.length;
    };

    const clearFilters = () => {
      selectedCategories.value = [];
      selectedRating.value = null;
      priceRange.value = { min: null, max: null };
      filterProducts();
    };

    onMounted(() => {
      filteredCount.value = props.products.length;
    });

    return {
      selectedCategories,
      selectedRating,
      priceRange,
      filteredCount,
      categories,
      minPrice,
      maxPrice,
      totalProducts,
      hasActiveFilters,
      getCategoryCount,
      filterProducts,
      clearFilters
    };
  }
};
</script>

<style scoped>
.product-filters {
  font-size: 0.9rem;
}

.form-check {
  margin-bottom: 0.5rem;
}

.form-check-label {
  font-size: 0.9rem;
}

.text-warning {
  font-size: 0.8rem;
}
</style>
