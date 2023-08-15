export interface menuProps {
  id: string
  title: string
  children?: menuProps[]
}
export const fetchMenus = (): Promise<menuProps[]> => fetch("http://localhost:4001/categroys").then((res) => res.json())
