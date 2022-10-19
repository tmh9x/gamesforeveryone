import {
  Box,
  Collapse,
  Container,
  FormControl,
  IconButton,
  IconButtonProps,
  InputLabel,
  List,
  MenuItem,
  Select,
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

const platformArray: string[] = ["All", "Playstation", "Xbox", "Nintendo"];
const genreArray: string[] = [
  "All",
  "Ego-Shooter",
  "Action-Adventure",
  "Action",
  "Adventure",
  "Fighting",
  "Survival",
  "Role-Playing",
  "Strategy",
];

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

  const [input, setInput] = useState({
    title: "",
    platform: "",
    genre: "",
  });

  console.log("input.title", input.title);
  console.log("input.platform", input.platform);
  console.log("input.genre", input.genre);

  const handleChange = async (event: any) => {
    const { value, name } = event.target;
    setInput({ ...input, [name]: value });
  };

  const getFilteredGames = async () => {
    const filteredGames: Games = [];
    const gamesRef = collection(db, "games");

    if (input.title && !input.platform && !input.genre) {
      const q = query(gamesRef, where("title", "==", input.title));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        filteredGames.push(doc.data());
      });
      console.log("filteredGames", filteredGames);
      setGames(filteredGames);
    } else if (input.platform && !input.title && !input.genre) {
      const q = query(gamesRef, where("platform", "==", input.platform));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        filteredGames.push(doc.data());
      });
      setGames(filteredGames);
    } else if (input.genre && !input.title && !input.platform) {
      const q = query(gamesRef, where("genre", "array-contains", input.genre));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        filteredGames.push(doc.data());
      });
      console.log("filteredGames", filteredGames);
      setGames(filteredGames);
    } else if (input.title && input.platform && !input.genre) {
      const q = query(
        gamesRef,
        where("title", "==", input.title),
        where("platform", "==", input.platform)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        filteredGames.push(doc.data());
      });
      console.log("filteredGames", filteredGames);
      setGames(filteredGames);
    } else if (input.title && input.genre && !input.platform) {
      const q = query(
        gamesRef,
        where("title", "==", input.title),
        where("genre", "array-contains", input.genre)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        filteredGames.push(doc.data());
      });
      console.log("filteredGames", filteredGames);
      setGames(filteredGames);
    } else if (input.platform && input.genre && !input.title) {
      const q = query(
        gamesRef,
        where("platform", "==", input.platform),
        where("genre", "array-contains", input.genre)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        filteredGames.push(doc.data());
      });
      console.log("filteredGames", filteredGames);
      setGames(filteredGames);
    } else if (input.title && input.platform && input.genre) {
      const q = query(
        gamesRef,
        where("title", "==", input.title),
        where("platform", "==", input.platform),
        where("genre", "array-contains", input.genre)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        filteredGames.push(doc.data());
      });
      console.log("filteredGames", filteredGames);
      setGames(filteredGames);
    }
  };

  useEffect(() => {
    getFilteredGames();
  }, [input]);

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
  }, []);

  console.log("games", games);

  return (
    <Box>
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
          <Box>
            <TextField
              id="title"
              name="title"
              label="Search"
              variant="outlined"
              sx={{ marginBottom: "1em" }}
              size="small"
              fullWidth
              onChange={handleChange}
            />
            <FormControl sx={{ marginBottom: "1em" }} size="small" fullWidth>
              <InputLabel id="platform">Platform</InputLabel>
              <Select
                labelId="platform"
                name="platform"
                id="platform"
                value={input.platform}
                label="Platform"
                onChange={handleChange}
              >
                {platformArray.map((platform, index) => (
                  <MenuItem key={index} value={platform}>
                    {platform}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ marginBottom: "1em" }} size="small" fullWidth>
              <InputLabel id="genre">Genre</InputLabel>
              <Select
                labelId="genre"
                name="genre"
                id="genre"
                value={input.genre}
                label="Genre"
                onChange={handleChange}
              >
                {genreArray.map((genre, index) => (
                  <MenuItem key={index} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Collapse>
      </Container>

      {/*  <Box sx={{ marginBottom: "2em" }}>
        <Carousel />
      </Box> */}

      <Box>
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
      </Box>
    </Box>
  );
};

export default Home;
