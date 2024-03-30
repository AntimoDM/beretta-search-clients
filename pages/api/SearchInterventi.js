// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { interventi_mock } from "@/src/model/Interventi";

export default (req, res) => {
  setTimeout(() => {
    res.status(200).json(interventi_mock);
  }, 500);
};
