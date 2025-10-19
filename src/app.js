import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from acquisitions api!');
});

export default app;
