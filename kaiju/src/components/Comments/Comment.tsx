import '../../styles/components/Comment.scss'
import {useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation} from "../../features/apiSlice.ts";
import moment from "moment";
import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";

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
    const [createComment] = useCreateCommentMutation();
    const [editing, setEditing] = useState<boolean>(false)
    const [editComment, setEditComment] = useState<string>(comment.text);
    const childCommentRef = useRef<HTMLDivElement | null>(null);
    const [isReplying, setIsReplying] = useState<boolean>(false)
    const [replyComment, setReplyComment] = useState<string>("");
    const user = useSelector((state: RootState) => state.auth.user)
    const replyRef = useRef<HTMLTextAreaElement | null>(null);

    const onKeyDown = async (e: any, type: string) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            if(type === "Edit") {
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

            if(type === "Reply") {
                let submissionObj = {
                    threadId: comment.id,
                    text: replyComment,
                    author: user.username,
                    authorId: user.userId,
                    taskId: comment.taskId,
                }

                try {
                   await createComment(submissionObj).unwrap();
                   setReplyComment("");
                   setIsReplying(false)
                   refetchComments()
                   toggleReplies(comment.id)
                } catch (e) {
                    console.log("Failed to create Reply comment")
                }
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
                    onKeyDown={(e) => onKeyDown(e, "Edit")}
                    onChange={(e) => setEditComment(e.target.value)}
                />
                :
                <p className="py-8">{comment.text}</p>
            }
            <div className="flex flex-row gap-8 flex-wrap">
                <button className="comment-btn-crud" onClick={() => setEditing(!editing)} type="button">Edit</button>
                {!comment.threadId &&
                    <>
                        <button className="comment-btn-crud" type="button" onClick={() => {
                            setIsReplying(!isReplying)
                        }}>Reply</button>
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
            {isReplying && (
                <textarea
                    className="p-4 bg-gray-800 h-[100px] w-full border-blue-400 border-2 rounded"
                    value={replyComment}
                    onKeyDown={(e) => onKeyDown(e, "Reply")}
                    onChange={(e) => setReplyComment(e.target.value)}
                    autoFocus={true}
                />
            )}
        </div>
    )
}
export default Comment
