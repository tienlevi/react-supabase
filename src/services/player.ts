import supabase from "../config/supabase";

export const getPlayers = async () => {
  try {
    const response = await supabase.from("players").select();
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlayerById = async (id: string) => {
  try {
    const response = await supabase
      .from("players")
      .select()
      .eq("id", id)
      .single();
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePlayer = async (id: string) => {
  try {
    const response = await supabase.from("players").delete().eq("id", id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addPlayer = async (data: any) => {
  try {
    const { status, data: player } = await supabase
      .from("players")
      .insert(data);
    return { player, status };
  } catch (error) {
    console.log(error);
  }
};

export const editPlayer = async (id: string, data: any) => {
  try {
    const { status, data: player } = await supabase
      .from("players")
      .update(data)
      .eq("id", id);
    return { player, status };
  } catch (error) {
    console.log(error);
  }
};
