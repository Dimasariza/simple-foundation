"use client"

import Image from "next/image";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";
const url = process.env.PUBLIC_URL || ""


const InputStyled = styled(InputText)`
`

function AppMessegeInput({loading}: {loading: boolean}) {
    return (
        <div className='relative z-10'>
            {
                loading && 
                <span className="absolute left-0 w-full flex justify-center bottom-[70px]">
                    <div className="messege-badge border bg-stickers-aliceblue p-[15px] text-[14px] ml-1 flex h-[55px] w-[670px]">
                        <Image src={url + "/icons/pc-loading.svg"} className='pi-spin' width={34} height={34} alt="loading" />
                        <span className='ml-2 tracking-[-0.05em]'>Please wait while we connect you with one of our team ...</span>
                    </div>
                </span>
            }
            <div className="flex gap-[13px] px-[20px] pb-[20px]">
                <InputStyled className="w-full h-[40px] border-primary-gray2 border"/>
                <Button label="Send" className="bg-primary-blue h-[40px] "/>
            </div>
        </div>
    )
}

export default AppMessegeInput;