import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Music } from "../types";
import { Artist } from "../types/artist";

interface LikeState {
  like: Music[];
  toggle: (music: Music) => void;
  delete: (music: Music) => void;
}

export const useLikeMusicStore = create<LikeState>()(
  persist(
    (set) => ({
      like: [],
      toggle: (music) => {
        set((state) => {
          const index = state.like.findIndex((item) => item.rid === music.rid);
          if (index === -1) {
            return {
              like: [...state.like, music],
            };
          } else {
            return {
              like: state.like.filter((item) => item.rid !== music.rid),
            };
          }
        });
      },
      delete: (music) => {
        set((state) => ({
          like: state.like.filter((item) => item.rid !== music.rid),
        }));
      },
    }),
    {
      name: "like-music",
    },
  ),
);

interface LikeArtistState {
  like: Artist[];
  toggle: (artist: Artist) => void;
  delete: (artist: Artist) => void;
}

export const useLikeArtistStore = create<LikeArtistState>()(
  persist(
    (set) => ({
      like: [],
      toggle: (artist) => {
        set((state) => {
          const index = state.like.findIndex((item) => item.id === artist.id);
          if (index === -1) {
            return {
              like: [...state.like, artist],
            };
          } else {
            return {
              like: state.like.filter((item) => item.id !== artist.id),
            };
          }
        });
      },
      delete: (artist) => {
        set((state) => ({
          like: state.like.filter((item) => item.id !== artist.id),
        }));
      },
    }),
    {
      name: "like-artist",
    },
  ),
);
