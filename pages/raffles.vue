<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Raffles</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding" :fullscreen="true"> Raffles </IonContent>
  </IonPage>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>
