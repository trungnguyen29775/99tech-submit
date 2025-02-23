## Overview

The Scoreboard API module is responsible for managing a real-time leaderboard that displays the top 10 users based on their scores. This module supports:

1. Fetching the top 10 scores.
2. Updating a user's score when an action is completed.
3. Preventing unauthorized score manipulation through validation and authentication mechanisms.

Since this is a real-time leaderboard, we chose to use Socket.IO for real-time communication between clients and the server.
For the first task is fetching the top 10 scores, when the user logs in, the client socket listens to the 'get-top' channel to receive updates from the server about the top 10 players., the code will be socket.on("get-top"), mean while in sever, will emit top 10 player.

For the second task, when an user do an right action to get the score, the socket client will emit to the "got-scored" channel, with an user data. The code can be socket.emit("got-scored",{username:"Trung",userId:"123"}), therefore, in the sever will get the the socket data by hang on the "got-scored" channel, then update the score of the user. For initation, the back-end will call a service to the database for storing and fetching the total player, and for everytime the player got score, the value will be updated.

The last one is security, to do this problem the website will generate a token, using JWT then when user do an action, make an API call (include User Id, Ation ID, Token ID). If both values are valid, the server updates the user's score. Otherwise, it returns an error response to the frontend.

Diagram: use this link or the screen shot I have attached in the file https://mermaid.live/view#pako:eNqlU8FqGzEQ_RWhsw3tdQ-5JC34VmLSQNhDxtKrV1grbUejlBDy75Uj2TVeO5cuLCwz781785Z50yZa6E4n_M4IBneOtkxjH1R5JmJxxk0URN16hyDz-hr8Ap7X70hoQwl9qL3KX97cVEKnbmMIMKIkqkds1tHsIOqPk6FUdmisCj5h_STvLAkugAqqihxnuxgUUvHhXRpgr1r5NjpRz9soy2Qiwz5XHzmBV1ZRKO_HsJU9c3VY8sTXVdIBu5xvs_fJSNm3fMlLbbURtXpF-WE66qoP-__QlyQr3J5DZ0Hfw5A32desJ_X1i5o8vYLTjHQSfEsSsiycQ4xN0YMseBOJWyLwCWoVXj7b9Hw2mCOrESnRttlHOP5ZH4vTH2AXrTNNOH2a3neIGa4ueCnAe0jm8J-ZmMxcmhcy2S-jF3oEj-Rsucy3faPXMmBEr7vyaYl3ve7De8FRlrh-DUZ3whkLzTFvB939opLtQtcE2k0fIOU8n2IcG-j9L-4KWN0
