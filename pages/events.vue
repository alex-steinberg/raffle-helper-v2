<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Events</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding" :fullscreen="true">
      <div class="grid grid-cols-1 md:grid-cols-2 grid-gap">
        <div v-for="event in events" :key="event.id">
          <IonCard @click="openRaffle(event.id)">
            <IonCardHeader>
              <IonCardTitle>{{ event.name }}</IonCardTitle>
              <IonCardSubtitle>{{ event.community?.name }}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Date: {{ dayjs(event.start_time).format("D MMMM YYYY") }}</p>
              <p>
                Time: {{ dayjs(event.start_time).format("HH:mm") }}—{{
                  dayjs(event.end_time).format("HH:mm")
                }}
              </p>
            </IonCardContent>
          </IonCard>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>
<script setup lang="ts">
import { Database } from "~~/types/database.types";
import dayjs from "dayjs";

const client = useSupabaseClient<Database>();
const router = useIonRouter();

let { data: events, error } = await useAsyncData("events", async () => {
  const { data } = await client.from("events").select(`
      id,
      name,
      event_link,
      start_time,
      end_time,
      community (
        id,
        name,
        description,
        link
      ),
      raffles (
        id,
        quantity,
        prizes (
          id,
          name,
          description,
          type (
            id,
            type,
            type_display,
            description
          )
        )
      )
    `).gt('end_time', new Date().toISOString());
  return data;
});

definePageMeta({
  alias: ["/home", "/", "/index"],
});

const openRaffle = (id: string) => {
  router.navigate(`/event/${id}`);
};
</script>
