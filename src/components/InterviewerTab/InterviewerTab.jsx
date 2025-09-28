import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Input, Button, Typography, Drawer, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import CandidateDetail from './CandidateDetail';

const { Search } = Input;
const { Title } = Typography;

const InterviewerTab = () => {
    const candidates = useSelector((state) => state.candidates.candidates);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    const handleSearch = (value) => setSearchTerm(value.toLowerCase());

    const filteredCandidates = candidates.filter(c => 
        c.name.toLowerCase().includes(searchTerm) || 
        c.email.toLowerCase().includes(searchTerm) ||
        c.status.toLowerCase().includes(searchTerm)
    );

    const showDetail = (candidate) => {
        setSelectedCandidate(candidate);
        setIsDrawerVisible(true);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
            render: (score) => score ? `${score}/100` : 'N/A',
            sorter: (a, b) => (a.score || 0) - (b.score || 0),
            defaultSortOrder: 'descend',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'geekblue';
                if (status === 'COMPLETED') color = 'green';
                if (status === 'IN_PROGRESS') color = 'processing';
                if (status === 'PAUSED') color = 'gold';
                return <Tag color={color}>{status.replace('_', ' ')}</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button icon={<EyeOutlined />} onClick={() => showDetail(record)}>
                    View Detail
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            <Title level={3}>Candidate Dashboard</Title>
            <Search
                placeholder="Search by Name, Email, or Status"
                onSearch={handleSearch}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: 300, marginBottom: 20 }}
            />
            <Table 
                columns={columns} 
                dataSource={filteredCandidates} 
                rowKey="id" 
                pagination={{ pageSize: 10 }}
            />

            <Drawer
                title={`Details for ${selectedCandidate?.name || 'Candidate'}`}
                placement="right"
                closable={true}
                onClose={() => setIsDrawerVisible(false)}
                visible={isDrawerVisible}
                width={800}
            >
                {selectedCandidate && <CandidateDetail candidate={selectedCandidate} />}
            </Drawer>
        </div>
    );
};

export default InterviewerTab;
