const allowedOrigins: string[] = [
    "http://localhost:3000",
    "https://hedgeonfinance.com",
    "https://www.hedgeonfinance.com",
];

const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by cors"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
};

export default corsOptions;
