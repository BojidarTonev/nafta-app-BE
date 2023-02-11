import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

export default (app) => {
    app.use(
        cors({
            origin: "http://192.168.1.7:8000",
            credentials: true
        })
    );

    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );

    app.use(bodyParser.json());
    app.use(cookieParser());
};

