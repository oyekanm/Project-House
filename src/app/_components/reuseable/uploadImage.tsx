import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogClose, } from '@/components/ui/dialog'
import UploadImageComp from './uploadImageComp'


type Props = {
    open: any,
    setOpen: any,
    fileUpload:any
}

export default function UploadImage({ open, setOpen, fileUpload }: Props) {

    return (
        <div>
            <Dialog
                // open={1 > 0}
                open={open}
                onOpenChange={() => setOpen(false)}>
                <DialogContent className='h-[60%] max-w-[600px]'>
                    <DialogHeader className='text-left'>
                        <DialogTitle className='text-[2rem]'>Upload your image</DialogTitle>
                        <DialogDescription className='text-[1.6rem]'>
                            Upload your image
                        </DialogDescription>
                        <div className={`flex justify-start w-full h-[50%] !mt-[2rem]`}>
                            <UploadImageComp
                                restName='new'
                                fileUpload={fileUpload}
                                setOpen={setOpen}
                            />
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
