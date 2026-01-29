import { AiFillEye, AiOutlineMessage } from "react-icons/ai"
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from "react-router-dom"

import 'dayjs/locale/ru';
export default function PostItem({ post }) {
    dayjs.extend(relativeTime);
    
    if (!post) {
        return (
            <div className="text-xl text-center text-white py-10">
                Загрузка...
            </div>
        );
    }

    return (
        <Link to={`/${post._id}`}>
            <div className='flex flex-col basis-1/4 grow'>
                <div className={post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"}>
                    <img src={`http://localhost:3002/${post?.imgUrl}`} alt="img" className="object-cover w-full" />
                </div>
                <div className='flex justify-between items-center pt-2'>
                    <div className='text-xs text-white opacity-50'>
                        {post.username}
                    </div>
                    <div className='text-xs text-white opacity-50'>
                        {post?.createdAt && (
                            <p>{dayjs(post.createdAt).locale('ru').format('DD MMM YYYY')}</p>
                        )}
                    </div>
                </div>
                <div className='text-white text-xl'>{post.title}</div>
                <p className='text-white opacity-60 text-xs pt-4 line-clamp-3'>{post.text}</p>

                <div className='flex gap-3 items-center mt-2'>
                    <button className='flex items-center gap-2 text-xs text-white opacity-50'>
                        <AiFillEye /> <span>{post.views}</span>
                    </button>
                    <button className='flex items-center gap-2 text-xs text-white opacity-50'>
                        <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
                    </button>
                </div>
            </div>
        </Link>
    );
}
