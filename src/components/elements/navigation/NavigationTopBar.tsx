import React, { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";

interface NavigationProps {
  id: number;
  title: string;
  link: string;
}

interface PropsData {
  data: NavigationProps[];
}

const NavigationTopBar: React.FC<PropsData> = (props: PropsData) => {
  const { data } = props;
  const [navigationData, setNavigationData] = useState<any>([]);
  useEffect(() => {
    setNavigationData(data);
    console.log(navigationData);
  }, [data]);

  console.log(navigationData, "data");
  return (
    <div className="navigation-top">
      {navigationData && (
        <>
          {navigationData.map((menu: NavigationProps, index: number) => (
            <React.Fragment key={menu.id}>
              {index !== data.length - 1 ? (
                <>
                  <Link href={menu.link} className="navigation-top-text">
                    {menu.title}
                  </Link>
                  <RightOutlined className="navigation-top-icon" />
                </>
              ) : (
                <Link
                  href={menu.link}
                  className="navigation-top-text-lastchildren"
                >
                  {menu.title}
                </Link>
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default NavigationTopBar;
