import supabase from "../config/supabase";

export const getClubs = async () => {
  try {
    const response = await supabase.from("clubs").select();
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getClubById = async (id: string) => {
  try {
    const response = await supabase
      .from("clubs")
      .select()
      .eq("id", id)
      .single();
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteClub = async (id: string) => {
  try {
    const response = await supabase.from("clubs").delete().eq("id", id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addClub = async (data: any) => {
  try {
    const { status, data: club } = await supabase.from("clubs").insert(data);
    return { club, status };
  } catch (error) {
    console.log(error);
  }
};

export const editClub = async (id: string, data: any) => {
  try {
    const { status, data: club } = await supabase
      .from("clubs")
      .update(data)
      .eq("id", id);
    return { club, status };
  } catch (error) {
    console.log(error);
  }
};
