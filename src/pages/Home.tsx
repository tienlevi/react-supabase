import ClubList from "../components/Club/ClubList";
import PlayerList from "../components/Player/PlayerList";
import useAuth from "../hooks/useAuth";

function Home() {
  const { event } = useAuth();
  console.log(event);

  return (
    <>
      <h1>Home Page</h1>
      <h2>Players</h2>
      <PlayerList />
      <h2>Clubs</h2>
      <ClubList />
    </>
  );
}

export default Home;
