import { Form, Space } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import InputCustom from "src/components/InputCustom"
import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import globalSlice from "src/redux/globalSlice"
import { globalSelector } from "src/redux/selector"
import CommonService from "src/services/CommonService"

const ChangeProfitPercent = ({ open, onCancel }) => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { profitPercent } = useSelector(globalSelector)

  const handleChangeProfitPercent = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await CommonService.changeProfitPercent({
        Percent: values?.Percent / 100
      })
      if (!!res?.isError) return toast(res?.msg)
      dispatch(globalSlice.actions.setProfitPercent(res?.data?.Percent))
      toast.success(res?.msg)
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      Percent: profitPercent
    })
  }, [])

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Thay đổi phần trăm lợi nhuận"
      width="30vw"
      centered={false}
      footer={
        <Space className="d-flex-end">
          <Space direction="horizontal">
            <ButtonCustom btnType="cancel" onClick={onCancel}>
              Đóng
            </ButtonCustom>
            <ButtonCustom
              className="primary"
              loading={loading}
              onClick={() => {
                handleChangeProfitPercent()
              }}
            >
              Lưu
            </ButtonCustom>
          </Space>
        </Space>
      }
    >
      <Form form={form}>
        <Form.Item
          name="Percent"
          rules={[
            { required: true, message: "Thông tin không được bỏ trống" }
          ]}
        >
          <InputCustom
            type="isNumber"
            placeholder="Nhập vào phần trăm lợi nhuận"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </ModalCustom>
  )
}

export default ChangeProfitPercent