# 🛍️ E-Commerce con Astro - Proyecto T5 - Grupo 5

## 📋 Descripción del Proyecto

Este es un **sitio web estático de e-commerce** desarrollado con **Astro** que cumple con todos los requisitos de la T5. La aplicación demuestra el uso avanzado de la arquitectura de islas de Astro, combinando múltiples frameworks de UI y generación estática.

## ✅ Criterios Cumplidos

### 🎯 **Requisitos Principales**

#### 1. **Sitio Web Estático con Astro** ✅
- Configurado con `astro.config.mjs`
- Integraciones de React y Vue habilitadas
- Generación estática optimizada

**Configuración de Astro:**
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import vue from "@astrojs/vue";

export default defineConfig({
  integrations: [react(), vue()],
  site: 'https://astro.build'
});
```

#### 2. **Islas Interactivas con 2 Frameworks Diferentes** ✅
- **React**: Componentes como `ShoppingCartWithStore`, `CardProduct`, `ProductOverviewGrid`
- **Vue**: Componentes como `ShoppingCartVue`, `ProductFiltersVue`
- Ambos frameworks funcionando en el mismo proyecto

**Ejemplo de Isla React:**
```tsx
// src/components/cart/ShoppingCartWithStore.tsx
import { useState, useEffect } from 'react';
import { getCartItems, removeFromCart } from './cartStore';

export default function ShoppingCartWithStore() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
  }, []);

  return (
    <div className="container">
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <h5>{item.title}</h5>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
}
```

**Ejemplo de Isla Vue:**
```vue
<!-- src/components/cart/ShoppingCartVue.vue -->
<template>
  <div class="shopping-cart-vue">
    <div v-for="item in cartItems" :key="item.id" class="cart-item">
      <h6>{{ item.name }}</h6>
      <p>{{ item.price }}</p>
      <button @click="updateQuantity(item.id, item.quantity - 1)">
        <i class="bi bi-dash"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const cartItems = ref([]);
    const total = computed(() => {
      return cartItems.value.reduce((sum, item) => sum + item.price, 0);
    });
    
    return { cartItems, total };
  }
};
</script>
```

#### 3. **Directivas de Cliente** ✅
- Uso extensivo de `client:load` en componentes interactivos
- Optimización de hidratación para mejor performance
- Componentes que se activan según las necesidades del usuario

**Uso de Directivas en Páginas:**
```astro
---
// src/pages/index.astro
import CardProduct from '../components/products/cardProduct';
import ComplexNavbar from '../components/complexNavbar';
---

<Layout title="E-Store - Built with Astro Islands">
  <ComplexNavbar client:load />
  
  {featuredProducts.map(product => (
    <CardProduct
      client:load
      id={product.id}
      title={product.title}
      price={product.price}
      // ... más props
    />
  ))}
</Layout>
```

#### 4. **Generación Estática (SSG) con Content Collections** ✅
- **54 productos** en archivos JSON estáticos
- **17 categorías** organizadas
- **58+ páginas estáticas** generadas automáticamente
- Uso de `getStaticPaths()` para rutas dinámicas

**Configuración de Content Collections:**
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const productsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    price: z.number(),
    category: z.string(),
    stock: z.boolean(),
    rating: z.number().optional(),
    // ... más campos
  })
});

export const collections = {
  'products': productsCollection,
  'categories': categoriesCollection,
};
```

**Generación de Páginas Estáticas:**
```astro
---
// src/pages/product/[id].astro
export async function getStaticPaths() {
  const allProducts = await getCollection('products');
  return allProducts.map(product => ({
    params: { id: product.data.id },
    props: { product: product.data }
  }));
}

const { product } = Astro.props;
---

<Layout title={`${product.title} - E-Store`}>
  <ProductOverviewGrid client:load {...product} />
</Layout>
```

#### 5. **E-Commerce Simple** ✅
- Catálogo completo de productos
- Carrito de compras funcional
- Sistema de filtros y búsqueda
- Páginas de producto individuales

### 🚀 **Criterios Extra Cumplidos**

#### • **50+ Páginas Estáticas** ✅
- 54 páginas de productos individuales
- 4 páginas principales (index, products, shopping-cart, product/[id])
- **Total: 58+ páginas estáticas**

#### • **Islas que Usan Datos del Sitio** ✅
- Componentes React y Vue consumen datos de Content Collections
- Estado compartido entre islas
- Datos reales del e-commerce

**Consumo de Datos en Islas:**
```astro
---
// src/pages/products.astro
const allProducts = await getCollection('products');
const products = allProducts.map(product => product.data);
---

<Layout title="Products - E-Store">
  {products.map(product => (
    <CardProduct
      client:load
      id={product.id}
      title={product.title}
      price={product.price}
      category={product.category}
      rating={product.rating}
    />
  ))}
</Layout>
```

#### • **Originalidad y Uso Creativo de Astro** ✅
- Arquitectura híbrida React + Vue
- Content Collections para gestión de datos
- Carrito de compras con estado persistente
- Filtros interactivos en tiempo real

## 🏗️ Arquitectura del Proyecto

```
/
├── src/
│   ├── components/
│   │   ├── cart/           # Componentes del carrito (React + Vue)
│   │   │   ├── ShoppingCartWithStore.tsx  # Isla React
│   │   │   ├── ShoppingCartVue.vue        # Isla Vue
│   │   │   └── cartStore.ts               # Estado compartido
│   │   ├── products/       # Componentes de productos
│   │   │   ├── CardProduct.tsx
│   │   │   ├── ProductOverviewGrid.tsx
│   │   │   └── ProductFiltersVue.vue
│   │   ├── reviews/        # Sistema de reseñas
│   │   └── store/          # Componentes de la tienda
│   ├── content/
│   │   ├── products/       # 54 productos en JSON
│   │   └── categories/     # 17 categorías
│   ├── layouts/
│   │   └── Layout.astro    # Layout principal
│   └── pages/
│       ├── index.astro     # Página principal
│       ├── products.astro  # Catálogo de productos
│       ├── shopping-cart.astro # Carrito de compras
│       └── product/[id].astro # Páginas dinámicas de productos
├── assets/
│   └── scss/              # Estilos SCSS
└── public/
    └── images/            # Imágenes estáticas
```

## 🎨 Características Destacadas

### **🛒 Carrito de Compras Interactivo**

**Estado Compartido con TypeScript:**
```typescript
// src/components/cart/cartStore.ts
export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  thumb_src: string;
  category?: string;
  rating?: number;
}

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('cart');
  return stored ? JSON.parse(stored) : [];
}

export function addToCart(item: CartItem) {
  const items = getCartItems();
  const existing = items.find(i => i.id === item.id);
  
  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ ...item, quantity: 1 });
  }
  
  localStorage.setItem('cart', JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: items }));
}
```

**React Island con Estado Persistente:**
```tsx
// Fragmento de ShoppingCartWithStore.tsx
useEffect(() => {
  const loadCartItems = () => {
    const items = getCartItems();
    setCartItems(items);
  };

  loadCartItems();
  
  // Escuchar actualizaciones del carrito
  const handleCartUpdate = (event: CustomEvent) => {
    setCartItems(event.detail);
  };

  window.addEventListener('cartUpdated', handleCartUpdate as EventListener);
  return () => {
    window.removeEventListener('cartUpdated', handleCartUpdate as EventListener);
  };
}, []);
```

### **🔍 Filtros Avanzados**

**Vue Island con Reactividad:**
```vue
<template>
  <div class="product-filters">
    <!-- Filtro por Categoría -->
    <div class="mb-4">
      <h6 class="text-muted mb-2">Category</h6>
      <div class="form-check" v-for="category in categories" :key="category">
        <input 
          class="form-check-input" 
          type="checkbox" 
          :value="category"
          v-model="selectedCategories"
          @change="filterProducts"
        />
        <label class="form-check-label">
          {{ category }} ({{ getCategoryCount(category) }})
        </label>
      </div>
    </div>

    <!-- Filtro por Precio -->
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
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup(props) {
    const selectedCategories = ref([]);
    const priceRange = ref({ min: null, max: null });
    
    const filterProducts = () => {
      let filtered = props.products;
      
      if (selectedCategories.value.length > 0) {
        filtered = filtered.filter(p => selectedCategories.value.includes(p.category));
      }
      
      if (priceRange.value.min || priceRange.value.max) {
        filtered = filtered.filter(p => {
          const price = typeof p.price === 'number' ? p.price : parseFloat(p.price);
          const min = priceRange.value.min || 0;
          const max = priceRange.value.max || Infinity;
          return price >= min && price <= max;
        });
      }
      
      // Emitir evento con productos filtrados
      emit('filtered', filtered);
    };
    
    return { selectedCategories, priceRange, filterProducts };
  }
};
</script>
```

### **📱 Diseño Responsivo**

**SCSS con Variables CSS:**
```scss
// assets/scss/astro-ecommerce.scss
:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --secondary: #f1f5f9;
  --accent: #06b6d4;
  --dark: #0f172a;
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
  --shadow: 0 10px 30px rgba(99, 102, 241, 0.1);
}

.hero-section {
  background: var(--gradient-secondary);
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.125rem;
  }
}
```

### **⚡ Performance Optimizada**

**Hidratación Selectiva:**
```astro
---
// Solo hidratar componentes que necesitan interactividad
import CardProduct from '../components/products/cardProduct';
import ComplexNavbar from '../components/complexNavbar';
---

<!-- Navbar siempre hidratado para navegación -->
<ComplexNavbar client:load />

<!-- Productos hidratados para interactividad -->
{products.map(product => (
  <CardProduct
    client:load
    id={product.id}
    title={product.title}
    price={product.price}
  />
))}

<!-- Footer estático (sin hidratación) -->
<ComplexFooter />
```

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build
npm run preview
```
