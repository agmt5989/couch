const Couchbase = require("couchbase");
const Express = require("express");
const Cors = require("cors");
 
var app = Express();
var cluster = new Couchbase.Cluster("couchbase://localhost");
cluster.authenticate("admin", "C!p#3rSECURE");
var bucket = cluster.openBucket("test");
 
app.use(Cors());
 
app.get("/search", (request, response) => {
    var SearchQuery = Couchbase.SearchQuery;
    var query = SearchQuery.new("idx-music", SearchQuery.match(request.query.query).fuzziness(1));
    query.fields(["title", "artist"]);
    bucket.query(query, function(error, result, meta) {
        if(error) {
            return response.status(500).send({ message: error.message });
        }
        result = result.map(item => {
            return {
                id: item.id,
                score: item.score,
                title: item.fields.title,
                artist: item.fields.artist
            };
        });
        console.log(result);
        response.send(result);
    });
});
 
app.listen(3000, () => {
    console.log("Listening at :3000...");
});