export interface ListCategoryInterface {
    error: boolean
    categories: string[]
    categoryAliases: CategoryAliase[]
    timestamp: number
  }
  
  export interface CategoryAliase {
    alias: string
    resolved: string
  }
  