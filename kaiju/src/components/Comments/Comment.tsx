import '../../styles/components/Comment.scss'
import {useDeleteCommentMutation, useUpdateCommentMutation} from "../../features/apiSlice.ts";
import moment from "moment";
import React, {useRef, useState} from "react";

type CommentProps = {
    comment: any;
    showReplies: boolean;
    toggleReplies: (num: number) => void;
    visibleThreadId: number;
    refetchComments(): void;
    hasReplies: boolean;
}

const Comment: React.FC<CommentProps> = ({comment, showReplies, toggleReplies, visibleThreadId, refetchComments, hasReplies}) => {

    const [deleteComment] = useDeleteCommentMutation()
    const [updateComment] = useUpdateCommentMutation()
    const [editing, setEditing] = useState<boolean>(false)
    const [editComment, setEditComment] = useState<string>(comment.text);
    const childCommentRef = useRef<HTMLDivElement | null>(null);

    const onKeyDown = async (e: any) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            let submissionObj = {
                threadId: comment.threadId,
                text: editComment,
                author: comment.author,
                authorId: comment.authorId,
                taskId: comment.taskId,
                id: comment.id
            }
            try {
                await updateComment(submissionObj).unwrap()

                setEditComment('')
                setEditing(false)
                refetchComments()
            } catch(error) {
                console.error("Failed to update the comment:", error);
            }
        }
    }

    const handleDeleteComment = async () => {
        try {
            await deleteComment(comment.id).unwrap()
            refetchComments()
        } catch (error) {
            console.error("Failed to update the comment:", error);
        }
    }

    if(!showReplies && comment.threadId) {
        return null
    }

    return (
        <div ref={childCommentRef} className={`bg-gray-800 w-full min-h-[4rem] px-4 py-2 ${comment.threadId && `mx-12`}`}>
            <div className="flex gap-8">
                <p>{comment.author.replace(/@.*$/, "")}</p>
                <p>{moment(comment.date).format('MMMM Do YYYY, h:mm a')}</p>
            </div>
            {editing ?
                <textarea
                    className="p-4 bg-gray-800 h-[100px] w-full border-blue-400 border-2 rounded"
                    value={editComment}
                    onKeyDown={(e) => onKeyDown(e)}
                    onChange={(e) => setEditComment(e.target.value)}
                />
                :
                <p className="py-8">{comment.text}</p>
            }
            <div className="flex flex-row gap-8 flex-wrap">
                <button className="comment-btn-crud" onClick={() => setEditing(!editing)} type="button">Edit</button>
                {!comment.threadId &&
                    <>
                        <button className="comment-btn-crud" type="button">Reply</button>
                        {hasReplies &&
                            <button
                                className="comment-btn-crud"
                                type="button"
                                onClick={() => {
                                    toggleReplies(comment.id)
                                    if (childCommentRef.current && visibleThreadId !== comment.id) {
                                        setTimeout(() => {
                                            childCommentRef.current?.scrollIntoView({behavior: "smooth"});
                                        }, 0)
                                    }
                                }}
                            >
                                {visibleThreadId === comment.id ? "Hide Replies" : "View Replies"}
                            </button>
                        }
                    </>
                }
                <button className="comment-btn-crud" type="button" onClick={() => handleDeleteComment()}>Delete
                </button>
            </div>
        </div>
    )
}
export default Comment
