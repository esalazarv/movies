<template>
  <v-row v-layout="'guest-layout'" align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-row>
        <v-col align="center">
          <!--v-img :src="$app.logo('light')" contain height="100" /!-->
        </v-col>
      </v-row>
      <v-card>
        <ValidationObserver ref="form" v-slot="{}">
          <v-card-text>
            <div>
              <h1 align="center">{{ $t("login.title") }}</h1>
            </div>
            <form>
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('login.labels.username')"
                rules="required|email"
              >
                <v-text-field
                  v-model="credentials.username"
                  :placeholder="$t('login.labels.username')"
                  :error-messages="errors"
                  autocomplete="off"
                  required
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('login.labels.password')"
                rules="required"
              >
                <v-text-field
                  v-model="credentials.password"
                  :placeholder="$t('login.labels.password')"
                  :error-messages="errors"
                  type="password"
                  required
                />
              </ValidationProvider>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="primary"
              @click="login"
              block
              :loading="isLoading"
              :disabled="isLoading"
            >
              {{ $t("login.labels.submit") }}
            </v-btn>
          </v-card-actions>
        </ValidationObserver>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
    credentials: {
      username: null,
      password: null
    }
  }),
  computed: {
    // Map state from auth module (Vuex)
    ...mapState("auth", {
      isLoading: state => state.isLoading
    })
  },
  methods: {
    // Map actions from auth module (Vuex)
    ...mapActions("auth", ["authenticate"]),

    // Login handler
    async login() {
      if (await this.$refs.form.validate()) {
        console.log("[Login]: valid credentials");
        this.authenticate(this.credentials)
          .then(() => this.$router.push({ name: "home" }))
          .catch(error => console.log(error));
      }
    }
  },
  mounted() {
    console.log("[Login]: mounted");
  }
};
</script>

<style scoped></style>
