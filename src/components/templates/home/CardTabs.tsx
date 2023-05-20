import { Tabs, Card } from "antd";
import { TitleBlock } from "@components/elements/block";
const { TabPane } = Tabs;

interface dataContent {
  id: string;
  header: string;
  title: string;
  content: string;
}

const CardTabs = () => {
  const listData: dataContent[] = [
    {
      id: "3423saxczxc",
      header: "Thương thương 1",
      title: "Bộ Thương binh và LĐXH - tab1",
      content:
        "“Kymviet chơi” là chương trình giáo dục trải nghiệm độc đáo dành riêng cho đối tượng học sinh. Chương trình được xây dựng bởi doanh nghiệp xã hội Kymviet và những chuyên gia giáo dục uy tín. “Kymviet chơi” nằm trong khuôn khổ của “Kymviet Edu”, một nhánh thuộc hệ sinh thái Kymviet. Với chương trình công phu, ý nghĩa và hấp dẫn như “Kymviet chơi”, Kymviet khát khao chung tay phát triển giáo dục, cùng xã hội vun đắp những thế hệ Việt ưu tú, giàu cảm xúc, giàu kĩ năng, giàu trải nghiệm.",
    },
    {
      id: "3423saxczxc2",
      header: "Thương thương 2",
      title: "Bộ Thương binh và LĐXH - tab 2",
      content:
        "“Kymviet chơi” là chương trình giáo dục trải nghiệm độc đáo dành riêng cho đối tượng học sinh. Chương trình được xây dựng bởi doanh nghiệp xã hội Kymviet và những chuyên gia giáo dục uy tín. “Kymviet chơi” nằm trong khuôn khổ của “Kymviet Edu”, một nhánh thuộc hệ sinh thái Kymviet. Với chương trình công phu, ý nghĩa và hấp dẫn như “Kymviet chơi”, Kymviet khát khao chung tay phát triển giáo dục, cùng xã hội vun đắp những thế hệ Việt ưu tú, giàu cảm xúc, giàu kĩ năng, giàu trải nghiệm.",
    },
    {
      id: "3423saxczxcg",
      header: "Thương thương 3",
      title: "Bộ Thương binh và LĐXH - tab3",
      content:
        "“Kymviet chơi” là chương trình giáo dục trải nghiệm độc đáo dành riêng cho đối tượng học sinh. Chương trình được xây dựng bởi doanh nghiệp xã hội Kymviet và những chuyên gia giáo dục uy tín. “Kymviet chơi” nằm trong khuôn khổ của “Kymviet Edu”, một nhánh thuộc hệ sinh thái Kymviet. Với chương trình công phu, ý nghĩa và hấp dẫn như “Kymviet chơi”, Kymviet khát khao chung tay phát triển giáo dục, cùng xã hội vun đắp những thế hệ Việt ưu tú, giàu cảm xúc, giàu kĩ năng, giàu trải nghiệm.",
    },
    {
      id: "3423saxczxcs",
      header: "Thương thương 4",
      title: "Bộ Thương binh và LĐXH - tab4",
      content:
        "“Kymviet chơi” là chương trình giáo dục trải nghiệm độc đáo dành riêng cho đối tượng học sinh. Chương trình được xây dựng bởi doanh nghiệp xã hội Kymviet và những chuyên gia giáo dục uy tín. “Kymviet chơi” nằm trong khuôn khổ của “Kymviet Edu”, một nhánh thuộc hệ sinh thái Kymviet. Với chương trình công phu, ý nghĩa và hấp dẫn như “Kymviet chơi”, Kymviet khát khao chung tay phát triển giáo dục, cùng xã hội vun đắp những thế hệ Việt ưu tú, giàu cảm xúc, giàu kĩ năng, giàu trải nghiệm.",
    },
  ];
  return (
    <div className="home__cardtabs">
      <TitleBlock
        title={"Hệ sinh thái ThuongThuong"}
        urlImage={"/images/home/iconnho06.png"}
        underlined={false}
      />
      <Tabs
        defaultActiveKey="1"
        type="card"
        tabBarStyle={{ background: "none", borderBottom: "none" }}
        className="home__cardtabs-wrap"
      >
        {listData ? (
          <>
            {listData.map((data, i) => (
              <TabPane tab={data.header} key={data.id}>
                <Card title={data.title} bordered={false}>
                  {data.content}
                </Card>
              </TabPane>
            ))}
          </>
        ) : (
          <></>
        )}
      </Tabs>
    </div>
  );
};

export default CardTabs;
