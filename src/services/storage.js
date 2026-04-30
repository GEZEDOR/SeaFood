export const STORAGE_KEYS = {
  CART_ITEMS: 'seafood_cart',
  THEME_SETTINGS: 'seafood_theme',
  USER_SESSION: 'seafood_user'
}

export const storage = {
  save(key, data) {
    try {
      const serializedData = JSON.stringify(data)
      localStorage.setItem(key, serializedData)
    } catch (error) {
      console.error(`Error saving data to localStorage (key: ${key}):`, error)
    }
  },

  get(key) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error reading data from localStorage (key: ${key}):`, error)
      return null
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing data from localStorage (key: ${key}):`, error)
    }
  }
}
