import type {NextPage} from 'next'
import {useEffect, useState} from "react";
import getConfig from "next/config";
import {Alert, Col, Row, Space, Spin} from "antd";
import YouTube from "react-youtube";
import {CommentOutlined, DislikeOutlined, LikeOutlined} from "@ant-design/icons";

const {publicRuntimeConfig} = getConfig();

const Home: NextPage = () => {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // To disable submit button at the beginning.
    useEffect(() => {
        setLoading(true);
        fetch(`${publicRuntimeConfig.apiUrl}/videos`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
            .then(value => value.json())
            .then(value => {
                setVideos(value);
                setLoading(false);
            })
            .catch(reason => {
                console.error(reason);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Spin spinning={loading}>
                {(!videos || videos!.length === 0) && <Alert className="text-center" message="No shared videos" type="info"/>}
                {videos && Array.from(videos).map((video: any, i) => {
                    return (
                        <Row key={i} justify="center" style={{marginBottom: '2rem'}}>
                            <Col span={24}>
                                <Space size={20}>
                                    <YouTube videoId={video.id}/>
                                    <div>
                                        <Space direction="vertical">
                                            <h4>{video.title}</h4>
                                            {
                                                video.shareBy &&
                                                <div className="d-flex align-items-center">
                                                    <strong>Shared by: {video.shareBy}</strong>
                                                </div>
                                            }
                                            <Space>
                                                <div className="d-flex align-items-center">
                                                    <span style={{fontSize: '16px', marginRight: '3px'}}>{video.viewCount}</span>
                                                    <LikeOutlined style={{fontSize: '18px'}}/>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <span style={{fontSize: '16px', marginRight: '3px'}}>{video.dislikeCount}</span>
                                                    <DislikeOutlined style={{fontSize: '18px'}}/>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <span style={{fontSize: '16px', marginRight: '3px'}}>{video.commentCount}</span>
                                                    <CommentOutlined style={{fontSize: '18px'}}/>
                                                </div>
                                            </Space>
                                            <div>
                                                <h5>Description</h5>
                                                <p>{video.description}</p>
                                            </div>
                                        </Space>
                                    </div>
                                </Space>
                            </Col>
                        </Row>
                    );
                })}
            </Spin>
        </>
    )
}

export default Home
