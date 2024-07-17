import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import ChannelList from './ChannelList';
import ChatBox from './ChatBox';

const App = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch('http://localhost:3001/channels');
        const data = await response.json();
        setChannels(data);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    fetchChannels();
  }, []);

  useEffect(() => {
    if (selectedChannel) {
      // Fetch messages for the selected channel if needed
    }
  }, [selectedChannel]);

  const handleSelectChannel = channel => {
    setSelectedChannel(channel);
    // Clear the current messages and fetch new messages for the selected channel
    setMessages([]);
  };

  const handleSendMessage = async message => {
    try {
      const response = await fetch('http://localhost:3001/send-message-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelId: selectedChannel.id, messageContent: message }),
      });
      if (response.ok) {
        setMessages(prevMessages => [
          ...prevMessages,
          { username: 'You', content: message, timestamp: new Date().toLocaleString() },
        ]);
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (

<MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
<MDBRow className="d-flex justify-content-center">
<MDBCol md="3" lg="3" xl="3">
          <ChannelList channels={channels} onSelectChannel={handleSelectChannel} />
        </MDBCol>
        <MDBCol md="8" lg="6" xl="4">
          {selectedChannel ? (
            <ChatBox channel={selectedChannel} messages={messages} onSendMessage={handleSendMessage} />
          ) : (
            <p>Please select a channel to start chatting.</p>
          )}
        </MDBCol>
</MDBRow>
</MDBContainer>
  );
};

export default App;
