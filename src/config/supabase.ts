import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "../constants";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
