import { shuffle } from "./index";
import { Artist } from "../types/artist";
import { Howl } from "howler";

export interface PlayerMusic {
  id?: string;
  copyrightId: string;
  title: string;
  artist: string;
  artists: Artist[];
  album?: string;
  albumId?: string;
  pic: string;
  url?: string;
}

export interface LyricRow {
  time?: number;
  words: string;
}

export type PlayMode = "sequence" | "loop" | "repeat" | "shuffle";

// export function songItem2Music(songItem: SongItem): Music {
//   // if (import.meta.env.DEV) {
//   //   console.log('songItem2Music', songItem)
//   // }
//   let pic = songItem.smallPic || songItem.mediumPic;
//   if (pic) {
//     if (pic.startsWith("//")) {
//       pic = `http:${pic}`;
//     }
//   } else {
//     pic = icon;
//   }

//   let { singers } = songItem;
//   if (singers == null) {
//     console.warn("singers is null", songItem);
//     singers = [];
//   }

//   return {
//     copyrightId: songItem.copyrightId,
//     title: songItem.name,
//     artist: singers.map((s) => s.name).join("/"),
//     artists: singers,
//     album: songItem.album?.name,
//     albumId: songItem.album?.id,
//     pic,
//   };
// }

// export function columnContent2Music(columnContent: ColumnContent): Music {
//   const { albumImgs } = columnContent.objectInfo;
//   // if (import.meta.env.DEV) {
//   //   console.log('columnContent2Music', columnContent)
//   // }
//   let { artists } = columnContent.objectInfo;
//   if (artists == null) {
//     artists = [];
//     console.warn("columnContent2Music artists is null", columnContent.objectInfo);
//   }
//   let pic = "";
//   if (albumImgs.length > 0) {
//     const albumImg = albumImgs[albumImgs.length - 1];
//     if (albumImg.webpImg) {
//       pic = albumImg.webpImg;
//     } else if (albumImg.img) {
//       pic = albumImg.img;
//     } else {
//       pic = icon;
//     }
//   }
//   return {
//     copyrightId: columnContent.objectInfo.copyrightId,
//     title: columnContent.objectInfo.songName,
//     artist: artists.map((s) => s.name).join("/"),
//     artists,
//     album: columnContent.objectInfo.album,
//     albumId: columnContent.objectInfo.albumId,
//     pic,
//   };
// }

// export function songDetail2Music(songDetail: SongDetail): Music {
//   return {
//     copyrightId: songDetail.copyrightId11,
//     title: songDetail.musicName,
//     artist: songDetail.singers.map((s) => s.singerName).join("/"),
//     artists: songDetail.singers.map((s) => ({
//       id: s.singerId,
//       name: s.singerName,
//       image: "",
//     })),
//     album: songDetail.albumId,
//     albumId: songDetail.albumName,
//     pic: songDetail.picUrl,
//   };
// }

export let autoplay = false;
export function initPlayer() {
  autoplay = true;
}

export let shuffleIndexList: number[] = [];
export function setShuffleIndexList(l: number) {
  if (l > 0) {
    shuffleIndexList = shuffle(Array.from({ length: l }, (_item, i) => i));
  } else {
    shuffleIndexList = [];
  }
}

const VOL_KEY = "vol";
const MODE_KEY = "play_mode";
const LOCAL_INDEX = "play-index";

class PlayerConfig {
  private _volume = 100;
  private _mode: PlayMode = "sequence";
  private _index = 0;

  constructor() {
    this.initVol();
    this.initMode();
    this.initIndex();
  }

  private initVol() {
    const localData = localStorage.getItem(VOL_KEY);
    if (localData) {
      const num = Number(localData);
      if (!Number.isNaN(num)) {
        this._volume = num;
      }
    }
  }

  private initMode() {
    const localData = localStorage.getItem(MODE_KEY);
    if (localData) {
      this._mode = localData as PlayMode;
    }
  }

  private initIndex() {
    const localData = localStorage.getItem(LOCAL_INDEX);
    if (localData) {
      this._index = Number(localData) || 0;
    }
  }

  get mode() {
    return this._mode;
  }
  set mode(newMode: PlayMode) {
    this._mode = newMode;
    localStorage.setItem(MODE_KEY, newMode);
  }

  get index() {
    return this._index;
  }
  set index(newIndex: number) {
    this._index = newIndex;
    localStorage.setItem(LOCAL_INDEX, newIndex.toString());
  }

  get volume() {
    return this._volume;
  }
  set volume(newVolume: number) {
    this._volume = newVolume;
    localStorage.setItem(VOL_KEY, newVolume.toString());
  }
}

export const playerConfig = new PlayerConfig();

export class Player {
  private instance: Howl | null = null;
  constructor() {}
}
