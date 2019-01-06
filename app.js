const Couchbase = require("couchbase");
const Express = require("express");
const Cors = require("cors");
 
var app = Express();
var cluster = new Couchbase.Cluster("couchbase://localhost");
cluster.authenticate("admin", "C!p#3rSECURE");
var bucket = cluster.openBucket("test");
 
app.use(Cors());
 
app.get("/search", (request, response) => {
	
});
 
app.listen(3000, () => {
    console.log("Listening at :3000...");
});