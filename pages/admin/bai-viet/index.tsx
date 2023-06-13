import React, { useState, ReactNode, useEffect } from 'react'
import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Image,
  Input,
  MenuProps,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tooltip
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Dashboard from '@components/layouts/admin/Dashboard'
import { NavigationAdmin } from '@components/elements/navigation'
import { useRouter } from 'next/router'
import { articleAdmin, menuAdmin } from '@api'
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  SearchOutlined
} from '@ant-design/icons'
import { Message } from '@utils/Functions'
import { PAGE_SIZE } from 'src/constant/constant'
import Link from 'next/link'

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

export interface UpdateStatusDto {
  ids: any[]
  isActive?: boolean | null
  softDeleted?: boolean | null
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
    render: (text, record) => (
      <>
        <Tooltip title='Cập nhật'>
          <Link href={`/admin/bai-viet/cap-nhat-bai-viet?id=${record.key}`}>
            <EditOutlined />
          </Link>
        </Tooltip>
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
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(20)
  const [confirmShowArticleDes, setConfirmShowArticleDes] = useState<string>('')
  const [openDeleteArticle, setOpenDeleteArticle] = useState(false)
  const [openShowArticle, setOpenShowArticle] = useState(false)
  const [isShowArticle, setIshowArticle] = useState(false)
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
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    pageSizeOptions: PAGE_SIZE,
    showSizeChanger: true
  })
  useEffect(() => {
    getMenuData()
    getArticle(getArticleDto)
  }, [])

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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
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
    await getArticle(getArticleDto)
    setPagination({ ...pagination, current: 1 })
    // console.log(page)
  }

  const items: MenuProps['items'] = [
    {
      label: <>Hiện</>,
      key: 1
    },
    {
      label: <>Ẩn</>,
      key: 0
    }
  ]
  const showPopconfirmShowArticle = (value: any) => {
    setOpenShowArticle(true)
    if (value.key == 1) {
      setIshowArticle(true)
      setConfirmShowArticleDes('Xác nhận hiện bài viết')
    }
    if (value.key == 0) {
      setIshowArticle(false)
      setConfirmShowArticleDes('Xác nhận ẩn bài viết')
    }
  }
  const menuProps = {
    items,
    onClick: showPopconfirmShowArticle
  }

  const handleOkShowArticle = async () => {
    if (selectedRowKeys.length == 0) {
      Message.errorNotify('Bạn chưa chọn bài viết nào')
      setOpenShowArticle(false)
      return
    }
    try {
      const updateStatusDto = {
        ids: selectedRowKeys,
        isActive: isShowArticle
      }
      const data = await articleAdmin.updateStatusArticle(updateStatusDto)
      getArticle(getArticleDto)
      const successMessage = isShowArticle
        ? 'Hiển thị'
        : 'Ẩn' + ' bài viết thành công'
      Message.successNotify(successMessage)
    } catch (error: any) {
      Message.errorNotify(error.response.data.message)
    } finally {
      setOpenShowArticle(false)
    }
  }

  const handleCancelShowArticle = () => {
    setOpenShowArticle(false)
  }

  const showPopconfirmDeleteArticle = () => {
    setOpenDeleteArticle(true)
  }

  const handleOkDeleteArticle = async () => {
    if (selectedRowKeys.length == 0) {
      Message.errorNotify('Bạn chưa chọn bài viết nào')
      setOpenDeleteArticle(false)
      return
    }
    try {
      const updateStatusDto = {
        ids: selectedRowKeys,
        softDeleted: true
      }
      const data = await articleAdmin.updateStatusArticle(updateStatusDto)
      getArticle(getArticleDto)

      Message.successNotify('Xóa bài viết thành công')
    } catch (error: any) {
      Message.errorNotify(error.response.data.message)
    } finally {
      setOpenDeleteArticle(false)
    }
  }

  const changePage = (value: any) => {
    setPagination(value)
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

              <Popconfirm
                title=''
                description={`${confirmShowArticleDes}`}
                open={openShowArticle}
                onConfirm={handleOkShowArticle}
                onCancel={handleCancelShowArticle}
              >
                <Dropdown menu={menuProps}>
                  <Button type='primary'>
                    <Space>
                      Ẩn/Hiện bài viết
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </Popconfirm>

              <Popconfirm
                title='Xác nhận xóa'
                description='Bạn chắc chắn muốn xóa bài viết này ?'
                open={openDeleteArticle}
                onConfirm={handleOkDeleteArticle}
                onCancel={() => setOpenDeleteArticle(false)}
              >
                <Button type='primary' onClick={showPopconfirmDeleteArticle}>
                  Xóa bài viết
                </Button>
              </Popconfirm>
            </div>
          </div>

          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={pagination}
            onChange={changePage}
          />
        </div>
      </div>
    </Dashboard>
  )
}

export default App
