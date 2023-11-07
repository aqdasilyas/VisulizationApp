// src/services/webSocket.js

import io from 'socket.io-client';
import { API_BASE_URL } from "@env"

const socket = io(`${API_BASE_URL}`); // Replace with your server URL

export default socket;
