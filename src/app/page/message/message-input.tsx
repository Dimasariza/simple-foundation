"use client"

import Image from "next/image";
import { Button, ButtonProps } from "primereact/button";
import { InputText, InputTextProps } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AppButton from "../../component/button/button";
const url = process.env.PUBLIC_URL || ""

const InputStyled = styled(InputText)`
`

function MessageInput({input, button, loading}: {input?: InputTextProps, button?: ButtonProps, loading?: boolean}) {
    const { tab } = useSelector((state: any) => state.QuickTabsReducer) || {};

    const replying = false

    return (
        <div className='relative z-10'>
            {
                loading && tab?.inbox?.inboxGroup == "personal" &&
                <span className="absolute left-0 w-full flex justify-center bottom-[70px]">
                    <div className="message-badge border bg-stickers-aliceblue p-[15px] text-[14px] ml-1 flex h-[55px] w-[670px]">
                        <Image src={url + "/icons/pc-loading.svg"} className='pi-spin' width={34} height={34} alt="loading" />
                        <span className='ml-2 tracking-[-0.05em]'>Please wait while we connect you with one of our team ...</span>
                    </div>
                </span>
            }
            {
                loading && tab?.inbox?.inboxGroup == "group" &&
                <span className="absolute left-0 w-full flex justify-center bottom-[70px]">
                    <div className="message-badge border bg-stickers-aliceblue justify-center items-center text-[14px] ml-1 flex h-[40px] w-[150px]">
                        <span className='ml-2 tracking-[-0.05em] text-primary-blue'>New Message</span>
                    </div>
                </span>
            }
            {
                replying &&
                <div className="absolute left-5 rounded-t-border-rad p-3 bottom-[60px] w-[81.8%] border-primary-gray2 border border-b-0 bg-quick-btn-white">
                    <div className="flex w-full justify-between rounded-border-rad">
                        <span>Replying to Mary Hilda</span>
                        <AppButton text className="h-[12px] w-[12px]" icon={<i className="pi pi-times text-primary-gray1 text-[12px]"></i>}/>
                    </div>
                    <p className="text-start font-medium">
                        Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.
                    </p>
                </div>
            }
            <div className="flex gap-[13px] px-[20px] pb-[20px]">
                <InputStyled {...input} className={classNames("w-full h-[40px] border-primary-gray2 border font-lato", {
                    "rounded-border-rad": replying,
                    "rounded-t-0": replying
                })}/>
                <Button label="Send" {...button} className="bg-primary-blue h-[40px] font-lato"/>
            </div>
        </div>
    )
}

export default MessageInput;