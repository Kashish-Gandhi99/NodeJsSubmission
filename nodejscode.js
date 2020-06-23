const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/example', (req, res) => {
    var ht = Number(req.body.ht);
    var cor = Number(req.body.cor);
    if (ht <= 0) {
        var data = {
            "Error": "Initial Height can't be zero or negative"
        }
        res.status(500).json(data);
    } else if (cor <= 0) {
        var data = {
            "Error": "Theoretically COR is between 0 and 1. Practically, COR can't be zero or negative. Enter a value from 0.01 to 0.99"
        }
        res.status(500).json(data);
    } else if (cor >= 1) {
        var data = {
            "Error": "Theoretically COR is between 0 and 1. Practically, COR can't be 1 or more. Enter a value from 0.01 to 0.99"
        }
        res.status(500).json(data);
    } else {
        let coordinates = [];
        var ans = 1;
        var no_of_bounce = 1;
        var temp1 = 1 + Math.pow(cor, 2);
        var temp2 = 1 - Math.pow(cor, 2);
        var totaldist = ht * temp1 / temp2;
        var distcovered = 0
        while (ans != 0) {
            let temp = [];
            distcovered = distcovered + 2 * ht * (Math.pow(cor, 2 * no_of_bounce));
            ans = Math.pow(cor, 2 * no_of_bounce) * ht;
            temp.push(distcovered);
            temp.push(ans);
            coordinates.push(temp)
            //console.log(no_of_bounce + " :  X : " + coordinates[no_of_bounce-1][0] + " , Y : "+ coordinates[no_of_bounce-1][1] +"\n"); For Testing
            no_of_bounce = no_of_bounce + 1;
        }

        var data = {
            "Total Bounces": no_of_bounce,
            "Co-ordinates": coordinates
        }
        var distanceineachbounce = totaldist / no_of_bounce;
        res.status(200).json(data);
    }
});

const port = 8080;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});