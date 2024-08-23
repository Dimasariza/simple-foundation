"use client"

import Image from "next/image";
import { Button } from "primereact/button";
import { InputText, InputTextProps } from "primereact/inputtext";
import { useSelector } from "react-redux";
import styled from "styled-components";
const url = process.env.PUBLIC_URL || ""

const InputStyled = styled(InputText)`
`

function AppMessegeInput(props: InputTextProps | any) {
    const { tab } = useSelector((state: any) => state.QuickTabsReducer) || {};

    return (
        <div className='relative z-10'>
            {
                props?.loading && tab?.inbox?.inboxGroup == "personal" &&
                <span className="absolute left-0 w-full flex justify-center bottom-[70px]">
                    <div className="messege-badge border bg-stickers-aliceblue p-[15px] text-[14px] ml-1 flex h-[55px] w-[670px]">
                        <Image src={url + "/icons/pc-loading.svg"} className='pi-spin' width={34} height={34} alt="loading" />
                        <span className='ml-2 tracking-[-0.05em]'>Please wait while we connect you with one of our team ...</span>
                    </div>
                </span>
            }
            {
                props?.loading && tab?.inbox?.inboxGroup == "group" &&
                <span className="absolute left-0 w-full flex justify-center bottom-[70px]">
                    <div className="messege-badge border bg-stickers-aliceblue justify-center items-center text-[14px] ml-1 flex h-[40px] w-[150px]">
                        <span className='ml-2 tracking-[-0.05em] text-primary-blue'>New Messege</span>
                    </div>
                </span>
            }
            <div className="flex gap-[13px] px-[20px] pb-[20px]">
                <InputStyled {...props} className="w-full h-[40px] border-primary-gray2 border font-lato"/>
                <Button label="Send" className="bg-primary-blue h-[40px] font-lato"/>
            </div>
        </div>
    )
}

export default AppMessegeInput;