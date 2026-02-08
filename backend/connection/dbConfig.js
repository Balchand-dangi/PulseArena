// export const url = "mongodb://127.0.0.1:27017/sports_esports_arena";

import dotenv from "dotenv";
dotenv.config();

export const url = 
process.env.MONGODB_URL ||  "mongodb://127.0.0.1:27017/sportsarena";
