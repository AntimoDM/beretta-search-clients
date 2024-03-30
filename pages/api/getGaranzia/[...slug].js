import { garanzie_mock } from "@/src/model/Garanzie";

export default (req, res) => {
  const { slug } = req.query;

  setTimeout(() => {
    res
      .status(200)
      .json(garanzie_mock.find((g) => Number(g.id) === Number(slug)));
  }, 1000);
};
