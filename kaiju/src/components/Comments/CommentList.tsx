import Comment from "./Comment.tsx";
import '../../styles/components/Comment.scss'
import {useCreateCommentMutation, useGetCommentsQuery} from "../../features/apiSlice.ts";
import {useState} from "react";

const CommentList = ({taskId}: {taskId: string}) => {
    const [createComment] = useCreateCommentMutation();
    const [comment, setComment] = useState<String>('');
    const {data: commentData} = useGetCommentsQuery(taskId)
    // We show replies only of parent threadId
    const [visibleThreadId, setShowVisibleThreadId] = useState<number>(0)

    const onKeyDown = (e) => {
        if(e.key === 'Enter' && e.key !== 'shiftKey') {
            console.log("Enter was pressed!")
            e.preventDefault();
            //createComment(comment)
            setComment('')
        }
    }

    const toggleReplies = (num: number) => {
        console.log("toggleReplies", num, "visibleThreadId", visibleThreadId)
        if(visibleThreadId === num) {
            setShowVisibleThreadId(0)
        } else {
            setShowVisibleThreadId(num)
        }
    }

    return (
        <div className="w-3/4 flex flex-col gap-5">
            <div className="flex flex-col">
                <textarea
                    className="p-4 bg-gray-800 h-[100px]"
                    placeholder="Write a comment and press ENTER to submit"
                    onKeyDown={(e) => onKeyDown(e)}
                    onChange={(e) => {
                      console.log(e)
                      setComment(e.target.value);
                    }}/>
            </div>
            {commentData && commentData.map((commentObj: any) => {
                return <Comment
                    comment={commentObj}
                    key={commentObj.id}
                    showReplies={visibleThreadId === commentObj.threadId}
                    toggleReplies={toggleReplies}
                    visibleThreadId={visibleThreadId}
                />
            })}
        </div>
    )
}
export default CommentList
