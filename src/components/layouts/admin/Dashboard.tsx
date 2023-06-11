import React, { useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import {
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SearchOutlined,
  BellOutlined,
  LogoutOutlined,
  DownOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  ShopOutlined,
  UserOutlined,
  FileProtectOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import {
  Menu,
  Input,
  Button,
  Popover,
  List,
  Badge,
  Dropdown,
  message,
  Space,
  Spin
} from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading } from '@slices/loadingState'
import { DasbroahAdmin } from '@utils/Functions'

type MenuItemRT = Required<MenuProps>['items'][number]
type NoticeProps = {
  link: string
  title: string
  time: string
}
type MenuItem = {
  key: React.Key
  icon?: React.ReactNode
  children?: MenuItem[]
  label: React.ReactNode
  type?: 'group'
  to?: string
}

type LayoutProps = {
  children: ReactNode
}

const notice: NoticeProps[] = [
  { link: '/admin', title: 'Thông báo 1', time: '8:00 thứ 6 22/05/2023' },
  { link: '/admin', title: 'Thông báo 1', time: '8:00 thứ 6 22/05/2023' },
  { link: '/admin', title: 'Thông báo 1', time: '8:00 thứ 6 22/05/2023' },
  { link: '/admin', title: 'Thông báo 1', time: '8:00 thứ 6 22/05/2023' }
]
interface RootState {
  loading: {
    loading: boolean
  }
}
const Dashboard = ({ children }: LayoutProps) => {
  const router = useRouter()
  const loading = useSelector((state: RootState) => state.loading.loading)
  const dispatch = useDispatch()
  const toggleLoading = () => {
    dispatch(setLoading(!loading))
  }
  const [collapsed, setCollapsed] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const toggleSearchVisible = () => {
    setSearchVisible(!searchVisible)
  }
  const handleInputClick = (e: any) => {
    e.stopPropagation()
  }
  // Function to generate menu items
  function getItem (
    label: string,
    key: string,
    icon?: ReactNode,
    children?: MenuItem[],
    to?: string
  ) {
    return {
      key,
      label,
      icon,
      children,
      to
    }
  }
  // Render menu item function
  function renderMenuItem (item: MenuItem) {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
          {item.children.map(renderMenuItem)}
        </Menu.SubMenu>
      )
    } else if (item.to) {
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link href={item.to}>{item.label}</Link>
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      )
    }
  }
  const items: MenuItem[] = [
    getItem('Dashbroad', '1', <PieChartOutlined />, undefined, '/admin'),
    getItem('Đơn Hàng', 'sub1', <ShoppingCartOutlined />, [
      getItem(
        'Đơn Hàng chưa xử lý',
        '2',
        undefined,
        undefined,
        '/admin/don-hang/don-hang-chua-xu-ly'
      ),
      getItem(
        'Đơn Hàng đã xử lý',
        '3',
        undefined,
        undefined,
        '/admin/don-hang/don-hang-da-xu-ly'
      ),
      getItem('Tất cả Đơn Hàng', '4', undefined, undefined, '/admin/don-hang')
    ]),
    getItem('Liên Hệ', 'sub2', <MailOutlined />, [
      getItem(
        'Liên Hệ chưa xử lý',
        '8',
        undefined,
        undefined,
        '/admin/lien-he/lien-he-chua-xu-ly'
      ),
      getItem(
        'Liên Hệ đã xử lý',
        '9',
        undefined,
        undefined,
        '/admin/lien-he/lien-he-da-xu-ly'
      ),
      getItem('Tất cả Liên Hệ', '10', undefined, undefined, '/admin/lien-he')
    ]),
    getItem('Danh Mục Sản Phẩm', 'sub3', <ShopOutlined />, [
      getItem(
        'Danh mục cấp 1',
        '13',
        undefined,
        undefined,
        '/admin/danh-muc/danh-muc-cap-1'
      ),
      getItem(
        'Danh mục cấp 2',
        '14',
        undefined,
        undefined,
        '/admin/danh-muc/danh-muc-cap-2'
      ),
      getItem(
        'Tạo mới Danh Mục cấp 1',
        '15',
        undefined,
        undefined,
        '/admin/danh-muc/tao-moi-danh-muc?level=1'
      ),
      getItem(
        'Tạo mới Danh Mục cấp 2',
        '16',
        undefined,
        undefined,
        '/admin/danh-muc/tao-moi-danh-muc?level=2'
      ),
      getItem('Tất cả Danh Mục', '12', undefined, undefined, '/admin/danh-muc')
    ]),
    getItem('Sản Phẩm', 'sub4', <InboxOutlined />, [
      getItem(
        'Toàn bộ Sản Phẩm',
        '21',
        undefined,
        undefined,
        '/admin/san-pham/toan-bo-san-pham'
      ),
      getItem(
        'Sản Phẩm đã ẩn',
        '20',
        undefined,
        undefined,
        '/admin/san-pham/san-pham-da-an'
      ),
      getItem(
        'Tạo mới Sản Phẩm',
        '22',
        undefined,
        undefined,
        '/admin/san-pham/tao-moi-san-pham'
      ),
      getItem(
        'Sản Phẩm bán chạy',
        '19',
        undefined,
        undefined,
        '/admin/san-pham/san-pham-ban-chay'
      )
    ]),
    getItem('Layout', 'sub5', <DesktopOutlined />, [
      getItem('Menu', '25', undefined, undefined, '/admin/layout/menu'),
      getItem('Footer', '26', undefined, undefined, '/admin/layout/footer')
    ]),
    getItem('Bài viết hệ thống', 'sub6', <FileProtectOutlined />, [
      getItem(
        'Trang chủ',
        '29',
        undefined,
        undefined,
        '/admin/he-thong/trang-chu'
      ),
      getItem(
        'Giới Thiệu',
        '30',
        undefined,
        undefined,
        '/admin/he-thong/gioi-thieu'
      ),
      getItem(
        'Tuyển Dụng',
        '31',
        undefined,
        undefined,
        '/admin/he-thong/tuyen-dung'
      ),
      getItem('Liên Hệ', '32', undefined, undefined, '/admin/he-thong/lien-he')
    ]),
    getItem('Bài viết tin tức', 'sub7', <FileTextOutlined />, [
      getItem(
        'Toàn bộ bài viết',
        '35',
        undefined,
        undefined,
        '/admin/bai-viet'
      ),
      getItem(
        'Bài việt đã ẩn',
        '36',
        undefined,
        undefined,
        '/admin/bai-viet/bai-viet-bi-an'
      ),
      getItem(
        'Thêm bài viết',
        '37',
        undefined,
        undefined,
        '/admin/bai-viet/them-bai-viet'
      )
    ]),
    getItem('Người Dùng', 'sub8', <UserOutlined />, [
      getItem(
        'Danh sách người dùng',
        '40',
        undefined,
        undefined,
        '/admin/user/list'
      ),
      getItem('Thêm người dùng', '41', undefined, undefined, '/admin/user/add')
    ])
  ]
  const [cookies, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken'
  ])

  useEffect(() => {
    if (!cookies.accessToken) {
      router.push('/login')
    }
  }, [cookies.accessToken, router])
  const handleMenuClick: MenuProps['onClick'] = e => {
    handleLogout()
  }

  const handleLogout = () => {
    removeCookie('accessToken')
    removeCookie('refreshToken')
    router.push('/login')
  }
  // hàm kiểm tra và check đang ở menu nào
  const [selectedKeys, setSelectedKeys] = useState(['1'])
  const [openKeys, setOpenKeys] = useState([''])

  useEffect(() => {
    const url = router.route
    const level = router.query.level
    const slectorKeys: any = DasbroahAdmin.getSelectKeys(url, level)
    setOpenKeys([slectorKeys.openKeys]);
    setSelectedKeys([slectorKeys.selectedKeys])
  }, [router.route, router.query])

  const cartContent = (
    <>
      {notice.length > 0 ? (
        <>
          <div className='cart-title'>THÔNG BÁO</div>
          <div className='cart-title'>
            Bạn có {notice.length} thông báo chưa đọc
          </div>
          <List
            size='small'
            dataSource={notice}
            className='cart-list'
            renderItem={item => (
              <List.Item className='cart-item'>
                <div className='cart-item-information'>
                  <div className='cart-item-information-text'>
                    <h3 className='cart-item-information-text-title'>
                      {item.title}
                    </h3>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </>
      ) : (
        <>
          <h3 className='cart-none-text'></h3>
        </>
      )}
    </>
  )

  const itemsLogout: MenuProps['items'] = [
    {
      label: 'Đăng xuất',
      key: '1',
      icon: <LogoutOutlined />
    }
  ]

  const menuProps: MenuProps = {
    items: itemsLogout,
    onClick: handleMenuClick
  }
  const handleMenuOpenChange = (keys: any) => {
    setOpenKeys(keys.length > 0 ? keys : '')
  }
  return (
    <div className='admin__layout-dasbroah'>
      <div
        className={
          collapsed
            ? 'admin__layout-dasbroah-slidebar admin__layout-dasbroah-slidebar-off'
            : 'admin__layout-dasbroah-slidebar admin__layout-dasbroah-slidebar-on'
        }
      >
        <Link
          href={'/admin'}
          className='admin__layout-dasbroah-slidebar-header'
        >
          <Image
            src='/icon/logo.png'
            alt='logo'
            width={40}
            height={36}
            className='admin__layout-dasbroah-slidebar-header-logo'
          />
          {!collapsed && (
            <span className='admin__layout-dasbroah-slidebar-header-title'>
              ThuongThuong Admin
            </span>
          )}
        </Link>
        <Menu
          mode='inline'
          theme='dark'
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={handleMenuOpenChange}
          inlineCollapsed={collapsed}
          className='admin__layout-dasbroah-slidebar-menu'
        >
          {items.map(renderMenuItem)}
        </Menu>

        <div className='admin__layout-dasbroah-slidebar-logout'>
          <LogoutOutlined className='admin__layout-dasbroah-slidebar-logout-icon' />
          {!collapsed && (
            <span
              className='admin__layout-dasbroah-slidebar-logout-text'
              onClick={handleLogout}
            >
              Đăng xuất
            </span>
          )}
        </div>
      </div>
      <div
        className={
          collapsed
            ? 'admin__layout-dasbroah-wrap admin__layout-dasbroah-wrap-off'
            : 'admin__layout-dasbroah-wrap admin__layout-dasbroah-wrap-on'
        }
      >
        <div
          className={
            collapsed
              ? 'admin__layout-dasbroah-navbar admin__layout-dasbroah-navbar-off'
              : 'admin__layout-dasbroah-navbar admin__layout-dasbroah-navbar-on'
          }
        >
          <Button
            type='primary'
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
            className='admin__layout-dasbroah-navbar-btn'
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <div className='admin__layout-dasbroah-navbar-information'>
            <Menu
              mode='horizontal'
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
              }}
              className='admin__layout-dasbroah-navbar-information-notical'
              items={[
                {
                  key: 'search',
                  label: (
                    <div style={{ position: 'relative' }}>
                      <SearchOutlined style={{ fontSize: '18px' }} />
                      {searchVisible && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            width: '300px',
                            zIndex: 1
                          }}
                        >
                          <Input
                            placeholder={'Tìm kiếm'}
                            prefix={<SearchOutlined />}
                            style={{ width: '100%' }}
                            onClick={handleInputClick}
                          />
                        </div>
                      )}
                    </div>
                  ),
                  className:
                    'admin__layout-dasbroah-navbar-information-notical-icon',
                  onClick: toggleSearchVisible
                },
                {
                  key: 'notice',
                  label: (
                    <Popover
                      placement='bottom'
                      content={cartContent}
                      className=''
                    >
                      <Badge
                        count={notice.length}
                        overflowCount={99}
                        style={{ backgroundColor: 'red' }}
                      >
                        <Button
                          icon={<BellOutlined style={{ fontSize: '18px' }} />}
                          style={{
                            border: 'none',
                            textDecoration: 'underline',
                            boxShadow: 'none'
                          }}
                        />
                      </Badge>
                    </Popover>
                  ),
                  className: ''
                }
              ]}
            />
            <div className='admin__layout-dasbroah-navbar-information-user'>
              <div
                style={{
                  backgroundImage: 'url("/images/admin/usertest.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: '50%',
                  border: '1px solid green'
                }}
                className='admin__layout-dasbroah-navbar-information-avatar'
              ></div>
              <Dropdown
                menu={menuProps}
                className='admin__layout-dasbroah-navbar-information-avatar-logout'
              >
                <Button>
                  <Space>
                    Xin Chào <strong>AdminStaylor</strong>
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className='admin__layout-main'>
          {children}
          {loading && (
            <div className='admin__layout-main-loading'>
              <Spin size='large' className='admin__layout-main-loading-icon' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
