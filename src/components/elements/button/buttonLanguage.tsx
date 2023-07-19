import React, { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Space } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { useRouter } from 'next/router'

const ButtonLanguage: React.FC = () => {
  const router = useRouter();
  const [items, setItems] = useState<MenuProps['items']>([]);
  const [titleLang, setTitleLang] = useState("");
  const [urlImage, setUrlImage] = useState("");
  // kiểm tra xem url có lang hay không
  const langURL = router.query['lang'];

  const handleLanguageChange = (newLang: string, newTitleLang: string) => {
      const currentUrl = router.asPath
      const currentLang = router.query['lang']
      localStorage.setItem('lang', newLang);
      let newUrl = currentUrl
      if (currentLang) {
        newUrl = currentUrl.replace(
          `lang=${currentLang}`,
          `lang=${newLang}`
        )
      } else {
        newUrl = `${newUrl}?lang=${newLang}`
      }
      // router.push(newUrl)
      window.location.href = newUrl

  }
  const OriginItems = [
    {
      key: 'vi',
      label: (
        <Button
          onClick={e => handleLanguageChange('vi', 'Tiếng Việt')}
          icon={
            <Image
              src='/icon/lang/vi.png'
              alt='Thương Thương'
              width={30}
              height={19}
              loading='lazy'
              className='button-lang-img'
            />
          }
          type='text'
          className='button-lang-btn'
          style={{ backgroundColor: 'transparent' }}
        >
          Tiếng Việt
        </Button>
      )
    },
    {
      key: 'en',
      label: (
        <Button
          onClick={e => handleLanguageChange('en', 'English')}
          icon={
            <Image
              src='/icon/lang/en.png'
              alt='Thương Thương'
              width={30}
              height={19}
              loading='lazy'
              className='button-lang-img'
            />
          }
          type='text'
          className='button-lang-btn'
          style={{ backgroundColor: 'transparent' }}
        >
          English
        </Button>
      )
    }
  ]
  useEffect(()=> {
    if(langURL === 'en') {
      localStorage.setItem('lang', 'en');
      setTitleLang('English');
      setUrlImage(`/icon/lang/en.png`);
    } else {
      localStorage.setItem('lang', 'vi');
      setTitleLang('Tiếng Việt');
      setUrlImage(`/icon/lang/vi.png`);
    }
  },[langURL])
  useEffect(()=> {
  if(OriginItems && langURL) {
      const itemsData: MenuProps['items'] = OriginItems.filter(
        item => item && item.key !== langURL
      )
      setItems(itemsData);
      }
  },[langURL])

  return (
    <Space direction='vertical' className='button-lang'>
      <Space wrap>
        <Dropdown menu={{ items }} placement='top'>
          <Button
            icon={
              <Image
                src={urlImage}
                alt='Thương Thương'
                width={30}
                height={19}
                loading='lazy'
                className='button-lang-img'
              />
            }
            type='text'
            className='button-lang-btn'
          >
            {titleLang} <CaretRightOutlined className='button-lang-btn-icon' />
          </Button>
        </Dropdown>
      </Space>
    </Space>
  )
}

export default ButtonLanguage
