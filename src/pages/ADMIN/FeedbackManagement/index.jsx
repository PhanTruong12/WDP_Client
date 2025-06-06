import { Col, Rate, Row, Space, Tag } from "antd"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ListIcons from "src/components/ListIcons"
import ConfirmModal from "src/components/ModalCustom/ConfirmModal"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import SpinCustom from "src/components/SpinCustom"
import TableCustom from "src/components/TableCustom"
import FeedbackService from "src/services/FeedbackService"
import DetailFeedback from "./components/DetailFeedback"


const FeedbackManagement = () => {

  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [total, setTotal] = useState(0)
  const [openDetailFeedback, setOpenDetailFeedback] = useState(false)
  const [pagination, setPagination] = useState({
    TextSearch: "",
    CurrentPage: 1,
    PageSize: 10,
  })

  const getListFeedback = async () => {
    try {
      setLoading(true)
      const res = await FeedbackService.getListFeedback(pagination)
      if (!!res?.isError) return toast.error(res?.msg)
      setListData(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getListFeedback()
  }, [pagination])

  const handleDeleteFeedback = async (id) => {
    try {
      setLoading(true)
      const res = await FeedbackService.deleteFeedback(id)
      if (!!res?.isError) return toast.error(res?.msg)
      toast.success(res?.msg)
      getListFeedback()
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: "STT",
      width: 50,
      align: "center",
      render: (_, record, index) => (
        <div className="text-center">{pagination?.PageSize * (pagination?.CurrentPage - 1) + index + 1}</div>
      ),
    },
    {
      title: "Tên khách hàng",
      width: 100,
      dataIndex: "CustomerName",
      key: "CustomerName",
      align: "center",
      render: (_, record, index) => (
        <div className="text-center">{record?.Barber?.FullName}</div>
      ),
    },
    {
      title: "Tên barber",
      width: 100,
      dataIndex: "BarberName",
      key: "BarberName",
      align: "center",
      render: (_, record, index) => (
        <div className="text-center">{record?.Barber?.FullName}</div>
      ),
    },
    {
      title: "Đánh giá",
      width: 80,
      dataIndex: "Rate",
      key: "Rate",
      align: "center",
      render: (val) => (
        <div className="text-center">
          <Rate
            allowHalf
            disabled
            value={val}
            style={{
              fontSize: "15px"
            }}
          />
        </div>
      ),
    },
    // {
    //   title: "Trạng thái",
    //   width: 80,
    //   dataIndex: "IsDeleted",
    //   key: "IsDeleted",
    //   align: "center",
    //   render: (val) => (
    //     <Tag className="p-5 fs-16" color={!val ? "success" : "error"}>
    //       {
    //         !val ? "Đã xóa" : "Hiển thị"
    //       }
    //     </Tag>
    //   ),
    // },
    {
      title: "Chức năng",
      width: 70,
      key: "Function",
      align: "center",
      render: (_, record) => (
        <Space>
          <ButtonCircle
            title="Xem chi tiết"
            icon={ListIcons?.ICON_VIEW}
            onClick={() => setOpenDetailFeedback(record)}
          />
          {/* <ButtonCircle
            title="Xóa đánh giá"
            icon={ListIcons.ICON_DELETE}
            disabled={record?.IsDeleted}
            onClick={() => {
              ConfirmModal({
                description: `Bạn có chắc chắn muốn xóa đánh giá này không?`,
                onOk: async close => {
                  handleDeleteFeedback(record?._id)
                  close()
                }
              })
            }}
          /> */}
        </Space>
      ),
    },
  ]


  return (
    <SpinCustom spinning={loading}>
      <Row>
        <Col span={24} className="d-flex-sb">
          <div className="title-type-1">
            QUẢN LÝ ĐÁNH GIÁ
          </div>
        </Col>
        <Col span={24} className="mt-30">
          <TableCustom
            isPrimary
            bordered
            noMrb
            showPagination
            dataSource={listData}
            columns={columns}
            editableCell
            sticky={{ offsetHeader: -12 }}
            textEmpty="Không có dữ liệu"
            rowKey="_id"
            pagination={
              !!pagination?.PageSize
                ? {
                  hideOnSinglePage: total <= 10,
                  current: pagination?.CurrentPage,
                  pageSize: pagination?.PageSize,
                  responsive: true,
                  total,
                  showSizeChanger: total > 10,
                  locale: { items_per_page: "" },
                  onChange: (CurrentPage, PageSize) =>
                    setPagination(pre => ({
                      ...pre,
                      CurrentPage,
                      PageSize,
                    })),
                }
                : false
            }
          />
        </Col>

        {
          !!openDetailFeedback &&
          <DetailFeedback
            open={openDetailFeedback}
            onCancel={() => setOpenDetailFeedback(false)}
          />
        }

      </Row>
    </SpinCustom>
  )
}

export default FeedbackManagement