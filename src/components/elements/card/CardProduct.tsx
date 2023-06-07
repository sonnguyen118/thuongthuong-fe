import React, { useState, useEffect } from 'react'
import { Card, Modal } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import { SearchOutlined } from '@ant-design/icons'
import { ProductsModal } from '@components/molecules/Modal'
// sử dụng redux
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '@slices/cartSlice'

import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { store } from '@store'
import viText from '@languages/vie.json'
import loadLanguageText from '@languages'
import { CHI_TIET_SAN_PHAM, EMPTY_IMAGE } from 'src/constant/link-master'

interface CustomMetaProps {
  title: string
  price: string
}
// định nghĩa kiểu cho props
interface CardProductProps {
  id: number
  imageUrl: string
  title: string
  link: string
  price: number
}
const defaultCardProduct: CardProductProps = {
  id: 1,
  imageUrl: '/imageUrl',
  title: 'title',
  price: 0,
  link: '1'
}
const CardProduct: React.FC<{ props: CardProductProps }> = ({ props }) => {
  const { id, imageUrl, title, link, price } = props
  const [t, setText] = useState(viText)
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  )
  useEffect(() => {
    loadLanguageText(lang, setText)
  }, [lang])
  // useEffect(() => {
  //   console.log('card:', props)
  // }, [props])
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('Content of the modal')
  const router = useRouter()
  const showModal = () => {
    setOpen(true)
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
    router.push(`${CHI_TIET_SAN_PHAM}/${props.link}?language=${lang}`)
  }

  const handleAddItem = () => {
    const item = {
      id: id,
      urlImage: imageUrl,
      title: title,
      price: price,
      quantity: 1,
      total: price
    }
    dispatch(addItem(item))
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${t.notical.TITLE2}`,
      showConfirmButton: false,
      timer: 1200
    })
  }
  return (
    <div className='products__card-wrap'>
      <SearchOutlined onClick={showModal} className='products__card-modal' />
      <div className='products__card-group'>
        <div className='products__card-group-btn'>{t.button.BUTTON4}</div>
        <div className='products__card-group-btn' onClick={handleAddItem}>
          {t.button.BUTTON5}
        </div>
      </div>
      <Card
        hoverable
        className='products__card'
        cover={
          <Image
            src={imageUrl ? imageUrl : EMPTY_IMAGE}
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
            {price === 0 ? `${t.products.PRICE}` : price}
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
        <ProductsModal props={props} />
      </Modal>
    </div>
  )
}

export default CardProduct
