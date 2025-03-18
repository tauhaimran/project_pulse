import React, { useState } from 'react';
import API from '../api';

const CommentPage = () => {
    const [comment, setComment] = useState('');
    const [taskID, setTaskID] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleAddComment = async () => {
        try {
            const res = await API.post('/comments/add', {
                commentID: 'cmt001',
                madeBy: 'user001',
                taskID,
                data: comment
            });
            setResponseMessage(res.data.message);
        } catch (error) {
            setResponseMessage('Error adding comment');
        }
    };

    return (
        <div>
            <h1>Comment Section</h1>
            <input 
                type="text" 
                placeholder="Enter Task ID" 
                value={taskID} 
                onChange={(e) => setTaskID(e.target.value)}
            />
            <textarea 
                placeholder="Enter your comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button onClick={handleAddComment}>Add Comment</button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default CommentPage;
