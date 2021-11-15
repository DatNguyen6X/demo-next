import {NextPage} from "next";
import {Alert, Button, Card, Form, Input} from "antd";
import {useState} from "react";
import getConfig from "next/config";
import {authHeader} from "../helpers/api/api-handler";

const {publicRuntimeConfig} = getConfig();

const ShareYoutube: NextPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const onFinish = (values: any) => {
        setLoading(true);
        setError('');
        setSuccess('');
        fetch(`${publicRuntimeConfig.apiUrl}/share-youtube`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', ...authHeader(`${publicRuntimeConfig.apiUrl}/share-youtube`)},
            credentials: 'include',
            body: JSON.stringify(values)
        })
            .then(value => value.json())
            .then(value => {
                if (value && value.success) {
                    setSuccess('Shared success.');
                    form.resetFields();
                }
                if (value && !value.success) {
                    setError('Shared failed.');
                }
                setLoading(false);
            })
            .catch(reason => {
                setLoading(false);
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card title={'Share a Youtube movie'}>
            {success && <Alert message={success} type="success" className="mb-4"/>}
            {error && <Alert message={error} type="error" className="mb-4"/>}
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Youtube Url"
                    name="youtubeUrl"
                    rules={[{required: true, message: 'This field is required!'}]}
                >
                    <Input type={"url"}/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Share
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ShareYoutube