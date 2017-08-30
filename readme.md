# Unity Simple Zombie FPS Co-op Scoring Server
Scoring Server for Unity Simple Zombie FPS Co-op Example.

## Features
- User Authentication (Login/Register)
- Saving user's play data to the server permanently.


## How to run?
### Requirements
- You need a public accessible server with fixed ip address.
- You need to install these softwares into your server:
    - MongoDB@3.4.7
    - Redis@3.2.0
    - Node.js@6.9.5
- Make sure to open port 5010 to public access.

### Database Setups
1. Create DB named ZombieScore
2. Create new user named "zombieadmin" with password "freshmeat".
3. Grant read/write roles of ZombieScore DB to zombieadmin

### Redis Setups
Nothing XD

### Run the server
1. You have to install Node.js dependencies first. Install via NPM:
```bash
$ npm install
```

2. Run the server.
```bash
$ node server
```

3. Highly recommend to run server with PM2 or Forever module. The server must be run while you gameplaying.
```bash
$ sudo npm install -g pm2
$ pm2 start server.js --name "ZombieScoreServer"
```

### Ok, just show me how
Ok, well.. Here's the video how to:

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/eimqfonYaF8/0.jpg)](https://www.youtube.com/watch?v=eimqfonYaF8)

Click the above image to redirect to youtube.


### About authentication
Authentication system is just really simple, because it's focused on implementation, not for product ready state.
When user logged in, server returns string token, and it saves into the server's local memory(Redis).
After then user can access other APIs that requires authentication with that token.
When user logged out, server will destroy that token.

Oh, I forgot to remove tokens when user just shutting down the client.
If you make something product inspired by these examples, don't forget to remove token after some specific times that user didn't anything.

Also in this demonstration, I didn't checked that user try to access while it's already logged in. You have to check this too.

Please don't tell me why you made this something this blabla, it's just demonstration XD
I just focused on Logic itself, not perfection!

Thanks!


## See Also
- [Game Client](https://github.com/rico345100/unity-zombie-defense-fps-multiplayer-example)
- [Web Scoreboard](https://github.com/rico345100/unity-zombie-defense-fps-multiplayer-scoreboard)
