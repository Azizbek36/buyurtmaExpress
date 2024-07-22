import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: []
};
// Создаем срез Redux Toolkit с именем "cart"
const cartSlice = createSlice({
  name: 'cart', // Имя среза
  initialState, // Начальное состояние - пустой массив корзины
  reducers: {
    addProduct(state, action) {
      const item = action.payload;
      const isDuplicate = state.product.some(el => el.id === item.id);
      if (!isDuplicate) {
        state.product.push(item)
      }
    },
    // Редуктор для удаления продукта из корзины по его id
    deleteProduct(state, action) {
      // Фильтруем массив товаров в корзине, оставляя только те, у которых id не совпадает с id, переданным в action.payload
      state.product = state.product.filter((product) => product.id !== action.payload);
    },
    // Редуктор для увеличения количества выбранного продукта
    increase(state, action) {
      const id = action.payload; // Получаем id продукта из action.payload

      // Маппируем массив товаров в корзине, увеличивая count и пересчитывая priceTotal для товара с переданным id
      state.product = state.product.map((product) =>
        product.id === id
          ? {
            ...product,
            count: Math.max(product.count + 1, 1), // Уменьшаем count, но не даем упасть ниже 1
            priceTotal: Math.max(product.count + 1, 1) * product.price, // Пересчитываем priceTotal Необходимо заменить product.count на product.count + 1
          }
          : product
      );
    },

    // Редуктор для изменения количества выбранного продукта
    changeValue(state, action) {
      const { id, value } = action.payload;
      state.product = state.product.map((product) =>
        product.id === id
          ? {
            ...product,
            count: value,
            priceTotal: value * product.price,
          }
          : product
      );
    },
    // Редуктор для уменьшения количества выбранного продукта
    decrease(state, action) {
      const id = action.payload; // Получаем id продукта из action.payload
      // Маппируем массив товаров в корзине, уменьшая count и пересчитывая priceTotal для товара с переданным id
      state.product = state.product.map((product) =>
        product.id === id
          ? {
            ...product,
            count: Math.max(product.count - 1, 1), // Уменьшаем count, но не даем упасть ниже 1
            priceTotal: Math.max(product.count - 1, 1) * product.price, // Пересчитываем priceTotal
          }
          : product
      );
    },
  },
});

// Экспортируем созданные редукторы
export const { addProduct, deleteProduct, increase, changeValue, decrease } = cartSlice.actions;

// Экспортируем срез для использования в хранилище Redux
export default cartSlice.reducer;
