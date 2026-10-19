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
  const demo = DEMO_ACCOUNTS.find(
    (account) => account.email === email && account.password === password,
  );

  if (demo) {
    try {
      await signUp({
        email: demo.email,
        password: demo.password,
        name: demo.label,
      });
    } catch (error) {
      void error;
    }

    await signIn(email, password);
    return;
  }

  await signIn(email, password);
}
