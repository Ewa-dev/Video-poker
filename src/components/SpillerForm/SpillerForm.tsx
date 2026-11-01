import { useCounter } from "../../Store/store";
import "./SpillerForm.css";

//opprett, velg spiller og visning av lista med spillerne
export default function SpillerForm() {
  const players = useCounter((state) => state.players);
  const player = useCounter((state) => state.player);
  const addPlayer = useCounter((state) => state.addPlayer);
  const selectPlayer = useCounter((state) => state.selectPlayer);
  const roundActive = useCounter((state) => state.roundActive);

  //her opprettes det en ny spiller
  function registrerSpiller(formData: FormData) {
    const spillerNavn = formData.get("spiller-navn") as string;

    if (!spillerNavn.trim()) {
      return;
    }

    addPlayer(spillerNavn);
  }

  return (
    <section className="SpillerForm">
      <h2>Velg spiller</h2>

      <p>Nåværende spiller: {player.name}</p>
      <p>Saldo: {player.coins} mynter</p>

      <form action={registrerSpiller}>
        <input
          type="text"
          name="spiller-navn"
          placeholder="Skriv spillernavn"
          required
        />

        <button type="submit">Registrer spiller</button>
      </form>

      <h2>Eksisterende spillere</h2>

      <ul>
        {players.map((spiller) => (
          <li key={spiller.id}>
            {spiller.name} - {spiller.coins} mynter
            <button
              type="button"
              onClick={() => selectPlayer(spiller.id)}
              disabled={roundActive || player.id === spiller.id}
            >
              {player.id === spiller.id ? "Valgt" : "Velg spiller"}
            </button>
          </li>
        ))}
      </ul>

      {roundActive && <p>Du kan ikke bytte spiller mens en runde er aktiv</p>}
    </section>
  );
}
