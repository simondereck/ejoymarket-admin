import {Button, Form, Input, Select, Switch} from "antd";
import React, {useState} from "react";
import TextArea from "antd/es/input/TextArea";
import {CloseOutlined} from "@ant-design/icons";
const { Option } = Select;
const { Search } = Input;

const pluginTypes = {
    INPUT:"input",
    TEXTAREA:"textarea",
    SWITCHER:"switcher",
    CHECKBOX:"checkbox",
    DATEPICKER:"datepicker",
    TIMEPICKER:"timepicker",
    RANGE:"range",
    CITES:"cites"
}
Object.freeze(pluginTypes);

const pluginTitle =  (
    <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true,message:"Plugin title label can't be blank!" }]}
    >
        <Input />
    </Form.Item>
)

const pluginRequire = (
    <Form.Item
        label="Is required?"
        name="require"
        rules={[{ required: true }]}
    >
        <Select
            placeholder="require option"
        >
            <Option value="false">false</Option>
            <Option value="true">true</Option>
        </Select>
    </Form.Item>
)


const pluginSearch = (
    <Form.Item
        label="Search filed?"
        name="search"
        rules={[{ required: true }]}
    >
        <Select
            placeholder="search option"
        >
            <Option value="false">false</Option>
            <Option value="true">true</Option>
        </Select>
    </Form.Item>
)

const InputPlugins = (props: { confirm: any; onDelete:any}) =>{
    // email , number , password , address
    const onClick = (values:any) => {
        if (props.confirm){
            const plugin = (
                <div className="plugin-item">
                    <div className="plugin-item-close">
                        <CloseOutlined onClick={()=>{props.onDelete(values)}}/>
                    </div>
                    <div>
                        <label>{values.title}</label>
                        <div><Input type={values.type} /></div>
                        <div className="plugin-note">
                            <div>Is require:{values.required?"true":"false"}</div>
                            <div>Is search:{values.search?"true":"false"}</div>
                        </div>
                    </div>
                </div>
            )
            props.confirm(values,pluginTypes.INPUT,plugin);
        }
    }


    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onClick}
            >
                {pluginTitle}
                <Form.Item
                    label="Type"
                    name="type"
                    rules={[{ required: true,message:"Plugin type should be picked!" }]}
                >
                    <Select
                        placeholder="type"
                    >
                        <Option value="email">email</Option>
                        <Option value="number">number</Option>
                        <Option value="password">password</Option>
                        <Option value="address">address</Option>
                    </Select>
                </Form.Item>
                {pluginRequire}
                {pluginSearch}
                <Button type="primary" htmlType="submit" className="submit-button">Create</Button>
            </Form>
        </div>
    )
}

const TextareaPlugin = (props:{confirm:any;onDelete:any}) => {

    const onClick = (values:any)=> {
        if (props.confirm) {
            const plugin = (
                <div className="plugin-item">
                    <div className="plugin-item-close">
                        <CloseOutlined onClick={()=>{props.onDelete(values)}}/>
                    </div>
                    <div>
                        <label>{values.title}</label>
                        <div><TextArea /></div>
                        <div className="plugin-note">
                            <div>Is require:{values.required?"true":"false"}</div>
                            <div>Is search:{values.search?"true":"false"}</div>
                        </div>
                    </div>
                </div>
            )
            props.confirm(values,pluginTypes.TEXTAREA,plugin);
        }
    }
    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onClick}
            >
                {pluginTitle}
                {pluginRequire}
                {pluginSearch}
                <Button type="primary" htmlType="submit" className="submit-button">Create</Button>

            </Form>
        </div>
    )
}

const SwitchPlugin = (props:{confirm:any;onDelete:any}) => {

    const onClick = (values:any)=> {
        if (props.confirm) {
            const plugin = (
                <div className="plugin-item">
                    <div className="plugin-item-close">
                        <CloseOutlined onClick={()=>{props.onDelete(values)}}/>
                    </div>
                    <div>
                        <label>{values.title}</label>
                        <div>
                            <Switch checkedChildren="激活" unCheckedChildren="关闭" className="xlSwitch" />
                        </div>
                        <div className="plugin-note">
                            <div>Is require:{values.required?"true":"false"}</div>
                            <div>Is search:{values.search?"true":"false"}</div>
                        </div>
                    </div>
                </div>
            )
            props.confirm(values,pluginTypes.TEXTAREA,plugin);
        }
    }

    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onClick}
            >
                {pluginTitle}
                {pluginRequire}
                {pluginSearch}
                <Button type="primary" htmlType="submit" className="submit-button">Create</Button>

            </Form>
        </div>
    )
}

const CheckboxPlugin = (props:{confirm:any;onDelete:any}) =>{

    const onClick = (values:any)=> {
        if (props.confirm) {
            const plugin = (
                <div className="plugin-item">
                    <div className="plugin-item-close">
                        <CloseOutlined onClick={()=>{props.onDelete(values)}}/>
                    </div>
                    <div>
                        <label>{values.title}</label>
                        <div>
                            <Switch checkedChildren="激活" unCheckedChildren="关闭" className="xlSwitch" />
                        </div>
                        <div className="plugin-note">
                            <div>Is require:{values.required?"true":"false"}</div>
                            <div>Is search:{values.search?"true":"false"}</div>
                        </div>
                    </div>
                </div>
            )
            props.confirm(values,pluginTypes.TEXTAREA,plugin);
        }
    }
    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onClick}
            >
                {pluginTitle}
                {pluginRequire}
                {pluginSearch}
                <Form.Item
                    label="Values (用 空格 或者 , 隔开)"
                    name="values"
                >
                    <TextArea  className="xlTextArea"/>
                </Form.Item>
                <Button type="primary" htmlType="submit" className="submit-button">Create</Button>

            </Form>
        </div>
    )
}

const DatePickerPlugin = (props:{confirm:any;onDelete:any}) => {
    const onClick = (values:any)=> {
        if (props.confirm) {
            const plugin = (
                <div className="plugin-item">
                    <div className="plugin-item-close">
                        <CloseOutlined onClick={()=>{props.onDelete(values)}}/>
                    </div>
                    <div>
                        <label>{values.title}</label>
                        <div>
                            <Input type="date" max={values.max} min={values.min}/>
                        </div>
                        <div className="plugin-note">
                            <div>Is require:{values.required?"true":"false"}</div>
                            <div>Is search:{values.search?"true":"false"}</div>
                        </div>
                    </div>
                </div>
            )
            props.confirm(values,pluginTypes.TEXTAREA,plugin);
        }
    }
    return  (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onClick}
            >
                {pluginTitle}
                <Form.Item
                    label="Max-date"
                    name="max"
                >
                    <Input type="date"/>
                </Form.Item>
                <Form.Item
                    label="Min-date"
                    name="min"
                >
                    <Input type="date"/>
                </Form.Item>
                <Form.Item
                    label="往期不可选"
                    name="extra"
                >
                    <Select>
                        <Option value="0">false</Option>
                        <Option value="1">true</Option>
                    </Select>
                </Form.Item>
                {pluginRequire}
                {pluginSearch}
                <Button type="primary" htmlType="submit" className="submit-button">Create</Button>

            </Form>
        </div>
    )
}

const TimePickerPlugin = (props:{confirm:any;onDelete:any}) => {
    const onClick = (values:any)=> {
        if (props.confirm) {
            const plugin = (
                <div className="plugin-item">
                    <div className="plugin-item-close">
                        <CloseOutlined onClick={()=>{props.onDelete(values)}}/>
                    </div>
                    <div>
                        <label>{values.title} -- time from {values.start} to {values.end}</label>
                        <div>
                            <Input type="time" min={values.start} max={values.end}/>
                        </div>
                        <div className="plugin-note">
                            <div>Is require:{values.required?"true":"false"}</div>
                            <div>Is search:{values.search?"true":"false"}</div>
                        </div>
                    </div>

                </div>
            )
            props.confirm(values,pluginTypes.TEXTAREA,plugin);
        }
    }
    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onClick}
            >
                {pluginTitle}
                <Form.Item
                    label="Start Time"
                    name="start"
                >
                    <Input type="time" />
                </Form.Item>
                <Form.Item
                    label="End Time"
                    name="end"
                >
                    <Input type="time" />
                </Form.Item>
                {pluginRequire}
                {pluginSearch}
                <Button type="primary" htmlType="submit" className="submit-button">Create</Button>
            </Form>
        </div>
    )
}

const RangePlugin = (props:{confirm:any;onDelete:any}) =>{
    const onClick = (values:any)=> {
        if (props.confirm) {
            const plugin = (
                <div className="plugin-item">
                    <div className="plugin-item-close">
                        <CloseOutlined onClick={()=>{props.onDelete(values)}}/>
                    </div>
                    <div>
                        <label>{values.title} -- values form {values.min} to {values.max}</label>
                        <div>
                            <Input type="range" min={values.min} max={values.max}/>
                        </div>
                        <div className="plugin-note">
                            <div>Is require:{values.required?"true":"false"}</div>
                            <div>Is search:{values.search?"true":"false"}</div>
                        </div>
                    </div>

                </div>
            )
            props.confirm(values,pluginTypes.TEXTAREA,plugin);
        }
    }
    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onClick}
            >
                {pluginTitle}
                <Form.Item
                    label="Min"
                    name="min"
                    rules={[{ required: true }]}
                >
                    <Input type="number"/>
                </Form.Item>
                <Form.Item
                    label="Max"
                    name="max"
                    rules={[{ required: true }]}
                >
                    <Input type="number"/>
                </Form.Item>
                {pluginRequire}
                {pluginSearch}
                <Button type="primary" htmlType="submit" className="submit-button">Create</Button>
            </Form>
        </div>
    )
}

const CitesSelectPlugin = (props:{confirm:any;onDelete:any}) =>{

    const onClick = (values:any) => {
        const plugin = (
            <div className="plugin-item">
                <div className="plugin-item-close">
                    <CloseOutlined onClick={()=>{props.onDelete(values)}}/>
                </div>
                <div>
                    <label>{values.title}</label>
                    <div>
                        <Search placeholder="input search text" value="75002 -- paris" disabled={true} style={{ width: 200 }} />
                    </div>
                    <div className="plugin-note">
                        <div>Is require:{values.required?"true":"false"}</div>
                        <div>Is search:{values.search?"true":"false"}</div>
                    </div>
                </div>

            </div>
        )

        props.confirm(values,pluginTypes.TEXTAREA,plugin);

    }

    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onClick}
            >
                {pluginTitle}
                {pluginRequire}
                {pluginSearch}
                <Button type="primary" htmlType="submit" className="submit-button">Create</Button>
            </Form>
        </div>
    )
}


export {
    pluginTypes,
    InputPlugins,
    TextareaPlugin,
    SwitchPlugin,
    CheckboxPlugin,
    DatePickerPlugin,
    TimePickerPlugin,
    RangePlugin,
    CitesSelectPlugin
}