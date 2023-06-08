import React from 'react'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Space } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import Image from 'next/image'
// import logic redux
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '@slices/languageSlice'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const ButtonLanguage: React.FC = () => {
  const dispatch = useDispatch()
  const lang = useSelector((state: any) => state.language.currentLanguage)
  const title = useSelector((state: any) => state.language.titleLanguage)
  const router = useRouter()

  // const handleLanguageChange = (newLang: string, newTitleLang: string) => {
  //   dispatch(setLanguage({ current: newLang, title: newTitleLang }));
  //   const router = useRouter();
  //   const currentUrl = router.asPath;
  //   router.push(currentUrl)
  // };
  const handleLanguageChange = (newLang: string, newTitleLang: string) => {
    dispatch(setLanguage({ current: newLang, title: newTitleLang }))
    const currentUrl = router.asPath
    const currentLang = router.query['language']
    Cookies.set('language', newLang)
    let newUrl = currentUrl
    if (currentLang) {
      newUrl = currentUrl.replace(
        `language=${currentLang}`,
        `language=${newLang}`
      )
    } else {
      newUrl = `${newUrl}?language=${newLang}`
    }

    router.push(newUrl)
    // window.location.href = newUrl
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
    },
    {
      key: 'fr',
      label: (
        <Button
          onClick={e => handleLanguageChange('fr', 'Français')}
          icon={
            <Image
              src='/icon/lang/fr.png'
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
          French
        </Button>
      )
    },
    {
      key: 'por',
      label: (
        <Button
          onClick={e => handleLanguageChange('por', 'Português')}
          icon={
            <Image
              src='/icon/lang/por.png'
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
          Portuguese
        </Button>
      )
    }
  ]
  const items: MenuProps['items'] = OriginItems.filter(
    item => item && item.key !== lang
  ) // Lọc ra các phần tử khác với lang
  const selectedLangItem = OriginItems.find(item => item && item.key === lang) // Tìm phần tử có key bằng lang

  console.log(selectedLangItem, 'selectedLangItem')
  return (
    <Space direction='vertical' className='button-lang'>
      <Space wrap>
        <Dropdown menu={{ items }} placement='top'>
          <Button
            icon={
              <Image
                src={`/icon/lang/${lang}.png`}
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
            {title} <CaretRightOutlined className='button-lang-btn-icon' />
          </Button>
        </Dropdown>
      </Space>
    </Space>
  )
}

export default ButtonLanguage
