import supabase from "../config/supabase";
import { User } from "../interface";

export const SignIn = async (data: any) => {
  try {
    const { data: user, error } = await supabase.auth.signInWithPassword(data);
    return { user, error: error };
  } catch (error) {
    console.log(error);
  }
};

export const SignUp = async (data: User) => {
  try {
    const { data: user, error } = await supabase.auth.signUp({
      ...data,
      options: {
        data: {},
      },
    });
    return { user, error };
  } catch (error) {
    console.log(error);
  }
};

export const LogOut = async (data: any) => {
  try {
    const { error } = await supabase.auth.signOut(data);
    return error;
  } catch (error) {
    console.log(error);
  }
};
