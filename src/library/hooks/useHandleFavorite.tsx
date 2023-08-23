import { useQueryClient } from "@tanstack/react-query";
import { User, UsersService } from "../../api";

export function useHandleFavorite() {
  const queryClient = useQueryClient();

  async function handleFavorite(user: User | undefined, favorites: string[]) {
    if (user) {
      await UsersService.updateCurrentUser({ ...user, favorites });
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    }
  }

  return handleFavorite;
}
