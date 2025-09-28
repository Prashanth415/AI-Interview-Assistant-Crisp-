import React from 'react';
import { Card, Descriptions, Tag, Typography, Divider, Collapse } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const CandidateDetail = ({ candidate }) => {
    if (!candidate) {
        return <p>Select a candidate to view details.</p>;
    }

    const { name, email, phone, status, score, summary, interviewProgress } = candidate;
    const { questionData } = interviewProgress;

    const getStatusTag = (status) => {
        let color = 'blue';
        let icon = <ClockCircleOutlined />;
        if (status === 'COMPLETED') { color = 'green'; icon = <CheckCircleOutlined />; }
        if (status === 'PAUSED') { color = 'gold'; icon = <ExclamationCircleOutlined />; }
        if (status === 'IN_PROGRESS') { color = 'processing'; icon = <ClockCircleOutlined />; }
        return <Tag color={color} icon={icon}>{status.replace('_', ' ')}</Tag>;
    };

    return (
        <div>
            <Title level={4}>Profile Summary</Title>
            <Descriptions bordered size="small" column={1}>
                <Descriptions.Item label="Name">{name}</Descriptions.Item>
                <Descriptions.Item label="Email">{email}</Descriptions.Item>
                <Descriptions.Item label="Phone">{phone || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Status">{getStatusTag(status)}</Descriptions.Item>
                <Descriptions.Item label="Final Score">
                    <Text strong style={{ fontSize: '1.2em', color: score >= 70 ? 'green' : (score >= 50 ? 'orange' : 'red') }}>
                        {score !== null ? `${score}/100` : 'Not yet calculated'}
                    </Text>
                </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">AI Final Summary</Divider>
            <Card style={{ backgroundColor: '#f9f9f9' }}>
                <Text italic>{summary || 'Interview not yet completed.'}</Text>
            </Card>

            <Divider orientation="left">Detailed Q&A History ({questionData.length} Questions)</Divider>
            
            <Collapse accordion>
                {questionData.map((q, index) => (
                    <Panel 
                        header={`Q${index + 1}: ${q.level} - ${q.text || 'Question not yet generated'}`} 
                        key={q.id}
                        extra={
                            q.score !== null ? 
                            <Tag color={q.score >= 6 ? 'success' : 'error'}>Score: {q.score}/10</Tag> : 
                            <Tag color="default">Pending</Tag>
                        }
                    >
                        <Descriptions column={1} size="small" layout="vertical" bordered>
                            <Descriptions.Item label="Candidate Answer">
                                <Text code>{q.answer || (q.timeLeft === 0 ? 'TIME EXPIRED (No answer provided)' : 'N/A')}</Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="AI Feedback">
                                <Text type={q.score >= 6 ? 'success' : 'danger'}>
                                    {q.aiFeedback || 'Feedback pending submission.'}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Time Taken / Duration">
                                {q.submittedTime ? 
                                    `${q.timerDuration - q.timeLeft} seconds taken` : 
                                    `Duration: ${q.timerDuration} seconds`}
                            </Descriptions.Item>
                        </Descriptions>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default CandidateDetail;
