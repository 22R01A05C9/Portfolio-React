function getvideodata(url) {
    return new Promise((resolve) => {
        if (!url) {
            resolve({ error: true, message: "No URL Provided" });
            return;
        }
        if (!url.startsWith("https://you") && !url.startsWith("https://www.you")) {
            resolve({ error: true, message: "Invalid URL" });
            return;

        }
        url = url.replaceAll("/", "%2F");
        fetch("https://ytdl.socialplug.io/api/video-info?url=" + url, {
            headers: {
                "if-none-match": 'W/"b9-p25sIP90/JNqBygRCpU2i6EwumA"',
                origin: "https://www.socialplug.io",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.title === url) {
                    resolve({ error: true, message: "No Video Found" })
                    return;
                }
                resolve({
                    formats: data.format_options.video.mp4,
                    title: data.title,
                    thumbnail: data.image,
                })
            });
    })

}

function createjob(req, res) {
    let url = req.body?.url;
    let quality = req.body?.quality;
    let server = req.body?.server;
    if (!url) {
        res.json({ error: true, message: "No URL Provided" });
        return;
    }
    if (!quality) {
        res.json({ error: true, message: "No Quality Provided" });
        return;
    }
    if (!server) {
        res.json({ error: true, message: "No Server Provided" });
        return;
    }
    if (!url.startsWith("https://you") && !url.startsWith("https://www.you")) {
        res.json({ error: true, message: "Invalid URL" });
        return;
    }
    if (server !== "1" && server !== "2") {
        res.json({ error: true, message: "Invalid Server" });
        return;
    }
    let vdata = getvideodata(url)
    if (vdata.error) {
        res.json(vdata)
        return
    }
    if (server === "1") {
        let qualities = [
            "144p",
            "240p",
            "360p",
            "480p",
            "720p",
            "1080p",
            "1440p",
            "2160p",
        ];
        if (qualities.indexOf(quality) == -1) {
            res.json({ error: true, message: "Invalid Quality" });
            return;
        }
        url = url.replaceAll("/", "%2F");
        fetch(
            "https://ytdl.socialplug.io/api/start-download?url=" +
            url +
            "&quality=" +
            quality,
            {
                headers: {
                    "if-none-match": 'W/"b9-p25sIP90/JNqBygRCpU2i6EwumA"',
                    origin: "https://www.socialplug.io",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                res.json(data);
            });
    } else {
        let qualities = [
            "mp3",
            "m41",
            "webm",
            "aac",
            "flac",
            "opus",
            "ogg",
            "vorbis",
            "wav",
            "360",
            "480",
            "720",
            "1080",
            "1440",
            "4k",
            "8k"
        ];
        if (qualities.indexOf(quality) == -1) {
            res.json({ error: true, message: "Invalid Quality" });
            return;
        }
        fetch("https://loader.to/ajax/download.php?format=mp3&url=" + encodeURIComponent(url)).then(res => res.json()).then((data) => {
            res.json({ error: false, message: "Job Created", jobid: data.id })
        })

    }

}

function getjobstatus(req, res) {
    let jobid = req.body?.jobid;
    let server = req.body?.server;
    if (!jobid) {
        res.json({ error: true, message: "No Job ID Provided" });
        return;
    }
    if (!server) {
        res.json({ error: true, message: "No Server Provided" });
        return;
    }
    if (server !== "1" && server !== "2") {
        res.json({ error: true, message: "Invalid Server" });
        return;
    }
    if (server === "1") {
        fetch("https://ytdl.socialplug.io/api/get-download?download_id=" + jobid, {
            headers: {
                "if-none-match": 'W/"b9-p25sIP90/JNqBygRCpU2i6EwumA"',
                origin: "https://www.socialplug.io",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                res.json(data);
            });
    } else {
        fetch("https://p.oceansaver.in/ajax/progress.php?id=" + jobid).then(res => res.json()).then((data) => {
            console.log(data);
            res.json({ success: data.success, progress: data.progress, final_url: data.download_url })
        })
    }
}


module.exports = function (app) {
    app.post("/youtube/getvideodata", (req, res) => {
        let url = req.body?.url;
        getvideodata(url).then((data) => {
            res.json(data)
        })
    });
    app.post("/youtube/createjob", createjob);
    app.post("/youtube/getjobstatus", getjobstatus);
};
