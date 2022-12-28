import { Input,Form,Modal} from 'antd'


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

export {NameModal};