import supabase from "../config/supabase";
import { v4 } from "uuid";

export const uploadFile = async (file: any) => {
  const { data, error } = await supabase.storage
    .from("player")
    .upload(`1iq7y75_0/` + v4(), file, {
      contentType: "image/png",
      upsert: true,
    });

  if (error) {
    return error;
  } else {
    return data;
  }
};
