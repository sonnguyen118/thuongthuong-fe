import React from "react";
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";

interface NavigationProps {
  id: number;
  title: string;
  link: string;
}

interface PropsData {
  header: string;
  description: string | null;
  data: NavigationProps[];
}

const NavigationAdmin = (props: PropsData) => {
  const { header, description, data } = props;
  return (
    <div className="admin__element--navigation-wrap">
      <div className="admin__element--navigation">
        <div className="admin__element--navigation-title">{header}</div>
        <div className="admin__element--navigation-fragment">
          {data.map((menu: NavigationProps, index: number) => (
            <React.Fragment key={menu.id}>
              {index !== data.length - 1 ? (
                <>
                  <Link
                    href={menu.link}
                    className="admin__element--navigation-fragment-text"
                  >
                    {menu.title}
                  </Link>
                  <RightOutlined className="admin__element--navigation-fragment-icon" />
                </>
              ) : (
                <Link
                  href={menu.link}
                  className="admin__element--navigation-fragment-text-lastchildren"
                >
                  {menu.title}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {description && (
        <div className="admin__element--navigation-description">
          {description}
        </div>
      )}
    </div>
  );
};

export default NavigationAdmin;
