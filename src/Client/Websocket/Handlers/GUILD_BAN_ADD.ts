import {
  EvolveClient,
  EVENTS,
  Payload,
  User,
  Endpoints,
  Guild,
} from "../../..";
import { IGuild } from "../../../Interfaces/GuildOptions";
import { GuildBanEvents } from "../../Events/GuildBanEvents";

export default class {
  constructor(client: EvolveClient, payload: Payload, shard: number) {
    (async () => {
      // eslint-disable-next-line prefer-const
      let { guild_id, user } = payload.d;
      const guild = new Guild(
        await client.rest.get(Endpoints.GUILD).get<IGuild>(guild_id),
        client
      );
      user = new User(user);
      client.emit(
        EVENTS.GUILD_BAN_ADD,
        new GuildBanEvents(client, user, guild, shard)
      );
    })();
  }
}
