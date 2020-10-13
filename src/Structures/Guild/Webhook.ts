/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Guild, User, IWebhook, EvolveClient } from "../..";
import { ITextChannel } from "../../Interfaces/TextChannelOptions";
import { Endpoints } from "../../Utils/Endpoints";
import { Channel } from "../Channel/Channel";
import { TextChannel } from "../Channel/TextChannel";

export class Webhook {
  public id!: string;
  public type!: number;
  public guild!: Guild;
  public channel!: Channel;
  public user!: User;
  public name!: string;
  public avatar!: string;
  public token!: string;
  private client!: EvolveClient;
  public data!: IWebhook;
  constructor(data: IWebhook, client: EvolveClient) {
    Object.defineProperty(this, "data", {
      value: data,
      enumerable: false,
      writable: false,
    });
    Object.defineProperty(this, "client", {
      value: client,
      enumerable: false,
      writable: false,
    });
    this._handle();
  }

  private _handle() {
    if (!this.data) return;
    this.id = this.data.id;
    this.type = this.data.type;
    async () => {
      if (this.data.guild_id)
        this.guild = await this.client.rest
          .get(Endpoints.GUILD)
          .get<Guild>(this.data.guild_id);
      this.channel = new TextChannel(
        await this.client.rest
          .get(Endpoints.CHANNEL)
          .get<ITextChannel>(this.data.channel_id),
        this.client
      );
    };
    this.user = new User(this.data.user!);
    this.name = this.data.name!;
    this.avatar = this.data.avatar!;
    this.token = this.data.token!;
    return this;
  }
}
