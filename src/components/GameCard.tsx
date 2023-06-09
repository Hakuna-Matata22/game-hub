import { Card, CardBody, Heading, HStack, Image, Text } from "@chakra-ui/react";

import { Games } from "../hooks/useGames";
import getCroppedImageUrl from "../Services/image-url";
import Emoji from "./Emoji";
import MetaCriticScore from "./MetaCriticScore";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Games;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card>
      <Image src={getCroppedImageUrl(game.background_image)} />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <MetaCriticScore score={game.metacritic} />
        </HStack>
        <Heading fontSize="2xl">
          {game.name}
          <Emoji rating={game.rating_top} />
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
