export interface ListDetailCategoryInterface {
    count(category: (category: any, count: any) => unknown, count: any): unknown
    category(category: any, count: any): unknown
    error: boolean
    amount: number
    jokes: Joke[]
  }
  export interface Joke {
    category: string
    type: string
    joke: string
    flags: Flags
    id: number
    safe: boolean
    lang: string
  }
  export interface Flags {
    nsfw: boolean
    religious: boolean
    political: boolean
    racist: boolean
    sexist: boolean
    explicit: boolean
}
