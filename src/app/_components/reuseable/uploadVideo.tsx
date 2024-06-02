"use client"

import { Button } from '@/components/ui/button';
import { storage } from '@/firebase.config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { CloudUpload } from 'lucide-react';
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogClose, } from '@/components/ui/dialog'



type Props = {
    fileUpload: any,
    setOpen: any,
    open: boolean
}

export default function UploadVideo({ fileUpload, setOpen, open }: Props) {
    const [files, setFiles] = useState(null)
    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)
    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        // accept: 'image/*',
        onDrop: (acceptedFiles: any) => {
            // console.log(acceptedFiles)
            setFiles(acceptedFiles);
        }
    });




    const uploadToFirebase = async (file: any, onProgress?: any) => {
        const imageArray = file.name.split(".")
        imageArray[0] += Date.now()
        const fname = imageArray.join(".")
        // console.log( fname)
        const imageRef = ref(storage, `app/videos/${fname}`);

        const uploadTask = uploadBytesResumable(imageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    onProgress && onProgress(progress);
                    // console.log(progress)
                    // console.log(snapshot.bytesTransferred / snapshot.totalBytes)
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error);
                    reject(error);
                },
                async () => {
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
                    resolve({
                        downloadUrl,
                        metadata: uploadTask.snapshot.metadata,
                    });
                }
            );
        });

    };

    const upload = async () => {
        if (!files) return;
        setUploading(true)

        const newFile: any = await uploadToFirebase(files![0],
            (v: any) =>
                setProgress(v)
        )
        // console.log(newFile)
        const updatedImgFile = {
            url: newFile?.downloadUrl,
            key: newFile?.metadata?.fullPath,
        }

        // console.log(updatedImgFile)

        setUploading(false)
        setFiles(null)
        await fileUpload(updatedImgFile)
        // setImage(updatedImgFile)
        setOpen(false)
    }



    // console.log(, imageArray)
    return (
        <div>
            <Dialog
                // open={1 > 0}
                open={open}
                onOpenChange={() => setOpen(false)}>
                <DialogContent className='h-[60%] max-w-[600px]'>
                    <DialogHeader className='text-left'>
                        <DialogTitle className='text-[2rem]'>Upload your video</DialogTitle>
                        <DialogDescription className='text-[1.6rem]'>
                            Upload your video
                        </DialogDescription>
                        <div className={`flex justify-start w-full h-[50%] !mt-[2rem]`}>
                            <div className='border-2 w-full p-4 grid items-center justify-center'>
                                <div className='grid gap-4 cursor-pointer'>
                                    <div {...getRootProps({ className: 'dropzone grid' })}>
                                        <input {...getInputProps()} />
                                        <CloudUpload className='w-12 h-12 mx-auto text-slate-700' />
                                        <p className='text-[1.4rem] font-medium text-slate-700'>Drag & drop your image here</p>
                                        {!files && <Button type='button'>Choose File</Button>}
                                    </div>
                                    {files && <Button onClick={upload}>{uploading
                                        ? `${progress.toFixed(0)}%` : `Upload file`
                                    } </Button>}
                                </div>
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}
