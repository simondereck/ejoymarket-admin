import {Button, Form, Input, Layout, Select, Spin, Switch, Upload, message, DatePicker, Space} from "antd";
import React, {useEffect, useState} from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './carousel.scss';
import XLTheme from "../../components/xLTheme";
import {beforeUpload, getBase64, openNotification} from "../../utils/tools";
import {
    createCarousel,
    getAllCountries, getAllLanguages,
    uploadCarouselImage,
} from "../../utils/requestUrl";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Option } = Select;


const CarouselCreate = (props:any) => {

    const [loading,setLoading] = useState<boolean>(false);
    const [imageLoading,setImageLoading] = useState<boolean>(false);
    const [imageUrl,setImageUrl] = useState('');
    const [path,setPath] = useState('');

    const [languages,setLanguages] = useState<Array<JSX.Element>>();
    const [countries,setCountries] = useState<Array<JSX.Element>>();
    useEffect(()=>{
        getAllCountries([],function (res:any) {
            if (res.data.status===200){
                const countryArray = [];
                for(let i=0;i<res.data.countries.length;i++){
                    const country = res.data.countries[i];
                    countryArray.push(<option key={country.id}>{country.name + ' --- ' + country.english}</option>);
                }
                setCountries(countryArray);
            }
        },function (error:any) {
            console.log(error);
        });
        getAllLanguages([],function (res:any) {
            if (res.data.status===200){
                const languagesArray = []
                for(let i = 0;i<res.data.languages.length;i++){
                    const language = res.data.languages[i];
                    languagesArray.push(<option key={language.id}>{language.name}</option>);
                }
                setLanguages(languagesArray);
            }
        },function (error:any) {
            console.log(error);
        })
    },[])

    const disabledDate = (current:any) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }


    const onSubmit = (values:any) => {
        setLoading(true);
        if(path===''){
            setLoading(false);
            openNotification("please make sure you have upload carousel image success");
            return;
        }
        const params = {
            exp: '',
            image: path,
            status: false,
            order: 99,
            lan:'',
            link:null,
            countries:'',
        };

        if (values.status){
            params["status"] = true;
        }

        if(values["order"]){
            params["order"] = values["order"];
        }

        if (!values.lan || values.lan.size===0){
            openNotification("please select languages!");
            setLoading(false);
            return ;
        }
        if (!values.countries || values.countries.size === 0){
            openNotification("please select countries");
            setLoading(false);
            return ;
        }
        params["lan"] = JSON.stringify(values.lan);
        params["countries"] = JSON.stringify(values.countries);

        if (values.exp){
            params["exp"] = values.exp[0].format("YYYY-MM-DD hh:mm") + "--" + values.exp[1].format("YYYY-MM-DD hh:mm");
        }

        if (values.link){
            params["link"] = values.link;
        }
        console.log(params);
        createCarousel(params,function (result:any) {
            console.log(result);
            setLoading(false);
            openNotification(result.data.msg);
            if (result.data.status===200){
                props.history.push("/carousel/all");
            }
        },function (error:any) {
            console.log(error);
            setLoading(false);
        });
    }


    const uploadButton = (
        <div>
            {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    const selectLanguage = function (value:any) {
        console.log(value);
    }

    const selectCountries = function (value:any) {
        console.log(value);
    }

    const uploadImage = function (params:any) {
        console.log(params);
        const form = new FormData();

        const file = params.file;
        form.append('image', file);
        uploadCarouselImage(form,function (res:any) {
            console.log(res)
            setImageLoading(false);
            if (res.data.status===200){
                openNotification("image upload success!");
                setPath(res.data.filename);
                setImageUrl(res.data.filename);
            }else{
                openNotification("image upload faild!");
            }

        },function (error:any) {
            console.log(error);
            console.log(error.message);
        })

    }

    return (
        <XLTheme title="??????" subTitle="?????????" loading={loading}>
            <div className="create-category-form">
                <Form
                    onFinish={onSubmit}
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    layout="vertical"
                >
                    <div className="double-items-layout">
                        <div className="double-items-long image-items">
                            <Upload
                                name="image"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                customRequest={uploadImage}
                                beforeUpload={beforeUpload}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '200px' }} /> : uploadButton}
                            </Upload>
                        </div>
                        <div className="double-items-short">
                            <Form.Item
                                label="??????"
                                name="status"
                            >
                                <Switch />
                            </Form.Item>
                        </div>

                    </div>
                    <div className="double-items-layout">
                        <div className="double-items-long">
                            <Form.Item
                                label="Link"
                                name="link"
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="double-items-short">
                            <Form.Item
                                label="?????? (0 - 99,?????????????????????)"
                                name="order"
                            >
                                <Input />
                            </Form.Item>
                        </div>

                    </div>

                    <div className="double-items-layout">
                        <div className="double-items-long">
                            <Form.Item
                                label="??????"
                                name="countries"
                                required = {true}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select countries"
                                    onChange={selectCountries}
                                >
                                    {countries}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="double-items-layout">
                        <div className="double-items-long">
                            <Form.Item
                                label="??????"
                                name="lan"
                                required = {true}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select languages"
                                    onChange={selectLanguage}
                                >
                                    {languages}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="double-items-layout">
                        <div className="double-items-long">
                            <Form.Item
                                label="????????????"
                                name="exp"
                            >
                                <RangePicker
                                    disabledDate={disabledDate}
                                    showTime />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="single-item-layout">
                        <Button type="primary"  htmlType="submit" className="submit-button">??????????????????</Button>
                    </div>
                </Form>
            </div>
        </XLTheme>
    );
};

export default CarouselCreate;