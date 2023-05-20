import React from "react";
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";

interface NavigationProps {
    id: number;
    title: string;
    link: string;
}

interface PropsData {
    data: NavigationProps[]
}

const NavigationTopBar: React.FC<PropsData> = (props: PropsData) => {
    const { data } = props;

    return (
        <div className="navigation-top">
            {data.map((menu: NavigationProps, index: number) => (
                <React.Fragment key={menu.id}>
                    {index !== data.length - 1 ?(
                        <>
                            <Link href={menu.link} className="navigation-top-text">{menu.title}</Link>
                            <RightOutlined className="navigation-top-icon" />
                        </>
                    ):(
                        <Link href={menu.link} className="navigation-top-text-lastchildren">{menu.title}</Link>
                    )}


                </React.Fragment>
            ))}
        </div>
    );
};

export default NavigationTopBar;
