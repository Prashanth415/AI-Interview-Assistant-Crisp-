import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ResumeUploader = ({ onDataExtracted }) => {
  const customRequest = ({ file, onSuccess, onError }) => {
    // In a real application, you'd send 'file' to a secure backend 
    // for OCR/AI extraction of PDF/DOCX content.

    if (file.type !== 'application/pdf' && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        message.error(`${file.name} is not a PDF or DOCX file.`);
        return onError("Invalid file type");
    }
    
    // *** SIMULATED EXTRACTION LOGIC ***
    const simulatedData = {
      name: 'Simulated Candidate Name',
      email: 'sim.candidate@example.com',
      phone: null, // *** Simulating a missing field ***
      resumeUrl: URL.createObjectURL(file),
    };

    // Delay to simulate processing time
    setTimeout(() => {
        onDataExtracted(simulatedData);
        message.success(`${file.name} processed successfully.`);
        onSuccess("ok");
    }, 1500);
  };

  return (
    <Upload 
      customRequest={customRequest}
      maxCount={1}
      accept=".pdf,.docx"
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />} type="primary" style={{ marginTop: 20 }}>
        Upload Resume (PDF/DOCX)
      </Button>
    </Upload>
  );
};

export default ResumeUploader;