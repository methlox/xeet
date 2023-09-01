import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { Box, Button, Container, Input, Text } from "@chakra-ui/react";


const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <Container bgColor="#02070D" h={'100vh'} w='100%' maxWidth='2000px'>
      <br />
      <Box bgColor="#008F8C" p={6} alignItems='center'>
        <div>
          <Text fontFamily='kayak' fontSize={80} color={'white'}>Lobby</Text>
          <form onSubmit={handleSubmitForm}>
            <Text htmlFor="email" fontFamily='sf-m' fontSize={25}>
              Email ID
            </Text>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired='true'
              focusBorderColor='black'
            />
            <br />
            <Text htmlFor="room" fontFamily='sf-m' fontSize={25}>Room Code</Text>
            <Input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              isRequired='true'
              focusBorderColor='black'
            />
            <br />
            <Button type='submit' marginTop={3}>Join</Button>
          </form>
        </div>
      </Box>
    </Container>
  );
};

export default LobbyScreen;
