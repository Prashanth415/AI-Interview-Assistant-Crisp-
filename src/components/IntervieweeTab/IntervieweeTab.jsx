import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Result, Button, message } from 'antd';
import { addCandidate, startInterview } from '../../store/candidateSlice';
import ResumeUploader from '../Shared/ResumeUploader';
import InterviewChat from './InterviewChat';
import { RobotOutlined } from '@ant-design/icons';

const IntervieweeTab = () => {
    const dispatch = useDispatch();
    const { candidates, currentCandidateId } = useSelector((state) => state.candidates);
    
    // Find the candidate currently active in the chat
    const currentCandidate = candidates.find(c => c.id === currentCandidateId);
    
    // Determine if the chat should be active
    const isChatActive = currentCandidate && ['PENDING_INFO', 'IN_PROGRESS', 'PAUSED', 'COMPLETED'].includes(currentCandidate.status);

    // --- Resume Upload Handler ---
    const handleDataExtracted = (data) => {
        dispatch(addCandidate(data));
        message.success('Profile created! Starting information confirmation.');
    };

    // --- Starting the Interview ---
    const handleStartInterview = () => {
        if (currentCandidate.name && currentCandidate.email && currentCandidate.phone) {
            dispatch(startInterview(currentCandidateId));
        } else {
            message.error("Please fill in all missing profile details in the chat before starting the interview.");
        }
    };

    return (
        <Card style={{ minHeight: 500, padding: 0 }}>
            {/* RENDER CHAT OR UPLOADER */}
            {isChatActive ? (
                <div style={{ height: '500px' }}>
                    <InterviewChat candidate={currentCandidate} />
                </div>
            ) : (
                <Result
                    icon={<RobotOutlined style={{ color: '#1890ff' }} />}
                    title="Welcome to the AI Interview Assistant!"
                    subTitle="Please upload your resume (PDF/DOCX) to start the assessment for the Full Stack (React/Node) role."
                    extra={<ResumeUploader onDataExtracted={handleDataExtracted} />}
                />
            )}
            
            {/* START/RESUME BUTTON */}
            {currentCandidate && currentCandidate.status === 'PENDING_INFO' && (
                <Button 
                    type="primary" 
                    size="large"
                    onClick={handleStartInterview} 
                    style={{ marginTop: 20, width: '100%' }}
                >
                    Start Interview Now
                </Button>
            )}
        </Card>
    );
};

export default IntervieweeTab;
