import React, { useEffect, useState } from 'react'
import { Form, Switch, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { TableRowSelection } from 'antd/es/table/interface'
import Dashboard from '@components/layouts/admin/Dashboard'
import { NavigationAdmin } from '@components/elements/navigation'
import { FilterAdminTable } from '@components/molecules/FilterAdmin'
import { Message } from '@utils/Functions'
import { contactAdmin } from '@api'
import { GetContact, UpdateContact } from '@api/admin/contact'
import { CONTACT_STATUS } from 'src/constant/constant'

interface DataType {
  key: React.Key
  name: string
  email: string
  phone: string
  status: number
  description: string
}

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  status: number
  description: string
}
interface buttonProps {
  isButton: boolean
  style: string
  title: string
  link: string
}

interface NavigationProps {
  id: number
  title: string
  link: string
}
const App: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  // const navigationData: NavigationProps[] = [
  // 	{
  // 		id: 1,
  // 		title: `Trang chủ`,
  // 		link: "/admin",
  // 	},
  // 	{
  // 		id: 2,
  // 		title: `Đơn hàng`,
  // 		link: "/admin/don-hang",
  // 	},
  // 	{
  // 		id: 3,
  // 		title: `Danh sách đơn hàng chưa xử lý`,
  // 		link: "/",
  // 	},
  // ];
  useEffect(() => {
    getContact()
  }, [])
  const [data, setData] = useState<DataType[]>([])
  const [getContactDto, setGetContactDto] = useState<GetContact | null>(null)

  const getContact = async () => {
    const dto = { ...getContactDto } as GetContact
    delete dto.status
    try {
      const data = await contactAdmin.getContact(dto).then(e => e.data.data)
      createDataType(data)
    } catch (error: any) {
      Message.errorNotify(error?.response?.data?.message)
    }
  }
  const createDataType = (contacts: Contact[]) => {
    const data: DataType[] = contacts.map(e => {
      return { ...e, key: e.id }
    })
    setData(data)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên người liên hệ',
      dataIndex: 'name'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Lời nhắn',
      dataIndex: 'description'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (text, record) => (
        <>
          <Switch
            checked={text == 1 ? true : false}
            title={
              text == 1 ? CONTACT_STATUS.DA_XU_LY : CONTACT_STATUS.CHUA_XU_LY
            }
            onChange={() => statusToggle(record)}
          />
        </>
      )
    }
  ]
  const statusToggle = async (value: any) => {
    console.log(value.status)
    let status
    if (value.status == 0) {
      status = 1
    }
    if (value.status == 1) {
      status = 0
    }
    try {
      const data = await contactAdmin
        .updateContact({ ...value, ids: [value.id], status })
        .then(e => e.data.data)
      getContact()
      Message.successNotify('Cập nhật liên hệ thành công')
    } catch (error: any) {
      Message.errorNotify(error?.response?.data?.message)
    }
  }

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: changeableRowKeys => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false
            }
            return true
          })
          setSelectedRowKeys(newSelectedRowKeys)
        }
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: changeableRowKeys => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true
            }
            return false
          })
          setSelectedRowKeys(newSelectedRowKeys)
        }
      }
    ]
  }
  const optionsSelector = [
    {
      value: '1',
      label: 'Select'
    }
  ]
  const button: buttonProps = {
    isButton: false,
    style: '',
    title: '',
    link: ''
  }
  return (
    <Dashboard>
      <div className='admin__main-wrap'>
        {/* <NavigationAdmin
					header={"Danh sách đơn hàng chưa xử lý"}
					description={"Trang quản lý danh sách đơn hàng mà bạn chưa xử lý"}
					data={navigationData}
				/> */}
        <div className='admin__main-content'>
          <FilterAdminTable
            isSelector={false}
            optionsSelector={optionsSelector}
            isDatepicker={true}
            titleFilter={'Hiển thị tất cả đơn hàng từ'}
            placeholderInput={'Tìm kiếm theo tên khách hàng'}
            button={button}
          />
          <Table
            // rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>
    </Dashboard>
  )
}

export default App
