<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>
          <template v-if="events && events.length">{{
            events[0].name
          }}</template>
          <template v-else>Loading events...{{ id }}</template>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding" :fullscreen="true">
      <template v-if="events && events.length">
        <template v-for="raffle of openRaffles(events[0].raffles)">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Win a {{ raffle.prize?.name }}</IonCardTitle>
              <IonCardSubtitle>Raffle</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Prize: {{ raffle.prize?.description }}</p>
              <p>Available: {{ raffle.quantity }}</p>
              <p>This is prize is provided courtesy of the great folks at <b @click="openWebpage(raffle.prize?.donors?.website)">{{raffle.prize?.donors?.name}}<IonIcon
                  aria-hidden="true"
                  slot="start"
                  :ios="globeOutline"
              ></IonIcon></b></p>
            </IonCardContent>
            <IonButton fill="clear" @click="go(`/raffle/${raffle.id}/enter`)">
              Enter Raffle
            </IonButton>
            <IonButton
              fill="clear"
              color="danger"
              @click="go(`/raffle/${raffle.id}/draw`)"
            >
              Draw Raffle
            </IonButton>
          </IonCard>
        </template>
      </template>
      <template v-else>Loading...</template>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { Database } from "~~/types/database.types";
import {globeOutline} from "ionicons/icons";

const router = useIonRouter();

const client = useSupabaseClient<Database>();

const go = (path: string) => {
  router.navigate(path);
};

const openWebpage = website => window.open(website, 'blank')

const {
  params: { id },
  query,
} = useRoute();

onIonViewDidEnter(() => {
  if (query.success == "true") {
    console.log("true");
    alert("You've been entered!");
    router.replace({ query: null, path: `/event/${id}` });
  }
});

let { data: events, error } = await useAsyncData("events", async () => {
  if (!id) return;
  const { data } = await client
    .from("events")
    .select(
      `
      id,
      name,
      raffles (
        id,
        quantity,
        completed_at,
        prize (
          id,
          name,
          description,
          type (
            id,
            type,
            type_display,
            description
          ),
          donors (
            name,
            website
          )
        )
      )
    `
    )
    .eq("id", id);
  return data;
});

const openRaffles = (raffles: any) => {
  return raffles.filter((raffle: any) => !raffle.completed_at);
};
</script>

<style scoped></style>
