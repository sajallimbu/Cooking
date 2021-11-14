function uploadHelper(req, res) {
    var file = req.files.file;
    if (file) {
        var fileName = file.name
        var fileType = file.mimetype
        var folder = "default"
        switch (fileType) {

            case "image/png":
                folder = "images"
                break;

            case "text/plain":
                folder = "texts"
                break;

            case "application/pdf":
                folder = "documents"
                break;

            default:
                folder = "default";
                break;
        }

        file.mv(`./uploads/${folder}/${fileName}`, (err) => {
            if (err) {
                res.status(500).json({ status: 500, message: "error", data: `File could not be uploaded: ${fileName}` });
            } else {
                res.status(204).json({ status: 204, message: "success", data: fileName });
            }
        })
    }
}

module.exports = uploadHelper;