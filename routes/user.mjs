import { default as express } from 'express';

export const router = express.Router();

router.get("/new-account", (req, res, next) => {
  res.render('new-account', {title: 'SkillShare: New Account'})
})