import { giornate_mock } from "@/src/model/Giornate";

export default (req, res) => {
  const { slug } = req.query;

  setTimeout(() => {
    res
      .status(200)
      .json(giornate_mock.find((g) => Number(g.id) === Number(slug)));
  }, 1000);
};
