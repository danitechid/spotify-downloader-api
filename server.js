import express from 'express';
import mainRouter from './routes/main.route.js';

const app = express();
const port = 3000;

app.use(mainRouter);
app.set('json spaces', 2);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});