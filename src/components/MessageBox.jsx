import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBCardFooter,
  MDBInputGroup,
} from "mdb-react-ui-kit";

const transformUsername = (username) => {
  const parts = username.split(/[._]/);
  return parts
    .filter((part) => isNaN(part)) // Filter out parts that are numbers
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1)) // Capitalize each part
    .join(" ");
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [channelId, setChannelId] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://https://my-discord-backend-jyv1r615v-dileeps-projects-103f924b.vercel.app/");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message); // Debugging

      // Filter messages by channelId
      if (message.channelId === channelId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    return () => ws.close();
  }, [channelId]);

  const createChannel = async () => {
    try {
      const response = await fetch("https://my-discord-backend-jyv1r615v-dileeps-projects-103f924b.vercel.app/create-channel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      if (response.ok) {
        const data = await response.json();
        setChannelId(data.channelId);
        console.log("Channel created successfully:", data);
      } else {
        console.error("Failed to create channel:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  const sendMessageToBackend = async () => {
    try {
      if (!channelId) {
        alert(
          "Channel is not created yet. Please enter a session ID and start chat first."
        );
        return;
      }

      const response = await fetch("https://my-discord-backend-jyv1r615v-dileeps-projects-103f924b.vercel.app/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channelId, messageContent: inputMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Message sent successfully:", data);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            username: "You",
            content: inputMessage,
            timestamp: new Date().toLocaleString(),
          },
        ]);
        setInputMessage("");
      } else {
        console.error("Failed to send message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol xs="12" md="8" lg="6" xl="4">
          <MDBCard>
          <MDBCardHeader
  className="d-flex justify-content-between align-items-center p-3"
  style={{ borderTop: "4px solid #ffa900" }}
>
  <div className="d-flex align-items-center">
    <img
      src="/me.jpg" // Update with the path to your image
      alt="Profile"
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        marginRight: "10px",
      }}
    />
    <div>
      <h6 className="mb-0">Dileep Verma</h6>
      <span style={{ fontSize: "0.8em", color: "#1FB141" }}><i
                            className="fa fa-circle online"
                            style={{
                              color: "#5cb85c",
                              marginRight: "5px",
                              fontSize: "0.7em",
                            }}
                          ></i>
                        Available</span>
    </div>
  </div>
  <div className="d-flex flex-row align-items-center">
    <span className="badge bg-warning me-3">0</span>
    <MDBIcon
      fas
      icon="minus"
      size="xs"
      className="me-3 text-muted"
    />
    <MDBIcon
      fas
      icon="comments"
      size="xs"
      className="me-3 text-muted"
    />
    <MDBIcon
      fas
      icon="times"
      size="xs"
      className="me-3 text-muted"
    />
  </div>
</MDBCardHeader>

            <div
              className="custom-scrollbar"
              style={{ height: "400px", overflowY: "auto", backgroundImage: "url('/chat-background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",}}
            >
              <MDBCardBody>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`d-flex justify-content-${
                      msg.username === "You" ? "end" : "start"
                    } mb-3`}
                    style={{
                      width: "100%",
                      maxWidth: "75%",
                      marginLeft: msg.username === "You" ? "25%" : "0",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        position: "relative",
                        marginBottom: "10px",
                        
                      }}
                    >
                      <div
                        className="message-data"
                        style={{
                          marginBottom: "5px",
                          textAlign: msg.username === "You" ? "" : "left",
                          marginRight: msg.username === "You" ? "150px" : "",
                        }}
                      >
                        <span
                          className="message-data-name"
                          style={{ fontWeight: "bold", fontSize: "0.8em" }}
                        >
                          <i
                            className="fa fa-circle online"
                            style={{
                              color:
                                msg.username === "You" ? "#6c757d" : "#5cb85c",
                              marginRight: "5px",
                              fontSize: "0.8em",
                            }}
                          ></i>
                          {msg.username === "You"
                            ? "You"
                            : transformUsername(msg.username)}
                        </span>
                      </div>
                      <p
                        className="small p-2 rounded-3 mb-1"
                        style={{
                          backgroundColor:
                            msg.username === "You" ? "#D9FDD3" : "#f5f6f7",
                          color: msg.username === "You" ? "#000" : "#000",
                          textAlign: "left",
                          position: "relative",
                          paddingBottom: "20px", // Ensure there's enough space for the timestamp
                          borderRadius: "15px",
                          padding: "10px 15px",
                          maxWidth: "75%",
                          marginLeft: msg.username === "You" ? "auto" : "18px",
                          marginRight: msg.username === "You" ? "0" : "auto",
                          wordWrap: "break-word",
                        }}
                      >
                        {msg.content}
                        <span
                          style={{
                            position: "absolute",
                            right: "10px",
                            bottom: "5px",
                            fontSize: "0.8em",
                            color: "gray",
                          }}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </MDBCardBody>
            </div>
            <MDBCardFooter
              className="text-muted d-flex justify-content-start align-items-center p-3"
              style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            >
              <img
                src="https://img.icons8.com/?size=100&id=BPc8vlw14Jj8&format=png&color=000000"
                alt="avatar 3"
                style={{ width: "40px", height: "100%" }}
              />
              {!channelId ? (
                <MDBInputGroup className="mb-0">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Enter any username"
                    type="text"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    style={{ border: "none", outline: "none" }}
                  />
                  <MDBBtn
                    color="warning"
                    style={{ paddingTop: ".55rem" }}
                    onClick={createChannel}
                  >
                    Start Chat <MDBIcon fas icon="paper-plane" />
                  </MDBBtn>
                </MDBInputGroup>
              ) : (
                <MDBInputGroup className="mb-0">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Type message"
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    style={{ border: "none", boxShadow: "none" }}
                  />
                  <a className="ms-1 text-muted" href="#!">
                    <MDBIcon fas icon="paperclip" />
                  </a>
                  <a className="ms-3 text-muted" href="#!">
                    <MDBIcon fas icon="smile" />
                  </a>
                  <a
                    className="ms-3 link-info"
                    href="#!"
                    onClick={sendMessageToBackend}
                  >
                    <MDBIcon fas icon="paper-plane" />
                  </a>
                </MDBInputGroup>
              )}
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default App;
