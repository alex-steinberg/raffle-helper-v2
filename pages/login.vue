<template>
  <IonPage>
    <IonContent>
      <div class="min-h-full flex flex-col justify-center sm:px-6 lg:px-8">
        <h2 class="my-6 text-center text-3xl font-extrabold">
          Sign in to your account
        </h2>
        <div class="px-6">
          <IonItem>
            <IonInput
              v-model="credentials.email"
              autocapitalize="none"
              type="text"
              label="E-mail"
              label-placement="stacked"
            />
          </IonItem>
          <IonItem>
            <IonInput
              v-model="credentials.password"
              autocapitalize="none"
              type="password"
              label="Password"
              label-placement="stacked"
            />
          </IonItem>
          <IonItem lines="none">
            <IonButton @click="doSignIn">SIGN IN</IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonButton @click="doForgotPassword" fill="outline"
              >Forgot password</IonButton
            >
          </IonItem>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>
<script lang="ts" setup>
definePageMeta({
  alias: ["/login"],
});
const user = useSupabaseUser();
const { auth } = useSupabaseAuthClient();
const router = useRouter();
const cancelWatch = ref();

onIonViewDidEnter(() => {
  cancelWatch.value = watchEffect(async () => {
    if (user.value) {
      await router.push("/");
    }
  });
});

onIonViewDidLeave(() => {
  cancelWatch.value();
});

const credentials = ref({
  email: "",
  password: "",
});

/**
 *
 */
const doSignIn = async () => {
  try {
    const { data, error } = await auth.signInWithPassword({
      ...credentials.value,
    });
    if (error) throw error;
    await router.push("/home");
    return true;
  } catch (error) {
    alert((error as any)?.message);
  }
};

const doForgotPassword = async () => {
  if (credentials.value.email) {
    let { data, error } = await auth.resetPasswordForEmail(
      credentials.value.email
    );
    console.log({ data });
    if (data) {
      alert(`Password reset e-mail sent to ${credentials.value.email}`);
    } else {
      alert(error?.message);
    }
  } else {
    alert("Please enter the e-mail for password reset.");
  }
};
</script>
