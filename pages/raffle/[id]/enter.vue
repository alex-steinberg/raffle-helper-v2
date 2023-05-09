<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle v-if="raffles?.length > 0"
          >Win one of {{ raffles[0].quantity }}
          {{ raffles[0].prize.name }}</IonTitle
        >
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding" :fullscreen="true">
      <!-- Ionic form that takes a first_name, last_name, and email -->
      <form @submit.prevent="enterRaffle">
        <IonItem>
          <IonLabel position="stacked">First Name</IonLabel>
          <IonInput
            v-model="entrantDetails.first_name"
            type="text"
            autocomplete="off"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Last Name</IonLabel>
          <IonInput
            v-model="entrantDetails.last_name"
            type="text"
            autocomplete="off"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput v-model="entrantDetails.email" type="email" />
        </IonItem>
        <IonButton type="submit">Enter Raffle</IonButton>
      </form>
      <ion-toast
        :is-open="isOpen"
        message="Congratulations, you've been entered!"
        :duration="3000"
        position="top"
        color="primary"
        @didDismiss="setOpen(false)"
      ></ion-toast>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { getEntrantId } from "~/common/db";
const router = useIonRouter();
import { Database } from "~~/types/database.types";
const client = useSupabaseClient<Database>();

const isOpen = ref(false);
const setOpen = (state: boolean) => {
  isOpen.value = state;
};

const entrantDetails = ref({
  first_name: "",
  last_name: "",
  email: "",
});

const {
  params: { id: raffleId },
  ...rest
} = useRoute();

let { data: raffles, error } = await useAsyncData("raffles", async () => {
  if (!raffleId) return;
  const { data } = await client
    .from("raffles")
    .select(
      `
      id,
      quantity,
      prize (
        id,
        name,
        description,
        type (
          id,
          type,
          type_display,
          description
        )
      ),
      event (
        id,
        name
      )
    `
    )
    .eq("id", raffleId);
  return data;
});

const eventId = computed(() => {
  if (!raffles || !raffles.value.length) return;
  return raffles.value[0].event.id;
});

const enterRaffle = async () => {
  if (entrantDetails.value.first_name === "") {
    alert("Please enter your first name");
    return;
  }
  if (entrantDetails.value.last_name === "") {
    alert("Please enter your last name");
    return;
  }
  if (entrantDetails.value.email === "") {
    alert("Please enter your email");
    return;
  }

  let entrant;
  const existingEntrant: { id: string } = await getEntrantId(
    client,
    entrantDetails.value.email
  );
  if (existingEntrant.id) {
    entrant = existingEntrant;
  } else {
    const { data, error } = await client
      .from("entrants")
      .insert({
        ...entrantDetails.value,
      })
      .eq("email", entrantDetails.value.email)
      .select("id");
    console.log({ entrant, error });
    if (error) {
      const message =
        error.code === "23505" ? "Email already exists" : error.message;
      alert(message);
      return;
    }
    entrant = data[0];
  }

  if (entrant.id) {
    const { data: entry, error } = await client
      .from("entries")
      .insert({
        entrant_id: entrant.id,
        raffle_id: raffleId,
      })
      .eq("id", raffleId);
    if (error) {
      console.error(error);
      return;
    }
    console.log({ entry });
  }
  setOpen(true);
  router.push(`/event/${eventId.value}`);
};
</script>

<style scoped></style>
