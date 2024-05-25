"use client"

import { Button } from '@/components/ui/button';
import { storage } from '@/firebase.config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { CloudUpload } from 'lucide-react';
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';


type Props = {
    restName: string,
    fileUpload: any,
    setOpen: any,
}

export default function UploadImageComp({ restName, fileUpload,  setOpen }: Props) {
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




    const uploadToFirebase = async (file: any, restrantName?: string, onProgress?: any) => {
        const imageArray = file.name.split(".")
        imageArray[0] += Date.now()
        const fname = imageArray.join(".")
        // console.log( fname)
        const imageRef = ref(storage, `resturant/${restrantName}/menu/${fname}`);

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

        const newFile:any = await uploadToFirebase(files![0], restName,
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
        <div className='border-2 w-full p-4 grid items-center justify-center'>
            <div className='grid gap-4 cursor-pointer'>
                <div {...getRootProps({ className: 'dropzone grid' })}>
                    <input {...getInputProps()} />
                    <CloudUpload className='w-12 h-12 mx-auto' />
                    <p className='text-[1.4rem] font-medium text-blue-500'>Drag 'n' drop your image here</p>
                    {/* {console.log(files)} */}
                    {!files && <Button>Choose File</Button>}
                    {/* {files.length > 0 && <Button onClick={upload}>{progress > 0
                    ? `${progress}%` : `Upload ${files.length} file${files.length > 1 ? "s" : ""}`
                } </Button>} */}
                </div>
                {files && <Button onClick={upload}>{uploading
                    ? `${progress}%` : `Upload file`
                } </Button>}
            </div>
            {/* {uploading &&
                <Button
                    variant={'link'}
                    className='text-[1.2rem] font-medium text-red-500'>
                    Cancel
                </Button>
            } */}
        </div>
    )
}
