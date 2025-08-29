import axios from "axios";
import { queryOptions } from "@tanstack/react-query";

export const options = () => {
  return queryOptions({
    queryKey: ["posts"],
    queryFn: async () => {
      return axios
        .get("https://randomuser.me/api/")
        .then((res) => res.data)
        .catch((error) => {
          console.error("Error fetching posts:", error);
          throw error;
        });
    },
  });
};
