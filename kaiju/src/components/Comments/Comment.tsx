import '../../styles/components/Comment.scss'
import {useDeleteCommentMutation} from "../../features/apiSlice.ts";
import moment from "moment";
import {useState} from "react";

type CommentProps = {
    comment: any;
    showReplies: boolean;
    toggleReplies: (num: number) => void;
    visibleThreadId: number;
}

const Comment: React.FC<CommentProps> = ({comment, showReplies, toggleReplies, visibleThreadId}) => {

    const [deleteComment] = useDeleteCommentMutation()
    const [editing, setEditing] = useState<boolean>(false)

    if(!showReplies && comment.threadId) {
        return null
    }

    return (
        <div className={`bg-gray-800 w-full min-h-[4rem] px-4 py-2 ${comment.threadId && `mx-12`}`}>
            <div className="flex gap-8">
                <p>{comment.author.replace(/@.*$/, "")}</p>
                <p>{moment(comment.date).format('MMMM Do YYYY, h:mm a')}</p>
            </div>
            {editing ?
                <textarea className="p-4 bg-gray-800 h-[100px] w-full border-blue-400 border-2 rounded" value={comment.text}/>
                :
                <p className="py-8">{comment.text}</p>
            }
            <div className="flex flex-row gap-8 flex-wrap">
                <button className="comment-btn-crud" onClick={() => setEditing(!editing)} type="button">Edit</button>
                {!comment.threadId &&
                    <>
                        <button className="comment-btn-crud" type="button">Reply</button>
                        <button
                            className="comment-btn-crud"
                            type="button"
                            onClick={() => toggleReplies(comment.id)}
                        >
                            {visibleThreadId === comment.id ? "Hide Replies" : "View Replies"}
                        </button>
                    </>
                }
                <button className="comment-btn-crud" type="button" onClick={() => deleteComment(comment.id)}>Delete
                </button>
            </div>
        </div>
    )
}
export default Comment
