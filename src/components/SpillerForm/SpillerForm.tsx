import { useEffect, useState } from "react";
import "./SpillerForm.css";

type Spiller = {
  navn: string;
  saldo: number;
};
/*her skal vi hente en liste av spillere og med SetSpillereRegister lista skal endres  */
export default function SpillerForm() {
  const [spillereRegister, setSpillereRegister] = useState<Spiller[]>(() => {
    const lagretRegister =
      localStorage.getItem(
        "spillere",
      ); /*her sjekkes det hvis det er noe spillere*/
    if (!lagretRegister) {
      return []; /*her blir det null hvis ingen spiller*/
    }

    return JSON.parse(lagretRegister);
  });

  useEffect(() => {
    localStorage.setItem("spillere", JSON.stringify(spillereRegister));
  }, [spillereRegister]);

  /*her oppreter vi en ny spiller og legger den til lista*/
  function registrerSpiller(formData: FormData) {
    const spillerNavn = formData.get("spiller-navn") as string;

    if (!spillerNavn) {
      return;
    } /*vi sjekker hvis navn eksisterer*/

    /*vi oppreter en ny spiller som får 100mynter*/
    const nySpiller: Spiller = {
      navn: spillerNavn,
      saldo: 100,
    };

    setSpillereRegister([...spillereRegister, nySpiller]);
  }

  return (
    <section>
      <form className="SpillerForm" action={registrerSpiller}>
        <input type="text" name="spiller-navn" required />

        <button type="submit">Registrer spiller</button>
      </form>

      <hr />

      <h2>Eksisterende spillere:</h2>
      <ul>
        {spillereRegister.map((spiller) => (
          <li key={spiller.navn}>
            {spiller.navn} har {spiller.saldo} mynter
          </li>
        ))}
      </ul>
    </section>
  );
}
