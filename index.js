const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

app.use(express.static(__dirname));

let dirName = __dirname;
let count = 0;

const display = (req, res) => {
  console.log("req", req.params["0"]);
  if (req.params["0"] === "/" && count > 0) {
    dirName = "/Users/shubhamkumbhakar/projects";
  } else {
    count++;
  }
  let currDirName = dirName + req.path;
  console.log("route", req.path, req.params.route);
  console.log("currDirName", currDirName);
  const htmlPath = currDirName + "/index.html";
  fs.readdir(currDirName, (err, files) => {
    res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Page</title>
            </head>
            <body>
                <div>hello shubham Showing the list of Files in the directory:</div>
                <p style="color:blue; cursor:pointer;"><a href="../">[Parent Directory]:</a></p>
                <p>Index of: ${currDirName}</p>
                <ul>
                    ${
                      files &&
                      files
                        .map((name) => {
                          return `<li style="color:blue; cursor:pointer;"><a href="http://localhost:8080${req.path}${name}">/${name}</a></li>`;
                        })
                        .join("")
                    }
                </ul>
            </body>
            </html>
        `);
  });
};

app.all("*", display);

app.listen(process.env.PORT || 5050, () => {
  console.log("Example app listening on port 5050!");
});
