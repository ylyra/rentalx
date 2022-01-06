import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();
const port = 3333 || process.env.PORT;

app.use(express.json());
app.use(categoriesRoutes);

app.listen(port, () => console.log(`server is running on port ${port}`));
