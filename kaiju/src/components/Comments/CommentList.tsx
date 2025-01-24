import Comment from "./Comment.tsx";
import '../../styles/components/Comment.scss'
import {useCreateCommentMutation, useGetCommentsQuery} from "../../features/apiSlice.ts";
import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";

const CommentList = ({taskId}: {taskId: string}) => {
    const [createComment] = useCreateCommentMutation();
    const [comment, setComment] = useState<string>("");
    const {data: commentData, refetch: refetchComments} = useGetCommentsQuery(taskId, {
        refetchOnMountOrArgChange: true,
    })
    // We show replies only of parent threadId
    const [visibleThreadId, setShowVisibleThreadId] = useState<number>(0)
    const user = useSelector((state: RootState) => state.auth.user)

    const onKeyDown = (e: any) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            let submissionObj = {
                threadId: null,
                text: comment,
                author: user.username,
                authorId: user.userId,
                taskId: taskId,
            }
            createComment(submissionObj)
            setComment('')
            refetchComments()
        }
    }

    const toggleReplies = (num: number) => {
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
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                />
            </div>
            {commentData && commentData.map((commentObj: any) => {
                return <Comment
                    comment={commentObj}
                    key={commentObj.id}
                    showReplies={visibleThreadId === commentObj.threadId}
                    toggleReplies={toggleReplies}
                    visibleThreadId={visibleThreadId}
                    refetchComments={refetchComments}
                />
            })}
        </div>
    )
}
export default CommentList
