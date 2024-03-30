// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { giornate_mock } from "@/src/model/Giornate";

export default (req, res) => {
  setTimeout(() => {
    res.status(200).json(giornate_mock);
  }, 1000);
};
