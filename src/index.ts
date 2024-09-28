// src/index.ts
import app from './app';
import dotenv from 'dotenv'
import path from 'path'
// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

const PORT = process.env.PORT || 3034;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
