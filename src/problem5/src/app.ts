import express from "express";
import cors from "cors";
import { AppDataSource } from "./database/data-source";
import router from "./routers/itemRouters";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/items", router);

// connect db rồi mới start server
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Data Source has been initialized!");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error during Data Source initialization:", err);
  });
