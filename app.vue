<template>
  <IonApp>
    <IonSplitPane content-id="main-content" when="xl">
      <IonMenu content-id="main-content" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonMenuToggle
              :auto-hide="false"
              v-for="(p, i) in appPages"
              :key="i"
            >
              <IonItem
                @click="go(i)"
                router-direction="root"
                lines="none"
                :detail="false"
                class="hydrated"
                :class="{ selected: selectedIndex === i }"
              >
                <IonIcon
                  aria-hidden="true"
                  slot="start"
                  :ios="p.iosIcon"
                  :md="p.mdIcon"
                ></IonIcon>
                <IonLabel>{{ p.title }}</IonLabel>
              </IonItem>
              <IonItem v-if="!loggedIn" @click="goToLogin">
                <IonIcon
                  aria-hidden="true"
                  slot="start"
                  :ios="logInOutline"
                ></IonIcon>
                <IonLabel>Log in</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>

          <IonList id="labels-list" v-if="loggedIn">
            <IonItem>
              <IonButton @click="doUserLogout">Log out</IonButton>
            </IonItem>

            <IonItem> Logged in as: {{ data?.user?.email }} </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id="main-content"></IonRouterOutlet>
    </IonSplitPane>
  </IonApp>
</template>

<script setup>
const router = useIonRouter();

const { auth } = useSupabaseAuthClient();
const { data, error } = await auth.getUser();

const loggedIn = computed(() => {
  return !!data?.user;
});

const goToLogin = () => {
  router.navigate("/login");
};

const doUserLogout = async () => {
  await auth.signOut();
  await router.navigate("/login");
};

import { homeOutline, homeSharp, logInOutline } from "ionicons/icons";
const selectedIndex = ref(0);
const appPages = [
  {
    title: "Events",
    url: "/events",
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
];

const go = (index) => {
  selectedIndex.value = index;
  router.navigate(appPages[index].url);
};
//
// const path = window.location.pathname;
// if (typeof path === "undefined") {
//   selectedIndex.value = appPages.findIndex(
//     (page) => page.path.toLowerCase() === path.toLowerCase()
//   );
// }
</script>

<style scoped>
:root {
  --ion-color-primary-rgb: rgb(55, 255, 55);
  --ion-color-primary: #37ff37;
}
ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}
ion-item.selected ion-label {
  --color: var(--ion-color-primary) !important;
}
ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}
</style>
