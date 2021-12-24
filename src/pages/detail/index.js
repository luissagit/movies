import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Image, Row, Col, List } from "antd";
import * as actions from '../../store/actions';

const Detail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, detail, error, page, totalResult } = useSelector((state) => state);

    useEffect(() => {
        if (params?.id) {
            dispatch(actions.actionGetDetail(params?.id));
        }
    }, [params?.id]);

    const detailCell = [
        {
            title: 'Actors',
            description: detail?.Actors
        },
        {
            title: 'Awards',
            description: detail?.Awards
        },
        {
            title: 'BoxOffice',
            description: detail?.BoxOffice
        },
        {
            title: 'Country',
            description: detail?.Country
        },
        {
            title: 'DVD',
            description: detail?.DVD
        },
        {
            title: 'Director',
            description: detail?.Director
        },
        {
            title: 'Genre',
            description: detail?.Genre
        },
        {
            title: 'Language',
            description: detail?.Language
        },
        {
            title: 'Metascore',
            description: detail?.Metascore
        },
        {
            title: 'Plot',
            description: detail?.Plot
        },
        {
            title: 'Production',
            description: detail?.Production
        },
        {
            title: 'Rated',
            description: detail?.Rated
        },
        {
            title: 'Release',
            description: detail?.Release
        },
        {
            title: 'Response',
            description: detail?.Response
        },
        {
            title: 'Runtime',
            description: detail?.Runtime
        },
        {
            title: 'Type',
            description: detail?.Type
        },
        {
            title: 'Website',
            description: detail?.Website
        },
        {
            title: 'Writer',
            description: detail?.Writer
        },
        {
            title: 'Year',
            description: detail?.Year
        },
    ]

    const ratings = detail?.Ratings?.map((item) => {
        return {
            title: item?.Source,
            description: item?.Value,
        }
    })
    
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title={detail?.Title}
                onBack={() => navigate('/home')}
            />
            <Row>
                <Col span={8}>
                    <Image
                        width={300}
                        src={detail?.Poster}
                        loading={loading}
                    />
                    {ratings?.length > 0 && (
                        <List
                            loading={loading}
                            header={<div>Ratings</div>}
                            itemLayout="horizontal"
                            dataSource={ratings ?? []}
                            size="small"
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item?.title}
                                    description={item?.description}
                                />
                            </List.Item>
                            )}
                        />
                    )}
                </Col>
                <Col span={16}>
                    <List
                        loading={loading}
                        itemLayout="horizontal"
                        dataSource={detailCell}
                        size="small"
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item?.title}
                                description={item?.description}
                            />
                        </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Detail;