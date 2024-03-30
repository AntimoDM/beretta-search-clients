import { giornate_mock } from "@/src/model/Giornate";
import { interventi_mock } from "@/src/model/Interventi";

export default (req, res) => {
  const { slug } = req.query;

  let giornata = giornate_mock.find(
    (g) => Number(g.id) === Number(slug.giornata)
  );
  let intervento = interventi_mock.find((g) => Number(g.id) === Number(slug));
  giornata.interventi.push(intervento);

  setTimeout(() => {
    res.status(200).json(giornata);
  }, 1000);
};
