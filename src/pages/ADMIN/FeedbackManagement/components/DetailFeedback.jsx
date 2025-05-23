import { Space } from "antd"
import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"

const DetailFeedback = ({ open, onCancel }) => {


  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Chi tiết đánh giá"
      width="40vw"
      centered={false}
      footer={
        <Space className="d-flex-end">
          <ButtonCustom className="third" onClick={onCancel}>
            Đóng
          </ButtonCustom>
        </Space>
      }
    >
      <div className="center-text">
        {open?.Content}
      </div>
    </ModalCustom>
  )
}

export default DetailFeedback