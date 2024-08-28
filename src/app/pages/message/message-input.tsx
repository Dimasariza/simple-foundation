"use client"

import { Button, ButtonProps } from "primereact/button";
import { InputTextProps } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import AppButton from "@/component/button/button";
import AppInput from "@/component/input/input";
import { RootState } from "@/redux/root";
import { IChatMessage } from "@/types/chat";
import { ReplyMessageAction } from "@/redux/action/input-message-action";
const url = process.env.PUBLIC_URL || ""

function MessageInput({input, button, loading}: {input?: InputTextProps, button?: ButtonProps, loading?: boolean}) {
    const { tab } = useSelector((state: RootState) => state.QuickTabsReducer) || {};
    const replyMessage: IChatMessage = useSelector((state: RootState) => state.ReplyMessageReducer);
    const dispatch = useDispatch();

    return (
        <div className='relative z-10'>
            {
                loading && tab?.inbox?.inboxGroup == "personal" &&
                <span className="absolute left-0 w-full flex justify-center bottom-[70px]">
                    <div className="message-badge border bg-stickers-aliceblue p-[15px] text-14 ml-1 flex h-[55px] w-[670px]">
                        <Image src={url + "/icons/pc-loading.svg"} className='pi-spin' width={34} height={34} alt="loading" />
                        <span className='ml-2 tracking-[-0.05em]'>Please wait while we connect you with one of our team ...</span>
                    </div>
                </span>
            }
            {
                loading && tab?.inbox?.inboxGroup == "group" &&
                <span className="absolute left-0 w-full flex justify-center bottom-[70px]">
                    <div className="message-badge border bg-stickers-aliceblue justify-center items-center text-14 ml-1 flex h-[40px] w-[150px]">
                        <span className='ml-2 tracking-[-0.05em] text-primary-blue'>New Message</span>
                    </div>
                </span>
            }
            {
                replyMessage &&
                <div className="absolute left-5 rounded-t-border-rad p-3 bottom-[60px] w-[81.8%] border-primary-gray2 border border-b-0 bg-quick-btn-white">
                    <div className="flex w-full justify-between rounded-border-rad">
                        <span>Replying to { replyMessage?.user?.name }</span>
                        <AppButton text className="h-[12px] w-[12px]" onClick={() => dispatch(ReplyMessageAction(null))} icon={<i className="pi pi-times text-primary-gray1 text-12"></i>}/>
                    </div>
                    <p className="text-start font-medium">
                        { replyMessage?.message }
                    </p>
                </div>
            }
            <div className="flex gap-[13px] px-[20px] pb-[20px]">
                <AppInput {...input} className={classNames("w-full",{
                    "rounded-border-rad rounded-t-0": replyMessage,
                })}/>
                <Button label="Send" {...button} className="bg-primary-blue h-[40px] font-lato"/>
            </div>
        </div>
    )
}

export default MessageInput;