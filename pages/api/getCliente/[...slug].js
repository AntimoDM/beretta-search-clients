import { clienti_mock } from "@/src/model/Clienti";

export default (req, res) => {
  const { slug } = req.query;

  setTimeout(() => {
    res
      .status(200)
      .json(clienti_mock.find((c) => String(c.telefono) === String(slug)));
  }, 1000);
};
