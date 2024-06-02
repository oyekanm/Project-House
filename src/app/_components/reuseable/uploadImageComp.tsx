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

export default function UploadImageComp({ restName, fileUpload, setOpen }: Props) {
    const [files, setFiles] = useState([])
    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)
    const { getRootProps, getInputProps } = useDropzone({
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
        const imageRef = ref(storage, `app/images/${fname}`);

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
        let newFiles = []
        for (let i = 0; i < files?.length; i++) {
            let imageFile = files[i];

            const uploadRes = await uploadToFirebase(imageFile,
                (v: any) =>
                    setProgress(v)
            )
            newFiles.push(uploadRes)

            // console.log(uploadRes)
        }
        const updatedImgFile = newFiles.map((r: any) => {
            return {
                // name: r.name,
                url: r.downloadUrl,
                key: r.metadata?.fullPath,
            }
        })

        setUploading(false)
        setFiles([])
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
                    <CloudUpload className='w-12 h-12 mx-auto text-slate-700' />
                    <p className='text-[1.4rem] font-medium text-slate-700'>Drag 'n' drop your image here</p>
                    {!files && <Button type='button'>Choose Files</Button>}
                </div>
                {files.length>0 && <Button onClick={upload}>{uploading
                    ? `${progress.toFixed(0)}%` : `Upload file`
                } </Button>}
            </div>
        </div>
    )
}
