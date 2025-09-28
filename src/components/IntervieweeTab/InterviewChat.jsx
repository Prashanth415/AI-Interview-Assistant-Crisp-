import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Button, List, Typography } from 'antd';

const { Text } = Typography;

const InterviewChat = ({ candidate }) => {
    const [messages, setMessages] = useState([]);
    const [answer, setAnswer] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(null);

    // Example: handle answer submission
    const handleAnswerSubmission = useCallback(() => {
        if (!answer.trim()) return;
        setMessages((prev) => [...prev, { role: 'candidate', text: answer }]);
        setAnswer('');
        // simulate AI feedback or move to next question here
    }, [answer]);

    // Effect to handle question updates
    useEffect(() => {
        if (currentQuestion) {
            setMessages((prev) => [...prev, { role: 'system', text: currentQuestion }]);
        }
    }, [currentQuestion, handleAnswerSubmission]);

    return (
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <List
                dataSource={messages}
                renderItem={(item, index) => (
                    <List.Item key={index}>
                        <Text strong={item.role === 'candidate'}>
                            {item.role === 'candidate' ? 'You: ' : 'AI: '}
                        </Text>
                        <Text>{item.text}</Text>
                    </List.Item>
                )}
                style={{ flexGrow: 1, overflowY: 'auto' }}
            />
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onPressEnter={handleAnswerSubmission}
                    placeholder="Type your answer..."
                />
                <Button type="primary" onClick={handleAnswerSubmission} style={{ marginLeft: 8 }}>
                    Send
                </Button>
            </div>
        </Card>
    );
};

export default InterviewChat;
