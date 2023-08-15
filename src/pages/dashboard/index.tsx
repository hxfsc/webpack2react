import { List, Avatar } from "antd"
import { useEffect, useState } from "react"

interface dataProps {
  title: string
  description: string
  avatar: string
}

function fetchData(): Promise<dataProps[]> {
  return fetch("http://localhost:4001/users").then((res) => {
    return res.json()
  })
}

export default () => {
  const [data, setData] = useState<dataProps[]>([])

  useEffect(() => {
    fetchData().then((result) => {
      setData(result)
    })
  }, [])

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta avatar={<Avatar src={item.avatar} size={48} />} title={<a href="https://ant.design">{item.title}</a>} description={item.description} />
        </List.Item>
      )}
    />
  )
}
