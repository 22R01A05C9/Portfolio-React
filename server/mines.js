const cryptojs = require("crypto-js");

module.exports = function (app, conn) {

    function getrand() {
        return Math.floor(Math.random() * 16);
    }

    async function incrementgamecount() {
        let db = conn.db("website");
        let stats = db.collection("stats")
        stats.findOneAndUpdate({ app: "mines" }, { $inc: { count: 1 } })
    }

    async function setgame(gameid) {
        let mines = conn.db("website");
        let games = mines.collection("mines");
        games.insertOne({ gameid: gameid, status: "active" });

    }

    async function removegame(gameid) {
        let mines = conn.db("website");
        let games = mines.collection("mines");
        games.deleteOne({ gameid: gameid });
    }

    async function findgame(gameid) {
        let mines = conn.db("website");
        let games = mines.collection("mines");
        return await games.findOne({ gameid: gameid });
    }

    async function creategame(req, res) {
        let gameid = Math.floor(Math.random() * 9000) + 1000;
        while ((await findgame(gameid)) !== null) {
            gameid = Math.floor(Math.random() * 9000) + 1000;
        }
        let rands = [];
        let nb = parseInt(req.body.bombs);
        if (!nb || nb > 4) {
            res.json({ msg: "Invalid Request" });
            return;
        }
        let i = 0;
        while (i < nb) {
            let rand = getrand();
            let found = false;
            rands.forEach((value) => {
                if (value === rand) found = true;
            });
            if (!found) {
                rands.push(rand);
                i++;
            }
        }
        let l = [];
        for (let i = 0; i < 16; i++) {
            let found = false;
            rands.forEach((value) => {
                if (value === i) found = true;
            });
            if (found) l.push(1);
            else l.push(0);
        }
        let jtoken = cryptojs.AES.encrypt(
            JSON.stringify({
                game: l,
                ct: Date.now(),
                mt: Date.now() + 600000,
                bomb: rands,
                gameid: gameid,
                mines: nb,
            }),
            process.env.MINES_API_KEY
        ).toString();
        setgame(gameid);
        setTimeout(() => {
            removegame(gameid)
        }, 60 * 1000 * 10)
        res.json({ token: jtoken, bombs: req.body.bombs, gameid: gameid });
        incrementgamecount()
    }

    app.post("/mines/creategame", creategame);

    async function getdata(req, res) {
        let token = req.body.token;
        let move = req.body.move;
        let data = JSON.parse(cryptojs.AES.decrypt(token, process.env.MINES_API_KEY).toString(cryptojs.enc.Utf8));
        if (!data || !data.game || !data.ct || !data.mt || !data.bomb || !data.gameid) {
            res.json({ msg: "Invalid Token" });
            return;
        }
        let ct = Date.now();
        if (ct > data.mt) {
            res.json({ msg: "Time Out" });
            return;
        }
        gamestatus = await findgame(data.gameid);
        if (gamestatus === null) {
            res.json({ msg: "Game Not Found" });
            return;
        }
        let bombs = data.bomb;
        if (gamestatus.status !== "active") {
            res.json({ msg: "already game over", bombs: bombs });
            return;
        }
        let out = false;
        bombs.forEach((value) => {
            if (value === parseInt(move)) {
                out = true;
                removegame(data.gameid);
                res.json({ msg: "Out", bombs: bombs });
                return;
            }
        });
        if (!out) {
            res.json({ msg: "Safe", mines: data.mines });
        }
    }

    app.post("/mines/getdata", getdata);

}