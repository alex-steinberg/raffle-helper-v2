<template>
  <IonPage>
    <IonContent>
      <div class="min-h-full flex flex-col justify-center sm:px-6 lg:px-8">
        <h2 class="my-6 text-center text-3xl font-extrabold">
          Please enter a new password at least 6 characters long.
        </h2>
        <div class="px-6">
          <IonItem>
            <IonInput
              label="New password"
              label-placement="stacked"
              type="password"
              v-model="password"
              id="password"
            />
          </IonItem>
          <IonItem lines="none">
            <IonButton for="password" @click="doNewPassword"
              >Set new password</IonButton
            >
          </IonItem>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup>
definePageMeta({
  alias: ["/recover"],
});
const user = useSupabaseUser();
const { auth } = useSupabaseAuthClient();
const router = useRouter();

const password = ref("");
const doNewPassword = async () => {
  console.log({ password });
  const { data, error } = await auth.updateUser({
    email: user.value.email,
    password: password.value,
  });
  if (error) {
    alert(error.message);
  } else {
    await router.push("/");
  }
};
</script>
