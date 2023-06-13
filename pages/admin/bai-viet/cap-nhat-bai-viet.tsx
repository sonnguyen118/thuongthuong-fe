import React, { useState, useEffect, useMemo, useRef } from 'react'
import Dashboard from '@components/layouts/admin/Dashboard'
import { NavigationAdmin } from '@components/elements/navigation'
import {
  Tabs,
  Button,
  Input,
  Select,
  Upload,
  Switch,
  message,
  InputRef,
  Spin
} from 'antd'
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
import { prop } from 'ramda'
const { TextArea } = Input

export interface CreateArticleDto {
  link: string
  menuId: string
  imageUrl: string
  content: Content[]
}
export interface UpdateArticleDto {
  id: string
  link: string
  menuId: string
  imageUrl: string
  content: Content[]
  isActive: boolean
  breadCrumb: any[] | undefined
}

interface UpdateContentDto {
  id: string
  language: string
  name: string
  content: string
  description: string
  key: string
  label: string
}

interface ContentDto {
  language: string
  name: string
  content: string
  description: string
}

interface Content {
  language: string
  name: string
  content: string
  description: string
}

const App: React.FC = () => {
  const [cookies] = useCookies(['accessToken'])
  const token = cookies['accessToken']
  const router = useRouter()
  const { id } = router.query

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
  const innitUpdatArticleDto = {
    id: 0,
    link: '',
    menuId: '',
    imageUrl: '',
    content: initContentDto
  }

  interface UpdateContentDto {
    id: string | undefined
    language: string
    name: string
    content: string
    description: string
    key: string
    label: string
    articleId: string | undefined
  }

  let createArticleDto = useRef<CreateArticleDto>(innitUpdatArticleDto)

  let [updateContentDto, setUpdateContentDto] = useState<UpdateContentDto[]>([])
  let updateContentDtoUseRef = useRef<UpdateContentDto[]>([])

  let [updateArticleDto, setUpdateArticleDto] = useState<UpdateArticleDto>({
    id: '',
    link: '',
    menuId: '',
    imageUrl: '',
    content: [],
    isActive: false,
    breadCrumb: []
  })
  let [createDto, setCeateDto] = useState<any>(null)
  // let menuData: any
  let [menuData, setMenuData] = useState<any>(null)
  const [menuCap1, setMenuCap1] = useState<any>(null)
  const [menuCap2, setMenuCap2] = useState<any>(null)
  const [menuCap1Value, setMenuCap1Value] = useState<any>(null)
  const [menuCap2Value, setMenuCap2Value] = useState<any>(null)

  // lấy dữ liệu danh mục
  useEffect(() => {
    setUpdata()
  }, [id])
  const onChange = (key: string) => {
    setActiveTab(key)
  }
  const setUpdata = async () => {
    await getMenuData()
    if (id) {
      await getArticleDetail(id)
    }
  }

  const getMenuData = async () => {
    try {
      const data = await menuAdmin.adminGetAllMenu().then(res => res.data.data)
      const initMenu = transferMenuToSelect(data)
      setMenuCap1(initMenu)
      menuData = data.reduce((acc: any, obj: any) => {
        acc[obj.id] = obj
        return acc
      })
      setMenuData(
        data.reduce((acc: any, obj: any) => {
          acc[obj.id] = obj
          return acc
        }, {})
      )
      console.log(menuData)
    } catch (error: any) {
      Message.errorNotify(error.response.data.message)
    }
  }

  const getArticleDetail = async (id: any) => {
    try {
      const data = await articleAdmin
        .adminGetArticleDetail(id)
        .then(res => res.data.data)
      await handleDataAfterFetch(data)
    } catch (error: any) {
      Message.errorNotify('Lỗi: ' + error?.response?.data?.message)
      router.push('/admin/bai-viet')
    }
  }

  const handleDataAfterFetch = async (data: any) => {
    setUpdateArticleDto(data)
    await bindingMenuForDetail(data?.breadCrumb)
    //set up for content multi languge
    // updateContentDto = data.content
    await handleForLanguageTabs(data.content)
    // setUpdateContentDto(updateContentDto)
    // const detailContentData: UpdateContentDto[] = [...updateContentDto]
    // updateContentDtoUseRef.current = [...detailContentData]
  }

  const handleForLanguageTabs = async (
    updateContentDto: UpdateContentDto[]
  ) => {
    const contentViet = updateContentDto.find(e => e.language == 'VI')
    const tabs: UpdateContentDto[] = []
    LANGUAGE_TABS.forEach(tab => {
      const check = updateContentDto.find(e => tab.language == e.language)
      if (check) {
        check.key = tab!.key
        check.label = tab!.label
        tabs.push(check)
      } else {
        const empty: UpdateContentDto = {
          id: undefined,
          language: tab.language,
          name: '',
          content: '',
          description: '',
          key: tab.key,
          label: tab.label,
          articleId: contentViet?.articleId
        }
        tabs.push(empty)
      }
    })
    setUpdateContentDto(tabs)

    updateContentDtoUseRef.current = [...tabs]
    // updateContentDto.forEach((e, i) => {
    //   console.log(e)
    //   const tab = LANGUAGE_TABS.find(ta => ta.language == e.language)
    //   e.key = tab!.key
    //   e.label = tab!.label
    // })
  }

  const bindingMenuForDetail = async (breadCrumb: any[] | undefined) => {
    if (breadCrumb && breadCrumb.length > 0) {
      const menuCap1 = breadCrumb[0]
      const menuCap2 = breadCrumb[1]
      if (menuCap1) {
        setMenuCap1Value(menuCap1.id)
        menuCap1Onchange(menuCap1.id)
      }
      if (menuCap2) {
        setMenuCap2Value(menuCap2.id)
      }
    }
  }
  const articleContentOnChangeUseRef = (
    event: React.SetStateAction<string | undefined>,
    index: any
  ) => {
    const updatedContent = [...updateContentDtoUseRef.current]
    updatedContent[index].content = event as string
    updateContentDtoUseRef.current = updatedContent
  }

  let itemCKeditor: TabsProps['items'] = updateContentDto.map((obj, i) => {
    const key = obj.key
    const language = obj.language
    const label = obj.label
    const placeholderTitle = `Tên bài viết bằng ${label}`
    const placeholderDescription = `Mô tả ngắn bằng ${label}`
    const tab = {
      key: key,
      label: label,
      children: (
        <>
          <label className='admin__main-label'>{placeholderTitle}</label>
          <Input
            value={obj.name}
            placeholder={placeholderTitle}
            size='large'
            onChange={event => onChangeTitle(event, i)}
          />
          <label className='admin__main-label'>{placeholderDescription}</label>
          <TextArea
            showCount
            value={obj.description}
            maxLength={400}
            style={{ height: 80, marginBottom: 24 }}
            placeholder={placeholderDescription}
            onChange={event => descriptionOnChange(event, i)}
          />
          <label className='admin__main-label'>Nội dung bài viết {label}</label>
          <CkeditorEnable
            data={obj.content}
            setData={event => articleContentOnChangeUseRef(event, i)}
          />
        </>
      )
    }
    return tab
  })

  const transferMenuToSelect = (data: any) => {
    return data.map((e: { id: number; name: string }) => {
      return { value: e.id, label: e.name }
    })
  }

  const onChangeTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: any
  ) => {
    const updatedContent = [...updateContentDto]
    updatedContent[index].name = event.target.value
    setUpdateContentDto(updatedContent)
  }

  const descriptionOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index: any
  ) => {
    const updatedContent = [...updateContentDto]
    updatedContent[index].description = event.target.value
    setUpdateContentDto(updatedContent)
  }
  const linkOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDto: UpdateArticleDto = {
      ...updateArticleDto,
      link: event.target.value as string
    } as UpdateArticleDto
    setUpdateArticleDto(updatedDto)
  }
  const menuCap1Onchange = (menuId: any) => {
    setMenuCap1Value(menuId)
    setMenuCap2Value(null)
    setCeateDto(createArticleDto)
    if (menuData[menuId]?.children.length > 0) {
      const menuCap2 = transferMenuToSelect(menuData[menuId].children)
      setMenuCap2(menuCap2)
    } else {
      setMenuCap2(null)
    }
  }
  const menuCap2Onchange = (menuId: any) => {
    if (!menuId) {
      setMenuCap2Value(null)
      return
    }
    setCeateDto(createArticleDto)
    setMenuCap2Value(menuId)
  }

  const validateDto = (
    createArticleDto: UpdateArticleDto,
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

  const handleDtoData = async () => {
    let link = Diacritic.convertValueWithDashes(updateArticleDto.link) as string
    updateArticleDto.menuId = menuCap1Value
    if (menuCap2Value) {
      updateArticleDto.menuId = menuCap2Value
    }
    // console.log('link',link)
    updateArticleDto.link = link.startsWith('/') ? link : `/${link}`
    // updateArticleDto.content = updateContentDto
    updateArticleDto.content = updateContentDto.filter(e => e.name.trim() != '')
    setUpdateArticleDto(updateArticleDto)
    console.log(updateArticleDto)
  }

  const updateArticle = async (dto: UpdateArticleDto) => {
    try {
      setLoadingSubmit(true)
      await articleAdmin.updateArticle(dto)
      await getArticleDetail(id)
      Message.successNotify('Cập nhật bài viết thành công')
      router.push('/admin/bai-viet')
      setLoadingSubmit(false)
    } catch (error: any) {
      Message.errorNotify(error.response.data.message)
      setLoadingSubmit(false)
    }
  }

  const handleSubmit = async () => {
    const isValid = validateDto(updateArticleDto, updateContentDto)
    if (isValid) {
      await handleDtoData()
      await updateArticle(updateArticleDto)
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
              Cập nhật bài viết
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
              value={updateArticleDto?.link}
              placeholder={`Nhập đường dẫn`}
              size='large'
              onChange={event => linkOnchange(event)}
            />
            <label className='admin__main-label'>{`Tải anh bài viết`}</label>
            <ImageUpload
              linkUpload={`/article/admin/upload`}
              data={updateArticleDto}
            ></ImageUpload>

            {updateContentDtoUseRef.current.length > 0 && updateArticleDto ? (
              <Tabs
                defaultActiveKey='tab1'
                activeKey={activeTab}
                items={itemCKeditor}
                onChange={onChange}
              />
            ) : (
              <Spin /> // Hiển thị Spin khi đang lấy dữ liệu
            )}
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
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default App
