import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBInputGroup,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit';

const ChatBox = ({ channel, messages, onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    onSendMessage(inputMessage, channel.id);
    setInputMessage('');
  };

  return (
    <MDBCard>
      {channel && (
        <MDBCardHeader className="d-flex align-items-center p-3">
          <img
            src="https://img.icons8.com/?size=100&id=43964&format=png&color=000000" // Update with the path to your image
            alt="User"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          <div>
            <h5 className="mb-0">{channel.name}</h5>
            <span className="text-muted" style={{ fontSize: '0.8em', color: '#1FB141' }}>
              Online
            </span>
          </div>
        </MDBCardHeader>
      )}
      <MDBCardBody className="custom-scrollbar" style={{ height: '400px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`d-flex justify-content-${msg.username === 'You' ? 'end' : 'start'} mb-3`}>
            <div>
              <p className="small p-2 rounded-3 mb-1" style={{ backgroundColor: msg.username === 'You' ? '#00A783' : '#f5f6f7', color: msg.username === 'You' ? '#fff' : '#000' }}>
                {msg.content}
              </p>
              <p className="small text-muted mb-0">{msg.username} - {msg.timestamp}</p>
            </div>
          </div>
        ))}
      </MDBCardBody>
      <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <MDBInputGroup className="mb-0">
          <input className="form-control form-control-lg" placeholder="Type message" type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} style={{ border: 'none', boxShadow: 'none' }} />
          <MDBBtn color="warning" style={{ paddingTop: '.55rem' }} onClick={handleSendMessage}>
            <MDBIcon fas icon="paper-plane" />
          </MDBBtn>
        </MDBInputGroup>
      </MDBCardFooter>
    </MDBCard>
  );
};

export default ChatBox;
