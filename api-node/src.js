var express = require("express");
var app = express();

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/fibonacci", (req, res) => {
    const orderNum = req.query.order;
    if(!orderNum || orderNum == "") {
        return res.status(400).send({
            message: "You must provide a series order with your request via the 'order' query parameter"
         });
    }
    if(orderNum < 1) {
        return res.status(400).send({
            message: "Order has to be greater than 0"
         });
    } else {
        let result = {
            "Order": orderNum,
            "Value": fibonacci(orderNum)
        }

        res.json(result);
    }
  });

  //also used recursive_fibonacci in submission, now updated to match the provided app
app.get("/recursive-fibonacci", (req, res) => {
    const orderNum = req.query.order;

    if(!orderNum || orderNum == "") {
        return res.status(400).send({
            message: "You must provide a series order with your request via the 'order' query parameter"
         });
    }
    if(orderNum < 1) {
        return res.status(400).send({
            message: "Order has to be greater than 0"
         });
    } else {
        let result = {
            "Order": orderNum,
            "Value": recursive_fibonacci(orderNum)
        }
    
        res.json(result);
    }
  });

  //unlike provided app, a mistake I made was mine started from 0 - now fixed
const fibonacci = (num) => {
    if(num == 1) {
        return 1;
    } else {
        let previous = 0;
        let current = 1;

        for(let i = 1; i < num; i++) {
            let result = previous + current;
            previous = current;
            current = result;
        }
        return current;
    }
}

const recursive_fibonacci = (num) => {
    if(num == 0) {
        return 0;
    }
    if(num == 1) {
        return 1;
    } else {
        return recursive_fibonacci(num - 1) + recursive_fibonacci(num - 2);
    }
}
