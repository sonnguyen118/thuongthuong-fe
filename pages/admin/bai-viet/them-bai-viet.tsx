import React, { useState, useEffect, useMemo, useRef } from 'react'
import Dashboard from '@components/layouts/admin/Dashboard'
import { NavigationAdmin } from '@components/elements/navigation'
import { Tabs, Button, Input, Select, Upload, Switch, message } from 'antd'
import type { TabsProps } from 'antd'
import { StarFilled } from '@ant-design/icons'
import { CkeditorEnable } from '@components/molecules/ckeditor'
import { useCookies } from 'react-cookie'
import { LANGUAGE_TABS } from 'src/constant/create-content'
import { Content } from 'antd/es/layout/layout'
import { Diacritic, Message } from '@utils/Functions'
import ImageUpload from '@components/model/ImageUpload'
import { articleAdmin, menuAdmin } from '@api'
import { clear } from 'console'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { setLoading } from '@slices/loadingState'
const { TextArea } = Input

export interface CreateArticleDto {
  link: string
  menuId: string
  imageUrl: string
  content: Content[]
}
export interface Content {
  language: string
  name: string
  content: string
  description: string
}

const App: React.FC = () => {
  const [cookies] = useCookies(['accessToken'])
  const token = cookies['accessToken']
  const router = useRouter()

  const [activeTab, setActiveTab] = useState('tab1')
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)

  const initContentDto = LANGUAGE_TABS.map(obj => {
    return {
      language: obj.language,
      name: '',
      content: '',
      description: ''
    }
  })
  const innitCreateArticleDto = {
    link: '',
    menuId: '',
    imageUrl: '',
    content: initContentDto
  }

  const contentDto = useRef<Content[]>(initContentDto)
  let createArticleDto = useRef<CreateArticleDto>(innitCreateArticleDto)

  let [createDto, setCeateDto] = useState<any>(null)
  // let menuData: any
  const [menuData, setMenuData] = useState<any>(null)
  const [menuCap1, setMenuCap1] = useState<any>(null)
  const [menuCap2, setMenuCap2] = useState<any>(null)
  const [menuCap2Value, setMenuCap2Value] = useState<any>(null)
  const [menuCap1Value, setMenuCap1Value] = useState<any>(null)

  // lấy dữ liệu danh mục
  useEffect(() => {
    getMenuData()
  }, [])
  const onChange = (key: string) => {
    setActiveTab(key)
  }

  const getMenuData = async () => {
    try {
      const data = await menuAdmin.adminGetAllMenu().then(res => res.data.data)
      const initMenu = transferMenuToSelect(data)
      setMenuCap1(initMenu)
      setMenuData(
        data.reduce((acc: any, obj: any) => {
          acc[obj.id] = obj
          return acc
        }, {})
      )
    } catch (error: any) {
      Message.errorNotify(error.response.data.message)
    }
  }
  const transferMenuToSelect = (data: any) => {
    return data.map((e: { id: number; name: string }) => {
      return { value: e.id, label: e.name }
    })
  }

  const titleOnchange = (event: any, language: string) => {
    const value = event.target.value
    contentDto.current.forEach(e => {
      if (e.language == language) {
        e.name = value
      }
    })
  }

  const descriptionOnChange = (event: any, language: string) => {
    contentDto.current.forEach(e => {
      if (e.language == language) {
        e.description = event.target.value
      }
    })
  }

  const articleContentOnChange = (event: any, language: string) => {
    contentDto.current.forEach(e => {
      if (e.language == language) {
        e.content = event
      }
    })
  }
  const linkOnchange = (event: any) => {
    createArticleDto.current.link = event.target.value
  }
  const menuCap1Onchange = (menuId: any) => {
    setMenuCap1Value(menuId)
    setMenuCap2Value(null)
    createArticleDto.current.menuId = menuId
    setCeateDto(createArticleDto)
    if (menuData[menuId]?.children.length > 0) {
      const menuCap2 = transferMenuToSelect(menuData[menuId].children)
      setMenuCap2(menuCap2)
    } else {
      setMenuCap2(null)
      setMenuCap2Value(null)
    }
  }
  const menuCap2Onchange = (menuId: any) => {
    if (!menuId) {
      setMenuCap2Value(null)
      return
    }
    createArticleDto.current.menuId = menuId
    setCeateDto(createArticleDto)
    setMenuCap2Value(menuId)
  }

  let itemCKeditor: TabsProps['items'] = LANGUAGE_TABS.map(obj => {
    const key = obj.key
    const language = obj.language
    const label = obj.label
    const placeholderTitle = `Tên bài viết bằng ${label}`
    const placeholderDescription = `Mo tả ngắn bằng ${label}`
    const tab = {
      key: key,
      label: label,
      children: (
        <>
          <label className='admin__main-label'>{placeholderTitle}</label>
          <Input
            placeholder={placeholderTitle}
            size='large'
            onChange={event => titleOnchange(event, language)}
          />
          <label className='admin__main-label'>{placeholderDescription}</label>
          <TextArea
            showCount
            maxLength={400}
            style={{ height: 80, marginBottom: 24 }}
            placeholder={placeholderDescription}
            onChange={event => descriptionOnChange(event, language)}
          />
          <label className='admin__main-label'>Nội dung bài viết</label>
          <CkeditorEnable
            data={''}
            setData={event => articleContentOnChange(event, language)}
          />
        </>
      )
    }
    return tab
  })
  const validateDto = (
    createArticleDto: CreateArticleDto,
    content: Content[]
  ) => {
    if (createArticleDto.link.trim() == '') {
      message.error('Đường dẫn không được để trống')
      return false
    }
    if (createArticleDto.menuId == null || createArticleDto.menuId == '') {
      message.error('Menu không được để trống')
      return false
    }
    if (createArticleDto.imageUrl.trim() == '') {
      message.error('Ảnh bài viết không được để trống')
      return false
    }
    for (const e of content) {
      if (e.language.toUpperCase() == 'VI' && e.name.trim() == '') {
        message.error('Tên bài viết tiếng Việt không được để trống')
        return false
      }
    }
    return true
  }
  // onClose: () => {
  //   router.push("/admin/san-pham/toan-bo-san-pham");
  // },
  const handleDtoData = (
    createArticleDto: CreateArticleDto,
    content: Content[]
  ) => {
    let link = Diacritic.convertValueWithDashes(createArticleDto.link) as string
    createArticleDto.link = link.startsWith('/') ? link : `/${link}`
    createArticleDto.content = content.filter(e => e.name.trim() != '')
    createArticleDto.menuId = menuCap1Value
    if (menuCap2Value) {
      createArticleDto.menuId = menuCap2Value
    }
    return createArticleDto
  }

  const createArticle = async (dto: CreateArticleDto) => {
    try {
      setLoadingSubmit(true)
      await articleAdmin.createArticle(dto)
      Message.successNotify('Tạo bài viết thành công')
      router.push('/admin/bai-viet')
      setLoadingSubmit(false)
    } catch (error: any) {
      Message.errorNotify(error.response.data.message)
      setLoadingSubmit(false)
    }
  }

  const handleSubmit = () => {
    const isValid = validateDto(createArticleDto.current, contentDto.current)
    if (isValid) {
      createArticleDto.current = handleDtoData(
        createArticleDto.current,
        contentDto.current
      )
      createArticle(createArticleDto.current)
    }
  }

  return (
    <Dashboard>
      <div className='admin__main-wrap'>
        <div className='admin__main-content'>
          <div className='admin__main-cards' style={{ marginBottom: '20px' }}>
            <label
              className='admin__main-label'
              style={{ marginBottom: '20px' }}
            >
              <StarFilled style={{ marginRight: 5 }} />
              Tạo Bài viết
            </label>
            <label className='admin__main-label'>{`Chọn menu`}</label>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ marginRight: '20px' }}>Chọn menu cấp 1</span>
              <Select
                placeholder='Chọn menu cấp 1'
                style={{ width: '30%' }}
                options={menuCap1}
                onChange={event => menuCap1Onchange(event)}
                value={menuCap1Value}
              />
            </div>
            <div>
              <span style={{ marginRight: '20px' }}>Chọn menu cấp 2</span>
              <Select
                placeholder='Chọn menu cấp 2'
                style={{ width: '30%' }}
                onChange={menuCap2Onchange}
                options={menuCap2}
                value={menuCap2Value}
                disabled={!menuCap2}
                allowClear
              />
            </div>
            <label className='admin__main-label'>{`Đường dẫn bài viết`}</label>
            <Input
              placeholder={`Nhập đường dẫn`}
              size='large'
              onChange={event => linkOnchange(event)}
            />
            <label className='admin__main-label'>{`Tải anh bài viết`}</label>
            <ImageUpload
              linkUpload={`article/admin/upload`}
              data={createArticleDto.current}
            ></ImageUpload>
            <Tabs
              activeKey={activeTab}
              items={itemCKeditor}
              onChange={onChange}
            />
          </div>
          {/* <div className='admin__main-cards' style={{ marginBottom: '60px' }}>
            <div className='admin__main-cards-title'>Tối ưu SEO</div>
            <label className='admin__main-label'>
              <StarFilled style={{ marginRight: 5 }} />
              Title SEO
            </label>
            <TextArea
              showCount
              maxLength={60}
              style={{ height: 40, marginBottom: 12 }}
              onChange={onChangeTextarea}
              placeholder='Title SEO'
            />
            <label className='admin__main-label'>
              <StarFilled style={{ marginRight: 5 }} />
              Description SEO
            </label>
            <TextArea
              showCount
              maxLength={150}
              style={{ height: 80, marginBottom: 12 }}
              onChange={onChangeTextarea}
              placeholder='Description SEO'
            />
            <label className='admin__main-label'>
              <StarFilled style={{ marginRight: 5 }} />
              Keywords SEO
            </label>
            <TextArea
              showCount
              maxLength={120}
              style={{ height: 60, marginBottom: 12 }}
              onChange={onChangeTextarea}
              placeholder='Keywords SEO'
            />
          </div> */}
          <div className='admin__main-save-products'>
            <Button
              size='large'
              type='default'
              className='admin__main-save-products-btn'
              onClick={() => router.push('/admin/bai-viet')}
            >
              Hủy bỏ
            </Button>
            <Button
              loading={loadingSubmit}
              type='primary'
              size='large'
              style={{ marginLeft: 10 }}
              className='admin__main-save-products-btn-2'
              onClick={handleSubmit}
            >
              Tạo sản phẩm
            </Button>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default App
