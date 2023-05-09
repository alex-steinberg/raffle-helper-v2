const isPasswordRecovery = (hash: string) =>
  hash.split("&").includes("type=recovery");

export default defineNuxtRouteMiddleware(async (context) => {
  // const user = useSupabaseUser()
  const { auth } = useSupabaseAuthClient();
  const {
    data: { user },
  } = await auth.getUser();
  const { hash } = context;

  if (isPasswordRecovery(hash)) {
    return navigateTo("/recover");
  }

  if (!user) {
    return navigateTo("/login");
  }
});
