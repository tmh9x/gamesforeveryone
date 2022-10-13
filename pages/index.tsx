import {
  CardContent,
  Collapse,
  Container,
  FormControl,
  IconButton,
  IconButtonProps,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";

import Carousel from "../components/Carousel";
import FilterListIcon from "@mui/icons-material/FilterList";
import GameCard from "../components/GameCard";
import type { NextPage } from "next";
import { styled } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Home: NextPage = () => {
  console.log("db", db);

  const [imageList, setImageList] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const { getGames, games, setGames } = useAuth();

  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");

  const handlePlatformChange = async (event: SelectChangeEvent) => {
    setPlatform(event.target.value as string);
    const filteredGames: Games = [];
    const gamesRef = collection(db, "games");
    if (event.target.value == "All") {
      getGames();
    } else {
      const q = query(gamesRef, where("platform", "==", event.target.value));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        filteredGames.push(doc.data());
      });
      console.log("filteredGames", filteredGames);
      setGames(filteredGames);
    }
  };

  const handleGenreChange = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string);
  };

  const imageListRef = ref(storage, "/game-images");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getGames();
    listAll(imageListRef).then((response) => {
      console.log("response", response);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url: string) => {
          setImageList((prev: any) => [...prev, url]);
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("games", games);

  return (
    <Container sx={{ padding: "0 2rem" }}>
      <Container sx={{ textAlign: "center" }}>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <FilterListIcon />
        </ExpandMore>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container>
            <TextField
              id="search"
              name="search"
              label="search.."
              variant="outlined"
              sx={{ marginBottom: "1em" }}
              size="small"
              fullWidth
            />
            <FormControl sx={{ marginBottom: "1em" }} size="small" fullWidth>
              <InputLabel id="platform">Platform</InputLabel>
              <Select
                labelId="platform"
                id="platform"
                value={platform}
                label="Platform"
                onChange={handlePlatformChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="PS-3">PS-3</MenuItem>
                <MenuItem value="PS-4">PS-4</MenuItem>
                <MenuItem value="PS-5">PS-5</MenuItem>
                <MenuItem value="Xbox S">Xbox S</MenuItem>
                <MenuItem value="Xbox X">Xbox X</MenuItem>
                <MenuItem value="Google Stadia">Google Stadia</MenuItem>
                <MenuItem value="Nintedo Super NES Classic">
                  Nintedo Super NES Classic
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ marginBottom: "1em" }} size="small" fullWidth>
              <InputLabel id="genre">Genre</InputLabel>
              <Select
                labelId="genre"
                id="genre"
                value={genre}
                label="Genre"
                onChange={handleGenreChange}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>Ego-Shooter</MenuItem>
                <MenuItem value={2}>Open-World-Spiel</MenuItem>
                <MenuItem value={3}>Action-Adventure</MenuItem>
                <MenuItem value={4}>Action</MenuItem>
                <MenuItem value={5}>Nichtlineares Gameplay</MenuItem>
                <MenuItem value={6}>Adventure</MenuItem>
                <MenuItem value={7}>Fighting</MenuItem>
                <MenuItem value={8}>Survival</MenuItem>
                <MenuItem value={9}>Rhythm</MenuItem>
                <MenuItem value={10}>Battle Royale</MenuItem>
                <MenuItem value={11}>Role-Playing</MenuItem>
                <MenuItem value={12}>Strategy</MenuItem>
              </Select>
            </FormControl>
          </Container>
        </Collapse>
      </Container>

      <Carousel />
      {games &&
        games.map((game: Game, i: number) => (
          <div key={i}>
            <GameCard
              title={game.title}
              price={game.price}
              creator={game.creator}
              description={game.description}
              fsk={game.fsk}
              platform={game.platform}
              year={game.year}
              image={game.image}
              genre={game.genre}
              amount={game.amount}
              gameId={game.gameId}
            />
          </div>
        ))}
    </Container>
  );
};

export default Home;
