import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import { List, Card, Input, Divider, PageHeader, Image, notification, Button } from 'antd';
import { Link } from 'react-router-dom';
const { Search } = Input;
const { Meta } = Card;

const Home = () => {
    const { loading, data, error, page, totalResult } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    
    useEffect(() => {
        if (keyword.length > 0) {
            dispatch(actions.actionGetIndex({
                s: keyword,
                page: page
            }))
        }
    }, [keyword, page]);

    const openNotificationWithIcon = type => {
        notification[type]({
          message: error.message,
        });
      };

    useEffect(() => {
        if (error) {
            openNotificationWithIcon('error');
        }
    }, [error]);

    const Footer = () => {
        if (data?.length < totalResult) {
            return (
                <Button type="primary" block onClick={() => dispatch(actions.actionSetPage(page + 1))}>Load More</Button>
            )
        }
        return null;
    }

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Movies"
                extra={[
                    <Search
                        onSearch={(value) => {
                            setKeyword(value)
                            dispatch(actions.actionSetPage(1))
                        }}
                    />
                ]}
            />
            <Divider />
            <List
                loading={loading}
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 5,
                    xl: 7,
                    xxl: 9,
                }}
                dataSource={data ?? []}
                footer={<Footer />}
                renderItem={item => (
                <List.Item>
                     <Card
                        hoverable
                        style={{ width: 150 }}
                        cover={<Image alt={item?.Title} src={item?.Poster} />}
                    >
                        <Meta title={<Link to={`/detail/${item?.imdbID}`}>{item?.Title}</Link>} description={item?.Year} />
                    </Card>
                </List.Item>
                )}
            />
        </div>
    )
}

export default Home;
