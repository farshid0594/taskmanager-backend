const { createServer } = require("http");

const httpServer = createServer();

httpServer.listen(8000, () => {
  console.log("server running");
});
