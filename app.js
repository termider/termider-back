import Express from 'express';
import UsersAPI from './Users/User.js';
import LessonAPI from './Lessons/Lesson.js';
import cors from 'cors';

const app = Express();

app.use(cors());
app.use(Express.json());

app.use('/api/users', UsersAPI);
app.use('/api/lessons', LessonAPI);

export default app;
