
export default function CommetItem({ cmt }) {
   if (!cmt || !cmt.comment) {
    return null
  }
  
  const AVATAR = cmt.comment.trim().toUpperCase().split("").slice(0, 1)
  return (
    <div className='flex items-center gap-3'>
      <div className='flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm'>
        {AVATAR}
      </div>
      <div className="flex text-gray-300 text-[10px]">{cmt.comment}</div>
    </div>
  )
}

