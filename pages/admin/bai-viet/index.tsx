import React, { useState, ReactNode, useEffect } from 'react'
import {
  Button,
  Col,
  DatePicker,
  Image,
  Input,
  Pagination,
  Row,
  Select,
  Table
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Dashboard from '@components/layouts/admin/Dashboard'
import { NavigationAdmin } from '@components/elements/navigation'
import { useRouter } from 'next/router'
import { articleAdmin, menuAdmin } from '@api'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Message } from '@utils/Functions'

interface DataType {
  id: number
  description: string
  key: React.Key
  name: string // tên củ bài viết
  isActive: boolean
  isHighlight: boolean
  link: string
  action: ReactNode
  parent: any
}
interface buttonProps {
  isButton: boolean
  style: string
  title: string
  link: string
}
const columns: ColumnsType<DataType> = [
  {
    title: 'STT',
    dataIndex: 'key',
    render: text => <>{text}</>
  },
  {
    title: 'Tiêu đề bài viết',
    dataIndex: 'name',
    render: text => <>{text}</>
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    render: text => <>{text}</>
  },
  {
    title: 'Trạng thái',
    dataIndex: 'isActive',
    render: text => <>{text == true ? 'Hiển thị' : 'Ẩn'}</>
  },
  {
    title: 'Ảnh',
    dataIndex: 'imageUrl',
    render: text => (
      <>
        <Image width={50} src={`${process.env.NEXT_PUBLIC_FULL_URL}/${text}`} />
      </>
    )
  },
  {
    title: 'Thao tác',
    dataIndex: 'imageUrl',
    render: text => (
      <>
        <EditOutlined />
        <DeleteOutlined />
      </>
    )
  }
]

interface NavigationProps {
  id: number
  title: string
  link: string
}
export interface GetArticleDto {
  id?: number | null //id của menu
  link?: string | null
  name?: string | null //name của bài viết
  fromDate?: string | null
  toDate?: string | null
  status?: string | null
}
const App: React.FC = () => {
  const router = useRouter()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const [data, setData] = useState()
  const [totalRecords, setTotalRecords] = useState<number>(20)
  const [menuData, setMenuData] = useState<any>(null)
  const [menuCap1, setMenuCap1] = useState<any>(null)
  const [menuCap2, setMenuCap2] = useState<any>(null)
  const [menuCap2Value, setMenuCap2Value] = useState<any>(null)
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(20)

  const innitCreateArticleDto = {
    id: null,
    link: null,
    name: null,
    fromDate: null,
    toDate: null,
    status: null
  }
  const [getArticleDto, setGetArticleDto] = useState<GetArticleDto>(
    innitCreateArticleDto
  )
  const articleStatus = [
    { value: true, label: 'Hiển thị' },
    { value: false, label: 'Ẩn' }
  ]
  useEffect(() => {
    getMenuData()
    getArticle(getArticleDto)
  }, [])

  const getMenuData = async () => {
    const data = await menuAdmin.adminGetAllMenu().then(res => res.data.data)
    const initMenu = transferMenuToSelect(data)
    setMenuCap1(initMenu)
    setMenuData(
      data.reduce((acc: any, obj: any) => {
        acc[obj.id] = obj
        return acc
      }, {})
    )
  }

  const getArticle = async (param: GetArticleDto) => {
    try {
      const data = await articleAdmin
        .adminGetArticle(param)
        .then(res => res.data.data)
      setTotalRecords(data.length)
      setData(
        data.articles.map((e: DataType) => {
          return { ...e, key: e.id }
        })
      )
      setSelectedRowKeys([])
    } catch (error: any) {
      Message.errorNotify(error.response.data.message)
    }
  }

  const transferMenuToSelect = (data: any) => {
    return data.map((e: { id: number; name: string }) => {
      return { value: e.id, label: e.name }
    })
  }

  const navigationData: NavigationProps[] = [
    {
      id: 1,
      title: `Trang chủ`,
      link: '/admin'
    },
    {
      id: 2,
      title: `Bài viết`,
      link: '/admin/bai-viet'
    },
    {
      id: 3,
      title: `Tất cả các bài viết`,
      link: '/'
    }
  ]
  // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  //   console.log('selectedRowKeys changed: ', newSelectedRowKeys)
  //   setSelectedRowKeys(newSelectedRowKeys)
  // }
  const optionsSelector = [
    {
      value: '1',
      label: 'Lọc theo alphabeta'
    },
    {
      value: '2',
      label: 'Lọc theo thời gian tạo'
    },
    {
      value: '3',
      label: 'Lọc theo đã ẩn'
    }
  ]
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const button: buttonProps = {
    isButton: true,
    style: 'add',
    title: 'Tạo bài viết',
    link: '/admin/bai-viet/them-bai-viet'
  }
  const onChangeFromDate = (value: any, date: any) => {
    getArticleDto.fromDate = date
    setGetArticleDto(getArticleDto)
  }

  const onChangeToDate = (value: any, date: any) => {
    getArticleDto.toDate = date
    setGetArticleDto(getArticleDto)
  }
  const menuCap1Onchange = (menuId: any) => {
    setMenuCap2Value(null)
    getArticleDto.id = menuId
    setGetArticleDto(getArticleDto)
    if (menuData[menuId]?.children.length > 0) {
      const menuCap2 = transferMenuToSelect(menuData[menuId].children)
      setMenuCap2(menuCap2)
    } else {
      setMenuCap2(null)
    }
  }
  const menuCap2Onchange = (menuId: any) => {
    const selectedMenu = menuCap2.find(
      (e: { value: number; name: string }) => e.value == menuId
    )
    getArticleDto.id = menuId
    setGetArticleDto(getArticleDto)
    setMenuCap2Value(selectedMenu?.label)
  }
  const statusOnchange = (status: any) => {
    getArticleDto.status = status
    setGetArticleDto(getArticleDto)
  }
  const titleOnchange = (event: any) => {
    getArticleDto.name = event.target.value
    setGetArticleDto(getArticleDto)
  }
  const submitSearch = async () => {
    console.log(getArticleDto)
    await getArticle(getArticleDto)
    console.log(page)
    setPage(1)
    // console.log(page)
  }

  return (
    <Dashboard>
      <div className='admin__main-wrap'>
        <NavigationAdmin
          header={'Danh sách bài viết'}
          description={
            'Trang quản lý danh sách bài viết - tin tức trong website của bạn'
          }
          data={navigationData}
        />
        <div className='admin__main-content'>
          <div style={{ marginBottom: '2%' }}>
            <Row style={{ marginBottom: '2%' }}>
              <Col span={8}>
                <label className='admin__main-label'>{`Tìm theo tiêu đề`}</label>
                <Input
                  style={{ width: '90%', marginRight: '1em' }}
                  placeholder={'Tìm kiếm theo tiêu đề bài viết'}
                  prefix={<SearchOutlined />}
                  onChange={event => titleOnchange(event)}
                />
              </Col>
              <Col span={8}>
                <label className='admin__main-label'>{`Từ ngày`}</label>
                <DatePicker
                  onChange={onChangeFromDate}
                  format='DD/MM/YYYY'
                  style={{ width: '90%' }}
                />
              </Col>
              <Col span={8}>
                <label className='admin__main-label'>{`Đến ngày`}</label>
                <DatePicker
                  onChange={onChangeToDate}
                  format='DD/MM/YYYY'
                  style={{ width: '90%' }}
                />
              </Col>
              <Col span={8}>
                <label className='admin__main-label'>{`Trạng thái`}</label>
                <Select
                  style={{ width: '90%' }}
                  placeholder='Trạng thái'
                  options={articleStatus}
                  onChange={event => statusOnchange(event)}
                  allowClear={true}
                />
              </Col>
              <Col span={8}>
                <label className='admin__main-label'>{`Tìm theo menu cáp 1`}</label>
                <Select
                  style={{ width: '90%' }}
                  placeholder='Chọn menu cấp 1'
                  options={menuCap1}
                  onChange={event => menuCap1Onchange(event)}
                  allowClear={true}
                />
              </Col>
              <Col span={8}>
                <label className='admin__main-label'>{`Tìm theo menu cáp 2`}</label>
                <Select
                  style={{ width: '90%' }}
                  placeholder='Chọn menu cấp 2'
                  onChange={menuCap2Onchange}
                  options={menuCap2}
                  value={menuCap2Value}
                  disabled={!menuCap2}
                  allowClear={true}
                />
              </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                onClick={submitSearch}
                type='primary'
                icon={<SearchOutlined />}
              >
                Tìm Kiếm
              </Button>
              <Button
                onClick={submitSearch}
                type='primary'
                icon={<SearchOutlined />}
              >
                Ẩn bài viết
              </Button>
              <Button
                onClick={submitSearch}
                type='primary'
                icon={<SearchOutlined />}
              >
                Xóa bài viết
              </Button>
            </div>
          </div>

          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>

        <Pagination total={totalRecords} current={page} pageSize={size} />
      </div>
    </Dashboard>
  )
}

export default App
