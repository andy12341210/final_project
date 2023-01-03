import { Input,Form,Modal} from 'antd'
import { event_imgs,ability_imgs } from './PictureIndex';
import { eventText } from './text/event';
import styled from 'styled-components';

const Event_img = styled.img`
    position:relative;
    width:20vw
`

const NameModal = ({ open, onCreate ,onCancel}) => {
    const [form] = Form.useForm();
    return (
    <Modal
    open={open}
    title="輸入你的暱稱"
    okText="確認"
    cancelText="取消"
    onCancel={onCancel}
    onOk={() => {
        form.validateFields()
        .then((values) => {
            form.resetFields();
            onCreate(values.name);
        })
        .catch((e) => {
        window.alert(e);
        });
    }}
    >
    <Form form={form} layout="vertical"
    name="form_in_modal">
    <Form.Item name="name" label="暱稱"
        rules={[
        {
            required: true,
            message: '請輸入暱稱',
        },
        ]}>
    <Input />
    </Form.Item>
    </Form>
    </Modal>
);};

const BuyModal = ( onCreate )=>{
    Modal.confirm({
        title:"是否購買土地",
        okText:"是",
        cancelText:"否",
        content:(
            <p>價格：100</p>
        ),
        onCancel(){},
        onOk(){onCreate()}
    })
}

const upGradeModal = ( onCreate )=>{
    Modal.confirm({
        title:"是否升級土地",
        okText:"是",
        cancelText:"否",
        content:(
            <p>價格：100</p>
        ),
        onCancel(){},
        onOk(){onCreate()}
    })
}

const EventModal = (no)=>{
    Modal.info({
        title: eventText[no],
        content: (
          <Event_img src={event_imgs[no]}/>
        ),
        onOk() {},
      });
}

const AbilityModal = (no)=>{
    let close = false;
    const closeModal = ()=>{close=true}
    Modal.info({
        content: (
          <Event_img src={ability_imgs[no]}/>
        ),
        onOk() {},
      });
    
}

export {NameModal,BuyModal,EventModal,upGradeModal,AbilityModal};