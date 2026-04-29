import { DEMO_ACCOUNTS } from './accounts';

interface SignInDeps {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: {
    email: string;
    password: string;
    name?: string;
  }) => Promise<void>;
}

export async function signInWithDemoFallback(
  { signIn, signUp }: SignInDeps,
  email: string,
  password: string,
): Promise<void> {
  try {
    await signIn(email, password);
  } catch (error) {
    const demo = DEMO_ACCOUNTS.find(
      (account) => account.email === email && account.password === password,
    );
    if (!demo) throw error;
    await signUp({
      email: demo.email,
      password: demo.password,
      name: demo.label,
    });
  }
}
