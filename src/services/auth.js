import { supabase } from '../lib/supabaseClient.js/supabaseClient';

export async function signIn(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signUp(email, senha, nome) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: {
      data: { nome },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
