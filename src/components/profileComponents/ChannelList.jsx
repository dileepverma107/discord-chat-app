import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBCard, MDBCardHeader } from 'mdb-react-ui-kit';

const ChannelList = ({ channels, onSelectChannel }) => {
  return (
    <MDBCard>
      <MDBCardHeader>Users List</MDBCardHeader>
      <MDBListGroup>
        {channels.map(channel => (
          <MDBListGroupItem key={channel.id} onClick={() => onSelectChannel(channel)} className="d-flex align-items-center">
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
            {channel.name}
          </MDBListGroupItem>
        ))}
      </MDBListGroup>
    </MDBCard>
  );
};

export default ChannelList;
