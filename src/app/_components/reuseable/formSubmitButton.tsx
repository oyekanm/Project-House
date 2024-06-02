'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export function FormSubmitButton({text, loading, className}:{text:string, loading:boolean, className?:string}) {
  return ( 
    <Button
      disabled={loading}
      className={cn(['font-semibold text-[1.8rem] p-8 mt-8 shadow-[0px_0px_8px_5px_rgba(101, 99, 99, 0.9)] active:shadow-[0px_0px_10px_5px_rgba(201,201,201,0.9)] active:scale-95',className])}
      size={"lg"}>
      {loading? <Loader2 className='h-8 w-8 animate-spin text-white' /> :text}
    </Button>
  )
}