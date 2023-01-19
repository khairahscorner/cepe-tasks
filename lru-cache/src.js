import express from "express";
import LRUCache from "../lru-cache/cache.js";

var app = express();

app.listen(8081, function () {
  console.log("Express server listening on port 8081");
});

let apiCache = new LRUCache(5);
app.get("/", async (req, res) => {
  return res.json({
    message: "heree",
  });
});

app.get("/fibonacci", async (req, res) => {
  const orderNum = req.query.order;
  if (!orderNum || orderNum == "") {
    return res.status(400).send({
      message:
        "You must provide a series order with your request via the 'order' query parameter",
    });
  }
  if (orderNum < 1) {
    return res.status(400).send({
      message: "Order has to be greater than 0",
    });
  } else {
    let result;
    if (apiCache.get(parseInt(orderNum)) != -1) {
      result = {
        fibonacci: {
          order: parseInt(orderNum),
          value: apiCache.get(parseInt(orderNum)),
        },
        cached: true,
      };
    } else {
      // await fetch("http://localhost:8080/fibonacci?order=" + orderNum) //for local/app testing
      await fetch("http://fibonacci-api:8080/fibonacci?order=" + orderNum) //docker testing
        .then((res) => res.json())
        .then((body) => {
          console.log("does it reach ehre");
          result = {
            fibonacci: {
              order: body["order"],
              value: body["value"],
            },
            cached: false,
          };
          apiCache.set(body["order"], body["value"]);
        })
        .catch((err) => {
          console.log("Unable to fetch -", err);
        });
    }
    res.json(result);
  }
});

// const getResultsFromAPI = async (apiCache, orderNum, result) => {
//     await fetch("http://localhost:8080/fibonacci?order=" + orderNum)
//     .then((res) => res.json())
//     .then((body) => {
//         result = {
//             "fibonacci": {
//                 "order": body["order"],
//                 "value": body["value"]
//             },
//             "cached": false
//         }
//         apiCache.set(body["order"], body["value"]);

//     })
//     .catch((err) => {
//         console.log("Unable to fetch -", err);
//     });
// }
