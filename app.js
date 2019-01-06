const Couchbase = require("couchbase");
const Express = require("express");
const Cors = require("cors");
 
var app = Express();
var cluster = new Couchbase.Cluster("couchbase://localhost");
cluster.authenticate("example", "123456");
var bucket = cluster.openBucket("example");
 
app.use(Cors());
 
app.get("/search", (request, response) => { });
 
app.listen(3000, () => {
    console.log("Listening at :3000...");
});