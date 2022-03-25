import XLTheme from "../../components/xLTheme";
import "./carousel.scss";
import {Button, Card, Form, Image, Input, Modal, Space, Switch, Table, Tag} from "antd";
import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
    deleteCarousel,
    getAllCarousels,
    getAllCountries,
    getAllLanguages,
    updateCarouselConfig
} from "../../utils/requestUrl";
import {openNotification} from "../../utils/tools";
import {CarouselData} from "../../data/CarouselData";
import {CarouselConfigData} from "../../data/CarouselConfigData";
import Text from "antd/es/typography/Text";

const CarouselPage = (props:any) => {

    const [items,setItems] = useState<Array<CarouselData>>([]);
    const [config,setConfig] = useState<CarouselConfigData>();
    const [loading,setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [countries,setCountries] = useState<Array<any>>()
    const [languages,setLanguages] = useState<Array<any>>()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [detail,setDetail] = useState<JSX.Element>();

    useEffect(()=>{
        setLoading(true);
        getAllLanguages([],function (res:any) {
            if (res.data.status===200){
                const languagesArray = []
                for(let i = 0;i<res.data.languages.length;i++){
                    languagesArray[res.data.languages[i].id] = res.data.languages[i];
                }
                setLanguages(languagesArray);
            }
        },function (error:any) {
            console.log(error);
        });
        getAllCountries([],function (res:any) {
            if (res.data.status===200){
                const countryArray = [];
                for(let i=0;i<res.data.countries.length;i++){
                    countryArray[res.data.countries[i].id] = res.data.countries[i];
                }
                setCountries(countryArray);
            }
        },function (error:any) {
            console.log(error);
        });
        initCarousel();
    },[]);

    const initCarousel = () => {
        getAllCarousels([],function (res:any) {
            setLoading(false);
            console.log(res);
            if (res.data.status===200){
                setItems(res.data.carousel);
                setConfig(res.data.config);
                const jsonObject = JSON.parse(res.data.config.config);
                form.setFieldsValue({
                    status: res.data.config.status,
                    animation: jsonObject.animation,
                });
            }
            openNotification(res.data.msg);
        },function (error:any) {
            console.log(error);
            setLoading(false);
        });
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getCourselDetail = ()=>{

    }

    const detailClick = (id:number)=>{
        let item = null;
        for (let i = 0; i < items.length; i++){
            if (items[i].id === id) {
                item = items[i];
                break;
            }
        }
        let lanStr = "";
        if (item?.lan){
            const lanArray = JSON.parse(item?.lan);
            if (languages){
                for(let i = 0; i < lanArray.length ; i++){
                    lanStr += languages[parseInt(lanArray[i])].name + " ";
                }
            }
        }
        let countryStr = "";
        if (item?.countries){
            const countryArray = JSON.parse(item?.countries);
            if (countries){
                for(let i = 0; i < countryArray.length ; i++){
                    countryStr += countries[parseInt(countryArray[i])].name + " ";
                }
            }
        }
        let detailDiv = <div className="carousel-detail">
            <div className="carousel-detail-item button-groups">
                <Button danger type="primary" onClick={()=>{deleteItem(id)}}>delete</Button>
            </div>
            <div className="carousel-detail-item">
                <Image src={item?.image} width={150}/>
            </div>
            <div className="carousel-detail-item">
                <div className="carousel-detail-title">languages:</div>
                {lanStr}
            </div>
            <div className="carousel-detail-item">
                <div className="carousel-detail-title">countries:</div>
                {countryStr}
            </div>
            <div className="carousel-detail-item">
                <div className="carousel-detail-title">link:</div>
                {item?.link}
            </div>
            <div className="carousel-detail-item">
                <div className="carousel-detail-title">status:</div>
                {
                    item?.status===false?
                        <Tag key="block" color="red">Block</Tag>:
                        <Tag key="active" color="green">Active</Tag>
                }
            </div>
            <div className="carousel-detail-item">
                <div className="carousel-detail-title">order:</div>
                {item?.order}
            </div>
            <div className="carousel-detail-item">
                <div className="carousel-detail-title">update time:</div>
                {item?.utime}
            </div>
            <div className="carousel-detail-item">
                <label className="carousel-detail-title">create time:</label>
                {item?.ctime}
            </div>
        </div>
        setDetail(detailDiv);
        setIsModalVisible(true);
    }

    const deleteItem = (id:number) => {
        setLoading(true)
        deleteCarousel({id:id},function (res:any) {
            if (res.data.status===200){
                initCarousel();
                setIsModalVisible(false);
            }
            openNotification(res.data.msg);
            setLoading(false)
        },function (error:any) {
            console.log(error);
            setIsModalVisible(false);
            setLoading(false);
        })
    }
    const changeStatus = (id:number)=>{
        props.history.push({
            pathname:"/carousel/update",
            state:{id:id}
        });
    }

    const dealLanguage = (lan:string)=>{
        let lanStr = "";
        if (lan){
            const lanArray = JSON.parse(lan);
            if (languages){
                for(let i = 0; i < lanArray.length ; i++){
                    lanStr += languages[parseInt(lanArray[i])].name + " ";
                }
            }
        }
        return lanStr;
    }

    const dealCountry = (country:string)=>{
        let countryStr = "";
        if (country){
            const countryArray = JSON.parse(country);
            if (countries){
                for(let i = 0; i < countryArray.length ; i++){
                    countryStr += countries[parseInt(countryArray[i])].name + " ";
                }
            }
        }
        return countryStr;
    }
    const columns = [
        {
            title:"ID",
            dataIndex: "id",
            key:"id",
        },
        {
            title:"Image",
            dataIndex: "image",
            key:"image",
            render:(image:any)=>(
                <Image width={120} src={image}/>
            )
        },
        {
            title:"link",
            dataIndex: "link",
            key:"link",
        },
        {
            title:"Language",
            dataIndex: "lan",
            key:"lan",
            render:(lan:string)=>(dealLanguage(lan))
        },
        {
            title:"Countries",
            dataIndex: "countries",
            key:"countries",
            render:(countries:string)=>(dealCountry(countries))
        },
        {
            title:"Duration",
            dataIndex: "exp",
            key:"exp",
        },
        {
            title:"Status",
            dataIndex:"status",
            key:"status",
            render:(status:any)=>(
                status===false?
                    <Tag key="block" color="red">Block</Tag>
                    :<Tag key="active" color="green">Active</Tag>
            )
        },
        {
            title:"Action",
            key:"action",
            render:(text:any,record:any)=>(
                <Space size="middle">
                    <a onClick={()=>changeStatus(record.id)}>update</a>
                    <a onClick={()=>detailClick(record.id)}>detail</a>
                </Space>
            )
        }
    ];

    const onUpdateClick = (value:any)=>{
        setLoading(true);
        const params = {
            id: config?.id,
            status: value.status,
            animation: value.animation,
        }
        updateCarouselConfig(params,function (res:any) {
            setLoading(false);
            if (res.data.status===200){
                window.location.href = "/carousel/all";
            }
        },function (error:any) {
            console.log(error);
            setLoading(false)
        });
    }
    const tabListNoTitle = [
        {
            key: 'list',
            tab: 'list',
        },
        {
            key: 'config',
            tab: 'config',
        },
    ];

    const contentListNoTitle:any = {
        config: <div className="carousel-config">
            <Form
                onFinish={onUpdateClick}
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                form={form}
            >
                <Form.Item
                    label="激活"
                    name="status"
                    rules={[{ required: true }]}
                >
                    <Switch className="xlSwitch" />
                </Form.Item>
                <Form.Item
                    label="Animation"
                    name="animation"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <div>
                    <Button type="primary"  htmlType="submit" className="submit-button">更新分类</Button>
                </div>
            </Form>
        </div>,
        list: <Table dataSource={items} columns={columns} />,
    };

    const TabsCard = () => {
        const [activeTabKey, setActiveTabKey] = useState('list');

        const onTab2Change = (key: React.SetStateAction<string>) => {
            setActiveTabKey(key);
        };


        return (
            <Card
                style={{ width: '100%' }}
                tabList={tabListNoTitle}
                activeTabKey={activeTabKey}
                onTabChange={key => {
                    onTab2Change(key);
                }}
            >
                {contentListNoTitle[activeTabKey]}
            </Card>
        )
    }

    return (
        <XLTheme loading={loading} subTitle="列表" title="滚动屏" extra={[
            <Button ghost={true}>
                <NavLink to="/carousel/create">
                    创建滚动屏
                </NavLink>
            </Button>
        ]}>
            <TabsCard />
            <Modal
                title="Carousel Detail"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ hidden:true }}
                cancelButtonProps={{ hidden:false }}
            >
                {detail}
            </Modal>
        </XLTheme>
    );
};

export default CarouselPage;