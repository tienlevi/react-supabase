import supabase from "../config/supabase";

export const SignIn = async (data: any) => {
  try {
    const { data: user, error } = await supabase.auth.signInWithPassword(data);
    return { user, error: error };
  } catch (error) {
    console.log(error);
  }
};

export const SignUp = async (data: any) => {
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

export const LogOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return error;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (token: string) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser(token);
    return user;
  } catch (error) {
    console.log(error);
  }
};
