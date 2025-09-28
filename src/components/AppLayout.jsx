import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../store/index'; // <<< FIX: Changed path from '../../store/index' to '../store/index'
import IntervieweeTab from './IntervieweeTab/IntervieweeTab'; // <<< FIX: Changed path from '../IntervieweeTab/' to './IntervieweeTab/'
import InterviewerTab from './InterviewerTab/InterviewerTab'; // <<< FIX: Changed path from '../InterviewerTab/' to './InterviewerTab/'
import { Layout, Tabs, Modal, Button, message } from 'antd';
import { startInterview, pauseInterview, setCurrentCandidateId } from '../store/candidateSlice'; // <<< FIX: Changed path from '../../store/candidateSlice' to '../store/candidateSlice'

const { Header, Content } = Layout;

const AppLayout = () => {
    const dispatch = useDispatch();
    const { candidates, currentCandidateId } = useSelector((state) => state.candidates);
    const [activeTab, setActiveTab] = useState('interviewee');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const currentCandidate = candidates.find(c => c.id === currentCandidateId);

    // --- Persistence & Welcome Back Modal Logic ---
    useEffect(() => {
        // If the candidate session was previously IN_PROGRESS, treat it as PAUSED on refresh
        if (currentCandidate && currentCandidate.status === 'IN_PROGRESS') {
            dispatch(pauseInterview(currentCandidateId));
            setIsModalVisible(true);
        } else if (currentCandidate && currentCandidate.status === 'PAUSED') {
            setIsModalVisible(true);
        }
    }, [currentCandidate, currentCandidateId, dispatch]);

    const handleResume = () => {
        dispatch(startInterview(currentCandidateId));
        setIsModalVisible(false);
        message.success("Interview resumed!"); 
    };

    const handleStartNew = () => {
        dispatch(setCurrentCandidateId(null));
        setIsModalVisible(false);
        message.info("Previous session dismissed. Please upload a new resume to begin.");
    };

    const tabItems = [
        { label: 'Interviewee (Chat)', key: 'interviewee', children: <IntervieweeTab /> },
        { label: 'Interviewer (Dashboard)', key: 'interviewer', children: <InterviewerTab /> },
    ];

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Header style={{ background: '#fff', padding: '0 20px', borderBottom: '1px solid #f0f0f0' }}>
                <h1 style={{ lineHeight: '64px', margin: 0 }}>
                    AI Interview Assistant
                </h1>
            </Header>
            <Content style={{ padding: '20px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={tabItems}
                    size="large"
                />
            </Content>

            <Modal
                title="Welcome Back!"
                open={isModalVisible} // Use 'open' for Antd v5+
                closable={false}
                footer={[
                    <Button key="new" onClick={handleStartNew}>
                        Start New Session
                    </Button>,
                    <Button key="resume" type="primary" onClick={handleResume}>
                        Resume Interview
                    </Button>,
                ]}
            >
                <p>
                    {currentCandidate?.name}, you have an unfinished interview session (Status: {currentCandidate?.status}).
                    Would you like to resume where you left off or start a new session?
                </p>
            </Modal>
        </Layout>
    );
};

// We wrap the main component to handle Redux persistence rehydration.
const PersistedAppLayout = () => (
    // Note: Assuming 'persistor' is exported from '../store/index' 
    <PersistGate loading={<div>Loading application state...</div>} persistor={persistor}>
        <AppLayout />
    </PersistGate>
);

export default PersistedAppLayout;
