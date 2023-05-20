import { List } from "antd";
import { CardNewsList } from "@components/elements/card";

type ListItem = {
  title: string;
  description: string;
  imageSrc: string;
};

type ListProps = {
  items: ListItem[];
};

const CustomList: React.FC<ListProps> = ({ items }) => {
  return (
    <List
      className="home__event-list"
      itemLayout="vertical"
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          <CardNewsList
            title={item.title}
            description={item.description}
            imageSrc={item.imageSrc}
          />
        </List.Item>
      )}
    />
  );
};

export default CustomList;
