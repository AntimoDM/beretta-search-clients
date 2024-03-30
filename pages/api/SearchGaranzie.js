// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { garanzie_mock } from "@/src/model/Garanzie";

export default (req, res) => {
  setTimeout(() => {
    res.status(200).json(garanzie_mock);
  }, 1000);
};
