export const categorySchema = {
  name: {
    custom: {
      options: (value: any) => {
        return typeof value === 'string' && value.trim().length > 0
      }
    }
  },
  description: {
    custom: {
      options: (value: any) => {
        return typeof value === 'string' && value.trim().length > 0
      }
    }
  }
}