import React, { useState, useEffect } from 'react'
import { Card, Modal } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import { SearchOutlined } from '@ant-design/icons'
import { ProductsModal } from '@components/molecules/Modal'
// sử dụng redux
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '@slices/cartSlice'

import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { store } from '@store'
import viText from '@languages/vie.json'
import loadLanguageText from '@languages'
import { CHI_TIET_SAN_PHAM, EMPTY_IMAGE } from 'src/constant/link-master'
import { handleProductsClient } from "@service";
import { ShoppingCartOutlined } from "@ant-design/icons";
// định nghĩa kiểu cho props
interface CardProductProps {
  id: number;
  imageUrl: string;
  title: string;
  link: string;
  price: number;
  name: string;
}

const CardProduct: React.FC<{ props: CardProductProps }> = ({ props }) => {
  const { id, title, imageUrl, name, link, price } = props;
  const [dataDetailProduct, setDataDetailProduct] = useState();
  const imageUrlProduct = `${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`;
  const [t, setText] = useState(viText)
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  )
  useEffect(() => {
    loadLanguageText(lang, setText)
  }, [lang])

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('Content of the modal')
  const router = useRouter()
  const showModal = () => {
    // thực hiện việc lấy dữ liệu chi tiết sản phẩm
    if(id) {
      handleProductsClient
      .getDetailProductsID(id, "VI")
      .then((result:any) => {
        if(result.meta.status === 200) {
          setDataDetailProduct(result.data);
        }
      })
      .catch((error:any) => {
        // Xử lý lỗi ở đây
        console.log(error);
      });
    setOpen(true)
    }

  }

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  const handleCardClick = () => {
    console.log('card', props)
    router.push(`${CHI_TIET_SAN_PHAM}${link}?language=${lang}`)
  }

  const addItemHandler = () => {
    const item = {
      id: id,
      imageUrl: imageUrlProduct,
      title: title,
      name: name,
      price: price,
      quantity: 1,
      selected: false
    }
    dispatch(cartActions.addItemToCart(item))
  }

  const buyItemHandler = () => {
    const item = {
      id: id,
      imageUrl: imageUrlProduct,
      title: title,
      name: name,
      price: price,
      quantity: 1,
      selected: true
    }
    dispatch(cartActions.addItemToCart(item))
    router.push('/gio-hang')
  }

  return (
    <div className='products__card-wrap'>
      <SearchOutlined onClick={showModal} className='products__card-modal' />
      <div className='products__card-group'>
        <div className='products__card-group-btn' onClick={buyItemHandler}>
          {t.button.BUTTON4}
        </div>
        <div className='products__card-group-btn' onClick={addItemHandler}>
          <span className='products__card-group-btn-text'>+</span> <ShoppingCartOutlined className="products__card-group-btn-icon"/>
        </div>
      </div>
      <Card
        hoverable
        className='products__card'
        cover={
          <Image
            src={imageUrl ? imageUrlProduct : EMPTY_IMAGE}
            alt='example'
            className='products__card-img'
            width={300}
            height={300}
          />
        }
        onClick={handleCardClick}
      >
        <div className='products__card-data'>
          <div className='products__card-title'>{title}</div>
          <div className='products__card-price'>
            {!price ? `${t.products.PRICE}` : `${price} ₫`} 
          </div>
        </div>
      </Card>
      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className='products__card-dialog'
      >
        <ProductsModal props={props} dataDetailProduct={dataDetailProduct}/>
      </Modal>
    </div>
  )
}

export default CardProduct
