import React, { useState, useEffect, useMemo, useRef } from 'react'
import Dashboard from '@components/layouts/admin/Dashboard'
import { NavigationAdmin } from '@components/elements/navigation'
import { Tabs, Button, Input, Select, Upload, Switch, message } from 'antd'
import type { TabsProps } from 'antd'
import { StarFilled } from '@ant-design/icons'
import { CkeditorEnable } from '@components/molecules/ckeditor'
import { useCookies } from 'react-cookie'
import { languageObject } from 'src/constant/create-content'
import { Content } from 'antd/es/layout/layout'
import { Diacritic, Message } from '@utils/Functions'
import ImageUpload from '@components/model/ImageUpload'
import { menuAdmin } from '@api'
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

  const [activeTab, setActiveTab] = useState('1')
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)

  const initContentDto = languageObject.map(obj => {
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
  let [menuData, setMenuData] = useState<any>(null)

  const [menuCap1, setMenuCap1] = useState<any>(null)
  const [menuCap2, setMenuCap2] = useState<any>(null)
  const [menuCap2Value, setMenuCap2Value] = useState<any>(null)

  // lấy dữ liệu danh mục
  useEffect(() => {
    getMenuData()
  }, [])
  const onChange = (key: string) => {
    setActiveTab(key)
  }

  const getMenuData = async () => {
    const data = await menuAdmin.adminGetAllMenu().then(res => res.data.data)
    const initMenu = transferMenuToSelect(data)
    setMenuCap1(initMenu)
    menuData = data.reduce((acc: any, obj: any) => {
      acc[obj.id] = obj
      return acc
    }, {})
    setMenuData(menuData)
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
    setMenuCap2Value(null)
    createArticleDto.current.menuId = menuId
    setCeateDto(createArticleDto)
    if (menuData[menuId]?.children.length > 0) {
      const menuCap2 = transferMenuToSelect(menuData[menuId].children)
      setMenuCap2(menuCap2)
    } else {
      setMenuCap2(null)
    }
  }
  const menuCap2Onchange = (menuId: any) => {
    createArticleDto.current.menuId = menuId
    setCeateDto(createArticleDto)
    const selectedMenu = menuCap2.find(
      (e: { value: number; name: string }) => e.value == menuId
    )
    setMenuCap2Value(selectedMenu.label)
  }

  const getUseRef = (language: string) => {
    const obj = contentDto.current.find(dto => dto.language == language)
    obj?.name
  }
  const re = () => {}
  let itemCKeditor: TabsProps['items'] = languageObject.map(obj => {
    const tab = {
      key: obj.key,
      label: obj.label,
      children: (
        <>
          <label className='admin__main-label'>{obj.placeholderTitle}</label>
          <Input
            placeholder={obj.placeholderTitle}
            size='large'
            onChange={event => titleOnchange(event, obj.language)}
          />
          <label className='admin__main-label'>
            {obj.placeholderDescription}
          </label>
          <TextArea
            showCount
            maxLength={400}
            style={{ height: 80, marginBottom: 24 }}
            placeholder={obj.placeholderDescription}
            onChange={event => descriptionOnChange(event, obj.language)}
          />
          <label className='admin__main-label'>Nội dung bài viết</label>
          <CkeditorEnable
            data={'Con cặc'}
            setData={event => articleContentOnChange(event, obj.language)}
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
    return createArticleDto
  }
  const resetCreateDto = async () => {
    createArticleDto.current = innitCreateArticleDto
  }
  const createArticle = async (dto: CreateArticleDto) => {
    try {
      setLoadingSubmit(true)
      await menuAdmin.createArticle(dto)
      resetCreateDto()
      Message.successNotify('Tạo bài viết thành công')
      router.push('/admin/bai-viet')
    } catch (error: any) {
      Message.errorNotify(error.response.data.message)
    } finally {
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
              linkUpload={`${process.env.NEXT_PUBLIC_API_URL}/article/admin/upload`}
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
