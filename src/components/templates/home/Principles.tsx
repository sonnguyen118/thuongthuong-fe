import React from "react";


interface PrinciplesProps {
  isShow: boolean;
  dataBlock: Array<any>;
}

const Principles: React.FC<PrinciplesProps> = ( props) => {
  const { isShow, dataBlock } = props;

  return (
    <>
    {isShow && 
        <div className="home__principles">
        {dataBlock.map((data, index)=> (
          <div className={index !== 1 ?"home__principles-block":"home__principles-block-active"} key={index}>
            {/* <Image src={data.urlImage} width={30} height={30} alt={"thuongthuong"} className={data.id !== 2 ?"home__principles-block-img":"home__principles-block-active-img"}/> */}
            <h2 className={index !== 1 ?"home__principles-block-title":"home__principles-block-active-title"}>{data.title}</h2>
            <h3 className={index!== 1 ?"home__principles-block-description":"home__principles-block-active-description"}>{data.content}</h3>
          </div>
        ))}
      </div>
    }
    </>
  );
};

export default Principles;
