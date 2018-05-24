# Setup guide

1. Clone the repository: `git clone https://github.com/LumiteDubbz/Pixel`.
2. Open the folder, once unzipped, in a code editor of your choice, I use [Visual Studio Code](https://code.visualstudio.com/ "VS Code's homepage.").
3. Open the `credentials_example.json` file and rename it to `credentials.json`. Now, edit this and replace the pseudo credentials with the correct details.
4. Here's the tricky part, go to [mlab.com](https://mlab.com) and register an account on the "free" tier. Create a database. Once it is created, go to the database and click `users`. Click `create new user` and name it something memorable like "admin". Add a super secure password and **DO NOT** click "view only" as that will prevent the bot from being able to edit and create files. Edit the `credentials.json` file to make it suit your database, for example: `mongodb://admin:s3cur3_p455w0rd@fg187251.mlab.com:94294/super-cool-bot"`.
5. Open the Terminal, change directory into the location of the repository clone, for example: `cd Documents/GitHub/Pixel`.
6. Start the bot: `npm start` *or* `node src/app.js` (longer to type, faster to run the bot.)